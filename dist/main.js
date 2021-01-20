"use strict";
var mainText = ['', 'Leaderboards', 'How to play', 'Play',];
var bubbleID = ['textTL', 'textTR', 'textBL', 'textBR'];
// let gameState: string[] = ['main',]
function loadMain() {
    for (var index = 0; index < mainText.length; index++) {
        setElementContent(bubbleID[index], mainText[index]);
        // move to own function??? 
        if (mainText[index] === 'How to play') {
            var ruleBubble = document.getElementById('bubbleBL');
            ruleBubble.onclick = function () {
                var modal = document.getElementById("ruleModal");
                modal.style.display = "block";
                var close = document.getElementsByClassName('close')[0];
                console.log(close);
                close.onclick = function () {
                    console.log('sadasd');
                    modal.style.display = "none";
                };
                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                };
            };
        }
    }
    var bubbleTL = document.getElementById('bubbleTL');
    bubbleTL.style.visibility = 'hidden';
}
// Function showTot() { SHOW TEXT /VIDEO  }
//# sourceMappingURL=main.js.map