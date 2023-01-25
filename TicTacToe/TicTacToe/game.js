const game ={
    xTurn: true,
    xState: [],
    oState: [],

    winningStates: [
        //rows
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8'],

        //columns
        ['0','3','6'],
        ['1','4','7'],
        ['2','5','8'],
    
        // diagonals
        ['0','4','8'],
        ['2','4','6']
    ]
}

document.addEventListener('click',event=>{
    const target = event.target;
    const isCell = target.classList.contains('grid-cell');
    const isDisabled = target.classList.contains('disable');

    if (isCell && !isDisabled){
        const cellValue = target.dataset.value;

        game.xTurn === true ? game.xState.push(cellValue) : game.oState.push(cellValue);
    

    target.classList.add('disbale');
    target.classList.add(game.xTurn ? 'x' : 'o');

    game.xTurn = !game.xTurn;

    }
    
    if (!document.querySelectorAll('.grid-cell:not(.disable)').length){
        document.querySelector('.game-over').classList.add('visible');
        document.querySelector('.game-over-text').textContent = 'Draw!';   
    }

    game.winningStates.forEach(winningState =>{
        const xWins = winningState.every(state => game.xState.includes(state));
        const oWins = winningState.every(state => game.oState.includes(state));

        if(xWins || oWins){
            document.querySelectorAll('.grid-cell').forEach(cell =>cell.classList.add('disable'))
            document.querySelector('.game-over').classList.add('visible');
            document.querySelector('.game-over-text').textContent = xWins ? 'X Wins!' : 'O Wins!'
        }
    })

})

document.querySelector('.restart').addEventListener('click', () =>{
    document.querySelector('.game-over').classList.remove('visible');
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('disable', 'x', 'o');
    })

    game.xTurn = true;
    game.xState = [];
    game.oState = [];

})
