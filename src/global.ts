window.addEventListener('load', welcomeScreen); //GLÖM INTE ÄNDRA TILLBAKS
//window.addEventListener('load', drawWinnerScreen);

class BotObjct { bot: string; wins: number; };


const gameMaster: any = document.getElementById('gameMaster');

let players: Array<Object> = [];
let bots: Array<BotObjct>;
if (localStorage.getItem('bots') == null) {
    bots = [
        { bot: 'Clank', wins: 0 },
        { bot: 'Gadget', wins: 0 },
        { bot: 'Bolt', wins: 0 }
    ];
} else {
    bots = JSON.parse(localStorage.getItem('bots'));
}


const bubbleTextID: string[] = ['textTL', 'textTR', 'textBL', 'textBR'];
const bubbleID: string[] = ['bubbleTL', 'bubbleTR', 'bubbleBL', 'bubbleBR'];

const inputWrapper: HTMLElement = document.getElementById('inputField');



function setElementContent(id: string, mainText: string) {
    let element: HTMLElement | null = document.getElementById(id);
    element.innerHTML = mainText;
}

function removeBubbles() {
    for (let index = 0; index < bubbleID.length; index++) {
        let bubbles: HTMLElement = document.getElementById(bubbleID[index]);
        let text: HTMLElement = document.getElementById(bubbleTextID[index]);
        bubbles.onclick = () => {
            // reset onclick 
        }
        bubbles.style.visibility = 'hidden';
        text.innerHTML = '';
    }
}

function removeBubble(bubbleID: string, textID: string) {
    document.getElementById(textID).innerHTML = '';
    document.getElementById(bubbleID).style.visibility = 'hidden';
}


function showBubble(bubbleID: string, bubbleTextID: string, bubbleText: string) {
    document.getElementById(bubbleID).style.visibility = "visible";
    setElementContent(bubbleTextID, bubbleText);
}

