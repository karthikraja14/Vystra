document.addEventListener('DOMContentLoaded',()=>{
  // Nav
  const nav=document.getElementById('nav');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>50),{passive:true});

  // Burger
  const burger=document.getElementById('burger'),nr=document.getElementById('navR');
  burger.addEventListener('click',()=>{burger.classList.toggle('on');nr.classList.toggle('open');document.body.style.overflow=nr.classList.contains('open')?'hidden':''});
  nr.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('on');nr.classList.remove('open');document.body.style.overflow=''}));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

  // WhatsApp
  const wa=document.getElementById('wa');
  window.addEventListener('scroll',()=>wa.classList.toggle('show',scrollY>400),{passive:true});
  document.getElementById('waBtn').addEventListener('click',()=>window.open('https://wa.me/919087340087?text='+encodeURIComponent("Hi Vystra! I'm interested in your services. Can we discuss?"),'_blank','noopener,noreferrer'));

  // Scroll reveal
  const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const d=parseFloat(e.target.dataset.d||0)*.1;setTimeout(()=>e.target.classList.add('v'),d*1000);obs.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.a').forEach(el=>obs.observe(el));

  // Counters
  const counted=new Set();
  const cobs=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;e.target.querySelectorAll('[data-c]').forEach(c=>{if(counted.has(c))return;counted.add(c);const t=+c.dataset.c,d=1400,s=performance.now();(function f(n){const p=Math.min((n-s)/d,1);c.textContent=Math.round((1-Math.pow(1-p,3))*t);if(p<1)requestAnimationFrame(f)})(s)});cobs.unobserve(e.target)})},{threshold:.3});
  document.querySelectorAll('.hero-proof,.nums-w').forEach(el=>cobs.observe(el));

  // Form
  const form=document.getElementById('cform'),msg=document.getElementById('fmsg');
  form.addEventListener('submit',async e=>{
    e.preventDefault();const fd=new FormData(form),d=Object.fromEntries(fd);
    if(!d.name||!d.email||!d.message){sh('Fill all required fields.','err');return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){sh('Enter a valid email.','err');return}
    const btn=form.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Sending...';
    try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:d.access_key,name:d.name,email:d.email,phone:d.phone||'-',budget:d.budget||'-',service:d.service||'-',message:d.message,subject:d.subject,from_name:d.from_name})});
    const j=await r.json();if(j.success){sh("Sent! We'll reply within 24h.",'ok');form.reset()}else sh('Error. Email admin@vystra.in','err')}catch{sh('Network error. Email admin@vystra.in','err')}
    btn.disabled=false;btn.innerHTML='Send Message <span>→</span>';
  });
  function sh(t,c){msg.textContent=t;msg.className='fmsg '+c;setTimeout(()=>{msg.textContent='';msg.className='fmsg'},5000)}

  // Active nav
  const secs=document.querySelectorAll('section[id]');
  window.addEventListener('scroll',()=>{const s=scrollY+100;secs.forEach(sec=>{if(s>=sec.offsetTop&&s<sec.offsetTop+sec.offsetHeight){const id=sec.id;nr.querySelectorAll('a').forEach(a=>{a.style.color=a.getAttribute('href')==='#'+id?'var(--gd)':''})}})},{passive:true});
});
