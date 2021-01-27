
//Variables

//The number you have to guess
let randomNumber: number;
//Gamemaster pharases
const gpPhrases: string[] = ['Lets make a guess!', 'Thats correct!', 'Thats too high!', 'Thats too low!'];
// the slider and its value
const slider: HTMLInputElement = document.createElement('input');
let sliderValue: HTMLParagraphElement = document.createElement('p');
//submit button
const submitBtn: HTMLButtonElement = document.createElement('button');
//number of guesses the players has made 
let amountOfGuesses: number = 0;


function drawGame() {
    chosenBots.splice(1, 0, "Player");
    console.log(chosenBots)
    drawSlider();
    drawBubbles();
    setRandomNumber();
    drawActiveBots();
    drawAnswers();
    gameRound();
}

function drawSlider() {
    // Slider
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';

    //submit btn 
    submitBtn.textContent = 'Guess'

    //Value from slider
    sliderValue.innerText = slider.value;
    sliderValue.id = 'sliderValue';

    // Adds the elements to the wrapper
    inputWrapper.appendChild(slider);
    inputWrapper.appendChild(sliderValue);
    inputWrapper.appendChild(submitBtn);

    //updates the value when you move the slider
    slider.oninput = () => {
        sliderValue.innerText = slider.value;
    }

}


function drawAnswers() {
    for (let index = 0; index < chosenBots.length; index++) {
        let answer = document.createElement('div');
        answer.id = `answer${index + 1}`;
        document.getElementById('answerWrapper').appendChild(answer);
    }
}
function updateAnswers(id: string, value: number) {
    document.getElementById(id).innerText = String(value);
}

function drawActiveBots() {

    for (let i = 0; i < chosenBots.length; i++) {
        let element = document.createElement('div');
        element.id = chosenBots[i];
        document.getElementById('botWrapper').appendChild(element);
    }
}

// vars
let firstAnswerMade: boolean = false;
let playerAnswerMade: boolean = false;
let thirdAnswerMade: boolean = false;
let botGuessValue: number;
let botOneAnswer: number;
let botTwoAnswer: number;
let guessValue: number;
let answerTime: number;

// the logic for how the rounds works---- 
function gameRound() {
    //sets a random number between 2000-4000 to use as timeout time.
    answerTime = Math.floor(Math.random() * (4000 - 2000 + 1000) + 2000);

    //if stat for whos turn it is 
    if (!firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        setTimeout(() => {
            botAnswer(0);
            compareAnswer(botGuessValue, randomNumber);
            firstAnswerMade = true;
            botOneAnswer = botGuessValue;
            console.log('Answer from bot 1');
            updateAnswers('answer1', botOneAnswer);
            gameRound();
        }, answerTime);
    } else if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        playerAnswerMade = true;
        playerGuess();
    } else if (chosenBots.length > 2 && firstAnswerMade && playerAnswerMade && !thirdAnswerMade) {
        setTimeout(() => {
            botAnswer(2);
            thirdAnswerMade = true;
            botTwoAnswer = botGuessValue;
            updateAnswers('answer3', botTwoAnswer);
            gameRound();
        }, answerTime);
        console.log('Asnwer from bot 2')
    } else {
        firstAnswerMade = false;
        playerAnswerMade = false;
        thirdAnswerMade = false;
        gameRound();
    }
}


// Answers from bots 
function botAnswer(index: number) {
    let IQRange: number = checkWhichBot(index);
    console.log('IQRange: ' + IQRange);
    botGuessValue = Math.floor(Math.random() * ((randomNumber - IQRange) + (randomNumber + IQRange)) + 0);
    if (botGuessValue > 100){
        botGuessValue = 100
    } else if (botGuessValue < 0){
        botGuessValue = 100
    }
    console.log('Bot guess: ' + botGuessValue)
}

function checkWhichBot(index: number){
    if (chosenBots[index] === 'Bolt'){
        return 25
    } else if (chosenBots[index] === 'Gadget'){
        return 50
    } else if (chosenBots[index] === 'Clank'){
        return 75
    }
}

//compares the answers that both bots and player gives
function compareAnswer(answer: number, randomNumber: number) {
    if (answer === randomNumber) {
        // IF GUESS IS CORRECT 
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "visible";
        setElementContent(bubbleTextID[1], gpPhrases[1]);
        amountOfGuesses++;

    } else if (answer > randomNumber) {
        //IF GUESST IS HIGHER THAN RANDOMNUMB
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "visible";
        setElementContent(bubbleTextID[2], gpPhrases[2]);
        amountOfGuesses++;


    } else if (answer < randomNumber) {
        // IF GUESS IS LOWER THAN RANDOMNUMB
        document.getElementById(bubbleID[0]).style.visibility = "hidden";
        document.getElementById(bubbleID[1]).style.visibility = "hidden";
        document.getElementById(bubbleID[2]).style.visibility = "hidden";
        document.getElementById(bubbleID[3]).style.visibility = "visible";
        setElementContent(bubbleTextID[3], gpPhrases[3]);
        amountOfGuesses++;
    }
}


function drawBubbles() {
    document.getElementById(bubbleID[0]).style.visibility = "visible";
    setElementContent(bubbleTextID[0], gpPhrases[0]);
}

//sets the random number that the players and bots tries to guess
function setRandomNumber() {
    randomNumber = Math.floor(Math.random() * (0 + 100) + 0);
    console.log('number:' + randomNumber);

}

function playerGuess() {
    // if randomNumber = inputValue, then correct! if randomNumber >/< inputValue, give corresponding response
    submitBtn.onclick = () => {
        guessValue = parseInt(slider.value);
        console.log('Guess: ' + guessValue);
        console.log('number: ' + randomNumber);
        compareAnswer(guessValue, randomNumber);
        updateAnswers('answer2', guessValue);
        clearInterval(timer);
        gameRound();
    }

    //Timer for the player. 
    let timeLeft: number = 10;
    const timer = setInterval(() => {
        timeLeft--;
        console.log('time left: ' + timeLeft);

        if (timeLeft <= 0) {
            guessValue = 0;
            compareAnswer(guessValue, randomNumber);
            updateAnswers('answer2', guessValue);
            gameRound();
            clearInterval(timer);
        }
    }, 1000);
}