"use strict";
window.addEventListener('load', loadMain);
var players = [];
var bubbleTextID = ['textTL', 'textTR', 'textBL', 'textBR'];
var bubbleID = ['bubbleTL', 'bubbleTR', 'bubbleBL', 'bubbleBR'];
var inputWrapper = document.getElementById('inputField');
function setElementContent(id, mainText) {
    var element = document.getElementById(id);
    element.innerHTML = mainText;
}
function removeBubbles() {
    for (var index = 0; index < bubbleID.length; index++) {
        var bubbles = document.getElementById(bubbleID[index]);
        var text = document.getElementById(bubbleTextID[index]);
        bubbles.style.visibility = 'hidden';
        text.innerHTML = '';
    }
}
function setlocalStorage(name) {
}
function lobby() {
    // creates start button
    var button = document.createElement('button');
    button.id = 'startGame';
    document.getElementById('buttonWrapper').appendChild(button);
    console.log('lobby');
    // creates bot players
    var playerBolt = document.createElement('div');
    playerBolt.id = 'playerBolt';
    document.getElementById('botWrapper').appendChild(playerBolt);
    var playerClank = document.createElement('div');
    playerClank.id = 'playerClank';
    document.getElementById('botWrapper').appendChild(playerClank);
    var playerGadget = document.createElement('div');
    playerGadget.id = 'playerGadget';
    document.getElementById('botWrapper').appendChild(playerGadget);
    // start new screen for game start
    button.onclick = function () {
        console.log('knapp');
        button.remove();
        playerBolt.remove();
        playerClank.remove();
        playerGadget.remove();
    };
}
var mainText = ["", "Leaderboards", "How to play", "Play"];
// let gameState: string = 'main', 'nameChoice', 'lobby', 'gamePlay', 'highScore'
function loadMain() {
    // gameState = 'main';
    for (var index = 0; index < mainText.length; index++) {
        setElementContent(bubbleTextID[index], mainText[index]);
        // move to own function???
        if (mainText[index] === "How to play") {
            var ruleBubble = document.getElementById("bubbleBL");
            ruleBubble.onclick = function () {
                var modal = document.getElementById("ruleModal");
                modal.style.opacity = "1";
                modal.style.visibility = "visible";
                var close = document.getElementById("close");
                close.onclick = function () {
                    modal.style.opacity = "0";
                    modal.style.visibility = "hidden";
                };
                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                };
            };
        }
        if (mainText[index] === "Play") {
            var playBubble = document.getElementById("bubbleBR");
            playBubble.onclick = function () {
                console.log("nameChoice");
                removeBubbles();
                nameChoice();
                //gameState = 'nameChoice';
            };
        }
    }
    document.getElementById(bubbleID[0]).style.visibility = "hidden";
}
// Function showTot() { SHOW TEXT /VIDEO  }
var nameInput = document.createElement('input');
function nameChoice() {
    showGreeting();
    showNameInput();
    // init onclick event
    document.getElementById("userInput")
        .addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            var name_1 = nameInput.value;
            var player = {
                name: name_1,
                highScore: 0,
                games: 0
            };
            players.push(player);
            localStorage.setItem(player.name, JSON.stringify(players));
            // render new frame
            removeBubbles();
            nameInput.remove();
            console.log('HALLÅ');
            lobby();
        }
    });
}
var greeting = 'Hi! What is you name?';
function showGreeting() {
    document.getElementById(bubbleID[0]).style.visibility = 'visible';
    setElementContent(bubbleTextID[0], greeting);
}
function showNameInput() {
    nameInput.type = 'text';
    nameInput.id = 'userInput';
    inputWrapper.appendChild(nameInput);
    nameInput.focus();
}
//# sourceMappingURL=index.js.map