const btnPesan = document.getElementById('btnPesan');

btnPesan.addEventListener('click', function() {
    alert('Slot parkir di UB Gate 3 berhasil dipesan! Silakan pilih kendaraan.');
    window.location.href = "../halaman-pilih-kendaraan/index.html";
});