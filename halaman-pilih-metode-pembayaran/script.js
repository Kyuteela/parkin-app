let selectedMethod = null;
const Selesai = document.getElementById('Selesai');

const methodLabels = {
  qris:  'QRIS',
  gopay: 'GoPay',
  ovo:   'OVO',
  dana:  'Dana',
};

(function initHeaderTimer() {
  const el = document.getElementById('timer');
  if (!el) return;

  let seconds = 8 * 60 + 47; // 08:47

  function fmt(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  function tick() {
    if (seconds <= 0) {
      el.textContent = '00:00';
      handleHeaderExpired();
      return;
    }
    el.textContent = fmt(seconds--);
    setTimeout(tick, 1000);
  }

  tick();
})();

function handleHeaderExpired() {
  showToast('Waktu slot habis. Silakan ulangi pemesanan.', 'error');
  const btnPay = document.getElementById('btn-pay');
  if (btnPay) {
    btnPay.disabled = true;
    btnPay.textContent = 'Waktu Habis';
  }
}

const methodItems = document.querySelectorAll('.method-item');

methodItems.forEach(item => {
  item.addEventListener('click', () => {
    methodItems.forEach(m => m.classList.remove('selected'));
    item.classList.add('selected');
    selectedMethod = item.dataset.method;
  });
});

if (methodItems.length > 0) {
  methodItems[0].classList.add('selected');
  selectedMethod = methodItems[0].dataset.method;
}

let qrTimerInterval = null;

function startQrTimer() {
  const el = document.getElementById('qr-timer');
  if (!el) return;
  let seconds = 5 * 60;

  function fmt(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  clearInterval(qrTimerInterval);
  qrTimerInterval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(qrTimerInterval);
      el.textContent = '00:00';
      el.style.color = '#DC2626';
      showToast('QR kedaluwarsa. Muat ulang untuk QR baru.', 'error');
      return;
    }
    el.textContent = fmt(seconds--);
  }, 1000);
}

function stopQrTimer() {
  clearInterval(qrTimerInterval);
  const el = document.getElementById('qr-timer');
  if (el) el.textContent = '05:00';
}

const modal = document.getElementById('qr-modal');
const modalClose = document.getElementById('modal-close');
const contentQris = document.getElementById('modal-content-qris');
const contentEwallet = document.getElementById('modal-content-ewallet');
const ewalletTitle = document.getElementById('ewallet-title');

function openModal() {
  if (!selectedMethod) return;

  modal.classList.add('visible');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (selectedMethod === 'qris') {
    contentQris.classList.remove('hidden');
    contentEwallet.classList.add('hidden');
    startQrTimer();
  } else {
    contentQris.classList.add('hidden');
    contentEwallet.classList.remove('hidden');
    ewalletTitle.textContent = `Bayar via ${methodLabels[selectedMethod]}`;
    stopQrTimer();
  }
}

function closeModal() {
  modal.classList.remove('visible');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  stopQrTimer();
}

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

if (modalClose) modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('visible')) closeModal();
});

const btnPay = document.getElementById('btn-pay');
if (btnPay) {
  btnPay.addEventListener('click', () => {
    if (!selectedMethod) {
      showToast('Pilih metode pembayaran terlebih dahulu.', 'info');
      // Shake the method list
      const list = document.querySelector('.method-list');
      list.style.animation = 'shake 0.4s ease';
      setTimeout(() => list.style.animation = '', 400);
      return;
    }
    openModal();
  });
}

const btnConfirmEwallet = document.getElementById('btn-confirm-ewallet');
if (btnConfirmEwallet) {
  btnConfirmEwallet.addEventListener('click', () => {
    btnConfirmEwallet.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="spin">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Memproses...
    `;
    btnConfirmEwallet.disabled = true;

    setTimeout(() => {
      closeModal();
      showSuccessOverlay();
    }, 1800);
  });
}

function simulateQrisPaid() {
  setTimeout(() => {
    if (modal.classList.contains('visible') && selectedMethod === 'qris') {
      closeModal();
      showSuccessOverlay();
    }
  }, 8000);
}

const successOverlay = document.getElementById('success-overlay');
const successMethodEl = document.getElementById('success-method');

function showSuccessOverlay() {
  if (successMethodEl) {
    successMethodEl.textContent = methodLabels[selectedMethod] || 'QRIS';
  }
  successOverlay.classList.add('visible');
  successOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSuccess() {
  successOverlay.classList.remove('visible');
  successOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  showToast('Terima kasih! Selamat parkir. 🏍', 'success');
}

window.closeSuccess = closeSuccess;

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const colors = {
    success: '#10B981',
    error:   '#DC2626',
    info:    '#1A1A2E',
  };

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;

  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%) translateY(-80px)',
    background: colors[type],
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '40px',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
    opacity: '0',
    whiteSpace: 'nowrap',
    maxWidth: '90vw',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
  }));

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(-80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spin {
    animation: spin 0.8s linear infinite;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);

Selesai.addEventListener('click', function() {
    window.location.href = "../halaman-pembayaran-berhasil/index.html";
});