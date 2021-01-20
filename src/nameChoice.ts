function nameChoice(){
    showGreeting();
    showNameInput();
}

const greeting: string = 'Hi! What is you name?'

function showGreeting(){
    document.getElementById(bubbleID[0]).style.visibility = 'visible';
    setElementContent(bubbleTextID[0], greeting);
}
function showNameInput(){
    const nameInput: HTMLInputElement = document.createElement('input');
    nameInput.type = 'text';
    inputWrapper.appendChild(nameInput);
    nameInput.focus();

}