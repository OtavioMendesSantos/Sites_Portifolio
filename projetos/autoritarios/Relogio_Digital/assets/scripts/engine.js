const timer = document.querySelector("#timer");
let hours, minutes, seconds, now;

let updateClock = setInterval(()=>{
    now = new Date;
    hours = (now.getHours()).toString().padStart(2, '0');
    minutes = (now.getMinutes()).toString().padStart(2, '0');
    seconds = (now.getSeconds()).toString().padStart(2, '0');
    
    timer.innerHTML = `${hours}:${minutes}:${seconds}`;

    document.title = `${hours}:${minutes}:${seconds} Relógio Virtual`;
},1000) 