document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.nav-links');
  const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
  const closeMenu=()=>{menu?.classList.remove('open');toggle?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');const label=toggle?.querySelector('.sr-only');if(label)label.textContent='Buka menu'};
  toggle?.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);toggle.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.sr-only').textContent=open?'Tutup menu':'Buka menu'});
  links.forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('click',event=>{if(menu?.classList.contains('open')&&!menu.contains(event.target)&&!toggle.contains(event.target))closeMenu()});
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver' in window)){reveals.forEach(el=>el.classList.add('visible'))}else{const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});reveals.forEach(el=>revealObserver.observe(el))}
  const sections=[...document.querySelectorAll('main section[id], header[id]')];
  if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -60%',threshold:0});sections.forEach(section=>navObserver.observe(section))}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const dialog=document.querySelector('.lightbox');const dialogImage=dialog?.querySelector('img');const dialogText=dialog?.querySelector('p');const dialogClose=dialog?.querySelector('button');
  document.querySelectorAll('.gallery-card').forEach(card=>card.addEventListener('click',()=>{const image=card.querySelector('img');dialogImage.src=image.src;dialogImage.alt=image.alt;dialogText.textContent=card.dataset.caption||image.alt;dialog.showModal()}));
  dialogClose?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
});

