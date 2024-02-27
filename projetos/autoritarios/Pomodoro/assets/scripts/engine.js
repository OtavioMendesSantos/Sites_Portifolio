/* Animations Settings */
const checkboxAnimation = document.querySelector('#checkbox-animation')
checkboxAnimation.addEventListener('click', controlAnimation)

function controlAnimation(){
    if(checkboxAnimation.checked){
        document.querySelector('.full-apple').style.animationPlayState = 'running';
    }else{
        document.querySelector('.full-apple').style.animationPlayState = 'paused';
    }
}

/* Timer Settings */
let decrementButtons = document.querySelectorAll('.decrement')

decrementButtons.forEach((decrementButton)=>{
    decrementButton.addEventListener('click', decrementNumber)
})

function decrementNumber(event){
    event.target.nextElementSibling.stepDown()
}

let increaseButtons = document.querySelectorAll('.increase')

increaseButtons.forEach((increaseButton)=>{
    increaseButton.addEventListener('click', increaseNumber)
})

function increaseNumber(event){
    event.target.previousElementSibling.stepUp()
}

/* Settings Mobile Menu */
const mobileMenu = document.querySelector('#show-settings')
const menuSettings = document.querySelector('.settings')

function showMenu(){
    menuSettings.classList.toggle('active')
} 

mobileMenu.addEventListener('click', showMenu)

document.addEventListener('click', function(event){
    let click1 = menuSettings.contains(event.target)
    let click2 = mobileMenu.contains(event.target)
    if(!click1 && !click2){
        menuSettings.classList.remove('active')
    }
})

/* Timer */
const timer = document.querySelector('#timer')
let decreaseTime, minutes, seconds;

function initTimer(x){
    let n;
    const pomodoroTimer = document.querySelector('#pomodoro-timer').value
    const restTimer = document.querySelector('#rest-timer').value

    switch(x){
        case 1:
            n = pomodoroTimer
            break
        case 2:
            n = restTimer
            break
        case 3:
            n = restTimer * 3
            break
    }

    let timerStart = Number(n * 60 * 1000)
    
    clearInterval(decreaseTime)
    
    decreaseTime = setInterval(()=>{
        if(timerStart <= 0){
            clearInterval(decreaseTime)
        }else{
            timerStart -= 1000
            minutes = Math.floor(timerStart/1000/60)
            seconds = ((timerStart/1000) - (minutes * 60))
            timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} Pomodoro`
        }
    }, 1000);
}

/* Notes */
/* 
const userNotes = document.querySelectorAll('.user-notes')

function yToString(){
    let nameKey = ("note" + lastItem).toString()
    lastItem++
    return nameKey
}

function addNewNote(){
    localStorage.setItem(yToString() ,userNewNote.value)
    userNewNote.value = ""
    //userNotes.push('')
}

function addNote(){
    userNewNote.previousElementSibling.innerHTML = 'a'
}

const buttonNewNote = document.querySelector("#addNewNote")
const userNewNote = document.querySelector("#userNewNote")

buttonNewNote.addEventListener('click', addNewNote) 
*/

function initNotes(){
    let lastItem = 0
    if(localStorage.length > 0){
        let keys = Object.keys(localStorage);
        let lastKey = keys[keys.length-1];
        lastItem = Number(lastKey.slice(4))
        lastItem++
        console.log(`${keys} / ${lastKey} + ${lastItem}`)
    }
}
initNotes()
