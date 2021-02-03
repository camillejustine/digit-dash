"use strict";
//The number you have to guess
var randomNumber;
var lastAnswerGiven;
var answerIsHigher;
//Gamemaster pharases
var gpPhrases = [
    "Lets make a guess!",
    "Thats correct!",
    "Thats too high!",
    "Thats too low!",
];
// thinkbubble content
var bubblePhrases = [
    "...",
    "Hmm...",
    "💭💭💭",
    "⚙⚙⚙",
    "🤖🤖🤖",
    "Beep boop!",
    "Loading...",
    "Computing...",
    "💾💾💾",
    "0100100 011011",
];
// slider and its value
var slider = document.createElement("input");
var sliderValue = document.createElement("p");
//submit button
var submitBtn = document.createElement("button");
//number of guesses the players has made
var amountOfGuesses = 0;
function drawGame() {
    minGuess = 0;
    maxGuess = 100;
    correctGuessMade = false;
    chosenBots.splice(1, 0, "Player");
    drawSlider();
    drawBubbles();
    setRandomNumber();
    drawActiveBots();
    drawAnswers();
    document.getElementById("answer1").style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
    updateAnswers("answer1", bubblePhrases[Math.floor(Math.random() * (0 + bubblePhrases.length) + 0)]);
    gameRound();
}
function drawSlider() {
    // Slider
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.id = "rangeSlider";
    slider.disabled = true;
    //submit btn
    submitBtn.textContent = "Guess";
    submitBtn.classList.add("guessBtn");
    submitBtn.disabled = true;
    // Adds the elements to the wrapper
    inputWrapper.appendChild(slider);
    inputWrapper.appendChild(sliderValue);
    inputWrapper.appendChild(submitBtn);
    inputWrapper.style.height = "8rem";
    //updates the value when you move the slider
    slider.oninput = function () {
        document.getElementById("answer2").innerText = slider.value;
    };
}
function drawAnswers() {
    for (var index = 0; index < chosenBots.length; index++) {
        var answer = document.createElement("div");
        answer.id = "answer" + (index + 1);
        answer.classList.add("answerBubble");
        document.getElementById("answerWrapper").appendChild(answer);
        var answerText = document.createElement("p");
        document.getElementById("answer" + (index + 1)).style.visibility = "hidden";
        document.getElementById("answer" + (index + 1)).appendChild(answerText);
    }
    // set slider value to bubble
    document.getElementById("answer2").innerText = slider.value;
}
function updateAnswers(id, value) {
    document.getElementById(id).innerText = value;
    document.getElementById(id).style.visibility = "visible";
}
//Gets called before every new answer
function hideAnswerBubbles() {
    if (chosenBots.length > 2) {
        document.getElementById("answer1").style.visibility = "hidden";
        document.getElementById("answer2").style.visibility = "hidden";
        document.getElementById("answer3").style.visibility = "hidden";
    }
    else {
        document.getElementById("answer1").style.visibility = "hidden";
        document.getElementById("answer2").style.visibility = "hidden";
    }
}
function drawActiveBots() {
    for (var i = 0; i < chosenBots.length; i++) {
        var element = document.createElement("div");
        element.id = chosenBots[i];
        document.getElementById("botWrapper").appendChild(element);
        element.style.backgroundImage = "url(\"../assets/imgs/player" + chosenBots[i] + ".png\")";
    }
}
// vars
var firstAnswerMade = false;
var playerAnswerMade = false;
var thirdAnswerMade = false;
var botGuessValue;
var botOneAnswer;
var botTwoAnswer;
var guessValue;
var answerTime;
var correctGuessMade;
// the logic for how the rounds works
function gameRound() {
    if (correctGuessMade === true) {
        return;
    }
    //sets a random number between 2000-4000 to use as timeout time.
    answerTime = Math.floor(Math.random() * (6000 - 3000 + 1000) + 3000);
    //bot 1
    if (!firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        slider.disabled = true;
        submitBtn.disabled = true;
        submitBtn.style;
        document.getElementById("answer1").style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
        setTimeout(function () {
            document.getElementById("answer2").style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
            var getRandomNumb = Math.floor(Math.random() * (0 + bubblePhrases.length) + 0);
            updateAnswers("answer1", bubblePhrases[getRandomNumb]);
        }, 1500);
        setTimeout(function () {
            lastAnswerGiven = botGuessValue;
            document.getElementById("answer1").style.backgroundImage = "url(\"../assets/imgs/answerBubble.png\")";
            botAnswer(0);
            firstAnswerMade = true;
            compareAnswer(botGuessValue, randomNumber);
            botOneAnswer = botGuessValue;
            hideAnswerBubbles();
            updateAnswers("answer1", String(botOneAnswer));
            gameRound();
        }, answerTime);
        //player
    }
    else if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        document.getElementById("answer2").style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
        updateAnswers("answer2", slider.value);
        slider.disabled = false;
        submitBtn.disabled = false;
        playerGuess();
        playerAnswerMade = true;
        //bot 2
    }
    else if (chosenBots.length > 2 &&
        firstAnswerMade &&
        playerAnswerMade &&
        !thirdAnswerMade) {
        slider.disabled = true;
        submitBtn.disabled = true;
        document.getElementById("answer3").style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
        setTimeout(function () {
            var getRandomNumb = Math.floor(Math.random() * (0 + bubblePhrases.length) + 0);
            updateAnswers("answer3", bubblePhrases[getRandomNumb]);
        }, 1500);
        setTimeout(function () {
            document.getElementById("answer3").style.backgroundImage = "url(\"../assets/imgs/answerBubble.png\")";
            botAnswer(2);
            thirdAnswerMade = true;
            compareAnswer(botGuessValue, randomNumber);
            botTwoAnswer = botGuessValue;
            lastAnswerGiven = botGuessValue;
            hideAnswerBubbles();
            updateAnswers("answer3", String(botTwoAnswer));
            gameRound();
        }, answerTime);
    }
    else {
        firstAnswerMade = false;
        playerAnswerMade = false;
        thirdAnswerMade = false;
        gameRound();
    }
}
//timer function
function drawTimer(time) {
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    setElementContent(bubbleTextID[0], String(time));
}
// Answers from bots
var minGuess;
var maxGuess;
function botAnswer(index) {
    var IQRange = checkWhichBot(index);
    if (lastAnswerGiven > randomNumber && lastAnswerGiven < maxGuess) {
        maxGuess = lastAnswerGiven - 1;
    }
    else if (lastAnswerGiven < randomNumber && lastAnswerGiven > minGuess) {
        minGuess = lastAnswerGiven + 1;
    }
    botGuessValue = Math.floor(Math.random() * (randomNumber + IQRange - (randomNumber - IQRange)) +
        (randomNumber - IQRange));
    while (botGuessValue > 100 ||
        botGuessValue < 0 ||
        botGuessValue > maxGuess ||
        botGuessValue < minGuess) {
        botGuessValue = Math.floor(Math.random() * (randomNumber + IQRange - (randomNumber - IQRange)) +
            (randomNumber - IQRange));
    }
    if ((chosenBots[index] === "Gadget" && minGuess + 2 > randomNumber) ||
        maxGuess - 2 < randomNumber) {
        botGuessValue = randomNumber;
    }
}
function checkWhichBot(index) {
    if (chosenBots[index] === "Gadget") {
        var x = Math.floor(Math.random() * (20 - 10) + 10);
        return x;
    }
    else if (chosenBots[index] === "Clank") {
        var x = Math.floor(Math.random() * (60 - 40) + 40);
        return x;
    }
    else if (chosenBots[index] === "Bolt") {
        var x = Math.floor(Math.random() * (90 - 70) + 70);
        return x;
    }
}
//compares the answers that both bots and player gives
function compareAnswer(answer, randomNumber) {
    if (answer === randomNumber) {
        // correct answer
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "visible";
        setElementContent(bubbleTextID[1], gpPhrases[1]);
        backgroundMusic.pause();
        playSound(0.3, "./assets/sound/kitt-happy.mp3");
        checkWhoWon();
        correctGuessMade = true;
    }
    else if (answer > randomNumber) {
        // guess is too high
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "visible";
        playSound(0.3, "./assets/sound/kitt-sad.mp3");
        setElementContent(bubbleTextID[2], gpPhrases[2]);
        setTimeout(function () {
            document.getElementById(bubbleID[2]).style.visibility = "hidden";
        }, 2000);
    }
    else if (answer < randomNumber) {
        // guess is too low
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "visible";
        playSound(0.3, "./assets/sound/kitt-surprised.mp3");
        setElementContent(bubbleTextID[3], gpPhrases[3]);
        setTimeout(function () {
            document.getElementById(bubbleID[3]).style.visibility = "hidden";
        }, 2000);
    }
}
function drawBubbles() {
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    document.getElementById(bubbleID[0]).classList.remove("cursorPointer");
    document.getElementById(bubbleID[1]).classList.remove("cursorPointer");
    document.getElementById(bubbleID[2]).classList.remove("cursorPointer");
    document.getElementById(bubbleID[3]).classList.remove("cursorPointer");
    setElementContent(bubbleTextID[0], gpPhrases[0]);
    document.getElementById(bubbleID[1]).style.backgroundImage =
        "url(../assets/imgs/bubbleTR.png)";
    document.getElementById(bubbleID[2]).style.backgroundImage =
        "url(../assets/imgs/bubbleBL.png)";
}
//sets the random number that the players and bots tries to guess
function setRandomNumber() {
    randomNumber = Math.floor(Math.random() * (0 + 100) + 0);
    console.log("number:" + randomNumber);
}
function playerGuess() {
    document.getElementById("answer2").style.backgroundImage = "url(\"../assets/imgs/thinkBubble.png\")";
    updateAnswers("answer2", slider.value);
    submitBtn.onclick = function () {
        hideAnswerBubbles();
        guessValue = parseInt(slider.value);
        compareAnswer(guessValue, randomNumber);
        lastAnswerGiven = guessValue;
        document.getElementById("answer2").style.backgroundImage = "url(\"../assets/imgs/answerBubble.png\")";
        updateAnswers("answer2", String(guessValue));
        clearInterval(timer);
        gameRound();
    };
    //Timer for the player. starts as 11 to give the player the feeling of having 10 full seconds.
    var timeLeft = 11;
    function timeCounter() {
        //draws timer with -one sec to get correct time
        drawTimer(timeLeft - 1);
        timeLeft--;
        if (timeLeft <= 0) {
            guessValue = parseInt(slider.value);
            compareAnswer(guessValue, randomNumber);
            hideAnswerBubbles();
            document.getElementById("answer2").style.backgroundImage = "url(\"../assets/imgs/bubbleTR.png\")";
            lastAnswerGiven = guessValue;
            updateAnswers("answer2", String(guessValue));
            gameRound();
            clearInterval(timer);
        }
    }
    var timer = setInterval(timeCounter, 1000);
    amountOfGuesses++;
}
window.addEventListener('load', welcomeScreen);
var BotObjct = /** @class */ (function () {
    function BotObjct() {
    }
    return BotObjct;
}());
;
var PlayerObjct = /** @class */ (function () {
    function PlayerObjct() {
    }
    return PlayerObjct;
}());
var soundOn = true;
var backgroundVol = 0.1;
var gameMaster = document.getElementById("gameMaster");
var players = [];
var bots;
if (localStorage.getItem("bots") == null) {
    bots = [
        { bot: "Clank", wins: 9, gamesPlayed: 20 },
        { bot: "Gadget", wins: 18, gamesPlayed: 20 },
        { bot: "Bolt", wins: 2, gamesPlayed: 20 },
    ];
}
else {
    bots = JSON.parse(localStorage.getItem("bots"));
}
var bubbleTextID = ["textTL", "textTR", "textBL", "textBR"];
var bubbleID = ["bubbleTL", "bubbleTR", "bubbleBL", "bubbleBR"];
var inputWrapper = document.getElementById("inputField");
function setElementContent(id, mainText) {
    var element = document.getElementById(id);
    element.innerHTML = mainText;
}
function removeBubbles() {
    for (var index = 0; index < bubbleID.length; index++) {
        var bubbles = document.getElementById(bubbleID[index]);
        var text = document.getElementById(bubbleTextID[index]);
        bubbles.onclick = function () {
            // reset onclick
        };
        bubbles.style.visibility = "hidden";
        text.innerHTML = "";
    }
}
function removeBubble(bubbleID, textID) {
    document.getElementById(textID).innerHTML = "";
    document.getElementById(bubbleID).style.visibility = "hidden";
}
function showBubble(bubbleID, bubbleTextID, bubbleText) {
    document.getElementById(bubbleID).style.visibility = "visible";
    setElementContent(bubbleTextID, bubbleText);
}
var bubbleText = [
    "Choose your opponents!",
    "You can pick up to two.",
    "Information",
    "Start game",
];
var chosenBots = [];
function lobby() {
    // display bubbles
    showBubble(bubbleID[0], bubbleTextID[0], bubbleText[0]);
    showBubble(bubbleID[3], bubbleTextID[3], bubbleText[1]);
    showBubble(bubbleID[2], bubbleTextID[2], bubbleText[2]);
    document.getElementById("bubbleBR").style.cursor = "default";
    document.getElementById("bubbleBR").style.backgroundImage =
        "url(../assets/imgs/bubbleBR.png)";
    // creates bot players
    var playerBolt = document.createElement("div");
    playerBolt.id = "playerBolt";
    playerBolt.onclick = function () {
        // add or remove bot to array and set img (grey or color)
        checkBotArray("Bolt", playerBolt);
        if (playerBolt.style.backgroundImage !==
            "url(\"../assets/imgs/playerBolt-grey.png\")")
            playSound(0.2, "./assets/sound/bolt-chosen.mp3");
    };
    document.getElementById("botWrapper").appendChild(playerBolt);
    var playerClank = document.createElement("div");
    playerClank.id = "playerClank";
    playerClank.onclick = function () {
        // add or remove bot to array and set img (grey or color)
        checkBotArray("Clank", playerClank);
        if (playerClank.style.backgroundImage !==
            "url(\"../assets/imgs/playerClank-grey.png\")")
            playSound(0.15, "./assets/sound/clank-chosen.mp3");
    };
    document.getElementById("botWrapper").appendChild(playerClank);
    var playerGadget = document.createElement("div");
    playerGadget.id = "playerGadget";
    playerGadget.onclick = function () {
        // add or remove bot to array and set img (grey or color)
        checkBotArray("Gadget", playerGadget);
        if (playerGadget.style.backgroundImage !==
            "url(\"../assets/imgs/playerGadget-grey.png\")")
            playSound(0.1, "./assets/sound/gadget-chosen.mp3");
    };
    document.getElementById("botWrapper").appendChild(playerGadget);
    // bot info click event (show modal)
    var botInfoButton = document.getElementById(bubbleID[2]);
    botInfoButton.onclick = function () {
        drawBotWins();
        var botModal = document.getElementById("botModal");
        botModal.style.opacity = "1";
        botModal.style.visibility = "visible";
        playSound(0.2, "./assets/sound/load.mp3");
        var botClose = document.getElementById("botClose");
        botClose.onclick = function () {
            botModal.style.opacity = "0";
            botModal.style.visibility = "hidden";
        };
    };
    // start new screen for game start
    document.getElementById(bubbleID[1]).onclick = function () {
        document.getElementById("botWrapper");
        playerBolt.remove();
        playerClank.remove();
        playerGadget.remove();
        removeBubbles();
        playSound(0.2, "./assets/sound/load.mp3");
        drawGame();
    };
}
function checkBotArray(bot, botElement) {
    if (chosenBots.indexOf(bot) > -1 || chosenBots.length === 2) {
        // remove bot if same bot is clicked again
        chosenBots = chosenBots.filter(function (b) { return b !== bot; });
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-grey.png\")";
        // removes bubble if no bot chosen
        if (chosenBots.length === 0) {
            removeBubble(bubbleID[1], bubbleTextID[1]);
        }
        else {
            document.getElementById("player" + chosenBots[0]).style.backgroundImage = "url(\"../assets/imgs/player" + chosenBots[0] + "-chosen1.png\")";
        }
    }
    else if (chosenBots.length > 0) {
        // first bot clicked (bot array length is below 2)
        chosenBots.push(bot);
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-chosen2.png\")";
    }
    else if (chosenBots.length > -1 &&
        botElement.style.backgroundImage ===
            "url(\"../assets/imgs/player" + bot + "-chosen2.png\")") {
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-chosen1.png\")";
    }
    else {
        showBubble(bubbleID[1], bubbleTextID[1], bubbleText[3]);
        chosenBots.push(bot);
        botElement.style.backgroundImage = "url(\"../assets/imgs/player" + bot + "-chosen1.png\")";
    }
}
function drawBotWins() {
    var clankWinRate = (bots[0].wins / bots[0].gamesPlayed) * 100;
    var gadgetWinRate = (bots[1].wins / bots[1].gamesPlayed) * 100;
    var boltWinRate = (bots[2].wins / bots[2].gamesPlayed) * 100;
    document.getElementById("clankWins").innerHTML = "Clank has a total win rate of " + clankWinRate.toFixed(1) + "% and currently has " + bots[0].wins + " wins.";
    document.getElementById("gadgetWins").innerHTML = "Gadget has a total win rate of " + gadgetWinRate.toFixed(1) + "% and currently has " + bots[1].wins + " wins.";
    document.getElementById("boltWins").innerHTML = "Bolt has a total win rate of " + boltWinRate.toFixed(1) + "% and currently has " + bots[2].wins + " wins.";
}
var mainText = ["", "High Scores", "How to play", "Play"];
var backgroundMusic = new Audio("./assets/sound/AcidJazz.mp3");
function welcomeScreen() {
    // init volume control
    initVolumeControl();
    initHomeButton();
    saveBotWinsToLS();
    removeBubbles();
    document.body.style.background =
        "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)";
    document.getElementById("gameMasterWrapper").classList.add("fadeIn");
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    document.getElementById(bubbleID[0]).style.textAlign = "center";
    setElementContent(bubbleTextID[0], "Welcome");
    var enterBtn = document.getElementById(bubbleID[3]);
    enterBtn.style.visibility = "visible";
    enterBtn.style.textAlign = 'center';
    enterBtn.style.backgroundImage =
        "url(../assets/imgs/bubbleBR-button.png)";
    enterBtn.classList.add('cursorPointer');
    setElementContent(bubbleTextID[3], "Enter");
    enterBtn.onclick = function () {
        loadMain();
        playSound(0.2, "./assets/sound/load.mp3");
    };
}
function playSound(volume, path) {
    var sound = new Audio(path);
    soundOn ? (sound.volume = volume) : (sound.volume = 0);
    sound.play();
}
function loadMain() {
    backgroundMusic.volume = backgroundVol;
    backgroundMusic.play();
    document.body.style.background = "white";
    for (var index = 0; index < mainText.length; index++) {
        setElementContent(bubbleTextID[index], mainText[index]);
        document.getElementById(bubbleID[index]).style.visibility = "visible";
        document.getElementById(bubbleID[index]).style.textAlign = "center";
        // how to play module
        if (mainText[index] === "How to play") {
            var ruleBubble = document.getElementById("bubbleBL");
            ruleBubble.classList.add("cursorPointer");
            ruleBubble.style.backgroundImage =
                "url(../assets/imgs/bubbleBL-button.png)";
            ruleBubble.onclick = function () {
                var modal = document.getElementById("ruleModal");
                playSound(0.2, "./assets/sound/load.mp3");
                modal.style.opacity = "1";
                modal.style.visibility = "visible";
                var close = document.getElementById("close");
                close.onclick = function () {
                    modal.style.opacity = "0";
                    modal.style.visibility = "hidden";
                };
            };
        }
        if (mainText[index] === "Play") {
            var playBubble = document.getElementById("bubbleBR");
            playBubble.classList.add("cursorPointer");
            playBubble.style.backgroundImage =
                "url(../assets/imgs/bubbleBR-button.png)";
            playBubble.onclick = function () {
                playSound(0.2, "./assets/sound/load.mp3");
                removeBubbles();
                nameChoice();
            };
        }
        // high score module
        if (mainText[index] === "High Scores") {
            var highScoresBubble = document.getElementById("bubbleTR");
            highScoresBubble.classList.add("cursorPointer");
            highScoresBubble.style.backgroundImage =
                "url(../assets/imgs/bubbleTR-button.png)";
            highScoresBubble.onclick = function () {
                var modal = document.getElementById("highScoresModal");
                modal.style.opacity = "1";
                modal.style.visibility = "visible";
                drawHighscoreList();
                playSound(0.2, "./assets/sound/load.mp3");
                var closeHighScores = document.getElementById("closeHighScores");
                closeHighScores.onclick = function () {
                    modal.style.opacity = "0";
                    modal.style.visibility = "hidden";
                };
            };
        }
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
    }
}
function drawHighscoreList() {
    if (localStorage.getItem("players") == null) {
        document.getElementById("emptyHighscore").style.display = "block";
    }
    else {
        document.getElementById("emptyHighscore").style.display = "none";
        var playersLS = JSON.parse(localStorage.getItem("players"));
        //DELETES THE PLAYERS WITH 0 AMOUNT OF GUESSES (meaning they did not win)
        var highscoreList = playersLS.filter(function (item) { return item.amountOfGuesses !== 0; });
        //SORTS THE ARRAY WITH LOWEST AMOUNT OF GUESSES FIRST
        highscoreList.sort(function (a, b) {
            return a.amountOfGuesses - b.amountOfGuesses;
        });
        //DRAW OUT THE PLAYER INFO
        for (var i = 0; i < highscoreList.length; i++) {
            if (i === 3) {
                break;
            }
            document.getElementById("player" + i + "Name").innerHTML =
                highscoreList[i].name;
            document.getElementById("player" + i + "Amount").innerHTML = highscoreList[i].amountOfGuesses.toString();
            document.getElementById("player" + i + "Played").innerHTML = highscoreList[i].gamesPlayed.toString();
        }
    }
}
function initVolumeControl() {
    var volIcon = document.getElementById("volIcon");
    var noVolIcon = document.getElementById("noVolIcon");
    volIcon.onclick = function () {
        // set icon
        volIcon.classList.add("hideVolIcon");
        noVolIcon.classList.remove("hideVolIcon");
        // set sound off
        soundOn = false;
        backgroundVol = 0;
        backgroundMusic.volume = backgroundVol;
    };
    noVolIcon.onclick = function () {
        // set icon
        noVolIcon.classList.add("hideVolIcon");
        volIcon.classList.remove("hideVolIcon");
        //set sound on
        soundOn = true;
        backgroundVol = 0.1;
        backgroundMusic.volume = backgroundVol;
    };
}
function initHomeButton() {
    var homeIcon = document.getElementById("homeIcon");
    homeIcon.onclick = function () {
        location.reload();
    };
}
var nameInput = document.createElement("input");
var lastPlayer;
function nameChoice() {
    var playerExists = false;
    showGreeting();
    showNameInput();
    document.getElementById("userInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var name_1 = nameInput.value;
            lastPlayer = name_1;
            localStorage.setItem("lastPlayer", lastPlayer);
            var players_1 = JSON.parse(localStorage.getItem("players"));
            if (players_1 === null) {
                var player = {
                    name: name_1,
                    amountOfGuesses: 0,
                    gamesPlayed: 0,
                };
                addToLS(player);
            }
            else {
                for (var i = 0; i < players_1.length; i++) {
                    if (players_1[i].name === name_1) {
                        playerExists = true;
                    }
                }
                if (!playerExists) {
                    var player = {
                        name: name_1,
                        amountOfGuesses: 0,
                        gamesPlayed: 0,
                    };
                    addToLS(player);
                }
            }
            // render lobby
            removeBubbles();
            nameInput.remove();
            lobby();
            event.stopImmediatePropagation();
        }
    });
}
var greeting = "What's your name?";
function showGreeting() {
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    setElementContent(bubbleTextID[0], greeting);
    gameMaster.load("https://assets2.lottiefiles.com/private_files/lf30_bqqaxg5n.json");
}
function showNameInput() {
    nameInput.type = "text";
    nameInput.id = "userInput";
    nameInput.autocomplete = "off";
    inputWrapper.appendChild(nameInput);
    nameInput.focus();
    nameInput.value = localStorage.getItem("lastPlayer"); //Autofills the inputfield with the latest players name
}
/**
 * Adds objects to an array in LS
 */
function addToLS(player) {
    if (localStorage.getItem("players")) {
        players = JSON.parse(localStorage.getItem("players"));
    }
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));
}
/** Checks which answer was the right one */
function checkWhoWon() {
    if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        setTimeout(drawWinnerScreen, 1500, chosenBots[0]);
    }
    else if (firstAnswerMade && playerAnswerMade && !thirdAnswerMade) {
        setTimeout(drawWinnerScreen, 1500, chosenBots[1]);
    }
    else if (chosenBots.length > 2 &&
        firstAnswerMade &&
        playerAnswerMade &&
        thirdAnswerMade) {
        setTimeout(drawWinnerScreen, 1500, chosenBots[2]);
    }
}
/** Draws winnermodal and the right lottie-animation */
function drawWinnerScreen(winner) {
    document.getElementById("winner").style.display = "none";
    document.getElementById("playerWinner").style.display = "none";
    var modal = document.getElementById("winnerModal");
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    if (winner === "Gadget") {
        document.getElementById("winner").style.display = "block";
        document.getElementById("winner").load("https://assets6.lottiefiles.com/private_files/lf30_okvpyhqk.json");
        document.getElementById("winnerName").innerHTML = "GADGET WON!";
        addWinToBotStat(1);
    }
    else if (winner === "Clank") {
        document.getElementById("winner").style.display = "block";
        document.getElementById("winner").load("https://assets3.lottiefiles.com/private_files/lf30_mvcyn7ao.json");
        document.getElementById("winnerName").innerHTML = "CLANK WON!";
        addWinToBotStat(0);
    }
    else if (winner === "Bolt") {
        document.getElementById("winner").style.display = "block";
        document.getElementById("winner").load("https://assets5.lottiefiles.com/private_files/lf30_skjhneze.json");
        document.getElementById("winnerName").innerHTML = "BOLT WON!";
        addWinToBotStat(2);
    }
    else if (winner === "Player") {
        updatePlayerStats();
        document.getElementById("playerWinner").style.display = "block";
        document.getElementById("playerWinner").style.backgroundImage = 'url("../assets/imgs/playerPlayer.png")';
        document.getElementById("winnerName").innerHTML = localStorage.getItem("lastPlayer") + ", you won!";
    }
    setTimeout(restartGame, 3500);
    updatePlayerGamesPlayed();
}
//Adds statistics to bot that wins.
function addWinToBotStat(index) {
    localStorage.removeItem("bots");
    bots[index].wins++;
    localStorage.setItem("bots", JSON.stringify(bots));
}
/** Function to restart the game */
function restartGame() {
    hideGamePlay();
    //Hide modal
    var modal = document.getElementById("winnerModal");
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
    //Resets answer round
    firstAnswerMade = false;
    playerAnswerMade = false;
    thirdAnswerMade = false;
    // Loads main-screen
    loadMain();
    //Sets player-counter to 0 again
    return (amountOfGuesses = 0);
}
/** Hides all element from Gameplay */
function hideGamePlay() {
    updateGamesPlayed();
    removeBubbles();
    removeBubble(bubbleID[0], bubbleTextID[0]);
    //Hides inputfield and button
    var inputAndButton = document.getElementById("inputField");
    while (inputAndButton.firstChild) {
        inputAndButton.removeChild(inputAndButton.firstChild);
    }
    // hides the bots
    var bots = document.getElementById("botWrapper");
    while (bots.firstChild) {
        bots.removeChild(bots.firstChild);
    }
    chosenBots = [];
    //hides the answer-bubbles
    var answers = document.getElementById("answerWrapper");
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}
function saveBotWinsToLS() {
    localStorage.setItem("bots", JSON.stringify(bots));
}
/**
 * Updates gamesplayed(in LS) for the bots that was chosen for the round
 */
function updateGamesPlayed() {
    var index1;
    var index2;
    if (chosenBots.length > 2) {
        if (chosenBots[2] === "Bolt") {
            index2 = 2;
        }
        else if (chosenBots[2] === "Gadget") {
            index2 = 1;
        }
        else if (chosenBots[2] === "Clank") {
            index2 = 0;
        }
    }
    if (chosenBots[0] === "Bolt") {
        index1 = 2;
    }
    else if (chosenBots[0] === "Gadget") {
        index1 = 1;
    }
    else if (chosenBots[0] === "Clank") {
        index1 = 0;
    }
    localStorage.removeItem("bots");
    bots[index1].gamesPlayed++;
    if (chosenBots.length > 2) {
        bots[index2].gamesPlayed++;
    }
    localStorage.setItem("bots", JSON.stringify(bots));
}
function updatePlayerGamesPlayed() {
    var playersLS = JSON.parse(localStorage.getItem("players"));
    for (var i = 0; i < playersLS.length; i++) {
        if (playersLS[i].name === lastPlayer) {
            playersLS[i].gamesPlayed++;
            localStorage.setItem("players", JSON.stringify(playersLS));
        }
    }
}
function updatePlayerStats() {
    var playersLS = JSON.parse(localStorage.getItem("players"));
    for (var i = 0; i < playersLS.length; i++) {
        if (playersLS[i].name === lastPlayer) {
            if (playersLS[i].amountOfGuesses > amountOfGuesses || playersLS[i].amountOfGuesses === 0) {
                playersLS[i].amountOfGuesses = amountOfGuesses;
                localStorage.setItem("players", JSON.stringify(playersLS));
            }
        }
    }
}
//# sourceMappingURL=index.js.map