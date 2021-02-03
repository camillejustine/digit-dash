const nameInput: HTMLInputElement = document.createElement("input");
let lastPlayer: string;

function nameChoice() {
  let playerExists: boolean = false;
  showGreeting();
  showNameInput();

  document.getElementById("userInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let name: string = nameInput.value;
      lastPlayer = name;
      localStorage.setItem("lastPlayer", lastPlayer)

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

      // render lobby
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
  nameInput.value = localStorage.getItem("lastPlayer") //Autofills the inputfield with the latest players name
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
