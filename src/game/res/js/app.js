var doing = false;
var spin = [new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3")];
var coin = [new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3")]
var win = new Audio("res/sounds/win.mp3");
var lose = new Audio("res/sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status")
var info = true;

function checkWalletBalanceAvailability() {
	var walletBalanceBucks = document.getElementById("walletBalanceBucks").innerHTML;
	var walletBalanceCents = document.getElementById("walletBalanceCents").innerHTML;

	if (walletBalanceBucks < 20) {
		alert("Opps! You are out of Balance. Please make a deposit at least of $20.");
		exit();
	} else {
		doSlot();
	}
}

function doSlot(){
	if (doing){return null;}
	doing = true;
	var numChanges = randomInt(1,4)*7
	var numeberSlot1 = numChanges+randomInt(1,7)
	var numeberSlot2 = numChanges+2*7+randomInt(1,7)
	var numeberSlot3 = numChanges+4*7+randomInt(1,7)

	var i1 = 0;
	var i2 = 0;
	var i3 = 0;
	var sound = 0
	status.innerHTML = "SPINNING"
	slot1 = setInterval(spin1, 50);
	slot2 = setInterval(spin2, 50);
	slot3 = setInterval(spin3, 50);
	function spin1(){
		i1++;
		if (i1>=numeberSlot1){
			coin[0].play()
			clearInterval(slot1);
			return null;
		}
		slotTile = document.getElementById("slot1");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin2(){
		i2++;
		if (i2>=numeberSlot2){
			coin[1].play()
			clearInterval(slot2);
			return null;
		}
		slotTile = document.getElementById("slot2");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin3(){
		i3++;
		if (i3>=numeberSlot3){
			coin[2].play()
			clearInterval(slot3);
			testWin();
			return null;
		}
		slotTile = document.getElementById("slot3");
		if (slotTile.className=="a7"){
			slotTile.className = "a0";
		}
		sound++;
		if (sound==spin.length){
			sound=0;
		}
		spin[sound].play();
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
}

function testWin(){
	var slot1 = document.getElementById("slot1").className
	var slot2 = document.getElementById("slot2").className
	var slot3 = document.getElementById("slot3").className

	if ((
		(slot1 == slot2 && slot1 != slot3) ||
		(slot1 == slot3 && slot1 != slot2) ||
		(slot2 == slot3 && slot2 != slot1) ||
		(slot1 == slot2 && slot2 == slot3))){
		status.innerHTML = "YOU WIN!";
		win.play();
		increaseBalance(slot1, slot2, slot3);
	}else{
		status.innerHTML = "YOU LOSE!"
		lose.play();
		decreaseBalance();
	}
	doing = false;
}

function toggleAudio(){
	if (!audio){
		audio = !audio;
		for (var x of spin){
			x.volume = 0.5;
		}
		for (var x of coin){
			x.volume = 0.5;
		}
		win.volume = 1.0;
		lose.volume = 1.0;
	}else{
		audio = !audio;
		for (var x of spin){
			x.volume = 0;
		}
		for (var x of coin){
			x.volume = 0;
		}
		win.volume = 0;
		lose.volume = 0;
	}
	document.getElementById("audio").src = "res/icons/audio"+(audio?"On":"Off")+".png";
}

function randomInt(min, max){
	return Math.floor((Math.random() * (max-min+1)) + min);
}

function increaseBalance(slot1, slot2, slot3) {
	var walletBalanceBucks = document.getElementById("walletBalanceBucks").innerHTML;
	var walletBalanceCents = document.getElementById("walletBalanceCents").innerHTML;

	var amount = walletBalanceBucks+'.'+walletBalanceCents;
	var alteredAmount = parseFloat(amount);
	var amountAfterAdded;

	if (slot1 == "a1" && slot2 == "a1" && slot3 == "a1") {
		amountAfterAdded = alteredAmount * 15;
		 addAmountToWallet(amountAfterAdded);
	} else if (slot1 == "a2" && slot2 == "a2" && slot3 == "a2") {
		amountAfterAdded = alteredAmount * 10;
		 addAmountToWallet(amountAfterAdded);
	} else if (slot1 == "a3" && slot2 == "a3" && slot3 == "a3") {
		amountAfterAdded = alteredAmount * 8;
		 addAmountToWallet(amountAfterAdded);
	} else if (
		(slot1 == "a4" && slot2 == "a4" && slot3 == "a4") || 
		(slot1 == "a5" && slot2 == "a5" && slot3 == "a5") || 
		(slot1 == "a6" && slot2 == "a6" && slot3 == "a6") || 
		(slot1 == "a7" && slot2 == "a7" && slot3 == "a7")
		) {
		amountAfterAdded = alteredAmount * 3;
		 addAmountToWallet(amountAfterAdded);
	} else if ((slot1 == "a1" && slot2 == "a1" && slot3 != "a1") || (slot1 == "a1" && slot2 != "a1" && slot3 == "a1") || (slot1 != "a1" && slot2 == "a1" && slot3 == "a1")) {
		amountAfterAdded = alteredAmount * 2;
		 addAmountToWallet(amountAfterAdded);
	} else if ((slot1 == "a2" && slot2 == "a2" && slot3 != "a2") || (slot1 == "a2" && slot2 != "a2" && slot3 == "a2") || (slot1 != "a2" && slot2 == "a2" && slot3 == "a2")) {
		amountAfterAdded = alteredAmount * 1;
		 addAmountToWallet(amountAfterAdded);
	} else if ((slot1 == "a3" && slot2 == "a3" && slot3 != "a3") || (slot1 == "a3" && slot2 != "a3" && slot3 == "a3") || (slot1 != "a3" && slot2 == "a3" && slot3 == "a3")) {
		amountAfterAdded = alteredAmount * 0.5;
		 addAmountToWallet(amountAfterAdded);
	}
}

function addAmountToWallet(amountAfterAdded) {
	var amountToAdd = amountAfterAdded;
	var realteredAmount = amountToAdd.toString();
	var newAddedAmount = realteredAmount.split(".");
	var newAddedAmountBucks = newAddedAmount[0];
	var newAddedAmountCents = newAddedAmount[1];
	changeIncreasedBalance(newAddedAmountBucks, newAddedAmountCents);
}

function changeIncreasedBalance(newAddedAmountBucks, newAddedAmountCents) {
	var walletBalanceBucks = document.getElementById("walletBalanceBucks");
	var walletBalanceCents = document.getElementById("walletBalanceCents");

	var newAddedAmountCentsNull = "00";
	walletBalanceBucks.innerHTML = newAddedAmountBucks;
	if (newAddedAmountCents == null) {
		walletBalanceCents.innerHTML = newAddedAmountCentsNull;
	} else {
		walletBalanceCents.innerHTML = newAddedAmountCents;
	}

	console.log(newAddedAmountBucks+"."+newAddedAmountCents);
}

function decreaseBalance() {
	var walletBalanceBucks = document.getElementById("walletBalanceBucks").innerHTML;
	var walletBalanceCents = document.getElementById("walletBalanceCents").innerHTML;

	var amount = walletBalanceBucks+'.'+walletBalanceCents;
	var alteredAmount = parseFloat(amount);
	var amountAfterAdded = alteredAmount - 1;
	var realteredAmount = amountAfterAdded.toString();
	var newAddedAmount = realteredAmount.split(".");
	var newAddedAmountBucks = newAddedAmount[0];
	var newAddedAmountCents = newAddedAmount[1];
	changeDecreasedBalance(newAddedAmountBucks, newAddedAmountCents);
}

function changeDecreasedBalance(newAddedAmountBucks, newAddedAmountCents) {
	var walletBalanceBucks = document.getElementById("walletBalanceBucks");
	var walletBalanceCents = document.getElementById("walletBalanceCents");

	var newAddedAmountCentsNull = "00";
	walletBalanceBucks.innerHTML = newAddedAmountBucks;
	if (newAddedAmountCents == null) {
		walletBalanceCents.innerHTML = newAddedAmountCentsNull;
	} else {
		walletBalanceCents.innerHTML = newAddedAmountCents;
	}

	console.log(newAddedAmountBucks+"."+newAddedAmountCents);
}