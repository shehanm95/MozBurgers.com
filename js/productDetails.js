function expandAdvanceDetails() {
    let expandButton = document.getElementById('expandButton')
    let expandableDiv = document.getElementById('expandableDiv')
    expandButton.classList.toggle('rotate180')
    expandableDiv.classList.toggle('expand')
    console.log('expanded')
}