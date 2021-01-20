const mainText: string[] = ['', 'Leaderboards', 'How to play', 'Play',];

// let gameState: string = 'main', 'nameChoice', 'lobby', 'gamePlay', 'highScore'


function loadMain(): void {
    // gameState = 'main';
    for (let index = 0; index < mainText.length; index++) {
        setElementContent(bubbleTextID[index], mainText[index]);

        // move to own function??? 
        if (mainText[index] === 'How to play') {
            const ruleBubble: HTMLElement = document.getElementById('bubbleBL');

            ruleBubble.onclick = () => {
                const modal: HTMLElement | null = document.getElementById("ruleModal");
                modal.style.display = "block";

                const close: HTMLElement | null = document.getElementById('close');
                console.log(close);

                close.onclick = () => {
                    console.log('sadasd');
                    modal.style.display = "none";
                }
                window.onclick = (event: Event) => {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
            }
        }
        if (mainText[index] === 'Play') {
            const playBubble: HTMLElement = document.getElementById('bubbleBR');
            playBubble.onclick = () => {
                console.log('nameChoice');
                removeBubbles();
                nameChoice();
                //gameState = 'nameChoice';
            }
        }
    }
    document.getElementById(bubbleID[0]).style.visibility = 'hidden';
}


// Function showTot() { SHOW TEXT /VIDEO  }
