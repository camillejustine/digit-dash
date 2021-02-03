//The number you have to guess
let randomNumber: number;
let lastAnswerGiven: number;
let answerIsHigher: boolean;
//Gamemaster pharases
const gpPhrases: string[] = [
  "Lets make a guess!",
  "Thats correct!",
  "Thats too high!",
  "Thats too low!",
];
// thinkbubble content
const bubblePhrases: string[] = [
  "...",
  "Hmm...",
  "💭💭💭",
  "⚙⚙⚙",
  "🤖🤖🤖",
  "Beep!",
  "Loading...",
  "Computing.",
  "💾💾💾",
  "011011",
];
// slider and its value
const slider: HTMLInputElement = document.createElement("input");

//submit button
const submitBtn: HTMLButtonElement = document.createElement("button");
//number of guesses the players has made
let amountOfGuesses: number = 0;

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
  document.getElementById(
    "answer1"
  ).style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`;
  updateAnswers(
    "answer1",
    bubblePhrases[Math.floor(Math.random() * (0 + bubblePhrases.length) + 0)]
  );
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
  
  inputWrapper.appendChild(submitBtn);
  inputWrapper.style.height = "5rem";

  //updates the value when you move the slider
  slider.oninput = () => {
    document.getElementById("answer2").innerText = slider.value;
  };
}

function drawAnswers() {
  for (let index = 0; index < chosenBots.length; index++) {
    let answer = document.createElement("div");
    answer.id = `answer${index + 1}`;
    answer.classList.add("answerBubble");
    document.getElementById("answerWrapper").appendChild(answer);
    let answerText = document.createElement("p");
    document.getElementById(`answer${index + 1}`).style.visibility = "hidden";
    document.getElementById(`answer${index + 1}`).appendChild(answerText);
  }
  // set slider value to bubble
  document.getElementById("answer2").innerText = slider.value;
}

function updateAnswers(id: string, value: string) {
  document.getElementById(id).innerText = value;
  document.getElementById(id).style.visibility = "visible";
}

//Gets called before every new answer
function hideAnswerBubbles() {
  if (chosenBots.length > 2) {
    document.getElementById("answer1").style.visibility = "hidden";
    document.getElementById("answer2").style.visibility = "hidden";
    document.getElementById("answer3").style.visibility = "hidden";
  } else {
    document.getElementById("answer1").style.visibility = "hidden";
    document.getElementById("answer2").style.visibility = "hidden";
  }
}

function drawActiveBots() {
  for (let i = 0; i < chosenBots.length; i++) {
    let element = document.createElement("div");
    element.id = chosenBots[i];
    document.getElementById("botWrapper").appendChild(element);
    element.style.backgroundImage = `url("../assets/imgs/player${chosenBots[i]}.png")`;
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
let correctGuessMade: boolean;

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
    document.getElementById(
      "answer1"
    ).style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`;

    setTimeout(() => {
      document.getElementById(
        "answer2"
      ).style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`;
      let getRandomNumb = Math.floor(
        Math.random() * (0 + bubblePhrases.length) + 0
      );
      updateAnswers("answer1", bubblePhrases[getRandomNumb]);
    }, 1500);

    setTimeout(() => {
      lastAnswerGiven = botGuessValue;

      document.getElementById(
        "answer1"
      ).style.backgroundImage = `url("../assets/imgs/answerBubble.png")`;
      botAnswer(0);
      firstAnswerMade = true;
      compareAnswer(botGuessValue, randomNumber);
      botOneAnswer = botGuessValue;
      hideAnswerBubbles();
      updateAnswers("answer1", String(botOneAnswer));
      gameRound();
    }, answerTime);

    //player
  } else if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
    document.getElementById(
      "answer2"
    ).style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`;
    updateAnswers("answer2", slider.value);
    slider.disabled = false;
    submitBtn.disabled = false;
    playerGuess();
    playerAnswerMade = true;

    //bot 2
  } else if (
    chosenBots.length > 2 &&
    firstAnswerMade &&
    playerAnswerMade &&
    !thirdAnswerMade
  ) {
    slider.disabled = true;
    submitBtn.disabled = true;
    document.getElementById(
      "answer3"
    ).style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`;

    setTimeout(() => {
      let getRandomNumb = Math.floor(
        Math.random() * (0 + bubblePhrases.length) + 0
      );
      updateAnswers("answer3", bubblePhrases[getRandomNumb]);
    }, 1500);

    setTimeout(() => {
      document.getElementById(
        "answer3"
      ).style.backgroundImage = `url("../assets/imgs/answerBubble.png")`;
      botAnswer(2);
      thirdAnswerMade = true;
      compareAnswer(botGuessValue, randomNumber);
      botTwoAnswer = botGuessValue;
      lastAnswerGiven = botGuessValue;
      hideAnswerBubbles();
      updateAnswers("answer3", String(botTwoAnswer));
      gameRound();
    }, answerTime);
  } else {
    firstAnswerMade = false;
    playerAnswerMade = false;
    thirdAnswerMade = false;
    gameRound();
  }
}

//timer function
function drawTimer(time: number) {
  document.getElementById(bubbleID[0]).style.visibility = "visible";
  setElementContent(bubbleTextID[0], String(time));
}

// Answers from bots
let minGuess: number;
let maxGuess: number;
function botAnswer(index: number) {
  let IQRange: number = checkWhichBot(index);

  if (lastAnswerGiven > randomNumber && lastAnswerGiven < maxGuess) {
    maxGuess = lastAnswerGiven - 1;
  } else if (lastAnswerGiven < randomNumber && lastAnswerGiven > minGuess) {
    minGuess = lastAnswerGiven + 1;
  }

  botGuessValue = Math.floor(
    Math.random() * (randomNumber + IQRange - (randomNumber - IQRange)) +
      (randomNumber - IQRange)
  );
  while (
    botGuessValue > 100 ||
    botGuessValue < 0 ||
    botGuessValue > maxGuess ||
    botGuessValue < minGuess
  ) {
    botGuessValue = Math.floor(
      Math.random() * (randomNumber + IQRange - (randomNumber - IQRange)) +
        (randomNumber - IQRange)
    );
  }

  if (
    (chosenBots[index] === "Gadget" && minGuess + 2 > randomNumber) ||
    maxGuess - 2 < randomNumber
  ) {
    botGuessValue = randomNumber;
  }
}

function checkWhichBot(index: number) {
  if (chosenBots[index] === "Gadget") {
    let x = Math.floor(Math.random() * (20 - 10) + 10);
    return x;
  } else if (chosenBots[index] === "Clank") {
    let x = Math.floor(Math.random() * (60 - 40) + 40);
    return x;
  } else if (chosenBots[index] === "Bolt") {
    let x = Math.floor(Math.random() * (90 - 70) + 70);
    return x;
  }
}

//compares the answers that both bots and player gives
function compareAnswer(answer: number, randomNumber: number) {
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
  } else if (answer > randomNumber) {
    // guess is too high
    document.getElementById(bubbleID[0]).style.visibility = "hidden";
    document.getElementById(bubbleID[1]).style.visibility = "hidden";
    document.getElementById(bubbleID[3]).style.visibility = "hidden";
    document.getElementById(bubbleID[2]).style.visibility = "visible";
    playSound(0.3, "./assets/sound/kitt-sad.mp3");
    setElementContent(bubbleTextID[2], gpPhrases[2]);
    setTimeout(() => {
      document.getElementById(bubbleID[2]).style.visibility = "hidden";
    }, 2000);
  } else if (answer < randomNumber) {
    // guess is too low
    document.getElementById(bubbleID[0]).style.visibility = "hidden";
    document.getElementById(bubbleID[1]).style.visibility = "hidden";
    document.getElementById(bubbleID[2]).style.visibility = "hidden";
    document.getElementById(bubbleID[3]).style.visibility = "visible";
    playSound(0.3, "./assets/sound/kitt-surprised.mp3");
    setElementContent(bubbleTextID[3], gpPhrases[3]);
    setTimeout(() => {
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
  document.getElementById(
    "answer2"
  ).style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`;
  updateAnswers("answer2", slider.value);

  submitBtn.onclick = () => {
    hideAnswerBubbles();
    guessValue = parseInt(slider.value);
    compareAnswer(guessValue, randomNumber);

    lastAnswerGiven = guessValue;
    document.getElementById(
      "answer2"
    ).style.backgroundImage = `url("../assets/imgs/answerBubble.png")`;
    updateAnswers("answer2", String(guessValue));
    clearInterval(timer);
    gameRound();
  };

  //Timer for the player. starts as 11 to give the player the feeling of having 10 full seconds.
  let timeLeft: number = 11;

  function timeCounter() {
    //draws timer with -one sec to get correct time
    drawTimer(timeLeft - 1);
    timeLeft--;


    if (timeLeft <= 0) {
      guessValue = parseInt(slider.value);
      compareAnswer(guessValue, randomNumber);
      hideAnswerBubbles();
      document.getElementById(
        "answer2"
      ).style.backgroundImage = `url("../assets/imgs/answerBubble.png")`;
      lastAnswerGiven = guessValue;
      updateAnswers("answer2", String(guessValue));
      gameRound();
      clearInterval(timer);
    }
  }
  const timer = setInterval(timeCounter, 1000);
  amountOfGuesses++;
}



