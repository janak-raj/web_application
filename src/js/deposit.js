const depositButton = document.getElementById('depositButton');
const depositModal = document.getElementById('depositModal');
const confirmDeposit = document.getElementById('confirmDeposit');
const cancelDeposit = document.getElementById('cancelDeposit');

depositButton.addEventListener('click', () => {
  depositModal.style.display = 'block';
});

confirmDeposit.addEventListener('click', () => {
  // Handle the deposit confirmation
  depositModal.style.display = 'none';
});

cancelDeposit.addEventListener('click', () => {
  depositModal.style.display = 'none';
});