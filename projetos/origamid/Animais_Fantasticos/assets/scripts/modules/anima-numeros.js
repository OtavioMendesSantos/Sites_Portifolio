export default class AnimaNumeros{
    constructor(numeros, observerTarget, observerClass){
        this.numeros = document.querySelectorAll(numeros)
        this.observerTarget = document.querySelector(observerTarget)
        this.observerClass = observerClass
        // bind o this do objeto ao callback da mutação
        this.handleMutation = this.handleMutation.bind(this)
    }

    // Recebe elemento do DOM com número em seu texto, incrementa de 0 até seu valor final
    static incrementarNumero(numero){
        const total = +numero.innerText
        const incremento = Math.floor(total/100)
        let start = 0;
        const timer = setInterval(()=>{
            start += incremento
            numero.innerText = start
            if(start > total){
                numero.innerText = total
                clearInterval(timer)
            }
        }, 25 * Math.random())
    }

    // Ativa incrementar número para cada número selecionado
    animaNumeros(){    
        this.numeros.forEach(numero => this.constructor.incrementarNumero(numero))
    }
    
    // Adiciona o MutationObserver para verificar quando a classe ativo é adicionada ao elemento target
    handleMutation(mutation){
        if (mutation[0].target.classList.contains(this.observerClass)) {
            this.observer.disconnect()
            this.animaNumeros()
        }
    }

    // Ocorre quando a mutação ocorrer
    addMutationObserver(){
        this.observer = new MutationObserver(this.handleMutation);
        this.observer.observe(this.observerTarget, {attributes: true})        
    }

    init(){
        if (this.numeros.length && this.observerTarget && this.observerClass) {
            this.addMutationObserver()
        }
        return this
    }
}