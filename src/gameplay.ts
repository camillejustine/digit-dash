//Variables

//The number you have to guess
let randomNumber: number;
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
  "Beep boop!",
  "Loading...",
  "Computing...",
  "💾💾💾",
  "0100100 011011"
]
// the slider and its value
const slider: HTMLInputElement = document.createElement("input");
let sliderValue: HTMLParagraphElement = document.createElement("p");
//submit button
const submitBtn: HTMLButtonElement = document.createElement("button");
//number of guesses the players has made
let amountOfGuesses: number = 0;

function drawGame() {

  chosenBots.splice(1, 0, "Player");
  drawSlider();
  drawBubbles();
  setRandomNumber();
  drawActiveBots();
  drawAnswers();
  document.getElementById('answer1').style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`
  updateAnswers('answer1', bubblePhrases[Math.floor(Math.random() * (0 + bubblePhrases.length) + 0)]);
  gameRound();
  //   hideAnswerBubbles();
}

function drawSlider() {

  // Slider
  slider.type = 'range';
  slider.min = '0';
  slider.max = '100';
  slider.id = 'rangeSlider'
  slider.disabled = true;



  //submit btn
  submitBtn.textContent = "Guess";
  submitBtn.classList.add('guessBtn');
  submitBtn.disabled = true;
  //Value from slider
  //   sliderValue.innerText = slider.value;
  //   sliderValue.id = "sliderValue";

  // target bubble instead




  // Adds the elements to the wrapper
  inputWrapper.appendChild(slider);
  inputWrapper.appendChild(sliderValue);
  inputWrapper.appendChild(submitBtn);

  //updates the value when you move the slider
  slider.oninput = () => {
    document.getElementById('answer2').innerText = slider.value;
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
  document.getElementById('answer2').innerText = slider.value;
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

// the logic for how the rounds works----
function gameRound() {

  //sets a random number between 2000-4000 to use as timeout time.
  answerTime = Math.floor(Math.random() * (6000 - 3000 + 1000) + 3000);

  //if stat for whos turn it is 
  if (!firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {

    slider.disabled = true;
    submitBtn.disabled = true;
    submitBtn.style

    setTimeout(() => {
      let getRandomNumb = Math.floor(Math.random() * (0 + bubblePhrases.length) + 0)
      document.getElementById('answer1').style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`
      updateAnswers('answer1', bubblePhrases[getRandomNumb]);
    }, 1500)

    setTimeout(() => {
      document.getElementById('answer1').style.backgroundImage = `url("../assets/imgs/bubbleTR.png")`
      botAnswer(0);
      firstAnswerMade = true;
      compareAnswer(botGuessValue, randomNumber);
      botOneAnswer = botGuessValue;
      hideAnswerBubbles();
      // console.log('Answer from bot 1');
      updateAnswers('answer1', String(botOneAnswer));
      gameRound();
    }, answerTime);



  } else if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {

    slider.disabled = false;
    submitBtn.disabled = false;
    playerGuess();
    playerAnswerMade = true;

  } else if (chosenBots.length > 2 && firstAnswerMade && playerAnswerMade && !thirdAnswerMade) {

    slider.disabled = true;
    submitBtn.disabled = true;

    setTimeout(() => {
      let getRandomNumb = Math.floor(Math.random() * (0 + bubblePhrases.length) + 0)
      document.getElementById('answer3').style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`
      updateAnswers('answer3', bubblePhrases[getRandomNumb]);
    }, 1500)


    setTimeout(() => {
      document.getElementById('answer3').style.backgroundImage = `url("../assets/imgs/bubbleTR.png")`
      botAnswer(2);
      thirdAnswerMade = true;
      compareAnswer(botGuessValue, randomNumber);
      botTwoAnswer = botGuessValue;
      hideAnswerBubbles();
      updateAnswers('answer3', String(botTwoAnswer));
      gameRound();
    }, answerTime);
    // console.log('Asnwer from bot 2')

  } else {

    firstAnswerMade = false;
    playerAnswerMade = false;
    thirdAnswerMade = false;
    gameRound();

  }
}

function drawTimer(time: number) {
  document.getElementById(bubbleID[0]).style.visibility = "visible";
  setElementContent(bubbleTextID[0], String(time));
}

// Answers from bots
function botAnswer(index: number) {
  let IQRange: number = checkWhichBot(index);
  //   console.log("IQRange: " + IQRange);
  botGuessValue = Math.floor(
    Math.random() * (randomNumber - IQRange + (randomNumber + IQRange)) + 0
  );

  while (botGuessValue > 100 || botGuessValue < 0) {
    botGuessValue = Math.floor(
      Math.random() * (randomNumber - IQRange + (randomNumber + IQRange)) + 0
    );
  }
}

function checkWhichBot(index: number) {
  if (chosenBots[index] === "Bolt") {
    return 25;
  } else if (chosenBots[index] === "Gadget") {
    return 50;
  } else if (chosenBots[index] === "Clank") {
    return 75;
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
    checkWhoWon();
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
  console.log("number:" + randomNumber);
}

function playerGuess() {
  // if randomNumber = inputValue, then correct! if randomNumber >/< inputValue, give corresponding response
  // setTimeout(() => {
    document.getElementById('answer2').style.backgroundImage = `url("../assets/imgs/thinkBubble.png")`
    updateAnswers('answer2', slider.value);
  // }, 1000);

  submitBtn.onclick = () => {
    hideAnswerBubbles();
    guessValue = parseInt(slider.value);
    console.log("Guess: " + guessValue);
    console.log("number: " + randomNumber);
    compareAnswer(guessValue, randomNumber);
    document.getElementById('answer2').style.backgroundImage = `url("../assets/imgs/bubbleTR.png")`
    updateAnswers("answer2", String(guessValue));
    clearInterval(timer);
    gameRound();
  };

  //Timer for the player.
  let timeLeft: number = 11;

  function timeCounter() {
    drawTimer(timeLeft - 1);
    timeLeft--;
    console.log("time left: " + timeLeft);

    if (timeLeft <= 0) {
      guessValue = parseInt(slider.value);
      compareAnswer(guessValue, randomNumber);
      hideAnswerBubbles();
      document.getElementById('answer2').style.backgroundImage = `url("../assets/imgs/bubbleTR.png")`
      updateAnswers("answer2", String(guessValue));
      gameRound();
      clearInterval(timer);
    }
  }
  const timer = setInterval(timeCounter, 1000);
}
