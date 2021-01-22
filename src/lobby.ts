function lobby() {
    // creates start button
       let button = document.createElement('button');
       button.id = 'startGame';
       button.textContent = 'Play';
      document.getElementById('buttonWrapper').appendChild(button);
        console.log('lobby');
    
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
    
    // start new screen for game start
        button.onclick = () => {
        console.log('knapp');
        button.remove();
        playerBolt.remove();
        playerClank.remove();
        playerGadget.remove();
        }
        
    }