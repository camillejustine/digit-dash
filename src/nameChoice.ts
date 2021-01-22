const nameInput: HTMLInputElement = document.createElement("input");

function nameChoice() {
  showGreeting();
  showNameInput();
  // init onclick event
  document.getElementById("userInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let name: string = nameInput.value;
      const player = {
        name: name,
        highScore: 0,
        games: 0,
      };
      players.push(player);
      localStorage.setItem(player.name, JSON.stringify(players));
      // render new frame

      removeBubbles();
      nameInput.remove();
      console.log("HALLÅ");
      lobby();
    }
  });
}

const greeting: string = "Hi! What's your name?";

function showGreeting() {
  document.getElementById(bubbleID[0]).style.visibility = "visible";
  setElementContent(bubbleTextID[0], greeting);
}
function showNameInput() {
  nameInput.type = "text";
  nameInput.id = "userInput";
  nameInput.autocomplete = "off";
  inputWrapper.appendChild(nameInput);
  nameInput.focus();
}

// Test
