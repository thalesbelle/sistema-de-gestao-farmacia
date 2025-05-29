const expansaoMenu = document.getElementById('iconeMenu');
const menu = document.getElementsByClassName('menu')[0];
const iconeGeral = document.getElementById('iconeGeral');
const iconeCliente = document.getElementById('iconeCliente');
const iconeEstoque = document.getElementById('iconeEstoque');
const iconeVendas= document.getElementById('iconeVendas');

if (window.location.pathname.includes('pagina-inicial.html')) {
    iconeGeral.src = '../images/Icone de Menu.png'; 
} else {
    iconeGeral.src = '../images/Icone menu Oco.png'; 
}

if (window.location.pathname.includes('clientes.html')) {
    iconeCliente.src = '../images/Icone de Cliente Branco.png'; 
} else {
    iconeCliente.src = '../images/Icone de Cliente.png'; 
}

if (window.location.pathname.includes('estoque.html')) {
    iconeEstoque.src = '../images/Icone de Estoque Branco.png'; 
} else {
    iconeEstoque.src = '../images/Icone de Estoque.png'; 
}

if (window.location.pathname.includes('vendas.html')) {
    iconeVendas.src = '../images/Icone de Venda Branco.png'; 
} else {
    iconeVendas.src = '../images/Icone de Venda.png'; 
}

expansaoMenu.addEventListener('click', function() {
    menu.classList.toggle('expansaoMenu');
    expansaoMenu.classList.toggle('icone-expandido');
    
    if (menu.classList.contains('expansaoMenu')) {
        expansaoMenu.src = '../images/Seta de Menu Fechar.png'; 
    } else {
        expansaoMenu.src = '../images/Seta de Menu.png'; 
    }
});