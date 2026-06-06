const slots = document.querySelectorAll(".slot.available");
const confirmButton = document.getElementById("confirmButton");

confirmButton.addEventListener("click", function() {
    window.location.href = "../halaman-konfirmasi/index.html";
});
const selectedSlotText =
  document.getElementById("selectedSlotText");

slots.forEach(slot => {

  slot.addEventListener("click", () => {

    document.querySelectorAll(".slot")
      .forEach(s => {
        s.classList.remove("active-slot");
        s.classList.remove("selected");
      });

    slot.classList.add("active-slot");
    slot.classList.add("selected");

    const slotName = slot.innerText;

    let zone = "Zona A";

    if(slotName.includes("B")){
      zone = "Zona B";
    }

    selectedSlotText.innerText =
      `${slotName} — ${zone}`;

  });

});