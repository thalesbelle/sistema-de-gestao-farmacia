function obterProdutos() {
    const data = localStorage.getItem('produtos');
    return data ? JSON.parse(data) : [];
}

function salvarProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function renderizarProdutos() {
    const lista = document.getElementById('listaProdutos');
    const contadorProdutosSpan = document.getElementById('contadorProdutos');
    const produtos = obterProdutos();

    if (produtos.length === 0) {
        lista.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        if (contadorProdutosSpan) {
            contadorProdutosSpan.textContent = '0';
        }
        return;
    }

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Código</th>
            <th>Quantidade</th>
            <th>Excluir</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    produtos.forEach((produto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.valor}</td>
            <td>${produto.codigo}</td>
            <td>${produto.quantidade}</td>
            <td><button class="btnExcluir" data-index="${index}" title="Excluir produto">×</button></td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    lista.innerHTML = '';
    lista.appendChild(table);

    if (contadorProdutosSpan) {
        contadorProdutosSpan.textContent = produtos.length;
    }

    document.querySelectorAll('.btnExcluir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-index');
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                excluirProduto(parseInt(idx));
            }
        });
    });
}

function excluirProduto(index) {
    const produtos = obterProdutos();
    produtos.splice(index, 1);
    salvarProdutos(produtos);
    renderizarProdutos();
}

function toggleFormulario() {
    const form = document.getElementById('formProduto');
    form.classList.toggle('oculto');
}

function cadastrarProduto(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeProduto').value.trim();
    const valor = document.getElementById('valorProduto').value.trim();
    const codigo = document.getElementById('codigoProduto').value.trim();
    const quantidade = document.getElementById('quantidadeProduto').value.trim();

    if (!nome || !valor || !codigo || !quantidade) {
        alert('Preencha todos os campos.');
        return;
    }

    const novoProduto = { nome, valor, codigo, quantidade };
    const produtos = obterProdutos();
    produtos.push(novoProduto);
    salvarProdutos(produtos);

    document.getElementById('formProduto').reset();
    document.getElementById('formProduto').classList.add('oculto');

    renderizarProdutos();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnAdicionarProduto').addEventListener('click', toggleFormulario);
    document.getElementById('formProduto').addEventListener('submit', cadastrarProduto);

    renderizarProdutos();
});