// GYTEX Tech Hub - JavaScript

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach((e,i) => { if(e.isIntersecting) setTimeout(()=>e.target.classList.add('v'), i*80); });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Counter
function count(el,end,suf=''){
  let n=0;
  const t=setInterval(()=>{
    n+=Math.ceil(end/70); if(n>=end){n=end;clearInterval(t);}
    el.textContent=n+suf;
  },28);
}
const so=new IntersectionObserver(e=>{
  if(e[0].isIntersecting){
    count(document.getElementById('s1'),150,'+');
    count(document.getElementById('s2'),200,'+');
    count(document.getElementById('s3'),312,'+');
    count(document.getElementById('s4'),5,'+');
    so.disconnect();
  }
},{threshold:.5});
so.observe(document.querySelector('.stats-bar'));

// Form - Formspree + WhatsApp
async function sendMsg(){
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const msg = document.getElementById('fmsg').value.trim();

  if(!name || !email){ alert('Please enter your name and email.'); return; }

  const btn = document.querySelector('#contact .bp');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Send to Formspree (email)
  try {
    const res = await fetch('https://formspree.io/f/mykdoyaw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message: msg })
    });
    if(res.ok){
      const t = document.getElementById('toast');
      t.classList.add('show');
      setTimeout(()=>t.classList.remove('show'), 5000);
      ['fname','femail','fsubject','fmsg'].forEach(id=>document.getElementById(id).value='');
    } else {
      alert('Email sending failed. Please contact us via WhatsApp directly.');
    }
  } catch(err) {
    alert('Network error. Please contact us via WhatsApp.');
  }

  btn.textContent = 'Send Message →';
  btn.disabled = false;
}

// Smooth nav
window.addEventListener('scroll',()=>{
  const nav=document.querySelector('nav');
  nav.style.background=window.scrollY>60?'rgba(2,5,9,.97)':'rgba(2,5,9,.88)';
});
// WhatsApp Button
function openWhatsApp(){
  var number = '27631764338';
  var message = encodeURIComponent('Hi GYTEX Tech Hub! I found you on your website and I would like to enquire about your services.');
  var url = 'https://wa.me/' + number + '?text=' + message;
  window.open(url, '_blank');
}
