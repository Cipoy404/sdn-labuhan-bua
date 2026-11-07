document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.querySelector('.nav-links');
  const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
  const closeMenu=()=>{menu?.classList.remove('open');toggle?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');const label=toggle?.querySelector('.sr-only');if(label)label.textContent='Buka menu'};
  toggle?.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);toggle.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.sr-only').textContent=open?'Tutup menu':'Buka menu'});
  links.forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('click',event=>{if(menu?.classList.contains('open')&&!menu.contains(event.target)&&!toggle.contains(event.target))closeMenu()});

  const gallery=document.querySelector('#activity-gallery');
  if(gallery)gallery.innerHTML='';
  const archives=[
    {src:'images/facebook/facebook-01.jpg',category:'lingkungan',label:'Lingkungan sekolah',caption:'Gerbang dan lingkungan SD Negeri Labuhan Bua'},
    {src:'images/foto_sdn.webp',category:'lingkungan',label:'Gedung sekolah',caption:'Gedung utama SD Negeri Labuhan Bua'},
    {src:'images/facebook/facebook-22.jpg',category:'siswa-lama',label:'Latihan siswa',caption:'Kelompok siswa berlatih bersama guru pendamping'},
    {src:'images/pawai sd.jpg',category:'budaya',label:'Pawai budaya',caption:'Pawai budaya dan kebhinekaan SD Negeri Labuhan Bua'},
    ...Array.from({length:4},(_,i)=>({src:`images/archive/facebook-all/archive-${String(i+1).padStart(3,'0')}.jpg`,category:'siswa-lama',label:'Hari Guru & PGRI',caption:`Kebersamaan siswa dan guru pada peringatan Hari Guru — foto ${i+1}`})),
    {src:'images/archive/facebook-all/archive-005.jpg',category:'guru',label:'Penampilan guru',caption:'Penampilan guru di halaman SD Negeri Labuhan Bua'},
    ...Array.from({length:29},(_,i)=>({src:`images/archive/facebook-all/archive-${String(i+6).padStart(3,'0')}.jpg`,category:'upacara',label:'Upacara sekolah',caption:`Rangkaian upacara dan peringatan Sumpah Pemuda — foto ${i+1}`})),
    {src:'images/archive/facebook-all/archive-035.jpg',category:'upacara',label:'Sumpah Pemuda',caption:'Peringatan Hari Sumpah Pemuda SD Negeri Labuhan Bua'},
    ...Array.from({length:10},(_,i)=>({src:`images/archive/facebook-all/archive-${String(i+36).padStart(3,'0')}.jpg`,category:'guru',label:'Kombel SADU SEPELABU',caption:`Kegiatan komunitas belajar guru “SADU SEPELABU” — foto ${i+1}`})),
    ...Array.from({length:16},(_,i)=>({src:`images/archive/imtaq/imtaq-${String(i+1).padStart(2,'0')}.jpg`,category:'imtaq',label:'Kegiatan IMTAQ',caption:`Kegiatan IMTAQ bersama siswa dan guru — foto ${i+1}`})),
    {src:'images/archive/facebook-all/archive-060.jpg',category:'budaya',label:'Hari Batik Nasional',caption:'Peringatan Hari Batik Nasional'},
    {src:'images/archive/facebook-all/archive-061.jpg',category:'upacara',label:'Kesaktian Pancasila',caption:'Peringatan Hari Kesaktian Pancasila'},
    ...['hari-2','hari-3','hari-4','hari-terakhir'].flatMap((day,dayIndex)=>Array.from({length:5},(_,i)=>({
      src:`images/archive/siswa-baru/${day}-${String(i+1).padStart(2,'0')}.jpg`,category:'siswa-baru',label:`MPLS ${day.replace('hari-','Hari ')}`,caption:`Kegiatan siswa baru Kelas 1 pada rangkaian MPLS ${['hari kedua','hari ketiga','hari keempat','hari terakhir'][dayIndex]} — foto ${i+1}`
    })))
  ];
  archives.forEach(item=>{
    const button=document.createElement('button');
    button.className='social-photo archive-photo';button.type='button';button.dataset.category=item.category;button.dataset.caption=item.caption;
    const image=document.createElement('img');image.src=item.src;image.alt=item.caption;image.loading='lazy';
    const label=document.createElement('span');label.textContent=item.label;button.append(image,label);gallery?.append(button);
  });
  let expanded=false;let activeFilter='all';
  const moreButton=document.querySelector('#gallery-more');const galleryResult=document.querySelector('#gallery-result');
  const galleryLabels={all:'semua foto kegiatan','siswa-baru':'foto siswa baru dan MPLS','siswa-lama':'foto kegiatan siswa lama','guru':'foto kegiatan guru','upacara':'foto upacara dan apel','imtaq':'foto kegiatan IMTAQ','budaya':'foto kegiatan budaya','lingkungan':'foto lingkungan sekolah'};
  const updateGallery=()=>{
    const cards=[...gallery.querySelectorAll('.social-photo')];let visibleIndex=0;
    cards.forEach(card=>{const matches=activeFilter==='all'||card.dataset.category.split(' ').includes(activeFilter);const withinLimit=expanded||visibleIndex<20;card.hidden=!(matches&&withinLimit);if(matches)visibleIndex+=1});
    const matching=cards.filter(card=>activeFilter==='all'||card.dataset.category.split(' ').includes(activeFilter)).length;
    moreButton.hidden=matching<=20;moreButton.innerHTML=expanded?'Tampilkan lebih sedikit <span aria-hidden="true">↑</span>':'Tampilkan lebih banyak foto <span aria-hidden="true">↓</span>';galleryResult.textContent=`Menampilkan ${matching} ${galleryLabels[activeFilter]}`;
  };
  document.querySelectorAll('.gallery-filter').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;expanded=false;document.querySelectorAll('.gallery-filter').forEach(item=>item.classList.toggle('active',item===button));updateGallery()}));
  moreButton?.addEventListener('click',()=>{expanded=!expanded;updateGallery();if(!expanded)document.querySelector('.gallery-filters')?.scrollIntoView({behavior:'smooth',block:'start'})});
  updateGallery();

  const videoCards=[...document.querySelectorAll('.video-card')];const videoResult=document.querySelector('#video-result');
  const videoLabels={all:'semua video kegiatan','siswa-baru':'video kegiatan siswa baru','siswa-lama':'video kegiatan siswa','guru':'video kegiatan guru','imtaq':'video kegiatan IMTAQ'};
  document.querySelectorAll('.video-filter').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.videoFilter;document.querySelectorAll('.video-filter').forEach(item=>item.classList.toggle('active',item===button));let count=0;
    videoCards.forEach(card=>{const matches=filter==='all'||card.dataset.videoCategory===filter;card.hidden=!matches;if(matches)count+=1;const video=card.querySelector('video');if(!matches&&!video.paused)video.pause()});
    videoResult.textContent=`Menampilkan ${count} ${videoLabels[filter]}`;
  }));

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
    const message=['Yth. Pengelola SPMB SD Negeri Labuhan Bua,','',`Nama calon murid: ${data.get('student')}`,`Nama orang tua/wali: ${data.get('parent')}`,`Asal TK/RA: ${data.get('origin')||'-'}`,`Dusun/desa: ${data.get('address')}`,`Nomor yang dapat dihubungi: ${data.get('phone')}`,'','Mohon informasi jadwal dan berkas yang perlu dibawa.'].join('\n');
    window.location.href=`mailto:sdnlabbua5@gmail.com?subject=${encodeURIComponent('Pra-pendaftaran SPMB SD Negeri Labuhan Bua')}&body=${encodeURIComponent(message)}`;
  });
});
