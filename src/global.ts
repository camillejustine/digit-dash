window.addEventListener('load', loadMain);

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
