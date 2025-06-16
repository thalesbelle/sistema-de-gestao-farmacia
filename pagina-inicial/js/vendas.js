document.addEventListener('DOMContentLoaded', () => {
    const btnAdicionarVenda = document.getElementById('btnAdicionarVenda');
    const forms = document.querySelector('.forms');
    const btnSalvarVenda = document.getElementById('btnSalvarVenda');
    const selectCliente = document.getElementById('selectCliente');
    const selectProduto = document.getElementById('selectProduto');
    const quantidadeVenda = document.getElementById('quantidadeVenda');
    const valorTotalInput = document.getElementById('valorTotal');
    const tbodyVendas = document.getElementById('tbodyVendas');
    const contadorVendas = document.getElementById('contadorVendas');

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

    contadorVendas.textContent = vendas.length;

    function atualizarSelectClientes() {
        selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            selectCliente.appendChild(option);
        });
    }

    function atualizarSelectProdutos() {
        selectProduto.innerHTML = '<option value="">Selecione um produto</option>';
        produtos.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.id;
            option.textContent = `${produto.nome} (R$${parseFloat(produto.preco).toFixed(2)})`;
            option.dataset.preco = produto.preco;
            selectProduto.appendChild(option);
        });
    }

    function atualizarTabelaVendas() {
        tbodyVendas.innerHTML = '';
        vendas.forEach(venda => {
            const cliente = clientes.find(c => c.id === venda.clienteId);
            const produto = produtos.find(p => p.id === venda.produtoId);
            const valorTotal = (venda.quantidade * (produto?.preco || 0)).toFixed(2);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${venda.id}</td>
                <td>${cliente?.nome || 'Desconhecido'}</td>
                <td>${produto?.nome || 'Desconhecido'}</td>
                <td>${venda.quantidade}</td>
                <td>R$${valorTotal}</td>
                <td>${venda.data}</td>
                <td><button class="btnExcluir" data-id="${venda.id}">Excluir</button></td>
            `;
            tbodyVendas.appendChild(tr);
        });

        document.querySelectorAll('.btnExcluir').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                vendas = vendas.filter(v => v.id !== id);
                localStorage.setItem('vendas', JSON.stringify(vendas));
                contadorVendas.textContent = vendas.length;
                atualizarTabelaVendas();
            });
        });
    }

    btnAdicionarVenda.addEventListener('click', () => {
        forms.classList.toggle('visivel');
        if (forms.classList.contains('visivel')) {
            atualizarSelectClientes();
            atualizarSelectProdutos();
        }
    });

    selectProduto.addEventListener('change', () => {
        calcularValorTotal();
    });

    quantidadeVenda.addEventListener('input', () => {
        calcularValorTotal();
    });

    function calcularValorTotal() {
        const produtoId = parseInt(selectProduto.value);
        const quantidade = parseInt(quantidadeVenda.value);
        const produto = produtos.find(p => p.id === produtoId);

        if (produto && quantidade > 0) {
            const valorTotal = quantidade * parseFloat(produto.preco);
            valorTotalInput.value = `R$ ${valorTotal.toFixed(2)}`;
        } else {
            valorTotalInput.value = '';
        }
    }

    btnSalvarVenda.addEventListener('click', () => {
        const clienteId = parseInt(selectCliente.value);
        const produtoId = parseInt(selectProduto.value);
        const quantidade = parseInt(quantidadeVenda.value);

        if (!clienteId || !produtoId || !quantidade || quantidade < 1) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        const produto = produtos.find(p => p.id === produtoId);
        if (quantidade > produto.quantidade) {
            alert('Quantidade solicitada excede o estoque disponível!');
            return;
        }

        const novaVenda = {
            id: vendas.length > 0 ? Math.max(...vendas.map(v => v.id)) + 1 : 1,
            clienteId,
            produtoId,
            quantidade,
            data: new Date().toLocaleDateString('pt-BR')
        };

        produto.quantidade -= quantidade;
        vendas.push(novaVenda);

        localStorage.setItem('produtos', JSON.stringify(produtos));
        localStorage.setItem('vendas', JSON.stringify(vendas));

        contadorVendas.textContent = vendas.length;

        selectCliente.value = '';
        selectProduto.value = '';
        quantidadeVenda.value = '';
        valorTotalInput.value = '';
        forms.classList.remove('visivel');

        atualizarTabelaVendas();
    });

    atualizarSelectClientes();
    atualizarSelectProdutos();
    atualizarTabelaVendas();
});
