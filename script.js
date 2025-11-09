// Basic interactions: nav toggle, year auto-fill, lightbox, simple smooth scroll

document.addEventListener('DOMContentLoaded', () => {
  // fill year(s)
  const years = Array.from({length:6}, (_,i)=>document.getElementById('year' + (i?`-${i}`:'')));
  // simpler: set all spans with id starting 'year'
  document.querySelectorAll("[id^='year']").forEach(el => el.textContent = new Date().getFullYear());

  // Nav toggles (support multiple toggles per page)
  document.querySelectorAll('.nav-toggle').forEach((btn, idx) => {
    btn.addEventListener('click', ()=>{
      // try locate the local nav next to it
      const nav = document.querySelectorAll('.site-nav')[idx] || document.querySelector('.site-nav');
      if(!nav) return;
      nav.classList.toggle('open');
      btn.classList.toggle('open');
    });
  });

  // Lightbox for any image with .lightbox-trigger
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img') || document.getElementById('lb-img-2');
  const lbCloseButtons = document.querySelectorAll('.lb-close');

  function openLightbox(src, alt=''){
    if(!lb) return;
    lb.style.display = 'flex';
    lb.setAttribute('aria-hidden','false');
    if(lbImg){ lbImg.src = src; lbImg.alt = alt; }
  }
  function closeLightbox(){
    if(!lb) return;
    lb.style.display = 'none';
    lb.setAttribute('aria-hidden','true');
    if(lbImg){ lbImg.src = ''; lbImg.alt = ''; }
  }

  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', (e) => openLightbox(e.currentTarget.src, e.currentTarget.alt));
  });
  lbCloseButtons.forEach(b => b.addEventListener('click', closeLightbox));
  if(lb) lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox(); });

  // Smooth anchor scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Contact form: basic client-side submit block (replace with real integration)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Thanks — your message was received! (This is a demo.)');
      form.reset();
    });
  }
});
