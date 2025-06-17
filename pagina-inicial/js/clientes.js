function obterClientes() {
    const data = localStorage.getItem('clientes');
    return data ? JSON.parse(data) : [];
}

function salvarClientes(clientes) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function renderizarClientes() {
    const lista = document.getElementById('listaClientes');
    const contadorClientesSpan = document.getElementById('contadorClientes');
    const clientes = obterClientes();

    if (clientes.length === 0) {
        lista.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
        contadorClientesSpan.textContent = '0';
        return;
    }

    const table = document.createElement('table');

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

    contadorClientesSpan.textContent = clientes.length;

    document.querySelectorAll('.btnExcluir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-index');
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                excluirCliente(parseInt(idx));
            }
        });
    });
}

function excluirCliente(index) {
    const clientes = obterClientes();
    clientes.splice(index, 1);
    salvarClientes(clientes);
    renderizarClientes();
}

function toggleFormulario() {
    const form = document.getElementById('formCliente');
    form.classList.toggle('visivel');
}

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

       const clientes = obterClientes();
       const novoCliente = { id: clientes.length + 1, nome, email, telefone, idade }; // Adicionando um ID
       clientes.push(novoCliente);
       salvarClientes(clientes);

       document.getElementById('formCliente').reset();
       document.getElementById('formCliente').classList.add('oculto');

       renderizarClientes();
   }
   

document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('formCliente')) {
        document.getElementById('btnAdicionarCliente').addEventListener('click', toggleFormulario);
        document.getElementById('formCliente').addEventListener('submit', cadastrarCliente);
        renderizarClientes();
    } else {

        atualizarContadorClientesSimples();
    }
});


function atualizarContadorClientesSimples() {
    const span = document.getElementById('contadorClientes');
    if (span) {
        const clientes = obterClientes();
        span.textContent = clientes.length;
    }
}
