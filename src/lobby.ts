const bubbleText = ['Choose your opponents!', 'You can pick up to 2.', 'Bot info', 'Play'];

// const botInfo = [
//     {
//         name: 'Bolt',
//         text: 'Bolt is a friendly, but slow, machine.',
//         winRate: '8%',
//         img: '../assets/imgs/playerBolt-grey.png'
//     },
//     {
//         name: 'Clank',
//         text: 'Clank is a happy and pretty fast machine.',
//         winRate: '4%',
//         img: '../assets/imgs/playerClank-grey.png'
//     },
//     {
//         name: 'Gadget',
//         text: 'Gadget is a cranky, although very fast, machine.',
//         winRate: '22%',
//         img: '../assets/imgs/playerGadget-grey.png'
//     }
// ]

let chosenBots: Array<string> = [];

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
    playerBolt.onclick = () => {
        // add or remove bot to array and set img (grey or color)
        checkBotArray('Bolt', playerBolt)
    }
    document.getElementById('botWrapper').appendChild(playerBolt);


    let playerClank = document.createElement('div');
    playerClank.id = 'playerClank';
    playerClank.onclick = () => {
        // add or remove bot to array and set img (grey or color)
        checkBotArray('Clank', playerClank)
    }
    document.getElementById('botWrapper').appendChild(playerClank);

    let playerGadget = document.createElement('div');
    playerGadget.id = 'playerGadget';
    playerGadget.onclick = () => {
        // add or remove bot to array and set img (grey or color)
        checkBotArray('Gadget', playerGadget)
    }
    document.getElementById('botWrapper').appendChild(playerGadget);


    // bot info click event (show modal)
    let botInfoButton = document.getElementById(bubbleID[2]);
    botInfoButton.onclick = () => {
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


    // // start new screen for game start
    // button.onclick = () => {
    // console.log('knapp');
    // button.remove();
    // playerBolt.remove();
    // playerClank.remove();
    // playerGadget.remove();
    // }
        

    // start new screen for game start
    document.getElementById(bubbleID[1]).onclick = () => {
        button.remove();
        playerBolt.remove();
        playerClank.remove();
        playerGadget.remove();
        drawGame();
    }

}

function checkBotArray(bot: string, botElement: HTMLElement){
    if (chosenBots.indexOf(bot) > -1 || chosenBots.length === 2){

        // remove bot if same bot is clicked again
        chosenBots = chosenBots.filter(b => b !== bot);
        botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-grey.png")`
        if (chosenBots.length === 0){
            removeBubble(bubbleID[1], bubbleTextID[1]);
        } else {
            document.getElementById(`player${chosenBots[0]}`).style.backgroundImage = `url("../assets/imgs/player${chosenBots[0]}-chosen1.png")`
        }

    }else if (chosenBots.length > 0) {

        // first bot clicked (bot array length is below 2)
        chosenBots.push(bot);
        botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-chosen2.png")`

    } else if (chosenBots.length > -1 && botElement.style.backgroundImage === `url("../assets/imgs/player${bot}-chosen2.png")`){

        // 
        botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-chosen1.png")`

    } else {
        showBubble(bubbleID[1], bubbleTextID[1], bubbleText[3]);
        chosenBots.push(bot);
        botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-chosen1.png")`

    }
}