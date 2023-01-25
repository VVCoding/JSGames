const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]')
const ComputerSpan = document.querySelector('[data-computer-score]')
const YourSpan = document.querySelector('[data-your-score]')

const SELECTIONS = [
    {
        name: 'rock',
        emoji: '🪨',
        beats: 'scissor',
    },

    {
        name: 'paper',
        emoji: '📰',
        beats: 'rock',
    },

    {
        name: 'scissor',
        emoji: '✂️',
        beats: 'paper',
    }
]






selectionButtons.forEach(selectionButton =>{
    selectionButton.addEventListener('click', e=>{
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);

        console.log(selectionName);

        makeSelection(selection);
    })
})

function makeSelection(selection){
    const computerSelection = randselect();
    const yourWinner = isWinner(selection,computerSelection);
    const computerWinner = isWinner(computerSelection,selection)
    addSelectResult(computerSelection,computerWinner);
    addSelectResult(selection,yourWinner);


    if (yourWinner){
        Increment(YourSpan);
        const header = createElement('h1')
        header.innerText = 'You won!'
        //alert('You won!😃')


    } 
    if (computerWinner){
        Increment(ComputerSpan);
        const header = createElement('h2')
        header.innerText = 'The Computer won!'


    } 
    else{
        //alert('Its a draw')
    }
    

}


function addSelectResult(selection,winner){
    const div = document.createElement('div');
    div.innerText= selection.emoji;
    div.classList.add('result-selection');
    if (winner) div.classList.add('winner');
    finalColumn.after(div);
}
function isWinner(my,opp){
    return my.beats === opp.name;
}

function randselect(){
    const randIndex = Math.floor(Math.random()*SELECTIONS.length);
    return SELECTIONS[randIndex]
}

function Increment(scoreSpan){
    scoreSpan.innerText = parseInt(scoreSpan.innerText ) +1;
}
