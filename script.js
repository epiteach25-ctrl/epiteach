// ============ Epiteach Scripts (epiteach.js) ============
(function(){
  const qs=(s,ctx=document)=>ctx.querySelector(s);
  const qsa=(s,ctx=document)=>[...ctx.querySelectorAll(s)];

  // year
  const y = qs('#year');
  if (y) y.textContent = new Date().getFullYear();

  // hover micro info
  const hovercard = qs('#hovercard');
  let t;
  function show(text,x,y){
    if(!hovercard) return;
    hovercard.textContent = text;
    hovercard.style.left = x+'px';
    hovercard.style.top = y+'px';
    hovercard.style.opacity = 1;
    clearTimeout(t);
  }
  function hide(){
    if(!hovercard) return;
    t = setTimeout(()=>hovercard.style.opacity=0, 80);
  }
  qsa('[data-hovercard]').forEach(el=>{
    el.addEventListener('mouseenter', e=>{
      const r = el.getBoundingClientRect();
      show(el.dataset.hovercard, r.left + r.width/2, window.scrollY + r.top - 14);
    });
    el.addEventListener('mousemove', e=> show(el.dataset.hovercard, e.pageX, e.pageY - 18));
    el.addEventListener('mouseleave', hide);
    el.addEventListener('blur', hide);
  });
})();


// Pricing panel hover focus + cursor glow
(function(){
  const panel = document.getElementById('pricingPanel');
  if(!panel) return;
  panel.addEventListener('mouseenter', ()=> panel.classList.add('is-hover'));
  panel.addEventListener('mouseleave', ()=> panel.classList.remove('is-hover'));
  panel.addEventListener('mousemove', (e)=>{
    const r = panel.getBoundingClientRect();
    panel.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    panel.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, {passive:true});
})();


// Reveal shapes on scroll (gentle entrance)
(function(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: .15 });
  items.forEach(el => obs.observe(el));
})();


// Footer newsletter: subtle hover/focus state
(function(){
  const panel = document.getElementById('newsletterPanel');
  if(!panel) return;
  const on = () => panel.classList.add('is-hover');
  const off = () => panel.classList.remove('is-hover');
  panel.addEventListener('mouseenter', on);
  panel.addEventListener('mouseleave', off);
  panel.addEventListener('focusin', on);
  panel.addEventListener('focusout', off);
})();
