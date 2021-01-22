const mainText: string[] = ["", "High Scores", "How to play", "Play"];

// let gameState: string = 'main', 'nameChoice', 'lobby', 'gamePlay', 'highScore'

/**
 * First edition of the welcomeScreen, feel free to change it as you like!
 */
function welcomeScreen() {
  removeBubbles();
  document.body.style.background = "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)" //This needs some adjustment
  document.getElementById("gameMasterWrapper").classList.add('fadeIn')
  document.getElementById(bubbleID[0]).style.visibility = 'visible';
  setElementContent(bubbleTextID[0], "Welcome");
  setTimeout(loadMain, 4000)

  //To be added:
  //"DIGIT DASH" text
  // More smooth transition to next screen(?)s
}

function loadMain(): void {
  document.body.style.background = "white";
  // gameState = 'main';
  for (let index = 0; index < mainText.length; index++) {
    setElementContent(bubbleTextID[index], mainText[index]);
    document.getElementById(bubbleID[index]).style.visibility = 'visible';

    // move to own function???
    if (mainText[index] === "How to play") {
      const ruleBubble: HTMLElement = document.getElementById("bubbleBL");

      ruleBubble.onclick = () => {
        const modal: HTMLElement | null = document.getElementById("ruleModal");
        modal.style.opacity = "1";
        modal.style.visibility = "visible";

        const close: HTMLElement | null = document.getElementById("close");

        close.onclick = () => {
          modal.style.opacity = "0";
          modal.style.visibility = "hidden";
        };

        // TO DO: make background close modal on click
        // window.onclick = (event: Event) => {
        //   if (event.target === modal) {
        //     modal.style.visibility = "hidden";
        //   }
        // };
      };
    }

    if (mainText[index] === "Play") {
      const playBubble: HTMLElement = document.getElementById("bubbleBR");
      playBubble.onclick = () => {
        console.log("nameChoice");
        removeBubbles();
        nameChoice();
        //gameState = 'nameChoice';
      };
    }

    // high score module 
    if (mainText[index] === "High Scores") {
      const highScoresBubble: HTMLElement = document.getElementById("bubbleTR");

      highScoresBubble.onclick = () => {

        const modal: HTMLElement | null = document.getElementById("highScoresModal");
        modal.style.opacity = "1";
        modal.style.visibility = "visible";
        console.log('High score');

        let playerHighScores1 = document.createElement('div');
        playerHighScores1.id = 'playerHighScores1';
        document.getElementById('playerHighScores').appendChild(playerHighScores1);

        const closeHighScores: HTMLElement | null = document.getElementById("closeHighScores");

        closeHighScores.onclick = () => {
          modal.style.opacity = "0";
          modal.style.visibility = "hidden";
          console.log('close High Score');
        };
      };
    }

    document.getElementById(bubbleID[0]).style.visibility = "hidden";

  }


    // Function showTot() { SHOW TEXT /VIDEO  }