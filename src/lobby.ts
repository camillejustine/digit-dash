const bubbleText = ['Choose your opponents!', 'You can pick up to 2.', 'Bot info'];

const botInfo = [
    {
        name: 'Bolt',
        text: 'Bolt is a friendly, but slow, machine.',
        winRate: '8%',
        img: '../assets/imgs/playerBolt.png'
    },
    {
        name: 'Clank',
        text: 'Clank is a happy and pretty fast machine.',
        winRate: '4%',
        img: '../assets/imgs/playerClank.png'
    },
    {
        name: 'Gadget',
        text: 'Gadget is a cranky, although very fast, machine.',
        winRate: '22%',
        img: '../assets/imgs/playerGadget.png'
    }
]

function lobby() {
    // display bubbles
    showBubble(bubbleID[0], bubbleTextID[0], bubbleText[0]);
    showBubble(bubbleID[3], bubbleTextID[3], bubbleText[1]);
    showBubble(bubbleID[2], bubbleTextID[2], bubbleText[2]);

    // creates start button
    let button = document.createElement('button');
    button.id = 'startGame';
    button.textContent = 'Play';
    document.getElementById('buttonWrapper').appendChild(button);

    // creates bot players
    let playerBolt = document.createElement('div');
    playerBolt.id = 'playerBolt';
    document.getElementById('botWrapper').appendChild(playerBolt);


    let playerClank = document.createElement('div');
    playerClank.id = 'playerClank';
    document.getElementById('botWrapper').appendChild(playerClank);

    let playerGadget = document.createElement('div');
    playerGadget.id = 'playerGadget';
    document.getElementById('botWrapper').appendChild(playerGadget);


    // bot info click event
    let botInfoButton = document.getElementById(bubbleID[2]);
    botInfoButton.onclick = () => {
        console.log("BOT INFO CLICK!");
        const botModal: HTMLElement | null = document.getElementById("botModal");
        console.log(botModal);
        botModal.style.opacity = "1";
        botModal.style.visibility = "visible";
        
        const botClose: HTMLElement | null = document.getElementById("botClose");
        
        botClose.onclick = () => {
            botModal.style.opacity = "0";
            botModal.style.visibility = "hidden";
        };
    }


    // start new screen for game start
    button.onclick = () => {
    console.log('knapp');
    button.remove();
    playerBolt.remove();
    playerClank.remove();
    playerGadget.remove();
    }
        

    // start new screen for game start
    button.onclick = () => {
        console.log('knapp');
        button.remove();
        playerBolt.remove();
        playerClank.remove();
        playerGadget.remove();
        drawGame();

    }

}