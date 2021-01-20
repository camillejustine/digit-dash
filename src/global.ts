window.addEventListener('load', loadMain);

function setElementContent(id: string, mainText: string) {
    let element: HTMLElement | null = document.getElementById(id);
    element.innerHTML = mainText;
}