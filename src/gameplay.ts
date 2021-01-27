
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
    console.log(playerAnswerMade)
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
    for (let index = 0; index < chosenBots.length; index++) {
        let answer = document.createElement('div');
        answer.id = `answer${index + 1}`;
        answer.classList.add("answerBubble");
        document.getElementById('answerWrapper').appendChild(answer);
        let answerText = document.createElement('p');
        document.getElementById(`answer${index + 1}`).style.visibility = "visible";
        document.getElementById(`answer${index + 1}`).appendChild(answerText);
    }
}
function updateAnswers(id: string, value: number) {
    document.getElementById(id).innerText = String(value);
    document.getElementById(id).style.visibility = "visible";
}

function hideBubbles(id1: string, id2:string){
   
    document.getElementById(id1).style.visibility = "hidden";
    document.getElementById(id2).style.visibility = "hidden"
    //  if (firstAnswerMade && playerAnswerMade){
    //  document.getElementById('answer1').style.visibility = 'hidden';
    //  } else if (thirdAnswerMade && firstAnswerMade) {

    //  }
    

}

function drawActiveBots() {
    for (let i = 0; i < chosenBots.length; i++) {
        let element = document.createElement('div');
        element.id = chosenBots[i];
        document.getElementById('botWrapper').appendChild(element);
    }
}

let firstAnswerMade: boolean = false;
let playerAnswerMade: boolean = false;
let thirdAnswerMade: boolean = false;
let botGuessValue: number;
let botOneAnswer: number;
let botTwoAnswer: number;
let guessValue: number;

function gameRound() {
    
    if (!firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        botAnswer();
        firstAnswerMade = true;
        botOneAnswer = botGuessValue;
        console.log('answer1');
        updateAnswers('answer1', botOneAnswer);
        //hideBubbles('answer2', 'answer3');
        gameRound();
    } else if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
        playerAnswerMade = true;
        playerGuess();
    } else if (chosenBots.length > 2 && firstAnswerMade && playerAnswerMade && !thirdAnswerMade) {
        botAnswer();
        thirdAnswerMade = true;
        botTwoAnswer = botGuessValue;
        updateAnswers('answer3', botTwoAnswer);
        console.log('answer2');
        //hideBubbles('answer1', 'answer2');
        gameRound();
    } else {
        firstAnswerMade = false;
        playerAnswerMade = false;
        thirdAnswerMade = false;
        gameRound();
    }
}


// function checkGameState() {
//     if (noPlayerWin) {
//         gameRound();
//     }
// }

// function for turns/ order
function botAnswer() {
    botGuessValue = Math.floor(Math.random() * (0 + 25) + 0);
    console.log(botGuessValue)

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

function playerGuess() {
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
        updateAnswers('answer2', guessValue);
        gameRound();
        
        
    }
}