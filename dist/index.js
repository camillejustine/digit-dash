"use strict";
window.addEventListener('load', welcomeScreen);
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
function fadeIn(id) {
    var element = document.getElementById(id);
    element.style.opacity = "0";
    element.classList.add('fadeIn');
}
//Global function to show bubbles? 
function showBubble(bubbleID, bubbleTextID, bubbleText) {
    document.getElementById(bubbleID).style.visibility = "visible";
    setElementContent(bubbleTextID, bubbleText);
}
var bubbleText = ['Choose your opponents!', 'You can pick up to 2.', 'Bot info'];
var botInfo = [
    {
        name: 'Bolt',
        text: 'Bolt is a friendly, but slow, machine.',
        winRate: '8%',
        img: '../assets/imgs/playerBolt.png'
    },
    {
        name: 'Clank',
        text: 'Clank is a happy and pretty fast machine.',
        winRate: '4%',
        img: '../assets/imgs/playerClank.png'
    },
    {
        name: 'Gadget',
        text: 'Gadget is a cranky, although very fast, machine.',
        winRate: '22%',
        img: '../assets/imgs/playerGadget.png'
    }
];
function lobby() {
    // display bubbles
    showBubble(bubbleID[0], bubbleTextID[0], bubbleText[0]);
    showBubble(bubbleID[3], bubbleTextID[3], bubbleText[1]);
    showBubble(bubbleID[2], bubbleTextID[2], bubbleText[2]);
    // creates start button
    var button = document.createElement('button');
    button.id = 'startGame';
    button.textContent = 'Play';
    document.getElementById('buttonWrapper').appendChild(button);
    // Bot info
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
    // bot info click event
    var botInfoButton = document.getElementById(bubbleID[2]);
    botInfoButton.onclick = function () {
        console.log("BOT INFO CLICK!");
        var botModal = document.getElementById("botModal");
        console.log(botModal);
        botModal.style.opacity = "1";
        botModal.style.visibility = "visible";
        var botClose = document.getElementById("botClose");
        botClose.onclick = function () {
            botModal.style.opacity = "0";
            botModal.style.visibility = "hidden";
        };
    };
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
/**
 * First edition of the welcomeScreen, feel free to change it as you like!
 */
function welcomeScreen() {
    removeBubbles();
    document.body.style.background = "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)"; //This needs some adjustment
    document.getElementById("gameMasterWrapper").classList.add('fadeIn');
    document.getElementById(bubbleID[0]).style.visibility = 'visible';
    setElementContent(bubbleTextID[0], "Welcome");
    setTimeout(loadMain, 4000);
    //To be added:
    //"DIGIT DASH" text
    // More smooth transition to next screen(?)s
}
function loadMain() {
    document.body.style.background = "white";
    // gameState = 'main';
    for (var index = 0; index < mainText.length; index++) {
        setElementContent(bubbleTextID[index], mainText[index]);
        document.getElementById(bubbleID[index]).style.visibility = 'visible';
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
                // TO DO: make background close modal on click
                // window.onclick = (event: Event) => {
                //   if (event.target === modal) {
                //     modal.style.visibility = "hidden";
                //   }
                // };
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
var nameInput = document.createElement("input");
function nameChoice() {
    showGreeting();
    showNameInput();
    // init onclick event
    document.getElementById("userInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var name_1 = nameInput.value;
            var player = {
                name: name_1,
                highScore: 0,
                games: 0,
            };
            players.push(player);
            localStorage.setItem(player.name, JSON.stringify(players));
            // render new frame
            removeBubbles();
            nameInput.remove();
            console.log("HALLÅ");
            lobby();
        }
    });
}
var greeting = "Hi! What's your name?";
function showGreeting() {
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    setElementContent(bubbleTextID[0], greeting);
}
function showNameInput() {
    nameInput.type = "text";
    nameInput.id = "userInput";
    nameInput.autocomplete = "off";
    inputWrapper.appendChild(nameInput);
    nameInput.focus();
}
// Test
//# sourceMappingURL=index.js.map