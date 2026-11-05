document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.nav-links');
  const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
  const closeMenu=()=>{menu?.classList.remove('open');toggle?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');const label=toggle?.querySelector('.sr-only');if(label)label.textContent='Buka menu'};
  toggle?.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);toggle.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.sr-only').textContent=open?'Tutup menu':'Buka menu'});
  links.forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('click',event=>{if(menu?.classList.contains('open')&&!menu.contains(event.target)&&!toggle.contains(event.target))closeMenu()});

  const gallery=document.querySelector('#activity-gallery');
  const archives=[
    ...Array.from({length:16},(_,i)=>({src:`images/archive/upacara/upacara-${String(i+1).padStart(2,'0')}.jpg`,category:'upacara siswa',label:'Upacara Sumpah Pemuda',caption:`Rangkaian Upacara Sumpah Pemuda SD Negeri Labuhan Bua — foto ${i+1}`})),
    ...Array.from({length:10},(_,i)=>({src:`images/archive/kombel/kombel-${String(i+1).padStart(2,'0')}.jpg`,category:'guru',label:'Kombel SADU SEPELABU',caption:`Kegiatan komunitas belajar guru “SADU SEPELABU” — foto ${i+1}`})),
    ...Array.from({length:16},(_,i)=>({src:`images/archive/imtaq/imtaq-${String(i+1).padStart(2,'0')}.jpg`,category:'imtaq siswa guru',label:'Kegiatan IMTAQ',caption:`Kegiatan IMTAQ bersama siswa dan guru — foto ${i+1}`})),
    {src:'images/archive/poster/batik-nasional.jpg',category:'budaya',label:'Hari Batik Nasional',caption:'Poster peringatan Hari Batik Nasional'},
    {src:'images/archive/poster/kesaktian-pancasila.jpg',category:'upacara',label:'Kesaktian Pancasila',caption:'Poster peringatan Hari Kesaktian Pancasila'},
    {src:'images/archive/poster/kepala-sekolah.jpg',category:'guru',label:'Kepala sekolah',caption:'Adi Putra Jaya, S.Pd., Kepala SD Negeri Labuhan Bua'}
  ];
  archives.forEach(item=>{
    const button=document.createElement('button');
    button.className='social-photo archive-photo';button.type='button';button.dataset.category=item.category;button.dataset.caption=`${item.caption} — sumber: Facebook sekolah`;
    const image=document.createElement('img');image.src=item.src;image.alt=item.caption;image.loading='lazy';
    const label=document.createElement('span');label.textContent=item.label;button.append(image,label);gallery?.append(button);
  });
  const originalCategories=['lingkungan','siswa guru','siswa guru','guru','guru','budaya guru','guru','guru','guru','guru','upacara siswa','upacara siswa','guru','upacara siswa guru','upacara guru','upacara siswa','upacara guru','upacara siswa','upacara siswa','upacara siswa','upacara guru','siswa guru'];
  gallery?.querySelectorAll('.social-photo:not([data-category])').forEach((card,index)=>card.dataset.category=originalCategories[index]||'siswa');

  let expanded=false;let activeFilter='all';
  const moreButton=document.querySelector('#gallery-more');
  const updateGallery=()=>{
    const cards=[...gallery.querySelectorAll('.social-photo')];let visibleIndex=0;
    cards.forEach(card=>{const matches=activeFilter==='all'||card.dataset.category.split(' ').includes(activeFilter);const withinLimit=expanded||visibleIndex<20;card.hidden=!(matches&&withinLimit);if(matches)visibleIndex+=1});
    const matching=cards.filter(card=>activeFilter==='all'||card.dataset.category.split(' ').includes(activeFilter)).length;
    moreButton.hidden=matching<=20;moreButton.innerHTML=expanded?'Tampilkan lebih sedikit <span aria-hidden="true">↑</span>':'Tampilkan lebih banyak foto <span aria-hidden="true">↓</span>';
  };
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;expanded=false;document.querySelectorAll('[data-filter]').forEach(item=>item.classList.toggle('active',item===button));updateGallery()}));
  moreButton?.addEventListener('click',()=>{expanded=!expanded;updateGallery();if(!expanded)document.querySelector('.gallery-filters')?.scrollIntoView({behavior:'smooth',block:'start'})});
  updateGallery();

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver' in window)){reveals.forEach(el=>el.classList.add('visible'))}else{const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});reveals.forEach(el=>revealObserver.observe(el))}
  const sections=[...document.querySelectorAll('main section[id], header[id]')];
  if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -60%',threshold:0});sections.forEach(section=>navObserver.observe(section))}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  const dialog=document.querySelector('.lightbox');const dialogImage=dialog?.querySelector('img');const dialogText=dialog?.querySelector('p');const dialogClose=dialog?.querySelector('button');
  document.querySelectorAll('.gallery-card,.social-photo').forEach(card=>card.addEventListener('click',()=>{const image=card.querySelector('img');dialogImage.src=image.src;dialogImage.alt=image.alt;dialogText.textContent=card.dataset.caption||image.alt;dialog.showModal()}));
  dialogClose?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

  document.querySelector('#registration-form')?.addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(event.currentTarget);
    const message=['Halo, saya ingin melakukan pra-pendaftaran SPMB SD Negeri Labuhan Bua.','',`Nama calon murid: ${data.get('student')}`,`Nama orang tua/wali: ${data.get('parent')}`,`Asal TK/RA: ${data.get('origin')||'-'}`,`Dusun/desa: ${data.get('address')}`,`Nomor WhatsApp wali: ${data.get('phone')}`,'','Mohon informasi jadwal dan berkas yang perlu dibawa.'].join('\n');
    window.open(`https://wa.me/6289531541524?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
  });
});
