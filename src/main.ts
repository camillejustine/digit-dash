const mainText: string[] = ["", "Leaderboards", "How to play", "Play"];

// let gameState: string = 'main', 'nameChoice', 'lobby', 'gamePlay', 'highScore'

/**
 * First edition of the welcomeScreen, feel free to change it as you like!
 */
function welcomeScreen(){
  removeBubbles();
  document.body.style.background = "linear-gradient(180deg, #FFFFFF 0%, #9B85AD 100%)"
  document.getElementById("gameMasterWrapper").classList.add('fadeIn')
  document.getElementById(bubbleID[0]).style.visibility = 'visible';
  setElementContent(bubbleTextID[0], "Welcome");
  setTimeout(loadMain, 5000)

  //TO BE ADDED:
  //LINEAR GRADIENT BACKGROUND
  //"DIGIT DASH" TEXT
}

function loadMain(): void {
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
      }
      document.getElementById(bubbleID[0]).style.visibility = "hidden";
    }
    
    // Function showTot() { SHOW TEXT /VIDEO  }