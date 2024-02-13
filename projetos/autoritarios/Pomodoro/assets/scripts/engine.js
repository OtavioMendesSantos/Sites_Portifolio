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

function hideMenu(event){
    if(event.target != menuSettings && event.target != mobileMenu){
        menuSettings.classList.remove('active')
    } else {
        console.log(event.target)
    }
}

window.addEventListener('click', hideMenu)

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