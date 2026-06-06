const vehicleCards = document.querySelectorAll(".vehicle-card");
const durationButtons = document.querySelectorAll(".duration-btn");

const totalPrice = document.getElementById("totalPrice");
const estimateDetail = document.getElementById("estimateDetail");
const nextButton = document.getElementById('nextButton');

let selectedVehicle = "Motor";
let selectedPrice = 2000;
let selectedHour = 1;

function formatRupiah(number){
  return "Rp " + number.toLocaleString("id-ID");
}

function updatePrice(){

  const total = selectedPrice * selectedHour;

  totalPrice.innerText = formatRupiah(total);

  estimateDetail.innerHTML = `
    ${selectedHour} jam · ${selectedVehicle} <br>
    Belum termasuk denda
  `;
}

vehicleCards.forEach(card => {

  card.addEventListener("click", () => {

    vehicleCards.forEach(c => {
      c.classList.remove("active");
    });

    card.classList.add("active");

    selectedPrice = Number(card.dataset.price);

    selectedVehicle =
      card.querySelector(".vehicle-name").innerText;

    updatePrice();

  });

});

durationButtons.forEach(button => {

  button.addEventListener("click", () => {

    durationButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedHour = Number(button.dataset.hour);

    updatePrice();

  });

});

nextButton.addEventListener("click", function() {
    window.location.href = "../halaman-pilih-slot/index.html";
});