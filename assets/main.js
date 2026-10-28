'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
function closeMenu() {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Buka menu navigasi');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 851px)').addEventListener('change', closeMenu);

const backTop = document.querySelector('.back-top');
function updateBackTop() {
  if (backTop) backTop.hidden = window.scrollY < 650;
}
window.addEventListener('scroll', updateBackTop, { passive: true });
updateBackTop();
backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('.brand')?.focus({ preventScroll: true });
});
document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

// Portofolio demonstrasi. Ganti dengan proyek dan dokumentasi milik perusahaan.
const projects = {
  office: {
    title: 'Gedung Kantor Modern', category: 'Konstruksi Gedung', image: 'assets/images/building.jpg',
    alt: 'Foto ilustrasi fasad gedung bertingkat',
    description: 'Konsep pembangunan ruang kerja yang menyatukan fungsi, kenyamanan, dan struktur yang terencana. Contoh ini menggambarkan lingkup pekerjaan konstruksi gedung, bukan proyek yang telah dikerjakan PT Ikhtiyar Karya Putra.',
    scope: ['Persiapan lahan dan pekerjaan fondasi', 'Struktur beton dan pekerjaan arsitektur', 'Koordinasi utilitas dan penyelesaian akhir']
  },
  road: {
    title: 'Akses Jalan & Drainase', category: 'Infrastruktur Sipil', image: 'assets/images/infrastructure.svg',
    alt: 'Ilustrasi konsep jalan dengan saluran drainase',
    description: 'Konsep infrastruktur akses yang mendukung mobilitas dan pengelolaan air permukaan. Lingkup serta metode pelaksanaan disesuaikan dengan kondisi lapangan dan perencanaan teknis. Ini merupakan contoh portofolio, bukan dokumentasi proyek perusahaan.',
    scope: ['Pematangan dan pemadatan tanah', 'Pekerjaan lapisan perkerasan jalan', 'Pembangunan saluran dan fasilitas pelengkap']
  },
  commercial: {
    title: 'Fasilitas Komersial', category: 'Bangunan Komersial', image: 'assets/images/commercial.svg',
    alt: 'Ilustrasi konsep bangunan komersial modern',
    description: 'Konsep ruang usaha yang mengutamakan kebutuhan operasional dan fleksibilitas penggunaan. Contoh ini menunjukkan kemungkinan lingkup pembangunan fasilitas komersial dan tidak menyatakan pengalaman proyek aktual perusahaan.',
    scope: ['Perencanaan kebutuhan ruang dan koordinasi teknis', 'Pekerjaan struktur dan selubung bangunan', 'Finishing serta penataan area pendukung']
  }
};
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
const filterCount = document.querySelector('.filter-count');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  projectCards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  if (filterCount) filterCount.textContent = `Menampilkan ${visible} konsep proyek`;
}));

const projectDialog = document.querySelector('.project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project || !projectDialog) return;
  projectDialog.querySelector('.dialog-image').src = project.image;
  projectDialog.querySelector('.dialog-image').alt = project.alt;
  projectDialog.querySelector('#project-title').textContent = project.title;
  projectDialog.querySelector('.project-category').textContent = `${project.category} · Konsep proyek`;
  projectDialog.querySelector('.dialog-description').textContent = project.description;
  const scope = projectDialog.querySelector('.dialog-scope');
  scope.replaceChildren(...project.scope.map(text => {
    const li = document.createElement('li');
    li.textContent = `✓  ${text}`;
    return li;
  }));
  projectDialog.querySelector('.project-contact').href = `contact.html?service=${encodeURIComponent(project.category === 'Bangunan Komersial' ? 'Konstruksi Gedung' : project.category)}`;
  projectDialog.showModal();
  document.body.classList.add('modal-open');
}));
projectDialog?.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog?.addEventListener('click', event => {
  const rect = projectDialog.getBoundingClientRect();
  if (event.target === projectDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) projectDialog.close();
});
projectDialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));

const contact = window.IKP_CONTACT || {};
const email = typeof contact.email === 'string' ? contact.email.trim() : '';
const validEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) && !/[\r\n?]/.test(email);
const phone = typeof contact.phone === 'string' ? contact.phone.trim() : '';
const validPhone = /^\+?[\d\s()-]{7,24}$/.test(phone);
document.querySelectorAll('[data-contact]').forEach(node => {
  const kind = node.dataset.contact;
  const value = kind === 'email' && validEmail ? email : kind === 'phone' && validPhone ? phone : kind === 'address' && typeof contact.address === 'string' ? contact.address.trim() : '';
  if (!value) return;
  if (kind === 'address') node.textContent = value;
  else {
    const a = document.createElement('a');
    a.href = kind === 'email' ? `mailto:${email}` : `tel:${phone.replace(/[^+\d]/g, '')}`;
    a.textContent = value;
    node.replaceChildren(a);
  }
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const service = contactForm.elements.service;
  const requested = new URLSearchParams(window.location.search).get('service');
  if ([...service.options].some(option => option.value === requested)) service.value = requested;
  const result = document.querySelector('#form-result');
  const summary = document.querySelector('#message-summary');
  const status = document.querySelector('#result-status');
  const emailLink = document.querySelector('#email-summary');
  function validateMessage() {
    contactForm.elements.message.setCustomValidity(contactForm.elements.message.value.trim().length < 20 ? 'Jelaskan rencana proyek Anda minimal 20 karakter, selain spasi.' : '');
  }
  contactForm.elements.message.addEventListener('input', validateMessage);
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    validateMessage();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    summary.value = [
      'PERMINTAAN KONSULTASI PROYEK', 'PT Ikhtiyar Karya Putra', '',
      `Nama: ${String(data.get('name')).trim()}`, `Email: ${String(data.get('email')).trim()}`,
      `Telepon: ${String(data.get('phone')).trim() || 'Tidak dicantumkan'}`,
      `Perusahaan: ${String(data.get('company')).trim() || 'Tidak dicantumkan'}`,
      `Layanan: ${data.get('service')}`, '', 'Rencana proyek:', String(data.get('message')).trim()
    ].join('\n');
    result.hidden = false;
    status.textContent = 'Ringkasan siap. Pesan belum dikirim.';
    if (validEmail) {
      emailLink.href = `mailto:${email}?subject=${encodeURIComponent(`Konsultasi ${data.get('service')}`)}&body=${encodeURIComponent(summary.value)}`;
      emailLink.hidden = false;
    }
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    document.querySelector('#result-title').focus({ preventScroll: true });
  });
  contactForm.addEventListener('input', () => {
    result.hidden = true;
    status.textContent = '';
  });
  document.querySelector('#copy-summary').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard tidak tersedia');
      await navigator.clipboard.writeText(summary.value);
      status.textContent = 'Ringkasan berhasil disalin. Silakan bagikan melalui kontak resmi perusahaan.';
    } catch {
      summary.focus(); summary.select();
      status.textContent = 'Teks telah dipilih. Tekan Ctrl+C atau gunakan menu Salin pada perangkat Anda.';
    }
  });
  document.querySelector('#download-summary').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([summary.value], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'konsultasi-proyek-ikp.txt';
    document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Ringkasan diunduh sebagai berkas teks. Pesan belum dikirim.';
  });
}
