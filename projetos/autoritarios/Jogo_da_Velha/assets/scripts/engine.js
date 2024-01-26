const states = {
    values:{
        allBox : document.querySelectorAll('.box'),
        idBoxes : [],
        playerLocations: [],
        computerLocations: [],
        winningCombinations: [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7],
        ],
    },
}


function getIdBoxes(){
    states.values.allBox.forEach((box)=>{
        states.values.idBoxes.push(Number(box.id.slice(3)))
    })
}

function addEventListenerBox(){
    states.values.allBox.forEach((box)=>{
        box.addEventListener('click', analysePlay)
    })
}

function removeEventListenerBox(){
    states.values.allBox.forEach((box)=>{
        box.removeEventListener('click', analysePlay)
    })
}

function checkWin(x){
    for(let combination of states.values.winningCombinations){
        if(combination.every((i) => x.includes(i))){
            return true;
        }
    }
    return false;
}

function checkDrawn(){ 
    return states.values.playerLocations.length + states.values.computerLocations.length === 9; //true || false
}

function checkGameOver(){
    if(checkWin(states.values.playerLocations)){
        console.log('player win')
        return true
    } else if (checkWin(states.values.computerLocations)) {
        console.log('computer win')
        return true
    } else if (checkDrawn()){
        console.log('draw game')
        return true
    }
    return false
}

function computerPlay(){
    let exit = 0
    do{
        let x = sortedNumber()
        if(!states.values.allBox[x].classList.contains("active-x") && !states.values.allBox[x].classList.contains("active-y")){
            states.values.allBox[x].classList.add('active-y')
            states.values.allBox[x].innerHTML = 'O'
            states.values.computerLocations.push(x + 1)
            exit++
        }
    }while(exit < 1)
}

function sortedNumber(){
    return Math.floor(Math.random()*9)
}

function analysePlay(event){
    const idBox = Number(event.currentTarget.id.slice(3))
    if (event.currentTarget.classList.contains("active-x") || event.currentTarget.classList.contains("active-y")){
        console.log('Você não pode jogar aqui.')
    } else {
        event.currentTarget.classList.add('active-x')
        states.values.allBox[idBox-1].innerHTML = 'X'
        states.values.playerLocations.push(idBox)
        let isGameOver = checkGameOver()
        if (!isGameOver && states.values.playerLocations.length + states.values.computerLocations.length <= 8){
            computerPlay()
            isGameOver = checkGameOver()
        } 
        if (isGameOver) {
            removeEventListenerBox()
        }  
    }
}

function init(){
    addEventListenerBox()
    getIdBoxes()
}
init()