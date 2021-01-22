window.addEventListener('load', welcomeScreen);

const players: Array<{name: string, highScore: number, games: number}> = [];

const bubbleTextID: string[] = ['textTL', 'textTR', 'textBL', 'textBR'];
const bubbleID: string[] = ['bubbleTL', 'bubbleTR', 'bubbleBL', 'bubbleBR'];

const inputWrapper: HTMLElement = document.getElementById('inputField');


function setElementContent(id: string, mainText: string) {
    let element: HTMLElement | null = document.getElementById(id);
    element.innerHTML = mainText;
}

function removeBubbles(){
    for (let index = 0; index < bubbleID.length; index++) {
        let bubbles: HTMLElement = document.getElementById(bubbleID[index]);
        let text: HTMLElement = document.getElementById(bubbleTextID[index]);

        bubbles.style.visibility = 'hidden';
        text.innerHTML = '';
    }
}

function setlocalStorage(name: string) {
    
}

function fadeIn(id: string){
    let element: HTMLElement = document.getElementById(id);
    element.style.opacity = "0"
    element.classList.add('fadeIn')
}


function showBubble(bubbleID: string, bubbleTextID: string, bubbleText: string){
    document.getElementById(bubbleID).style.visibility = "visible";
    setElementContent(bubbleTextID, bubbleText);
}

