const expansaoMenu = document.getElementById('iconeMenu');
const menu = document.getElementsByClassName('menu')[0];
const iconeGeral = document.getElementById('iconeGeral');
const iconeCliente = document.getElementById('iconeCliente');
const iconeEstoque = document.getElementById('iconeEstoque');
const iconeVendas = document.getElementById('iconeVendas');
const saudacaoEmpresa = document.querySelector('.saudacaoEmpresa');
const usuarioIcone = document.getElementById('usuario');
const menuUsuario = document.getElementById('menuUsuario');
const perfilInfo = document.getElementById('perfilInfo');
const perfilEmail = document.getElementById('perfilEmail');
const perfilSenha = document.getElementById('perfilSenha');
const iconeModoEscuro = document.querySelector('#iconeModoEscuro input'); // Referência ao input
const body = document.body;

const loggedInUser = localStorage.getItem('loggedInUser');
const fullName = localStorage.getItem('fullName');
if (fullName) {
    saudacaoEmpresa.textContent = `Olá! ${fullName}`;
}

const userProfiles = {
    thales: {
        username: 'Thales Bellé',
        email: 'thalesbelle@gmail.com',
        senha: '1234',
        cargo: 'Gerente'
    },
    aryel: {
        username: 'Aryel Curi',
        email: 'aryelcuri@gmail.com',
        senha: '12345',
        cargo: 'Gerente'
    }
};

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

iconeGeral.addEventListener('mouseenter', function() {
    iconeGeral.src = '../images/Icone de Menu.png';
});
iconeGeral.addEventListener('mouseleave', function() {
    if (!window.location.pathname.includes('pagina-inicial.html')) {
        iconeGeral.src = '../images/Icone menu Oco.png';
    }
});

iconeCliente.addEventListener('mouseenter', function() {
    iconeCliente.src = '../images/Icone de Cliente Branco.png';
});
iconeCliente.addEventListener('mouseleave', function() {
    if (!window.location.pathname.includes('clientes.html')) {
        iconeCliente.src = '../images/Icone de Cliente.png';
    }
});

iconeEstoque.addEventListener('mouseenter', function() {
    iconeEstoque.src = '../images/Icone de Estoque Branco.png';
});
iconeEstoque.addEventListener('mouseleave', function() {
    if (!window.location.pathname.includes('estoque.html')) {
        iconeEstoque.src = '../images/Icone de Estoque.png';
    }
});

iconeVendas.addEventListener('mouseenter', function() {
    iconeVendas.src = '../images/Icone de Venda Branco.png';
});
iconeVendas.addEventListener('mouseleave', function() {
    if (!window.location.pathname.includes('vendas.html')) {
        iconeVendas.src = '../images/Icone de Venda.png';
    }
});

expansaoMenu.addEventListener('click', function() {
    menu.classList.toggle('expansaoMenu');
    expansaoMenu.classList.toggle('icone-expandido');
    
    if (menu.classList.contains('expansaoMenu')) {
        expansaoMenu.src = '../images/Seta de Menu Fechar.png';
    } else {
        expansaoMenu.src = '../images/Seta de Menu.png';
    }
});

usuarioIcone.addEventListener('click', (e) => {
    e.stopPropagation();
    menuUsuario.classList.toggle('oculto');
    perfilInfo.classList.add('oculto');
    if (loggedInUser && userProfiles[loggedInUser]) {
        perfilEmail.textContent = userProfiles[loggedInUser].email;
        perfilSenha.textContent = '****';
    }
});

document.addEventListener('click', (e) => {
    if (!menuUsuario.classList.contains('oculto') && !menuUsuario.contains(e.target) && e.target !== usuarioIcone) {
        menuUsuario.classList.add('oculto');
        perfilInfo.classList.add('oculto');
        if (loggedInUser && userProfiles[loggedInUser]) {
            perfilEmail.textContent = userProfiles[loggedInUser].email;
            perfilSenha.textContent = '****';
        }
    }
});

function mostrarPerfil() {
    const user = userProfiles[loggedInUser];
    if (user) {
        document.getElementById('perfilUsername').textContent = user.username;
        document.getElementById('perfilEmail').textContent = user.email;
        document.getElementById('perfilCargo').textContent = user.cargo;
        perfilInfo.classList.toggle('oculto');
        menuUsuario.classList.remove('oculto');
    } else {
        alert('Nenhum usuário logado.');
    }
}

function abrirPagina(pagina) {
    alert(`Abrir página: ${pagina}`);
}

function confirmarSaida() {
    const confirmacao = confirm("Tem certeza que deseja sair da conta?");
    if (confirmacao) {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('fullName');
        alert("Logout executado!");
        window.location.href = '../../telaLogin/telaLogin.html';
    }
}

window.getSenhaUsuarioAtual = function() {
    const user = userProfiles[localStorage.getItem('loggedInUser')];
    return user ? user.senha : null;
};

// Evento para o modo escuro
iconeModoEscuro.addEventListener('change', (e) => {
    body.classList.toggle('bodyEscuro');
    localStorage.setItem('modoEscuro', body.classList.contains('bodyEscuro')); // Salvar estado
});

// Carregar estado do modo escuro
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('modoEscuro') === 'true') {
        body.classList.add('bodyEscuro');
        iconeModoEscuro.checked = true;
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Modo escuro
    if (localStorage.getItem('modoEscuro') === 'true') {
        body.classList.add('bodyEscuro');
        iconeModoEscuro.checked = true;
    }

    // Contadores da dashboard (clientes, produtos, vendas)
    if (window.location.pathname.includes('pagina-inicial.html')) {
        const contadorClientes = document.getElementById('contadorClientes');
        const contadorProdutos = document.getElementById('contadorProdutos');
        const contadorVendas = document.getElementById('contadorVendas');

        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const vendas = JSON.parse(localStorage.getItem('vendas')) || [];

        if (contadorClientes) contadorClientes.textContent = clientes.length;
        if (contadorProdutos) contadorProdutos.textContent = produtos.length;
        if (contadorVendas) contadorVendas.textContent = vendas.length;
    }
});
