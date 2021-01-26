
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
    setRandomNumber();
    drawBubbles();
    drawActiveBots();
    drawAnswers();
    gameRound();
}

function drawSlider() {
    // Slider
    slider.type = 'range';
    slider.min = '0';
    slider.max = '25';

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

    let botAnswer1 = document.createElement('div');
    botAnswer1.id = 'botAnswer1';
    document.getElementById('answerWrapper').appendChild(botAnswer1);

    let playerAnswer = document.createElement('div');
    playerAnswer.id = 'playerAnswer';
    document.getElementById('answerWrapper').appendChild(playerAnswer);

    let botAnswer2 = document.createElement('div');
    botAnswer2.id = 'botAnswer2';
    document.getElementById('answerWrapper').appendChild(botAnswer2);

}

function drawActiveBots() {

    for (let i = 0; i < chosenBots.length; i++) {
        let element = document.createElement('div');
    element.id = chosenBots[i];
    document.getElementById('botWrapper').appendChild(element);
    }
}

let firstAnswerMade = false;
    let playerAnswerMade = false; 
    let thirdAnswerMade = false; 

function gameRound() {

    if (!firstAnswerMade && !playerAnswerMade && !thirdAnswerMade){
        botAnswer();
        firstAnswerMade = true;
        console.log('answer1')
        gameRound();
    } else if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        playerAnswerMade = true;
        gameLogic();
    } else if (firstAnswerMade && playerAnswerMade && !thirdAnswerMade){
        botAnswer();
        thirdAnswerMade = true;
        console.log('answer2')
        gameRound();
    } else {
    firstAnswerMade = false;
    playerAnswerMade = false; 
    thirdAnswerMade = false; 
    gameRound();
    }

    // for (let i = 0; i < chosenBots.length; i++) {
    //     if (chosenBots[i] === 'Player') {
    //         gameLogic();
        
    //     } else {
    //        botAnswer();
        
    //     }
    // }
}

// function checkGameState() {
//     if (noPlayerWin) {
//         gameRound();
//     }
// }

// function for turns/ order
function botAnswer() {

let botGuessValue: number = Math.floor(Math.random() * (0 + 25) + 0);

if (botGuessValue === randomNumber) {
    // IF GUESS IS CORRECT 
    document.getElementById(bubbleID[0]).style.visibility = "hidden";
    document.getElementById(bubbleID[2]).style.visibility = "hidden";
    document.getElementById(bubbleID[3]).style.visibility = "hidden";
    document.getElementById(bubbleID[1]).style.visibility = "visible";
    setElementContent(bubbleTextID[1], gpPhrases[1]);
    amountOfGuesses++;

} else if (botGuessValue > randomNumber) {
    //IF GUESST IS HIGHER THAN RANDOMNUMB
    document.getElementById(bubbleID[0]).style.visibility = "hidden";
    document.getElementById(bubbleID[1]).style.visibility = "hidden";
    document.getElementById(bubbleID[3]).style.visibility = "hidden";
    document.getElementById(bubbleID[2]).style.visibility = "visible";
    setElementContent(bubbleTextID[2], gpPhrases[2]);
    amountOfGuesses++;


} else if (botGuessValue < randomNumber) {
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

function setRandomNumber() {
    randomNumber = Math.floor(Math.random() * (0 + 25) + 0);
    console.log('number:' + randomNumber);

}

function gameLogic() {
    let guessValue: number;
    // if randomNumber = inputValue, then correct! if randomNumber >/< inputValue, give corresponding respons
    submitBtn.onclick = () => {
        guessValue = parseInt(slider.value);
        console.log('Guess: ' + guessValue);
        console.log('number: ' + randomNumber);

        if (guessValue === randomNumber) {
            // IF GUESS IS CORRECT 
            document.getElementById(bubbleID[0]).style.visibility = "hidden";
            document.getElementById(bubbleID[2]).style.visibility = "hidden";
            document.getElementById(bubbleID[3]).style.visibility = "hidden";
            document.getElementById(bubbleID[1]).style.visibility = "visible";
            setElementContent(bubbleTextID[1], gpPhrases[1]);
            amountOfGuesses++;
            console.log('Correct');

        } else if (guessValue > randomNumber) {
            //IF GUESST IS HIGHER THAN RANDOMNUMB
            document.getElementById(bubbleID[0]).style.visibility = "hidden";
            document.getElementById(bubbleID[1]).style.visibility = "hidden";
            document.getElementById(bubbleID[3]).style.visibility = "hidden";
            document.getElementById(bubbleID[2]).style.visibility = "visible";
            setElementContent(bubbleTextID[2], gpPhrases[2]);
            amountOfGuesses++;
            console.log('Lower!');

        } else if (guessValue < randomNumber) {
            // IF GUESS IS LOWER THAN RANDOMNUMB
            document.getElementById(bubbleID[0]).style.visibility = "hidden";
            document.getElementById(bubbleID[1]).style.visibility = "hidden";
            document.getElementById(bubbleID[2]).style.visibility = "hidden";
            document.getElementById(bubbleID[3]).style.visibility = "visible";
            setElementContent(bubbleTextID[3], gpPhrases[3]);
            amountOfGuesses++;
            console.log('Higher!');
        }

        gameRound();
    }
}