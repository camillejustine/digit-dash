const mainText: string[] = ["", "High Scores", "How to play", "Play"];
const backgroundMusic: HTMLAudioElement = new Audio(
  "./assets/sound/AcidJazz.mp3"
);

// let gameState: string = 'main', 'nameChoice', 'lobby', 'gamePlay', 'highScore'

/**
 * First edition of the welcomeScreen, feel free to change it as you like!
 */
function welcomeScreen() {
  // init volume control
  initVolumeControl();

  saveBotWinsToLS();
  removeBubbles();

  document.body.style.background =
    "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)"; //This needs some adjustment
  document.getElementById("gameMasterWrapper").classList.add("fadeIn");
  document.getElementById(bubbleID[0]).style.visibility = "visible";
  document.getElementById(bubbleID[0]).style.textAlign = "center";
  setElementContent(bubbleTextID[0], "Welcome");
  setTimeout(loadMain, 4000);

  //To be added:
  //"DIGIT DASH" text
  // More smooth transition to next screen(?)s
}
// Use playSound() to add soundeffects
function playSound(volume: number, path: string, id: string) {
  let sound = new Audio(path);
  soundOn ? (sound.volume = volume) : (sound.volume = 0)
  // sound.volume = volume;
  sound.play();
  sound.id = id;
}

function stopSound(path: string) {
  let sound = new Audio(path);
  sound.pause();
}

function loadMain(): void {
  //setTimeout(drawWinnerScreen, 2000)
  document.body.style.background = "white";
  // gameState = 'main';
  for (let index = 0; index < mainText.length; index++) {
    setElementContent(bubbleTextID[index], mainText[index]);
    document.getElementById(bubbleID[index]).style.visibility = "visible";
    document.getElementById(bubbleID[index]).style.textAlign = "center";

    // how to play module
    if (mainText[index] === "How to play") {
      const ruleBubble: HTMLElement = document.getElementById("bubbleBL");
      ruleBubble.classList.add("cursorPointer");
      ruleBubble.style.backgroundImage =
        "url(../assets/imgs/bubbleBL-button.png)";

      ruleBubble.onclick = () => {
        const modal: HTMLElement | null = document.getElementById("ruleModal");
        playSound(0.2, "./assets/sound/load.mp3", "load");
        modal.style.opacity = "1";
        modal.style.visibility = "visible";

        const close: HTMLElement | null = document.getElementById("close");

        close.onclick = () => {
          modal.style.opacity = "0";
          modal.style.visibility = "hidden";
        };
      };
    }

    if (mainText[index] === "Play") {
      const playBubble: HTMLElement = document.getElementById("bubbleBR");
      playBubble.classList.add("cursorPointer");
      playBubble.style.backgroundImage =
        "url(../assets/imgs/bubbleBR-button.png)";
      playBubble.onclick = () => {
        console.log("nameChoice");
        playSound(0.2, "./assets/sound/load.mp3", "PlayLoad");
        backgroundMusic.volume = 0.1;
        backgroundMusic.play();
        removeBubbles();
        nameChoice();
        //gameState = 'nameChoice';
      };
    }

    // high score module
    if (mainText[index] === "High Scores") {
      const highScoresBubble: HTMLElement = document.getElementById("bubbleTR");
      highScoresBubble.classList.add("cursorPointer");
      highScoresBubble.style.backgroundImage =
        "url(../assets/imgs/bubbleTR-button.png)";

      highScoresBubble.onclick = () => {
        const modal: HTMLElement | null = document.getElementById(
          "highScoresModal"
        );
        modal.style.opacity = "1";
        modal.style.visibility = "visible";
        console.log("High score");
        playSound(0.2, "./assets/sound/load.mp3", "highscoreLoad");

        let playerHighScores1 = document.createElement("div");
        playerHighScores1.id = "playerHighScores1";
        document
          .getElementById("playerHighScores")
          .appendChild(playerHighScores1);

        const closeHighScores: HTMLElement | null = document.getElementById(
          "closeHighScores"
        );

        closeHighScores.onclick = () => {
          modal.style.opacity = "0";
          modal.style.visibility = "hidden";
          console.log("close High Score");
        };
      };
    }

    document.getElementById(bubbleID[0]).style.visibility = "hidden";
  }
}

// Function showTot() { SHOW TEXT /VIDEO
function initVolumeControl(){
  let volIcon = document.getElementById('volIcon');
  let noVolIcon = document.getElementById('noVolIcon');

  volIcon.onclick = () => {
    // set icon
    volIcon.classList.add('hideVolIcon');
    noVolIcon.classList.remove('hideVolIcon');
    
    // set sound off
    soundOn = false;
    backgroundMusic.volume = 0;
  }
  noVolIcon.onclick = () => {
    // set icon
    noVolIcon.classList.add('hideVolIcon');
    volIcon.classList.remove('hideVolIcon');

    //set sound on
    soundOn = true;
    backgroundMusic.volume = 0.1;
  }
}
