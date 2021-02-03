const mainText: string[] = ["", "High Scores", "How to play", "Play"];
const backgroundMusic: HTMLAudioElement = new Audio(
  "./assets/sound/AcidJazz.mp3"
);

/**
 * First edition of the welcomeScreen, feel free to change it as you like!
 */
function welcomeScreen() {
  // init volume control
  initVolumeControl();
  initHomeButton();
  saveBotWinsToLS();
  removeBubbles();

  document.body.style.background =
    "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)"; //This needs some adjustment
  document.getElementById("gameMasterWrapper").classList.add("fadeIn");
  document.getElementById(bubbleID[0]).style.visibility = "visible";
  document.getElementById(bubbleID[0]).style.textAlign = "center";
  setElementContent(bubbleTextID[0], "Welcome");

  const enterBtn: HTMLElement = document.getElementById(bubbleID[3]);

  enterBtn.style.visibility = "visible";
  enterBtn.style.textAlign = 'center';
  enterBtn.style.backgroundImage =
    "url(../assets/imgs/bubbleBR-button.png)";
    enterBtn.classList.add('cursorPointer');
  setElementContent(bubbleTextID[3], "Enter");

  enterBtn.onclick = () => {
    loadMain();

    playSound(0.2, "./assets/sound/load.mp3");
  }

  // setTimeout(loadMain, 4000);

  //To be added:
  //"DIGIT DASH" text
  // More smooth transition to next screen(?)s
}
// Use playSound() to add soundeffects
function playSound(volume: number, path: string) {
  let sound = new Audio(path);
  soundOn ? (sound.volume = volume) : (sound.volume = 0);
  // sound.volume = volume;
  sound.play();
}

function loadMain(): void {
  backgroundMusic.volume = 0.1;
  backgroundMusic.play();

  document.body.style.background = "white";
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
        playSound(0.2, "./assets/sound/load.mp3");
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
        playSound(0.2, "./assets/sound/load.mp3");
        removeBubbles();
        nameChoice();
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

        drawHighscoreList();
        playSound(0.2, "./assets/sound/load.mp3");

        const closeHighScores: HTMLElement | null = document.getElementById("closeHighScores");

        closeHighScores.onclick = () => {
          modal.style.opacity = "0";
          modal.style.visibility = "hidden";
        };
      };
    }

    document.getElementById(bubbleID[0]).style.visibility = "hidden";
  }
}

function drawHighscoreList() {
  if (localStorage.getItem("players") == null) {
    document.getElementById("emptyHighscore").style.display = "block";
  } else {
    document.getElementById("emptyHighscore").style.display = "none";
    // GET THE ARRAY FROM LS
    const playersLS: Array<PlayerObjct> = JSON.parse(
      localStorage.getItem("players")
    );

    //DELETES THE PLAYERS WITH 0 AMOUNT OF GUESSES (meaning they did not win)
    let highscoreList = playersLS.filter((item) => item.amountOfGuesses !== 0);

    //SORTS THE ARRAY WITH LOWEST AMOUNT OF GUESSES FIRST
    highscoreList.sort((a, b) => {
      return a.amountOfGuesses - b.amountOfGuesses;
    });

    //DRAW OUT THE PLAYER INFO
    for (let i = 0; i < highscoreList.length; i++) {
      if (i === 3) {
        break;
      }
      document.getElementById(`player${i}Name`).innerHTML =
        highscoreList[i].name;
      document.getElementById(`player${i}Amount`).innerHTML = highscoreList[
        i
      ].amountOfGuesses.toString();
      document.getElementById(`player${i}Played`).innerHTML = highscoreList[
        i
      ].gamesPlayed.toString();
    }
  }
}

function initVolumeControl() {
  let volIcon = document.getElementById("volIcon");
  let noVolIcon = document.getElementById("noVolIcon");

  volIcon.onclick = () => {
    // set icon
    volIcon.classList.add("hideVolIcon");
    noVolIcon.classList.remove("hideVolIcon");

    // set sound off
    soundOn = false;
    backgroundMusic.volume = 0;
  };
  noVolIcon.onclick = () => {
    // set icon
    noVolIcon.classList.add("hideVolIcon");
    volIcon.classList.remove("hideVolIcon");

    //set sound on
    soundOn = true;
    backgroundMusic.volume = 0.1;
  };
}

function initHomeButton() {
  let homeIcon = document.getElementById("homeIcon");
  homeIcon.onclick = () => {
    location.reload();
  };
}
