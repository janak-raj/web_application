const reels = document.querySelectorAll('.reels .reel');
const reelBar = document.querySelectorAll('.reel');
const reelOne = document.getElementById("reelOne");
const spinButton = document.getElementById('spin-button');
const autoSpinButton = document.getElementById('auto-spin-button');
const stopAutoSpinButton = document.getElementById('stop-auto-spin-button');
const maxBetButton = document.getElementById('max-bet-button');
const totalEarnings = document.getElementById('total-earning');
const winningMessage = document.getElementById('winning-message');
const lossMessage = document.getElementById('loss-message');
const availableBalance = document.getElementById('available-balance');
const depositModal = document.getElementById('deposit-modal');
const depositButton = document.getElementById('deposit-button');
const winningPrizeSection = document.querySelector('.winning-prize-section');
const winningPrizeAmount = document.getElementById('winning-prize-amount');
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const outOfBalanceSound = document.getElementById('outOfBalanceSound');
const jackpotSound = document.getElementById('jackpotSound');
const autoSpinSound = document.getElementById('autoSpinSound');
const spinButtonClickSound = document.getElementById('spinButtonClickSound');
const stopButtonClickSound = document.getElementById('stopButtonClickSound');
const backgroundMusic = document.getElementById('backMusic');
const gameWindow = document.getElementById("gameWindow");
let aryNumbers = document.getElementsByClassName("symbol");

gameWindow.addEventListener('mouseover', () => {
    // Play the background music when the button is clicked
    backgroundMusic.play()
        .then(() => {
            console.log('Background music started playing');
        })
        .catch(error => {
            console.error('Error playing background music:', error);
        });
});
let earnings = 0;
let isSpinning = false;
let plays = 0;
const winProbability = 2;
let autoSpinCount = 0; // Initialize the auto-spin counter.
let autoSpinInterval; // Variable to store the auto-spin interval.
let balance = 100;
const maxBetAmount = 10; // Maximum bet amount
const winningPrizeAmountValue = 1000; // Define the winning prize amount
const symbols = ['banana.png', 'big_win.png', 'cherry.png', 'lemon.png', 'melon.png', 'prune.png', 'strawberry.png', 'watermelon.png', 'seven.png'];


// Add this function to start the spinning animation
function startSpinningAnimation() {
    for (let i = 0; i < aryNumbers.length; i++) {
        setTimeout(() => {
            aryNumbers[i].classList.add("roll");
        }, i * 100);
    }
}

// Add this function to stop the spinning animation
function stopSpinningAnimation() {
    for (let i = 0; i < aryNumbers.length; i++) {
        aryNumbers[i].classList.remove("roll");
    }
}

function checkBalance() {
    if (balance + earnings < 1) {
        alert('Deposit Balance Now?');
        spinButton.disabled = true;
        outOfBalanceSound.play(); // Play out of balance sound
    } else {
        spinButton.disabled = false;
    }
}

spinButton.addEventListener('click', () => {
    if (isSpinning) {
        return; // Don't allow spinning while already spinning
    }

    isSpinning = true;
    spinButton.disabled = true;
    winningMessage.innerText = "";
    lossMessage.style.display = "none";
    winningMessage.style.display = "none";

    spinSound.play(); // Play the spinning sound
    spinButtonClickSound.play(); // Play the button click sound
    startSpinningAnimation();

    reels.forEach((reel) => {
        const symbolsInReel = reel.querySelectorAll('.symbol');
        symbolsInReel.forEach((symbol) => {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            symbol.innerHTML = `<img src="src/img/reel_icons/${symbols[randomIndex]}" alt="Symbol">`;
            /*for (let reelIndex = 0; reelIndex < reelBar.length; reelIndex++) {
                if (reelIndex % 2 === 0) {
                    reelBar[reelIndex].style.animation = "roll 4s ease-in-out infinite";
                } else {
                    reelBar[reelIndex].style.animation = "spinAntiClockwise 4s ease-in-out infinite";
                }
            }*/

        });
    });



    setTimeout(() => {
        isSpinning = false;
        spinSound.pause();
        spinButton.disabled = false;
        plays++;
        stopSpinningAnimation();

        if (plays % winProbability === 0) {
            winPrize();
        } else {
            loseGame();
        }
    }, 10000); // Adjust the duration as needed
});

autoSpinButton.addEventListener('click', () => {
    autoSpinButton.style.display = 'none'; // Hide the "Auto Spin" button
    stopAutoSpinButton.style.display = 'inline-block'; // Show the "Stop" button

    autoSpinSound.play(); // Play auto-spin sound

    if (autoSpinCount < 10) { // Check if the auto-spin limit is reached.
        autoSpinCount++;
        autoSpinInterval = setInterval(() => {
            spinButton.click(); // Simulate a click on the "Spin" button for auto-spin.
            if (autoSpinCount >= 10) {
                clearInterval(autoSpinInterval); // Stop auto-spin after reaching the limit.
                stopAutoSpinButton.click(); // Trigger the "Stop" button click to toggle back to "Auto Spin"
            }
        }, 3000); // Adjust the duration as needed
    }
});

stopAutoSpinButton.addEventListener('click', () => {
    stopAutoSpinButton.style.display = 'none'; // Hide the "Stop" button
    autoSpinButton.style.display = 'inline-block'; // Show the "Auto Spin" button
    clearInterval(autoSpinInterval); // Stop auto-spin when the "Stop" button is clicked.
    stopButtonClickSound.play(); // Play the button click sound
});

maxBetButton.addEventListener('click', () => {
    if (balance + earnings >= maxBetAmount) {
        // Set the bet amount to the maximum and spin the reels.
        balance -= maxBetAmount;
        checkBalance(); // Update the balance
        spinButtonClickSound.play(); // Play the button click sound
    }
});

function winPrize() {
    earnings += winningPrizeAmountValue; // Use the defined winning prize amount
    totalEarnings.innerText = earnings;
    lossMessage.style.display = "none";
    winningMessage.style.display = "block";
    winningMessage.innerText = `Congratulations! You've won $${winningPrizeAmountValue}!`;
    checkBalance();
    fillMiddleRow(); // Call the function to fill the middle row
    winSound.play(); // Play the win sound
}

function loseGame() {
    earnings -= 1;
    totalEarnings.innerText = earnings;
    winningMessage.style.display = "none";
    lossMessage.style.display = "block";
    lossMessage.innerText = 'No win this time. Keep playing!';
    balance -= 1; // Decrease the balance by $1 for each loss
    availableBalance.innerHTML = balance;
    checkBalance();
    loseSound.play(); // Play the lose sound
}

checkBalance();

// Add this function to fill all columns of the middle row with a common symbol
function fillMiddleRow() {
    reels.forEach((reel) => {
        var symbolsInMiddleReel = reel.children[1];
        symbolsInMiddleReel.innerHTML = `<img src="src/img/reel_icons/${symbols[1]}" alt="Symbol">`;

    });
}