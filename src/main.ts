const mainText: string[] = ['', 'Leaderboards', 'How to play', 'Play',];
const bubbleID: string[] = ['textTL', 'textTR', 'textBL', 'textBR'];
// let gameState: string[] = ['main',]


function loadMain(): void {

    for (let index = 0; index < mainText.length; index++) {
        setElementContent(bubbleID[index], mainText[index]);

        // move to own function??? 
        if (mainText[index] === 'How to play') {
            const ruleBubble: HTMLElement = document.getElementById('bubbleBL');

            ruleBubble.onclick = () => {
                const modal: HTMLElement | null = document.getElementById("ruleModal");
                modal.style.display = "block";

                const close: HTMLElement | null = document.getElementsByClassName('close')[0];
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
    }
    const bubbleTL: HTMLElement | null = document.getElementById('bubbleTL');
    bubbleTL.style.visibility = 'hidden';


}


// Function showTot() { SHOW TEXT /VIDEO  }
