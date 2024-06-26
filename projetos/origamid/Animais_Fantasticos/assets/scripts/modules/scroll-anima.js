import debounce from './debounce.js';

//Animação ao Scroll
export default class ScrollAnima{
    constructor(sections){
        this.sections = document.querySelectorAll(sections)
        this.windowMetade = window.innerHeight * 0.60

        this.checkDistance = debounce(this.checkDistance.bind(this), 100)
    }
    
    // pega a distância de cada item em relação ao topo do site
    getDistance(){
        this.distance = [...this.sections].map((section) => {
            const offset = section.offsetTop
            return {
                element: section,
                offset: Math.floor(offset - this.windowMetade),
            }
        })
    }

    // Verifica a distância de cada objeto em relação ao scroll do site 
    checkDistance() {
        this.distance.forEach((item) => {
            if(window.pageYOffset > item.offset) {
                item.element.classList.add('ativo')
            } else if (item.element.classList.contains('ativo')) {
                item.element.classList.remove('ativo')
            }
        })
    }
    
    init(){
        if (this.sections.length) {
            this.getDistance()
            this.checkDistance()
            window.addEventListener('scroll', this.checkDistance)
        }
        return this
    }

    // Remove o evento de scroll
    stop(){
        window.removeEventListener('scroll', this.checkDistance)
    }
}
