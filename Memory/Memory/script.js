// card array
const cardarr = [
    {
        name:'fries',
        img:"images/fries.png"
    },
    {
        name:'cheesburger',
        img:"images/cheeseburger.png"
    },
    {
        name:'pizza',
        img:"images/pizza.png"
    },
    {
        name:'ice -cream',
        img:"images/ice-cream.png"
    },
    {
        name:'milkshake',
        img:"images/milkshake.png"
    },
    {
        name:'hotdog',
        img:"images/hotdog.png"
    },
    //second card of every type
    {
        name:'fries',
        img:"images/fries.png"
    },
    {
        name:'cheesburger',
        img:"images/cheeseburger.png"
    },
    {
        name:'pizza',
        img:"images/pizza.png"
    },
    {
        name:'ice -cream',
        img:"images/ice-cream.png"
    },
    {
        name:'milkshake',
        img:"images/milkshake.png"
    },
    {
        name:'hotdog',
        img:"images/hotdog.png"
    },
];

//random shuffle the card array
cardarr.sort(() => 0.5-Math.random());

//global variables
const grid = document.querySelector(".grid");
const resultdisplay = document.querySelector("#result");
let cardChosen = [];
let cardChosenId = [];
let cardsWon = [];
let amountoftries = 0;

//create board
function  createBoard(){
    for(let i=0; i<cardarr.length; i++){
        const card = document.createElement('img');
        card.setAttribute('src','images/blank.png');
        card.setAttribute('data-id',i);
        card.addEventListener('click',flipcard);
        grid.appendChild(card);
    }
}


// flipcard function
function flipcard(){
    let cardId = this.getAttribute("data-id")
    cardChosen.push(cardarr[cardId].name)
    cardChosenId.push(cardId);
    this.setAttribute('src',cardarr[cardId].img);
    if(cardChosen.length === 2){
        setTimeout(compare,250)
    }
}

//compare cards chosen
function compare(){
    const cards = document.querySelectorAll('img');
    const Option1Id = cardChosenId[0];
    const Option2Id = cardChosenId[1];
    if(cardChosenId[0] === cardChosenId[1]){
        cards[cardChosenId[0]].setAttribute('src','images/blank.png');
        cards[cardChosenId[1]].setAttribute('src','images/blank.png');
        alert('You have clicked on the same image twice')
    }
    else if(cardChosen[0] === cardChosen[1]){
        cards[cardChosenId[0]].setAttribute('src','images/white.png');
        cards[cardChosenId[1]].setAttribute('src','images/white.png');
        alert("You found a match!")
        amountoftries++

        cards[cardChosenId[0]].removeEventListener('click', flipcard)
        cards[cardChosenId[1]].removeEventListener('click', flipcard)

        cardsWon.push(cardChosen)
    }
    else{
        cards[cardChosenId[0]].setAttribute('src','images/blank.png');
        cards[cardChosenId[1]].setAttribute('src','images/blank.png');
        alert("Sorry no matcho")
        amountoftries++

    }
    cardChosen=[];
    cardChosenId = [];

    resultdisplay.textContent = cardsWon.length;

    if(cardsWon.length === cardarr.length/2){
        resultdisplay.textContent = "Congrats you got all " + cardsWon.length + " matches in " + amountoftries + " tries!" 
    }
}

createBoard()

// different pictures
// more styling
