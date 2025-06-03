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

// Update greeting based on logged-in user
const loggedInUser = localStorage.getItem('loggedInUser');
const fullName = localStorage.getItem('fullName');
if (fullName) {
    saudacaoEmpresa.textContent = `Olá! ${fullName}`;
}

// Profile data
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
        senha: '1234',
        cargo: 'Gerente'
    }
};

// Function to mask email
function maskEmail(email) {
    const [localPart, domain] = email.split('@');
    return `${localPart[0]}*****@${domain}`;
}

// Icon page-based logic
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

// Icon hover effects
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

// Menu toggle
expansaoMenu.addEventListener('click', function() {
    menu.classList.toggle('expansaoMenu');
    expansaoMenu.classList.toggle('icone-expandido');
    
    if (menu.classList.contains('expansaoMenu')) {
        expansaoMenu.src = '../images/Seta de Menu Fechar.png'; 
    } else {
        expansaoMenu.src = '../images/Seta de Menu.png'; 
    }
});

// User menu toggle
usuarioIcone.addEventListener('click', (e) => {
    e.stopPropagation();
    menuUsuario.classList.toggle('oculto');
    perfilInfo.classList.add('oculto'); // Hide profile on menu toggle
    // Reset email and password display
    if (loggedInUser && userProfiles[loggedInUser]) {
        perfilEmail.textContent = maskEmail(userProfiles[loggedInUser].email);
        perfilSenha.textContent = '****';
    }
});

// Close user menu on outside click
document.addEventListener('click', (e) => {
    if (!menuUsuario.classList.contains('oculto') && !menuUsuario.contains(e.target) && e.target !== usuarioIcone) {
        menuUsuario.classList.add('oculto');
        perfilInfo.classList.add('oculto');
        // Reset email and password display
        if (loggedInUser && userProfiles[loggedInUser]) {
            perfilEmail.textContent = maskEmail(userProfiles[loggedInUser].email);
            perfilSenha.textContent = '****';
        }
    }
});

// Show profile information
function mostrarPerfil() {
    const user = userProfiles[loggedInUser];
    if (user) {
        document.getElementById('perfilUsername').textContent = user.username;
        document.getElementById('perfilEmail').textContent = maskEmail(user.email);
        document.getElementById('perfilCargo').textContent = user.cargo;
        perfilInfo.classList.toggle('oculto');
        // Ensure menu stays open when showing profile
        menuUsuario.classList.remove('oculto');
    } else {
        alert('Nenhum usuário logado.');
    }
}

// Email click handler
perfilEmail.addEventListener('click', () => {
    const user = userProfiles[loggedInUser];
    if (user) {
        const input = prompt('Digite sua senha para ver o email:');
        if (input === user.senha) {
            perfilEmail.textContent = user.email;
        } else {
            alert('Senha incorreta.');
        }
    }
});

// Password click handler
perfilSenha.addEventListener('click', () => {
    const user = userProfiles[loggedInUser];
    if (user) {
        const input = prompt('Digite seu email para ver a senha:');
        if (input === user.email) {
            perfilSenha.textContent = user.senha;
        } else {
            alert('Email incorreto.');
        }
    }
});

function abrirPagina(pagina) {
    alert(`Abrir página: ${pagina}`);
}

function confirmarSaida() {
    const confirmacao = confirm("Tem certeza que deseja sair da conta?");
    if (confirmacao) {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('fullName');
        alert("Logout executado (placeholder)");
        window.location.href = '../../telaLogin/telaLogin.html';
    }
}