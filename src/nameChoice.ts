const nameInput: HTMLInputElement = document.createElement("input");
let lastPlayer: string;


function nameChoice() {
  let playerExists: boolean = false;
  getLastPlayersName();
  showGreeting();
  showNameInput();
  // init onclick event
  document.getElementById("userInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let name: string = nameInput.value;
      lastPlayer = name;
      let players = JSON.parse(localStorage.getItem("players"));
      if (players === null) {
        let player: PlayerObjct = {
          name: name,
          amountOfGuesses: 0,
          gamesPlayed: 0,
        };
        addToLS(player);
      } else {
        for (let i = 0; i < players.length; i++) {
          if (players[i].name === name) {
            playerExists = true;
          }
        }

        if (!playerExists) {
          let player: PlayerObjct = {
            name: name,
            amountOfGuesses: 0,
            gamesPlayed: 0,
          };
          addToLS(player);
        }
      }
      // render new frame
      removeBubbles();
      nameInput.remove();
      lobby();
      event.stopImmediatePropagation();
    }
  });
}

const greeting: string = "What's your name?";

function showGreeting() {
  document.getElementById(bubbleID[0]).style.visibility = "visible";
  setElementContent(bubbleTextID[0], greeting);
  gameMaster.load(
    "https://assets2.lottiefiles.com/private_files/lf30_bqqaxg5n.json"
  );
}

function showNameInput() {
  nameInput.type = "text";
  nameInput.id = "userInput";
  nameInput.autocomplete = "off";
  inputWrapper.appendChild(nameInput);
  nameInput.focus();
  nameInput.value = getLastPlayersName(); //Autofills the inputfield with the latest players name
}

/**
 * Adds objects to an array in LS
 */
function addToLS(player: PlayerObjct) {
  if (localStorage.getItem("players")) {
    players = JSON.parse(localStorage.getItem("players"));
  }
  players.push(player);
  localStorage.setItem("players", JSON.stringify(players));
}



/**
 * Gets the latest players name to put as autofill in the inputfield.
 * ONLY WORKS IF YOU DONT RELOAD THE PAGE/ PRESS HOME BUTTON
 */
function getLastPlayersName() {
  if (lastPlayer === undefined) {
    return "";
  } else {
    return lastPlayer;
  }
}
