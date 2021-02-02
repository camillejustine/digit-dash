const bubbleText = [
  "Choose your opponents!",
  "You can pick up to two.",
  "Information",
  "Start game",
];

let chosenBots: Array<string> = [];

function lobby() {
  // display bubbles
  showBubble(bubbleID[0], bubbleTextID[0], bubbleText[0]);
  showBubble(bubbleID[3], bubbleTextID[3], bubbleText[1]);
  showBubble(bubbleID[2], bubbleTextID[2], bubbleText[2]);
  document.getElementById("bubbleBR").style.cursor = "default";
  document.getElementById("bubbleBR").style.backgroundImage =
    "url(../assets/imgs/bubbleBR.png)";

  // creates bot players
  let playerBolt = document.createElement("div");
  playerBolt.id = "playerBolt";
  playerBolt.onclick = () => {
    // add or remove bot to array and set img (grey or color)
    checkBotArray("Bolt", playerBolt);
    if (
      playerBolt.style.backgroundImage !==
      `url("../assets/imgs/playerBolt-grey.png")`
    )
      playSound(0.2, "./assets/sound/bolt-chosen.mp3");
  };
  document.getElementById("botWrapper").appendChild(playerBolt);

  let playerClank = document.createElement("div");
  playerClank.id = "playerClank";
  playerClank.onclick = () => {
    // add or remove bot to array and set img (grey or color)
    checkBotArray("Clank", playerClank);
    if (
      playerClank.style.backgroundImage !==
      `url("../assets/imgs/playerClank-grey.png")`
    )
      playSound(0.15, "./assets/sound/clank-chosen.mp3");
  };
  document.getElementById("botWrapper").appendChild(playerClank);

  let playerGadget = document.createElement("div");
  playerGadget.id = "playerGadget";
  playerGadget.onclick = () => {
    // add or remove bot to array and set img (grey or color)
    checkBotArray("Gadget", playerGadget);
    if (
      playerGadget.style.backgroundImage !==
      `url("../assets/imgs/playerGadget-grey.png")`
    )
      playSound(0.1, "./assets/sound/gadget-chosen.mp3");
  };
  document.getElementById("botWrapper").appendChild(playerGadget);

  // bot info click event (show modal)
  let botInfoButton = document.getElementById(bubbleID[2]);
  botInfoButton.onclick = () => {
    drawBotWins();
    const botModal: HTMLElement | null = document.getElementById("botModal");

    botModal.style.opacity = "1";
    botModal.style.visibility = "visible";
    playSound(0.2, "./assets/sound/load.mp3");

    const botClose: HTMLElement | null = document.getElementById("botClose");

    botClose.onclick = () => {
      botModal.style.opacity = "0";
      botModal.style.visibility = "hidden";
    };
  };

  // start new screen for game start
  document.getElementById(bubbleID[1]).onclick = () => {
    document.getElementById("botWrapper");
    playerBolt.remove();
    playerClank.remove();
    playerGadget.remove();
    removeBubbles();
    playSound(0.2, "./assets/sound/load.mp3");
    drawGame();
  };
}

function checkBotArray(bot: string, botElement: HTMLElement) {
  if (chosenBots.indexOf(bot) > -1 || chosenBots.length === 2) {
    // remove bot if same bot is clicked again
    chosenBots = chosenBots.filter((b) => b !== bot);
    botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-grey.png")`;

    // removes bubble if no bot chosen
    if (chosenBots.length === 0) {
      removeBubble(bubbleID[1], bubbleTextID[1]);
    } else {
      document.getElementById(
        `player${chosenBots[0]}`
      ).style.backgroundImage = `url("../assets/imgs/player${chosenBots[0]}-chosen1.png")`;
    }
  } else if (chosenBots.length > 0) {
    // first bot clicked (bot array length is below 2)
    chosenBots.push(bot);
    botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-chosen2.png")`;
  } else if (
    chosenBots.length > -1 &&
    botElement.style.backgroundImage ===
      `url("../assets/imgs/player${bot}-chosen2.png")`
  ) {
    botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-chosen1.png")`;
  } else {
    showBubble(bubbleID[1], bubbleTextID[1], bubbleText[3]);
    chosenBots.push(bot);
    botElement.style.backgroundImage = `url("../assets/imgs/player${bot}-chosen1.png")`;
  }
}

function drawBotWins() {
  let clankWinRate: number = (bots[0].wins / bots[0].gamesPlayed) * 100;
  let gadgetWinRate: number = (bots[1].wins / bots[1].gamesPlayed) * 100;
  let boltWinRate: number = (bots[2].wins / bots[2].gamesPlayed) * 100;

  document.getElementById("clankWins").innerHTML =
    "Clank has a total win rate of " +
    clankWinRate.toFixed(1) +
    "% and currently has " +
    bots[0].wins +
    " wins.";
  document.getElementById("gadgetWins").innerHTML =
    "Gadget has a total win rate of " +
    gadgetWinRate.toFixed(1) +
    "% and currently has " +
    bots[1].wins +
    " wins.";
  document.getElementById("boltWins").innerHTML =
    "Bolt has a total win rate of " +
    boltWinRate.toFixed(1) +
    "% and currently has " +
    bots[2].wins +
    " wins.";
}
