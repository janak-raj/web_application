function getDepositAmount(value) {
	var depositAmount = value;
	//console.log(depositAmount);
}

function checkWalletBalance(depositAmountBucks, depositAmountCents) {
	var walletBalanceBucks = document.getElementById("walletBalanceBucks").innerHTML;
	var walletBalanceCents = document.getElementById("walletBalanceCents").innerHTML;
	var previousWalletBalance = walletBalanceBucks+"."+walletBalanceCents;
	var depositedBalance = depositAmountBucks+"."+depositAmountCents;
	var alteredDepositedBalance = parseFloat(depositedBalance);
	var alteredPreviousWalletBalance = parseFloat(previousWalletBalance);
	var newWalletBalance = alteredPreviousWalletBalance + alteredDepositedBalance;
	var alteredNewWalletBalance = newWalletBalance.toString();
	var newWalletAmount = alteredNewWalletBalance.split(".");
	var newWalletAmountBucks = newWalletAmount[0];
	var newWalletAmountCents = newWalletAmount[1];
	//console.log(walletBalanceBucks+'.'+walletBalanceCents);
	changeWalletBalance(newWalletAmountBucks, newWalletAmountCents);
}

function depositNow(depositAmount) {
	var amountToDeposit = document.getElementById("entry").value;
	//console.log(amountToDeposit);
	const depositAmountPart = amountToDeposit.split(".");
	var depositAmountBucks = depositAmountPart[0];
	var depositAmountCents = depositAmountPart[1];
	//console.log(depositAmountBucks, depositAmountCents);
	checkWalletBalance(depositAmountBucks, depositAmountCents);
	checkWeb3Availability();
	depositModalClose();
}

function changeWalletBalance(newWalletAmountBucks, newWalletAmountCents) {
	var walletBalanceBucks = document.getElementById("walletBalanceBucks");
	var walletBalanceCents = document.getElementById("walletBalanceCents");
	var newWalletAmountCentsNull = "00";
	var walletAmount = newWalletAmountBucks;
	console.log(walletAmount);
	walletBalanceBucks.innerHTML = walletAmount;
	if (newWalletAmountCents == null) {
		walletBalanceCents.innerHTML = newWalletAmountCentsNull;
	} else {
		walletBalanceCents.innerHTML = newWalletAmountCents;
	}
	
}

function depositModalClose() {
	var modal = document.getElementById("depositModal");
	modal.style.display = "none";
}

function checkWeb3Availability() {
	if (typeof web3 === 'undefined') {
		console.log("web3 not installed");
	} else {
		console.log("web3 installed");
	}
}