// Get the modal
var depositModal = document.getElementById("depositModal");

// Get the button that opens the modal
var depositModalBtn = document.getElementById("depBtn");

// Get the <span> element that closes the modal
var depositModalClose = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
depositModalBtn.onclick = function() {
  depositModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
depositModalClose.onclick = function() {
  depositModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == depositModal) {
    depositModal.style.display = "none";
  }
}