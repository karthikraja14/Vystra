document.addEventListener('DOMContentLoaded',()=>{
  const n=document.getElementById('N');
  window.addEventListener('scroll',()=>n.classList.toggle('s',scrollY>50),{passive:true});
  const bg=document.getElementById('BG'),nr=document.getElementById('NR');
  bg.addEventListener('click',()=>{bg.classList.toggle('on');nr.classList.toggle('open');document.body.style.overflow=nr.classList.contains('open')?'hidden':''});
  nr.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{bg.classList.remove('on');nr.classList.remove('open');document.body.style.overflow=''}));
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
  const wa=document.getElementById('wa');
  window.addEventListener('scroll',()=>wa.classList.toggle('show',scrollY>400),{passive:true});
  document.getElementById('waB').addEventListener('click',()=>window.open('https://wa.me/919087340087?text='+encodeURIComponent("Hi Vystra! I'm interested in your services."),'_blank','noopener,noreferrer'));
  const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const d=parseFloat(e.target.dataset.d||0)*.08;setTimeout(()=>e.target.classList.add('v'),d*1000);obs.unobserve(e.target)}})},{threshold:.05,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.an').forEach(el=>obs.observe(el));
  const ct=new Set();
  const co=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;e.target.querySelectorAll('[data-c]').forEach(c=>{if(ct.has(c))return;ct.add(c);const t=+c.dataset.c,d=1200,s=performance.now();(function f(n){const p=Math.min((n-s)/d,1);c.textContent=Math.round((1-Math.pow(1-p,3))*t);if(p<1)requestAnimationFrame(f)})(s)});co.unobserve(e.target)})},{threshold:.3});
  document.querySelectorAll('.H-tag,.NM').forEach(el=>co.observe(el));
  // Observe hero proof stats too
  const hp=document.querySelector('.HW');if(hp)co.observe(hp);
  const form=document.getElementById('CF'),msg=document.getElementById('FM');
  form.addEventListener('submit',async e=>{
    e.preventDefault();const fd=new FormData(form),d=Object.fromEntries(fd);
    if(!d.name||!d.email||!d.message){sh('Fill all required fields.','err');return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){sh('Enter a valid email.','err');return}
    const btn=form.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Sending...';
    try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:d.access_key,name:d.name,email:d.email,phone:d.phone||'-',budget:d.budget||'-',service:d.service||'-',message:d.message,subject:d.subject,from_name:d.from_name})});
    const j=await r.json();if(j.success){sh("Sent! We'll reply within 24h.",'ok');form.reset()}else sh('Error. Email admin@vystra.in','err')}catch{sh('Network error. Email admin@vystra.in','err')}
    btn.disabled=false;btn.innerHTML='Send Message <span>→</span>';
  });
  function sh(t,c){msg.textContent=t;msg.className='FM '+c;setTimeout(()=>{msg.textContent='';msg.className='FM'},5000)}
});
