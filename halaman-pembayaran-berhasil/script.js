'use strict';
const berandaBtn = document.getElementById('berandaBtn');

function formatDateTime(date) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  const dayName  = days[date.getDay()];
  const day      = date.getDate();
  const month    = months[date.getMonth()];
  const year     = date.getFullYear();
  const hours    = String(date.getHours()).padStart(2, '0');
  const minutes  = String(date.getMinutes()).padStart(2, '0');

  return `${dayName}, ${day} ${month} ${year} · ${hours}:${minutes} WIB`;
}

function setTimestamp() {
  const el = document.getElementById('currentTime');
  if (!el) return;
  el.textContent = formatDateTime(new Date());
}

setTimestamp();

let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const textNode = toast.childNodes[toast.childNodes.length - 1];
  if (textNode && textNode.nodeType === Node.TEXT_NODE) {
    textNode.textContent = ' ' + message;
  }

  toast.classList.add('toast--show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('toast--show');
  }, 2500);
}

function copyTransactionId() {
  const idEl = document.getElementById('transactionId');
  const btn  = document.getElementById('copyBtn');
  if (!idEl || !btn) return;

  const text = idEl.textContent.trim();

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => onCopied(btn))
      .catch(() => fallbackCopy(text, btn));
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand('copy');
    onCopied(btn);
  } catch {
    showToast('Gagal menyalin');
  }
  document.body.removeChild(el);
}

function onCopied(btn) {
  showToast('ID Transaksi disalin!');

  btn.style.color = 'var(--green-600)';
  btn.style.transform = 'scale(1.2)';
  setTimeout(() => {
    btn.style.color = '';
    btn.style.transform = '';
  }, 600);
}

document.getElementById('copyBtn')?.addEventListener('click', copyTransactionId);

function handleTiket() {
  const btn = document.getElementById('tiketBtn');
  if (!btn) return;

  const original = btn.innerHTML;
  btn.innerHTML = `
    <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
    Memuat Tiket...
  `;
  btn.disabled = true;
  btn.style.opacity = '0.85';

  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
    btn.style.opacity = '';
    showToast('Tiket berhasil dimuat!');
  }, 1800);
}

function handleBeranda() {
  const card = document.getElementById('mainCard');
  if (card) {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(20px) scale(0.98)';
  }

  setTimeout(() => {
    window.location.reload();
  }, 350);
}

document.getElementById('tiketBtn')?.addEventListener('click', handleTiket);
document.getElementById('berandaBtn')?.addEventListener('click', handleBeranda);

const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  .spinner {
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

function staggerDetailRows() {
  const rows = document.querySelectorAll('.detail-row');
  rows.forEach((row, i) => {
    row.style.opacity   = '0';
    row.style.transform = 'translateX(-8px)';
    row.style.transition = `opacity 0.35s ease ${0.65 + i * 0.08}s,
                             transform 0.35s ease ${0.65 + i * 0.08}s`;

    row.getBoundingClientRect();

    row.style.opacity   = '1';
    row.style.transform = 'translateX(0)';
  });
}

setTimeout(staggerDetailRows, 100);

function createConfettiPiece(delay) {
  const el = document.createElement('div');

  const colors = [
    '#4ade80', '#22c55e', '#f97316', '#fb923c',
    '#fbbf24', '#60a5fa', '#a78bfa'
  ];

  const size   = Math.random() * 8 + 5;
  const startX = Math.random() * window.innerWidth;
  const drift  = (Math.random() - 0.5) * 200;
  const color  = colors[Math.floor(Math.random() * colors.length)];
  const shape  = Math.random() > 0.5 ? '50%' : '2px';
  const rotate = Math.random() * 720 - 360;

  el.style.cssText = `
    position: fixed;
    top: -20px;
    left: ${startX}px;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    border-radius: ${shape};
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    animation: confettiFall ${1.8 + Math.random() * 1.2}s ease-out ${delay}s forwards;
    --drift: ${drift}px;
    --rotate: ${rotate}deg;
  `;

  document.body.appendChild(el);

  setTimeout(() => el.remove(), (delay + 3.2) * 1000);
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(0) rotate(0deg) scale(0);
    }
    10% { opacity: 1; }
    100% {
      opacity: 0;
      transform: translateY(${window.innerHeight + 40}px)
                 translateX(var(--drift))
                 rotate(var(--rotate))
                 scale(0.5);
    }
  }
`;
document.head.appendChild(confettiStyle);

setTimeout(() => {
  for (let i = 0; i < 36; i++) {
    createConfettiPiece(i * 0.04);
  }
}, 900);

berandaBtn?.addEventListener('click', function() {
    window.location.href = "../halaman-beranda/index.html";
});