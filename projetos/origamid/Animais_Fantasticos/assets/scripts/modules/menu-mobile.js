import outsideClick from "./oustideclick.js";

export default function initMenuMobile(){
    const menuButton = document.querySelector('[data-menu="button"]')
    const menuList = document.querySelector('[data-menu="list"]')
    const eventos = ['click'] //['touchstart'] -> Não funciona correto

    if(!menuButton) return

    function openMenu(event){
        menuList.classList.add('active')
        menuButton.classList.add('active')
        outsideClick(menuList, eventos, ()=>{
            menuList.classList.remove('active')
            menuButton.classList.remove('active')
        })
    }

    eventos.forEach(userEvent=> menuButton.addEventListener(userEvent, openMenu))
}