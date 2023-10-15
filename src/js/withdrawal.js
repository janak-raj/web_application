const withdrawalButton = document.getElementById('withdrawButton');
const modal = document.getElementById('withdrawalModal');
const confirmWithdraw = document.getElementById('confirmWithdraw');
const cancelWithdraw = document.getElementById('cancelWithdraw');

withdrawalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

confirmWithdraw.addEventListener('click', () => {
  // Handle withdrawal confirmation
  modal.style.display = 'none';
});

cancelWithdraw.addEventListener('click', () => {
  // Handle cancellation
  modal.style.display = 'none';
});