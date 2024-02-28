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
const buttonNewNote = document.querySelector("#buttonNewNote")
const userNewNote = document.querySelector("#inputNewNote")
const containerNewNote = document.querySelector("#add-item-note")

let lastItem = 0
let objectKeys = Object.keys(localStorage);
const userNotes = []

const ordenedNotes = Object.keys(localStorage);
bubbleSort(ordenedNotes)

function Note(key, value) {
    this.key = key;
    this.value = value;
} 

function rememberNotes(){    
    if(localStorage.length > 0){
        let lastKey = keyToNumber(ordenedNotes[ordenedNotes.length - 1])
        ordenedNotes.forEach((item)=>{
            addNote(item, localStorage.getItem(item))
        });
    
        lastItem = lastKey.valueOf()
        lastItem++
    }
}

function nameToString(){
    let nameKey = ("note" + lastItem).toString()
    lastItem++
    return nameKey
}

function keyToNumber(key){
    //Function only for key "note"
    return Number(key.slice(4))
}

function bubbleSort(itensArray){
    //Uses an Array as a parameter 
    //Caution, this function modify the Array
    for(let i = 0; i < itensArray.length; i++){
        for(let x = i; x < itensArray.length; x ++){
            if(keyToNumber(itensArray[x]) < keyToNumber(itensArray[i])){
                let aux = itensArray[i]
                itensArray[i] = itensArray[x]
                itensArray[x] = aux
            }
        }
    }
}

function addNote(keyNote,userNote){
    let index = keyToNumber(keyNote)
    let listNotes = document.querySelector(".user-notes")

    userNotes.push(new Note(keyNote, userNote))
    userNotes[index].element = document.createElement('li')
    userNotes[index].element.classList.add("item-note")
    userNotes[index].element.id = keyNote

    let button = document.createElement("button")
    button.classList.add("button-note", "remove-note")
    button.addEventListener("click", ()=>{}) //TODO: Implementar event
    button.innerText = "-"
    userNotes[index].element.appendChild(button)

    let paragraph = document.createElement("p")
    paragraph.innerText = userNote
    userNotes[index].element.appendChild(paragraph)

    listNotes.insertBefore(userNotes[index].element, containerNewNote)
} 

function newNote(){
    if(userNewNote.value == ""){
        userNewNote.placeholder = "Por favor, informe uma atividade válida."
    } else {
        let nameKey = nameToString()
        localStorage.setItem(nameKey, userNewNote.value)
        addNote(nameKey, userNewNote.value)
        userNewNote.value = ""
    }
}

function initNotes(){
    rememberNotes()
    buttonNewNote.addEventListener('click', newNote) 
}
initNotes()
