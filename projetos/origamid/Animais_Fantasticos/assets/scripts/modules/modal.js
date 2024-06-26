export default class initModal{
    constructor(botaoAbrir, botaoFechar, containerModal){
        this.botaoAbrir = document.querySelector(botaoAbrir)
        this.botaoFechar = document.querySelector(botaoFechar)
        this.containerModal = document.querySelector(containerModal)
        
        // bind this para fazer referencia ao objeto da classe
        this.eventToggleModal = this.eventToggleModal.bind(this)
        this.cliqueForaModal = this.cliqueForaModal.bind(this)
    }
    
    toggleModal(event){
        this.containerModal.classList.toggle('ativo')
    }
    
    // abre ou fecha o modal
    eventToggleModal(event){
        event.preventDefault()
        this.toggleModal()
    }

    // Fecha ao clicar do lado de fora
    cliqueForaModal(event){
        if (event.target === this.containerModal) this.toggleModal()
    }

    // adiciona os eventos aos elementos
    addModalEvent(){
        this.botaoAbrir.addEventListener('click', this.eventToggleModal)
        this.botaoFechar.addEventListener('click', this.eventToggleModal)
        this.containerModal.addEventListener('click', this.cliqueForaModal)
    }
 
    init(){
        if(this.botaoAbrir && this.botaoFechar && this.containerModal){
            this.addModalEvent()
        }
        return this
    }  
}