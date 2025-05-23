const expansaoMenu = document.getElementById('iconeMenu');
const menu = document.getElementsByClassName('menu')[0]; 

expansaoMenu.addEventListener('click', function() {
    menu.classList.toggle('expansaoMenu'); 
});
