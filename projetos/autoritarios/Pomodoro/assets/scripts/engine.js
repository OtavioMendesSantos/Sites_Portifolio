const timer = document.querySelector('#timer')
let decreaseTime, minutes, seconds;

function initTimer(n){
    let timerStart = Number(n * 60 * 1000)
    
    clearInterval(decreaseTime)
    
    decreaseTime = setInterval(()=>{
        if(timerStart <= 0){
            clearInterval(decreaseTime)
        }else{
            timerStart -= 1000
            minutes = Math.floor(timerStart/1000/60)
            seconds = ((timerStart/1000) - (minutes * 60))
            timer.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`
        }
    }, 1000);
}