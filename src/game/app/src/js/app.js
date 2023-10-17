// Define the frames per second (fps) for animations
var fps = 60;

// Functions for playing different sounds
function reelsSound() {
  var reelsAudio = document.getElementById("reelsSound");
  reelsAudio.play();
}

function winSound() {
  var winAudio = document.getElementById("winSound");
  winAudio.play();
}

function loseSound() {
  var loseAudio = document.getElementById("loseSound");
  loseAudio.play();
}

function winAlertSound() {
  var winAlertAudio = document.getElementById("winAlertSound");
  winAlertAudio.play();
}
// Define game parameters
var availableBalance = 1000;
var winningPrize = 1000;
var playingFee = 1;
var totalEarn = 0;

// Get HTML elements
var availableBalanceElement = document.getElementById("availableBalance");
var winningPrizeElement = document.getElementById("winningPrize");
var playingFeeElement = document.getElementById("playingFee");
var totalEarnElement = document.getElementById("totalEarn");
var spinButton = document.getElementById("spinButton");
var autoSpinButton = document.getElementById("autoSpinButton");
var stopButton = document.getElementById("stopButton");
var maxBetButton = document.getElementById("maxBetButton");

// Function to handle game logic when the "Spin" button is clicked
function spin() {
    if (availableBalance >= playingFee) {
        availableBalance -= playingFee;
        totalEarn += playingFee;

        // Simulate spinning the slot machine
        // Add your existing slot machine code here
        // ...

        // Update UI elements
        availableBalanceElement.textContent = availableBalance;
        totalEarnElement.textContent = totalEarn;
    }
}

// Function to handle game logic when the "Max Bet" button is clicked
function maxBet() {
    if (availableBalance >= playingFee) {
        availableBalance -= playingFee;
        totalEarn += playingFee;

        // Simulate spinning the slot machine with a maximum bet
        // Add your existing slot machine code here
        // ...

        // Update UI elements
        availableBalanceElement.textContent = availableBalance;
        totalEarnElement.textContent = totalEarn;
    }
}

// Add event listeners to buttons
spinButton.addEventListener("click", spin);
maxBetButton.addEventListener("click", maxBet);

// Function to start auto spinning (you can add your auto-spin logic)
function startAutoSpin() {
    // Add your auto-spin logic here
}

// Function to stop auto spinning (you can add your auto-spin stop logic)
function stopAutoSpin() {
    // Add your auto-spin stop logic here
}

// Add event listeners for auto spin and stop buttons
autoSpinButton.addEventListener("click", startAutoSpin);
stopButton.addEventListener("click", stopAutoSpin);


// Define the requestAnimationFrame function for animation loops
window.raf = (function() {
  return requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame || function(c) {
    setTimeout(c, 1000 / fps);
  };
})();

// Define the SlotMachine class
(function() {
  var NAME = "SlotMachine";
  var defaultSettings = {
    width: "600",
    height: "300",
    colNum: 5,
    rowNum: 3,
    winRate: 20,
    autoPlay: false,
    autoSize: false,
    autoPlayTime: 10,
    layout: 'compact',
    handleShow: true,
    handleWidth: 35,
    handleHeight: 30,
    machineBorder: 20,
    machineColor: 'rgba(229,184,11,0.6)',
    names: [
      "seven",
      "lemon",
      "cherry",
      "watermelon",
      "banana",
      "bar",
      "prune",
      "bigwin",
      "orange"
    ]
  };

  var completed = true;
  var isShuffle = true;
  var supportTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  var firstTime = false;
  var nextLoop = null;

  SlotMachine = function(argument) {
    this.init = this.init.bind(this);
    this.run = this.run.bind(this);
    this.addListener = this.addListener.bind(this);
    this.beforeRun = this.beforeRun.bind(this);
    this.afterRun = this.afterRun.bind(this);
    this.showWin = this.showWin.bind(this);
    this.rotateHandle = this.rotateHandle.bind(this);
    this.colArr = [];
    this.options = {};
  }

  // Function to set up before running the SlotMachine
  SlotMachine.prototype.beforeRun = function() {
    if (completed) {
      this.showWin(false);
      completed = false;
      var result = null;
      result = this.options.names[random(this.options.rowNum * 100 / this.options.winRate) | 0];
      for (var i = 0; i < this.options.colNum; i++) {
        this.colArr[i].beforeRun(result);
      }
      this.rotateHandle();
      this.run();
    }
    if (this.options.autoPlay) nextLoop = setTimeout(function() {
      this.beforeRun()
    }.bind(this), this.options.autoPlayTime * 1000);
  }

  // Function to execute after running the SlotMachine
  SlotMachine.prototype.afterRun = function() {
    completed = true;
    var results = [],
      win = true;
    for (var i = 0; i < this.options.colNum; i++) {
      results.push(this.colArr[i].getResult());
      if (i > 0 && results[i] != results[i - 1]) {
        win = false;
        break;
      }
    }
    if (win) {
      winSound();
      winAlertSound();
      this.showWin(true);
      setTimeout(function() {
        this.showWin(false);
      }.bind(this), this.options.autoPlayTime * 1000);
    } else {
      loseSound();
    }
  }

  // Function to simulate rotating the handle
  SlotMachine.prototype.rotateHandle = function() {
    var handle = document.querySelector(".handle");
    if (handle) {
      handle.addClass("active");
      setTimeout(function() {
        handle.removeClass("active");
      }, 1000);
    }
  }

  // Function to start running the SlotMachine
  SlotMachine.prototype.run = function() {
    var done = true;
    for (var i = 0; i < this.options.colNum; i++) {
      done &= this.colArr[i].run();
      reelsSound();
    }
    if (!done) raf(this.run)
    else this.afterRun();
  }

  // Function to show win status
  SlotMachine.prototype.showWin = function(show) {
    var winner = document.querySelector(".winner");
    if (winner) winner.className = show ? "winner active" : "winner";
  }

  // Function to initialize the SlotMachine
  SlotMachine.prototype.init = function() {
    // Reset all
    completed = true;
    clearTimeout(nextLoop);

    // Get settings
    var BannerFlow = arguments[0];
    var settingStyle = "";
    var machine = document.querySelector(".machine");
    var container = document.querySelector(".container");

    machine.style.opacity = 0;

    for (var key in defaultSettings) {
      this.options[key] = defaultSettings[key];
    }

    if (BannerFlow !== undefined) {
      var settings = BannerFlow.settings;
      this.options.winRate = settings.winRate ? settings.winRate : defaultSettings.winRate;
      this.options.autoPlay = settings.autoPlay;
      this.options.colNum = settings.numberColumn ? settings.numberColumn : defaultSettings.colNum;
      this.options.layout = settings.layout ? settings.layout : defaultSettings.layout;
      this.options.machineColor = settings.machineColor ? settings.machineColor : defaultSettings.machineColor;
      this.options.machineBorder = settings.machineBorder >= 0 ? settings.machineBorder : defaultSettings.machineBorder;
      this.options.height = settings.height ? settings.height : defaultSettings.height;
      this.options.width = settings.width ? settings.width : defaultSettings.width;
      this.options.autoSize = settings.autoSize;
      if (this.options.autoSize) {
        this.options.height = window.innerHeight;
        this.options.width = window.innerWidth;
      }
      this.options.handleShow = settings.handleShow;
      this.options.handleWidth = this.options.handleShow ? defaultSettings.handleWidth : 0;
      this.options.autoPlayTime = settings.autoPlayTime ? settings.autoPlayTime : defaultSettings.autoPlayTime;
      this.options.customImage = settings.customImage;
    }

    // Apply settings
    if (this.options.customImage) {
      var urls = BannerFlow.text.strip().split(",");
      this.options.names = [];
      for (var i = 0; i < urls.length; i++) {
        var name = "image-" + i;
        urls[i];
        this.options.names.push(name);
        settingStyle += getStyle("." + name + ":after", {
          "background-image": "url('" + urls[i] + "')"
        });
      }
    }

    settingStyle += getStyle(".machine", {
      "margin-top": (window.innerHeight - this.options.height) / 2 + "px",
      "margin-left": (window.innerWidth - this.options.width) / 2 + "px"
    });

    settingStyle += getStyle(".container", {
      "height": this.options.height + "px",
      "width": this.options.width - this.options.handleWidth + "px",
      "border-width": this.options.machineBorder + "px",
      "border-color": this.options.machineColor + " " + getLighter(this.options.machineColor)
    });

    var winnerSize = 1.2 * Math.max(this.options.height, this.options.width);

    settingStyle += getStyle(".winner:before,.winner:after", {
      "height": winnerSize + "px",
      "width": winnerSize + "px",
      "top": (this.options.height - winnerSize) / 2 - 20 + "px",
      "left": (this.options.width - winnerSize) / 2 - this.options.handleWidth + "px"
    });

    settingStyle += getStyle(".handle", {
      "margin-top": this.options.height / 2 - this.options.handleHeight + "px"
    });

    document.querySelector("#setting").innerHTML = settingStyle;

    // Remove old columns
    if (this.colArr && this.colArr.length > 0)
      for (var i = 0; i < this.colArr.length; i++) {
        container.removeChild(this.colArr[i].getDOM());
      }

    this.colArr = [];

    // Add new columns
    for (var i = 0; i < this.options.colNum; i++) {
      var col = new SlotColumn();
      col.init(this.options.names.slice(0, this.options.rowNum), isShuffle);
      this.colArr.push(col);
      document.querySelector(".container").appendChild(col.getDOM());
    }

    machine.style.opacity = "1";
  }

  // Function to add event listeners
  SlotMachine.prototype.addListener = function() {
    var BannerFlow = arguments[0];
    var timer;
    var that = this;
    var container = document.querySelector(".container");

    if (typeof BannerFlow != 'undefined') {
      // BannerFlow event listeners
      BannerFlow.addEventListener(BannerFlow.RESIZE, function() {
        // clearTimeout(timer);
        // timer = setTimeout(function(){that.init(BannerFlow);that.beforeRun()},500);
      });

      BannerFlow.addEventListener(BannerFlow.CLICK, function() {
        that.beforeRun();
      });
    } else {
      // Window event listeners
      window.addEventListener('resize', function() {
        // clearTimeout(timer);
        // timer = setTimeout(function(){that.init(BannerFlow);that.beforeRun()},500)
      });

      /*
      if (supportTouch) {
        window.addEventListener("touchstart", function() {
          that.beforeRun();
        });
      } else {
        window.addEventListener("click", function() {
          that.beforeRun();
        });
      }
      */
    }

    var slotTrigger = document.querySelector("#slot-trigger");
    if (slotTrigger) {
      slotTrigger.addEventListener("click", function(e) {
        this.addClass('slot-triggerDown');
      })
    }
  }

  window[NAME] = SlotMachine;
})();

// Define the SlotColumn class
(function() {
  var NAME = "SlotColumn";
  SlotColumn = function() {
    this.col = document.createElement("div");
    this.col.className = "col";
    this.init = this.init.bind(this);
    this.run = this.run.bind(this);
    this.beforeRun = this.beforeRun.bind(this);
    this.getResult = this.getResult.bind(this);
    this.getDOM = this.getDOM.bind(this);
    this.arr = [];
    this.colHeight = this.rowHeight = 0;
    this.loop = 2;
  }

  // Initialize the SlotColumn
  SlotColumn.prototype.init = function() {
    this.col.empty();
    this.arr = arguments[0];
    var isShuffle = arguments[1];
    if (isShuffle) shuffle(this.arr);
    for (var i = 0; i < this.arr.length * this.loop; i++) {
      var row = document.createElement("div");
      row.className = "row " + this.arr[i % this.arr.length];
      this.col.appendChild(row);
    }
    this.top = 0;
  }

  // Set up the SlotColumn before running
  SlotColumn.prototype.beforeRun = function() {
    this.halfHeight = this.col.offsetHeight / this.loop;
    this.colHeight = this.col.scrollHeight / 2;
    this.rowHeight = this.colHeight / this.arr.length;
    this.nextResult = arguments[0];
    var next = this.arr.indexOf(this.nextResult);
    if (next == -1) next = random(0, this.arr.length - 1) | 0;
    var s = this.top + (random(2, 10) | 0) * this.colHeight + ((next + 0.5) * this.rowHeight | 0) - this.halfHeight;
    var n = (random(2, 6) | 0) * fps;
    this.speed = 2 * s / (n + 1);
    this.acceleration = this.speed / n;
  }

  // Get the result from the SlotColumn
  SlotColumn.prototype.getResult = function() {
    var result = Math.ceil(((this.halfHeight - this.top) % this.colHeight) / this.rowHeight) - 1;
    return this.arr[result];
  }

  // Run the SlotColumn
  SlotColumn.prototype.run = function() {
    if (this.speed <= 0) return true; // Completed
    this.top = (this.top - this.speed) % this.colHeight;
    this.speed -= this.acceleration;
    this.top %= this.colHeight;
    this.col.style.transform = "translateY(" + this.top + "px)";
    return false; // Not completed
  }

  // Get the DOM element of the SlotColumn
  SlotColumn.prototype.getDOM = function() {
    return this.col;
  }

  window[NAME] = SlotColumn;
})();

// Random number generator within a range
var random = function() {
  var isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  };
  var val = Math.random();
  var arg = arguments;
  return isNumeric(arg[0]) ? isNumeric(arg[1]) ? arg[0] + val * (arg[1] - arg[0]) : val * arg[0] : val;
};

// Shuffle an array
var shuffle = function(arr) {
  var j, tmp;
  for (var i = 0; i < arr.length; i++) {
    j = random(arr.length) | 0;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

// Set CSS3 style for an element
var setStyleCss3 = function(object, key, value) {
  object.style['-webkit-' + key] = value;
  object.style['-moz-' + key] = value;
  object.style['-ms-' + key] = value;
  object.style[key] = value;
}

// Get the name from a URL
var getNameFromUrl = function(url) {
  if (url) {
    var s = url.lastIndexOf("/") + 1,
      e = url.lastIndexOf(".");
    return s < e ? url.substring(s, e) : "";
  }
  return "";
}

// Get style from an object of style properties
var getStyle = function(selector, styleObj) {
  var isAttribute = false;
  var newStyle = selector + "{";
  for (var attr in styleObj) {
    if (styleObj[attr]) {
      isAttribute = true;
      newStyle += attr + " : " + styleObj[attr] + ";";
    }
  }
  newStyle += "}";
  return isAttribute ? newStyle : "";
}

// Get a lighter color from an RGBA color
var getLighter = function(rgba) {
  var o = /[^,]+(?=\))/g.exec(rgba)[0] * 0.75;
  return rgba.replace(/[^,]+(?=\))/g, o);
}

// Remove HTML tags from a text string
if (!String.prototype.strip) {
  String.prototype.strip = function() {
    return this.replace(/(<[^>]+>)/ig, " ").trim();
  }
}

// Remove all child nodes from an element
if (!Node.prototype.empty) {
  Node.prototype.empty = function() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }
}

if (!HTMLElement.prototype.hasClass) {
  Element.prototype.hasClass = function(c) {
    return (" " + this.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + c + " ") > -1;
  }
}

if (!HTMLElement.prototype.addClass) {
  HTMLElement.prototype.addClass = function(c) {
    if (!this.hasClass(c)) this.className += (" " + c);
    return this;
  }
}

if (!HTMLElement.prototype.removeClass) {
  HTMLElement.prototype.removeClass = function(c) {
    if (this.hasClass(c)) this.className = (" " + this.className + " ").replace(" " + c + " ", " ").trim();
    return this;
  }
}

// Main function
var timer, widget = null;
if (typeof BannerFlow != 'undefined') {
  BannerFlow.addEventListener(BannerFlow.SETTINGS_CHANGED, function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      if (widget == null) {
        widget = new SlotMachine();
        widget.addListener(BannerFlow);
      }
      widget.init(BannerFlow);
      widget.beforeRun();
    }, 500);
  });
} else {
  window.addEventListener("load", function(e) {
    if (widget == null) {
      widget = new SlotMachine();
      widget.addListener();
    }
    widget.init();
    widget.beforeRun();
  });
}
