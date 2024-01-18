function initHideList(){
    const lists = document.querySelectorAll('.list')
    //console.log(lists)

    function hideList(event){
        clickedList = event.target
        clickedList.nextElementSibling.classList.toggle('hidden')
        clickedList.classList.toggle('active')
    }
    function teste(){console.log('a')}

    lists.forEach((list)=>{
        list.addEventListener('click', hideList)
    }) 
}
initHideList()
