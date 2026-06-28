const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const ARTIST={name:'Jheff X Dj',whatsapp:'351919344194',instagram:'https://instagram.com/jheffbrasil'};
const copy={
  en:{'hero.eyebrow':'DJ booking · Europe','hero.subtitle':'Brazilian Funk, Afro & Latin sets built to move clubs, private parties and events across Europe.','cta.book':'Check Availability','cta.instagram':'Instagram','cta.press':'Press Kit','trust.line':'Club nights · Private events · Festivals · Europe bookings','modal.kicker':'Quick booking request','modal.title':'Check availability','modal.body':'Send the key details first. WhatsApp will open with a clean booking request.','modal.eventType':'Event type','modal.guests':'Approx. guests','modal.send':'Send request on WhatsApp','modal.response':'Direct WhatsApp request — no phone field needed.','form.name':'Name','form.city':'City','form.date':'Event date','form.budget':'Approx. budget','form.message':'Message'},
  fr:{'hero.eyebrow':'Booking DJ · Europe','hero.subtitle':'Un set Brazilian Funk, Afro & Latin pensé pour faire bouger clubs, soirées privées et événements en Europe.','cta.book':'Vérifier disponibilité','cta.instagram':'Instagram','cta.press':'Press Kit','trust.line':'Soirées club · Événements privés · Festivals · Bookings Europe','modal.kicker':'Demande rapide','modal.title':'Vérifier disponibilité','modal.body':'Ajoutez les informations clés. WhatsApp s’ouvrira avec une demande de booking propre.','modal.eventType':'Type d’événement','modal.guests':'Invités approx.','modal.send':'Envoyer sur WhatsApp','modal.response':'Demande directe WhatsApp — pas besoin de champ téléphone.','form.name':'Nom','form.city':'Ville','form.date':'Date de l’événement','form.budget':'Budget approx.','form.message':'Message'},
  pt:{'hero.eyebrow':'Booking DJ · Europa','hero.subtitle':'Um set Brazilian Funk, Afro & Latin feito para mover clubs, festas privadas e eventos na Europa.','cta.book':'Ver disponibilidade','cta.instagram':'Instagram','cta.press':'Press Kit','trust.line':'Noites em clubs · Eventos privados · Festivais · Bookings Europa','modal.kicker':'Pedido rápido','modal.title':'Ver disponibilidade','modal.body':'Preencha as informações principais. O WhatsApp abrirá com uma mensagem de booking pronta.','modal.eventType':'Tipo de evento','modal.guests':'Convidados aprox.','modal.send':'Enviar pelo WhatsApp','modal.response':'Pedido direto no WhatsApp — sem campo de telefone repetido.','form.name':'Nome','form.city':'Cidade','form.date':'Data do evento','form.budget':'Budget aprox.','form.message':'Mensagem'}
};
let lang=localStorage.getItem('djLang')||'en';
function wa(message){return `https://wa.me/${ARTIST.whatsapp}?text=${encodeURIComponent(message)}`}
function t(key){return copy[lang]?.[key]||copy.en[key]||key}
function setLang(next){lang=next;localStorage.setItem('djLang',lang);document.documentElement.lang=lang;$$('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));$$('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)})}
function openModal(){const modal=$('#booking-modal');if(!modal)return;modal.hidden=false;document.body.classList.add('modal-open');setTimeout(()=>modal.querySelector('input,select,textarea,button')?.focus(),30)}
function closeModal(){const modal=$('#booking-modal');if(!modal)return;modal.hidden=true;document.body.classList.remove('modal-open')}
function bookingMessage(form){const d=new FormData(form);return [`Hello ${ARTIST.name},`,`I would like to check your availability for an event.`,``,`Name: ${d.get('name')||'-'}`,`Event type: ${d.get('eventType')||'-'}`,`City: ${d.get('city')||'-'}`,`Date: ${d.get('date')||'-'}`,`Approx. guests: ${d.get('guests')||'-'}`,`Approx. budget: ${d.get('budget')||'-'}`,`Message: ${d.get('message')||'-'}`].join('\n')}
function setup(){
  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
  $$('[data-modal-open]').forEach(el=>el.addEventListener('click',openModal));
  $$('[data-modal-close]').forEach(el=>el.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  $$('a[href="https://instagram.com/jheffbrasil"]').forEach(a=>a.href=ARTIST.instagram);
  const form=$('[data-js=quick-booking-form]');
  if(form){form.addEventListener('submit',e=>{e.preventDefault();open(wa(bookingMessage(form)),'_blank','noopener,noreferrer');closeModal()})}
  setLang(lang);
}
setup();
