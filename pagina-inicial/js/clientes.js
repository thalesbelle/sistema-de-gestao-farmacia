// Funções para acessar e salvar clientes no localStorage
function obterClientes() {
    const data = localStorage.getItem('clientes');
    return data ? JSON.parse(data) : [];
}

function salvarClientes(clientes) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Renderiza a lista de clientes na tabela e atualiza contador
function renderizarClientes() {
    const lista = document.getElementById('listaClientes');
    const contadorClientesSpan = document.getElementById('contadorClientes');
    const clientes = obterClientes();

    if (clientes.length === 0) {
        lista.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
        contadorClientesSpan.textContent = '0';
        return;
    }

    // Criar tabela
    const table = document.createElement('table');

    // Cabeçalho da tabela
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Idade</th>
            <th>Excluir</th>
        </tr>
    `;
    table.appendChild(thead);

    // Corpo da tabela
    const tbody = document.createElement('tbody');

    clientes.forEach((cliente, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.idade}</td>
            <td><button class="btnExcluir" data-index="${index}" title="Excluir cliente">&times;</button></td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    lista.innerHTML = '';
    lista.appendChild(table);

    // Atualiza o contador de clientes
    contadorClientesSpan.textContent = clientes.length;

    // Adiciona evento para os botões de excluir
    document.querySelectorAll('.btnExcluir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-index');
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                excluirCliente(parseInt(idx));
            }
        });
    });
}

// Exclui um cliente pelo índice e atualiza a lista
function excluirCliente(index) {
    const clientes = obterClientes();
    clientes.splice(index, 1);
    salvarClientes(clientes);
    renderizarClientes();
}

// Mostra ou esconde o formulário de cadastro
function toggleFormulario() {
    const form = document.getElementById('formCliente');
    form.classList.toggle('oculto');
}

// Cadastra novo cliente, salva e atualiza a lista
function cadastrarCliente(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeCliente').value.trim();
    const email = document.getElementById('emailCliente').value.trim();
    const telefone = document.getElementById('telefoneCliente').value.trim();
    const idade = document.getElementById('idadeCliente').value.trim();

    if (!nome || !email || !telefone || !idade) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const novoCliente = { nome, email, telefone, idade };
    const clientes = obterClientes();
    clientes.push(novoCliente);
    salvarClientes(clientes);

    document.getElementById('formCliente').reset();
    document.getElementById('formCliente').classList.add('oculto');

    renderizarClientes();
}

// Inicializa eventos após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAdicionarCliente').addEventListener('click', toggleFormulario);
    document.getElementById('formCliente').addEventListener('submit', cadastrarCliente);

    renderizarClientes();
});
