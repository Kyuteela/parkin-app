let totalSeconds = 10 * 60;
const timerEl = document.getElementById('timer');
const btnPay = document.getElementById('btnPay');
const btnCancel = document.querySelector('.btn-secondary');


function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return m + ':' + sec;
}

const countdown = setInterval(() => {
  if (totalSeconds <= 0) {
    clearInterval(countdown);
    timerEl.textContent = '00:00';
    timerEl.classList.add('urgent');
    return;
  }
  totalSeconds--;
  timerEl.textContent = formatTime(totalSeconds);
  if (totalSeconds <= 60) timerEl.classList.add('urgent');
}, 1000);

function handlePayment() {
  const btn = document.getElementById('btnPay');
  btn.textContent = 'Memproses...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Lanjutkan Pembayaran';
    btn.disabled = false;
  }, 2000);
}

function openCancelModal() {
  document.getElementById('cancelModal').classList.add('open');
}

function closeCancelModal(e) {
  if (!e || e.target === document.getElementById('cancelModal')) {
    document.getElementById('cancelModal').classList.remove('open');
  }
}

function confirmCancel() {
  document.getElementById('cancelModal').classList.remove('open');
  clearInterval(countdown);
  timerEl.textContent = '--:--';
  timerEl.classList.remove('urgent');
  
  const btnPay = document.getElementById('btnPay');
  btnPay.disabled = true;
  
  const btnCancel = document.querySelector('.btn-secondary');
  btnCancel.textContent = 'Reservasi Dibatalkan';
  btnCancel.style.color = '#E24B4A';
  btnCancel.style.borderColor = 'rgba(226,75,74,0.35)';
  btnCancel.disabled = true;
}

btnPay.addEventListener('click', function() {
    window.location.href = "../halaman-pilih-metode-pembayaran/index.html";
});
