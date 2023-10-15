function runGameLoader() {
    gameLoaderTiming = setTimeout(revealGameScreen, 10000);
}

function revealGameScreen() {
    document.getElementById("gameLoader").style.display = "none";
    document.getElementById("window").style.display = "block";
}