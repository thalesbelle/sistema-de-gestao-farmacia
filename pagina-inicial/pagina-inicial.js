const expansaoMenu = document.getElementById('iconeMenu');
const menu = document.getElementsByClassName('menu')[0]; 
console.log(menu);

expansaoMenu.addEventListener('click', function() {
    menu.classList.toggle('expansaoMenu'); 
});