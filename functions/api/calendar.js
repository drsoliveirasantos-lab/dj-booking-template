const CALENDAR_URL = 'https://p183-caldav.icloud.com/published/2/MTcyMzgzNDU5MDE3MjM4MwGjBAYdXjcM3btQVUzDb_EDPh9_NGWBethmRvn8nZqQKltfHcqOMY6kglNvMk6uOVQAfXecu01qN5teZ3VxYnY';

export async function onRequestGet() {
  try {
    const response = await fetch(CALENDAR_URL, {
      headers: {
        'user-agent': 'Jheff-X-Dj-Availability/1.0'
      }
    });

    if (!response.ok) {
      return json({ ok: false, error: `Calendar feed returned ${response.status}` }, 502);
    }

    const ics = await response.text();
    const events = parseIcsEvents(ics)
      .filter(event => event.start && event.end)
      .filter(event => event.end.getTime() >= Date.now() - 24 * 60 * 60 * 1000)
      .sort((a, b) => a.start - b.start)
      .slice(0, 16)
      .map(toPublicEvent);

    return json({
      ok: true,
      source: 'icloud-webcal',
      updatedAt: new Date().toISOString(),
      events
    }, 200, {
      'cache-control': 'public, max-age=300'
    });
  } catch (error) {
    return json({ ok: false, error: error?.message || 'Calendar feed error' }, 500);
  }
}

function json(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...extraHeaders
    }
  });
}

function parseIcsEvents(ics) {
  const lines = ics.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const events = [];
  let current = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      current = {};
      continue;
    }

    if (line === 'END:VEVENT') {
      if (current) events.push(current);
      current = null;
      continue;
    }

    if (!current || !line.includes(':')) continue;

    const splitIndex = line.indexOf(':');
    const rawKey = line.slice(0, splitIndex);
    const rawValue = line.slice(splitIndex + 1);
    const [key, ...paramParts] = rawKey.split(';');
    const params = Object.fromEntries(paramParts.map(part => {
      const [name, value = ''] = part.split('=');
      return [name.toUpperCase(), value];
    }));

    const value = decodeIcsText(rawValue);
    switch (key.toUpperCase()) {
      case 'SUMMARY':
        current.summary = value;
        break;
      case 'LOCATION':
        current.location = value;
        break;
      case 'DESCRIPTION':
        current.description = value;
        break;
      case 'DTSTART':
        current.start = parseIcsDate(rawValue, params);
        current.allDay = params.VALUE === 'DATE' || /^\d{8}$/.test(rawValue);
        break;
      case 'DTEND':
        current.end = parseIcsDate(rawValue, params);
        break;
      case 'URL':
        current.url = value;
        break;
      default:
        break;
    }
  }

  return events;
}

function parseIcsDate(value, params = {}) {
  if (!value) return null;

  if (params.VALUE === 'DATE' || /^\d{8}$/.test(value)) {
    return new Date(Date.UTC(Number(value.slice(0, 4)), Number(value.slice(4, 6)) - 1, Number(value.slice(6, 8)), 12, 0, 0));
  }

  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z?)$/);
  if (!match) return null;

  const [, year, month, day, hour, minute, second, zulu] = match;
  if (zulu) {
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
  }

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
}

function decodeIcsText(text = '') {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim();
}

function toPublicEvent(event) {
  const summary = event.summary || 'Public date';
  const privateLike = /private|privé|blocked|unavailable|indispon/i.test(`${summary} ${event.description || ''}`);

  return {
    title: summary,
    location: event.location || '',
    description: event.description || '',
    url: event.url || '',
    start: event.start.toISOString(),
    end: event.end.toISOString(),
    allDay: Boolean(event.allDay),
    status: privateLike ? 'Private / Unavailable' : 'Confirmed',
    requestable: !privateLike
  };
}
