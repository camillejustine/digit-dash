let winner:string;


function drawWinnerScreen(){
    let winner = "Gadget";
    
    const modal: HTMLElement | null = document.getElementById("winnerModal");
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    
    if (winner == "Gadget"){
        document.getElementById("gadgetWinner").style.display = "block";
        document.getElementById("winnerName").innerHTML = 'GADGET WON!';
    } else if (winner == "Clank"){
        document.getElementById("clankWinner").style.display = "block";
        document.getElementById("winnerName").innerHTML = 'CLANK WON!';
    } else if (winner == "Bolt"){
        document.getElementById("boltWinner").style.display = "block";
        document.getElementById("winnerName").innerHTML = 'BOLT WON!';
    } else if (winner == "Player"){
        document.getElementById("playerWinner").style.display = "block";
        document.getElementById("winnerName").innerHTML = getPlayerName() + " WON!";
    }
   
}





function getPlayerName(){
const players: Array<Object> = JSON.parse(localStorage.getItem("players"));
const number = players.length - 1; //-1 to get the right indexnumber
return players[number].name; //Looks like an error but works fine
}