const sideNavigationPanel = document.getElementById("mySidenav");
const toggleButton = document.getElementById("toggleSidebar");
var click = 0;

toggleButton.addEventListener("click", trackClicks);

function trackClicks() {
  click++;
  toggleSideNavigation(click)
}

function toggleSideNavigation(click) {
  if (click % 2 === 0) {
    sideNavigationPanel.style.width = "0";
    sideNavigationPanel.style.paddingLeft = "0";
    sideNavigationPanel.style.paddingRight = "0";
  } else {
    sideNavigationPanel.style.width = "250px";
    sideNavigationPanel.style.paddingLeft = "10px";
    sideNavigationPanel.style.paddingRight = "10px";
  }
}

function toggleCalculator(id) {
  var estimatorArea, card, rate, days;

  card = document.getElementById(id);
  rate = card.children[4].children[0].innerText;
  days = card.children[3].children[0].innerText;

  const estimator = document.getElementById("estimator");
  const calculateButton = document.getElementById("estimateEarning");

  const givenId = id;

  // Use a regular expression to match and extract numbers from the string
  const numbersArray = givenId.match(/\d+/g);

  // numbersArray will contain all the numbers found in the string
  if (numbersArray) {
    numbersArray.forEach((number, index) => {
      estimatorArea = document.getElementById("estimatorArea" + number);
      estimatorArea.appendChild(estimator);
      estimator.style.display = "flex";
    });
  }

  calculateButton.onclick = function () {
    var investmentAmount = estimator.children[0].children[0].children[2].children[1].value;
    var estimatedEarning = investmentAmount * (+rate / 100);
    var earningAmountElem = estimator.children[0].children[1].children[1].children[1];
    earningAmountElem.value = +investmentAmount + +estimatedEarning;
  };
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}



