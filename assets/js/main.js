const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const ARTIST={name:'Jheff Brasil',whatsapp:'351919344194',instagram:'/instagram/'};
const copy={
  en:{'hero.eyebrow':'DJ booking · Europe','hero.subtitle':'Brazilian Funk, Afro & Latin sets built to move clubs, private events and festivals across Europe.','cta.book':'Check availability','cta.instagram':'Instagram','cta.press':'Press Kit','trust.line':'Club nights · Private events · Festivals · Europe bookings','modal.kicker':'Quick booking request','modal.title':'Check availability','modal.body':'Send the key details. WhatsApp will open with a clean booking request.','modal.eventType':'Event type','modal.guests':'Approx. guests','modal.send':'Send request on WhatsApp','modal.response':'Direct WhatsApp request — no phone field needed.','form.name':'Name','form.city':'City','form.date':'Event date','form.budget':'Approx. budget','form.message':'Message','home.week':'This week','home.fullAgenda':'Full agenda →'},
  fr:{'hero.eyebrow':'Booking DJ · Europe','hero.subtitle':'Des sets Brazilian Funk, Afro & Latin pensés pour faire bouger les clubs, événements privés et festivals en Europe.','cta.book':'Voir les disponibilités','cta.instagram':'Instagram','cta.press':'Press Kit','trust.line':'Clubs · Événements privés · Festivals · Bookings Europe','modal.kicker':'Demande rapide','modal.title':'Voir les disponibilités','modal.body':'Ajoutez les informations clés. WhatsApp s’ouvrira avec une demande de booking claire.','modal.eventType':'Type d’événement','modal.guests':'Invités approx.','modal.send':'Envoyer sur WhatsApp','modal.response':'Demande directe sur WhatsApp — pas besoin de champ téléphone.','form.name':'Nom','form.city':'Ville','form.date':'Date de l’événement','form.budget':'Budget approx.','form.message':'Message','home.week':'Cette semaine','home.fullAgenda':'Agenda complet →'},
  pt:{'hero.eyebrow':'Booking DJ · Europa','hero.subtitle':'Sets de Brazilian Funk, Afro e Latin Vibes feitos para agitar clubes, eventos privados e festivais pela Europa.','cta.book':'Ver disponibilidade','cta.instagram':'Instagram','cta.press':'Press Kit','trust.line':'Clubes · Eventos privados · Festivais · Bookings Europa','modal.kicker':'Pedido rápido','modal.title':'Ver disponibilidade','modal.body':'Preencha as informações principais. O WhatsApp abrirá com uma mensagem de booking pronta.','modal.eventType':'Tipo de evento','modal.guests':'Convidados aprox.','modal.send':'Enviar pelo WhatsApp','modal.response':'Pedido direto pelo WhatsApp — sem campo de telefone.','form.name':'Nome','form.city':'Cidade','form.date':'Data do evento','form.budget':'Budget aprox.','form.message':'Mensagem','home.week':'Esta semana','home.fullAgenda':'Agenda completa →'}
};
let lang=localStorage.getItem('djLang')||'en';
function wa(message){return `https://wa.me/${ARTIST.whatsapp}?text=${encodeURIComponent(message)}`}
function t(key){return copy[lang]?.[key]||copy.en[key]||key}
function setLang(next){lang=next;localStorage.setItem('djLang',lang);document.documentElement.lang=lang;$$('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));$$('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});document.dispatchEvent(new CustomEvent('dj:langchange',{detail:{lang}}))}
function openModal(){const modal=$('#booking-modal');if(!modal)return;modal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('input,select,textarea,button')?.focus(),30)}
function closeModal(){const modal=$('#booking-modal');if(!modal)return;modal.hidden=true;document.body.classList.remove('modal-open')}
function bookingMessage(form){const d=new FormData(form);return [`Hello ${ARTIST.name},`,`I would like to check your availability for an event.`,``,`Name: ${d.get('name')||'-'}`,`Event type: ${d.get('eventType')||'-'}`,`City: ${d.get('city')||'-'}`,`Date: ${d.get('date')||'-'}`,`Approx. guests: ${d.get('guests')||'-'}`,`Approx. budget: ${d.get('budget')||'-'}`,`Message: ${d.get('message')||'-'}`].join('\n')}
function setup(){
  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
  $$('[data-modal-open]').forEach(el=>el.addEventListener('click',openModal));
  $$('[data-modal-close]').forEach(el=>el.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  $$('[data-instagram]').forEach(a=>{a.href=ARTIST.instagram;a.removeAttribute('target');a.removeAttribute('rel')});
  const form=$('[data-js=quick-booking-form]');
  if(form){form.addEventListener('submit',e=>{e.preventDefault();open(wa(bookingMessage(form)),'_blank','noopener,noreferrer');closeModal()})}
  setLang(lang);
}
setup();