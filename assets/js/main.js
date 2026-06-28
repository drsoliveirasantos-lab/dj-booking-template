const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const state={lang:localStorage.getItem('djLang')||'en',artist:null,translations:{}};
async function json(path){const r=await fetch(path);if(!r.ok)throw new Error(path);return r.json()}
function tr(key){return state.translations[state.lang]?.[key]||state.translations.en?.[key]||key}
function wa(message){const n=state.artist?.contact?.whatsappNumber||'351919344194';return `https://wa.me/${n}?text=${encodeURIComponent(message)}`}
function setLang(lang){state.lang=lang;localStorage.setItem('djLang',lang);document.documentElement.lang=lang;$$('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));$$('[data-i18n]').forEach(el=>{el.innerHTML=tr(el.dataset.i18n)})}
function openModal(){const modal=$('#booking-modal');if(!modal)return;modal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('input,select,textarea,button')?.focus(),30)}
function closeModal(){const modal=$('#booking-modal');if(!modal)return;modal.hidden=true;document.body.classList.remove('modal-open')}
function hydrateArtist(artist){state.artist=artist;document.title=`${artist.artistName} — Booking`;$$('[data-artist-name]').forEach(el=>el.textContent=artist.artistName);$$('[data-artist-tagline]').forEach(el=>el.textContent=artist.tagline);$$('a[href="https://instagram.com/jheffbrasil"]').forEach(el=>{if(artist.contact?.instagram)el.href=artist.contact.instagram})}
function bookingMessage(form){const data=new FormData(form);return [`Hello ${state.artist?.artistName||'Jheff X Dj'},`,`I would like to check your availability for an event.`,``,`Event type: ${data.get('eventType')||'-'}`,`City: ${data.get('city')||'-'}`,`Date: ${data.get('date')||'-'}`,`Approx. guests: ${data.get('guests')||'-'}`,`Message: ${data.get('message')||'-'}`].join('\n')}
function setup(){
  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
  $$('[data-modal-open]').forEach(el=>el.addEventListener('click',openModal));
  $$('[data-modal-close]').forEach(el=>el.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  const quick=$('[data-js=quick-booking-form]');
  if(quick){quick.addEventListener('submit',e=>{e.preventDefault();open(wa(bookingMessage(quick)),'_blank','noopener,noreferrer');closeModal()})}
}
async function init(){const [artist,translations]=await Promise.all([json('/data/artist.json'),json('/data/translations.json')]);state.translations=translations;hydrateArtist(artist);setup();setLang(state.lang)}
init().catch(err=>{console.error(err);document.body.insertAdjacentHTML('afterbegin','<div style="padding:12px;background:#ff4338;color:#fff;text-align:center">Site data could not be loaded.</div>')});
