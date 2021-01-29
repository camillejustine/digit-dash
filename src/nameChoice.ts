const nameInput: HTMLInputElement = document.createElement("input");
let lastPlayer: string;

function nameChoice() {
  getLastPlayersName();
  showGreeting();
  showNameInput();
  // init onclick event
  document.getElementById("userInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let name: string = nameInput.value;
      let player = {
        name: name,
        highScore: 0,
        games: 0,
      };
      addToLS(player);
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
  gameMaster.load("https://assets2.lottiefiles.com/private_files/lf30_bqqaxg5n.json");

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
function addToLS(player: Object) {
  if (localStorage.getItem("players")) {
    players = JSON.parse(localStorage.getItem("players"));
  }
  players.push(player);
  localStorage.setItem("players", JSON.stringify(players));
}

/**
 * Gets the latest players name
 */
function getLastPlayersName() {
  if (localStorage.getItem("players") === null) {
    return "";
  } else {
    const players: Array<Object> = JSON.parse(localStorage.getItem("players"));
    const number = players.length - 1; //-1 to get the right indexnumber
    return players[number].name; //Looks like an error but works fine
  }
}
