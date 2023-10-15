// Get the modal
var prizeTableModal = document.getElementById("prizeTableModal");

// Get the button that opens the modal
var prizeTableBtn = document.getElementById("prizeTableBtn");

// Get the <span> element that closes the modal
var prizeTableModalCloseBtn = document.getElementsByClassName("close__prizes")[0];

// When the user clicks the button, open the modal 
prizeTableBtn.onclick = function() {
  prizeTableModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
prizeTableModalCloseBtn.onclick = function() {
  prizeTableModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == prizeTableModal) {
    prizeTableModal.style.display = "none";
  }
}