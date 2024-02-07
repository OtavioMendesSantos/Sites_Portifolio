/* function initHideList(){
    const lists = document.querySelectorAll('.list')
    //console.log(lists)

    function hideList(event){
        let = clickedList = event.target
        clickedList.nextElementSibling.classList.toggle('hidden')
        clickedList.classList.toggle('active')
    }

    lists.forEach((list)=>{
        list.addEventListener('click', hideList)
    }) 
}
initHideList() */

function initHideAllList(){
    const tittleList = document.querySelectorAll('.tittle-list')

    function hideTittleList(event){
        let = clickedTittleList = event.target
        clickedTittleList.nextElementSibling.classList.toggle('hidden')
        clickedTittleList.classList.toggle('active')
    }

    tittleList.forEach((tittle)=>{
        tittle.addEventListener('click', hideTittleList)
    })
}
initHideAllList()

/* Carrossel / Carousel */
let slideIndex = 1;
let slideInterval;
const slides = document.querySelectorAll('.certificates')
const dots = document.querySelectorAll('.dot')

showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n)
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function numberText(){
    slides[slideIndex - 1].querySelector('.number-text').innerHTML = `${slideIndex} / ${slides.length}`
}

function showSlides(n){
    n > slides.length ? slideIndex = 1 : '';
    n < 1 ? slideIndex = slides.length : '';
    slides.forEach((slide)=>{
        slide.style.display = 'none'
    })
    dots.forEach((dot)=>{
        dot.classList.remove('carousel-active')
    })
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('carousel-active');

    numberText()
    
    clearTimeout(slideInterval)

    slideInterval = setTimeout(()=>{
        slideIndex++
        showSlides(slideIndex)
    }, 15000)
}
