/** Checks which answer was the right one */
function checkWhoWon() {
  if (firstAnswerMade && !playerAnswerMade && !thirdAnswerMade) {
    setTimeout(drawWinnerScreen, 1500, chosenBots[0]);
  } else if (firstAnswerMade && playerAnswerMade && !thirdAnswerMade) {
    setTimeout(drawWinnerScreen, 1500, chosenBots[1]);
  } else if (chosenBots.length > 2 && firstAnswerMade && playerAnswerMade && thirdAnswerMade) {
    setTimeout(drawWinnerScreen, 1500, chosenBots[2]);
  }
}

/** Draws winnermodal and the right lottie-animation */
function drawWinnerScreen(winner: string) {
  document.getElementById("winner").style.display = "none";
  document.getElementById("playerWinner").style.display = "none";

  const modal: HTMLElement | null = document.getElementById("winnerModal");
  modal.style.opacity = "1";
  modal.style.visibility = "visible";

  if (winner === "Gadget") {
    document.getElementById("winner").style.display = "block";
    document.getElementById("winner").load("https://assets6.lottiefiles.com/private_files/lf30_okvpyhqk.json");
    document.getElementById("winnerName").innerHTML = "GADGET WON!";
    addWinToBotStat(1);
  } else if (winner === "Clank") {
    document.getElementById("winner").style.display = "block";
    document.getElementById("winner").load("https://assets3.lottiefiles.com/private_files/lf30_mvcyn7ao.json");
    document.getElementById("winnerName").innerHTML = "CLANK WON!";
    addWinToBotStat(0);
  } else if (winner === "Bolt") {
    document.getElementById("winner").style.display = "block";
    document.getElementById("winner").load("https://assets5.lottiefiles.com/private_files/lf30_skjhneze.json");
    document.getElementById("winnerName").innerHTML = "BOLT WON!";
    addWinToBotStat(2);
  } else if (winner === "Player") {
    updatePlayerStats();
    document.getElementById("playerWinner").style.display = "block";
    document.getElementById("playerWinner").style.backgroundImage =('url("../assets/imgs/playerPlayer.png")');
    document.getElementById("winnerName").innerHTML =
      getPlayerName() + ", you won!";
  }

  setTimeout(restartGame, 3500);
}

//Adds statistics to bot that wins.
function addWinToBotStat(index: number) {
  localStorage.removeItem("bots");
  bots[index].wins++;
  localStorage.setItem("bots", JSON.stringify(bots));
}

/** Function to restart the game */
function restartGame() {
  hideGamePlay();
  //Hide modal
  const modal: HTMLElement | null = document.getElementById("winnerModal");
  modal.style.opacity = "0";
  modal.style.visibility = "hidden";
  
  //Resets answer round
   firstAnswerMade = false;
   playerAnswerMade = false;
   thirdAnswerMade = false;
  
  // Loads main-screen
  loadMain();
  //Sets player-counter to 0 again
  return amountOfGuesses = 0;
}

/** Hides all element from Gameplay */
function hideGamePlay() {
  updateGamesPlayed();
  removeBubbles();
  removeBubble(bubbleID[0] , bubbleTextID[0])
  //Hides inputfield and button
  let inputAndButton = document.getElementById("inputField");
  while (inputAndButton.firstChild)
    inputAndButton.removeChild(inputAndButton.firstChild);
  // hides the bots
  let bots = document.getElementById("botWrapper");
  while (bots.firstChild) bots.removeChild(bots.firstChild);
  chosenBots = [];
  //hides the answer-bubbles
  let answers = document.getElementById("answerWrapper");
  while (answers.firstChild) answers.removeChild(answers.firstChild);
}

/** Gets most recent player from localStorage */
function getPlayerName() {
  const players: Array<Object> = JSON.parse(localStorage.getItem("players"));
  const number = players.length - 1; //-1 to get the right indexnumber
  return players[number].name; //Looks like an error but works fine
}

function saveBotWinsToLS() {
  localStorage.setItem("bots", JSON.stringify(bots));
}

/**
 * Updates gamesplayed(in LS) for the bots that was chosen for the round
 */
function updateGamesPlayed(){
  let index1;
  let index2;

   if (chosenBots.length > 2){
     if (chosenBots[2] === "Bolt"){
       index2 = 2;
     }else if (chosenBots[2] === "Gadget"){
       index2 = 1;
     }else if (chosenBots[2] === "Clank"){
       index2 = 0;
     }
   }

   if (chosenBots[0] === "Bolt"){
     index1 = 2;
   } else if (chosenBots[0] === "Gadget"){
     index1 = 1;
   } else if (chosenBots[0] === "Clank"){
     index1 = 0;
   }

   localStorage.removeItem("bots");
   bots[index1].gamesPlayed++;
   if (chosenBots.length > 2){
   bots[index2].gamesPlayed++;
  }
   localStorage.setItem("bots", JSON.stringify(bots));
}

function updatePlayerStats() {
const players: Array<PlayerObjct> = JSON.parse(localStorage.getItem("players"));
const number = players.length - 1; //-1 to get the right indexnumber

//Replaces the object with a new object with same name but updated ''amountofGuesses''
players.splice(number, 1, {name: getPlayerName(), amountOfGuesses: amountOfGuesses})
localStorage.setItem("players", JSON.stringify(players));

}