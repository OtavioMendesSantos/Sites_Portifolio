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
const listNotes = document.querySelector(".user-notes")

let lastItem = 0
const userNotes = []

let ordenedNotes = Object.keys(localStorage);
bubbleSort(ordenedNotes)

function Note(key, value) {
    this.key = key;
    this.value = value;
} 

function nameToString(){
    let nameKey = ("note" + lastItem).toString()
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

function rememberNotes(){
    let itemNotes = document.querySelectorAll(".item-note")
    if(localStorage.length > 0){
        let lastKey = keyToNumber(ordenedNotes[ordenedNotes.length - 1])

        if(itemNotes.length > 0){
            itemNotes.forEach((_, index)=>{
                document.getElementById(itemNotes[index].id).remove()
            })
        }

        ordenedNotes.forEach((item)=>{
            addNote(item, localStorage.getItem(item))
        });  
        
        lastItem = lastKey.valueOf()
        lastItem++
    }
    if(itemNotes.length == 1){
        document.getElementById(itemNotes[0].id).remove()
        lastItem--
    }
}

function addNote(keyNote,userNote){
    let index = keyToNumber(keyNote)
    if(!userNotes[index]){
        userNotes.push(new Note(keyNote, userNote))
    }
    //Item Note
    userNotes[index].element = document.createElement('li')
    userNotes[index].element.classList.add("item-note")
    userNotes[index].element.id = keyNote
    //Button
    let button = document.createElement("button")
    button.classList.add("button-note", "remove-note")
    button.addEventListener("click", deleteNote) //TODO: Implementar event
    button.innerText = "-"
    userNotes[index].element.appendChild(button)
    //Paragraph
    let paragraph = document.createElement("p")
    paragraph.innerText = userNote
    userNotes[index].element.appendChild(paragraph)
    //Add Item
    listNotes.insertBefore(userNotes[index].element, containerNewNote)
} 

function newNote(){
    const noteValue = !!userNewNote.value.trim()

    if(noteValue){
        let nameKey = nameToString()
        lastItem++
        localStorage.setItem(nameKey, userNewNote.value)
        addNote(nameKey, userNewNote.value)
        userNewNote.value = ""
    }
}

function deleteNote(event){
    //Callback for Delete Button
    const liElement = event.target.parentElement
    const index = keyToNumber(liElement.id)
    //Moves only the note text
    for(let i = index; i <= userNotes.length - 1; ++i){
        if(userNotes.length - 1 > i){
            userNotes[i].value = userNotes[i + 1 ].value 
            localStorage.setItem(userNotes[i].key, userNotes[i + 1].value)
        } else {
            localStorage.removeItem(userNotes[userNotes.length - 1].key)
            userNotes.splice(0)
        }
    }
    ordenedNotes = Object.keys(localStorage);
    bubbleSort(ordenedNotes)
    rememberNotes()
}

function deleteAllNotes(){
    if (userNotes != 0){
        let itemNotes = document.querySelectorAll(".item-note")
        listNotes.querySelectorAll(".item-note").forEach((item)=>{
            localStorage.removeItem(item.id)
            let i = keyToNumber(item.id)
            document.getElementById(itemNotes[i].id).remove()
        })
        
        userNotes.splice(0)
        lastItem = 0

        ordenedNotes = Object.keys(localStorage);
        bubbleSort(ordenedNotes)
    }
} 

function initNotes(){
    rememberNotes()
    buttonNewNote.addEventListener('click', newNote) 
    window.addEventListener('keydown', (event)=>{
        if(event.key === "Enter"){
            if (document.activeElement === userNewNote) {
                newNote()
            }
        }
    }) 
}
initNotes()
