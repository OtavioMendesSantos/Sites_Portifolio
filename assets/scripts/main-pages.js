/* Header */
function createHeader(){
    const headerJs = document.createElement('header')

    const divLogo = document.createElement('div')
    divLogo.classList.add('logo')
    
    const linkHome = document.createElement('a')
    linkHome.setAttribute('href', '../index.html') 

    const imgLogo = document.createElement('img')
    imgLogo.setAttribute('src', '../assets/imgs/logo1024.png')
    imgLogo.setAttribute('alt', 'logo')
    
    const nav = document.createElement('nav')
    
    const divMenuHamburguer = document.createElement('div')
    divMenuHamburguer.classList.add('menu-hamburguer')
    const imgMenu = document.createElement('img')
    imgMenu.setAttribute('src', "../assets/svg/menu-hamburguer.svg")
    
    const ulMenu = document.createElement('ul')
    ulMenu.classList.add('menu')
    
    const li = [];
    const link = [];
    const menuItens = ['Formação', 'Contatos', 'Projetos', 'Hobbies'];
    const menuLinks = ['formacao.html', 'contatos.html', 'projetos.html', 'hobbies.html'];
    menuItens.forEach((item, index)=>{
        li[index] = document.createElement('li')
        li[index].classList.add('linkMenu')
        ulMenu.appendChild(li[index])

        link[index] = document.createElement('a')
        li[index].appendChild(link[index])

        link[index].innerText = item
        link[index].setAttribute('href', menuLinks[index])
    })
    
    /* Adicionando os elementos criados */
    document.body.prepend(headerJs)
    headerJs.appendChild(divLogo)
    divLogo.appendChild(linkHome)
    linkHome.appendChild(imgLogo)
    headerJs.appendChild(nav)
    nav.appendChild(divMenuHamburguer)
    divMenuHamburguer.appendChild(imgMenu)
    nav.appendChild(ulMenu)
}
createHeader()

/* Menu-Hamburguer */
function showMenu(){
    const buttonMenuHamburguer = document.querySelector('.menu-hamburguer')
    const imgMenuHamburguer = document.querySelector('.menu-hamburguer>img')
    const menuHamburguer =  document.querySelector('ul.menu')
    
    buttonMenuHamburguer.addEventListener('click', dropMenu)
    function dropMenu(){
        menuHamburguer.classList.toggle('showMenu')
    }
    
    window.onclick = (event)=>{
        if (event.target != buttonMenuHamburguer && event.target != imgMenuHamburguer){
            if(menuHamburguer.classList.contains('showMenu')){
                menuHamburguer.classList.remove('showMenu')
            }
        }
    }
}
showMenu()