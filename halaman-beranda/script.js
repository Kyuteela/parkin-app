const cardGate3 = document.getElementById('cardGate3');
const cardPujas = document.getElementById('cardPujas');
const mapMarkerGate3 = document.querySelector('.marker-gate3');
const mapMarkerPujas = document.querySelector('.marker-pujas');

function goToDetailPage() {
    window.location.href = "../halaman-detail-lokasi/index.html";
}

cardGate3.addEventListener('click', goToDetailPage);
cardPujas.addEventListener('click', goToDetailPage);

mapMarkerGate3.addEventListener('click', goToDetailPage);
mapMarkerPujas.addEventListener('click', goToDetailPage);