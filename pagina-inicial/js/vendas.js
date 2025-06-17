(() => {

  // Variáveis - pegando elementos com os mesmos IDs
  const btnAdicionarVendaVendas = document.getElementById('btnAdicionarVenda');
  const formVendaVendas = document.getElementById('formVenda');
  const selectProdutoVendas = document.getElementById('selectProduto');
  const quantidadeVendaVendas = document.getElementById('quantidadeVenda');
  const selectClienteVendas = document.getElementById('selectCliente');
  const valorTotalInputVendas = document.getElementById('valorTotal');
  const tbodyVendasVendas = document.getElementById('tbodyVendas');
  const contadorVendasVendas = document.getElementById('contadorVendas');

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

  function atualizarSelectProdutos() {
      selectProdutoVendas.innerHTML = '<option value="">Selecione um produto</option>';
      produtos.forEach(produto => {
          if (produto.quantidade > 0) {
              const option = document.createElement('option');
              option.value = produto.id;
              option.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)} (Estoque: ${produto.quantidade})`;
              selectProdutoVendas.appendChild(option);
          }
      });
  }

  function atualizarSelectClientes() {
      selectClienteVendas.innerHTML = '<option value="">Selecione um cliente</option>';
      clientes.forEach(cliente => {
          const option = document.createElement('option');
          option.value = cliente.id;
          option.textContent = cliente.nome;
          selectClienteVendas.appendChild(option);
      });
  }

  function calcularValorTotal() {
     console.log("Calculando valor total...");
      const produtoId = parseInt(selectProdutoVendas.value);
      const quantidade = parseInt(quantidadeVendaVendas.value);

      if (isNaN(produtoId) || isNaN(quantidade) || quantidade < 1) {
          valorTotalInputVendas.value = '';
          return;
      }

      const produto = produtos.find(p => p.id === produtoId);
      if (!produto) {
          valorTotalInputVendas.value = '';
          return;
      }

      const valorTotal = produto.preco * quantidade;
      valorTotalInputVendas.value = `R$ ${valorTotal.toFixed(2)}`;
  }

  function atualizarTabelaVendas() {
      tbodyVendasVendas.innerHTML = '';

      vendas.forEach(venda => {
          const cliente = clientes.find(c => c.id === venda.clienteId);
          const produto = produtos.find(p => p.id === venda.produtoId);

          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${venda.id}</td>
              <td>${cliente ? cliente.nome : 'Cliente não encontrado'}</td>
              <td>${produto ? produto.nome : 'Produto não encontrado'}</td>
              <td>${venda.quantidade}</td>
              <td>R$ ${(produto ? produto.preco * venda.quantidade : 0).toFixed(2)}</td>
              <td>${venda.data}</td>
              <td><button class="btnExcluir" data-id="${venda.id}">Excluir</button></td>
          `;
          tbodyVendasVendas.appendChild(tr);
      });

      contadorVendasVendas.textContent = vendas.length;
  }

  function excluirVenda(id) {
      const index = vendas.findIndex(v => v.id === id);
      if (index !== -1) {
          const venda = vendas[index];
          const produto = produtos.find(p => p.id === venda.produtoId);
          if (produto) {
              produto.quantidade += venda.quantidade;
          }

          vendas.splice(index, 1);
          localStorage.setItem('produtos', JSON.stringify(produtos));
          localStorage.setItem('vendas', JSON.stringify(vendas));

          atualizarTabelaVendas();
          atualizarSelectProdutos();
      }
  }

  btnAdicionarVendaVendas.addEventListener('click', () => {
      formVendaVendas.classList.toggle('visivel');
      if (formVendaVendas.classList.contains('visivel')) {
          atualizarSelectProdutos();
          atualizarSelectClientes();
          formVendaVendas.reset();
          valorTotalInputVendas.value = '';
      }
  });

  selectProdutoVendas.addEventListener('change', calcularValorTotal);
  quantidadeVendaVendas.addEventListener('input', calcularValorTotal);

  formVendaVendas.addEventListener('submit', e => {
      e.preventDefault();

      const clienteId = parseInt(selectClienteVendas.value);
      const produtoId = parseInt(selectProdutoVendas.value);
      const quantidade = parseInt(quantidadeVendaVendas.value);

      if (isNaN(clienteId) || isNaN(produtoId) || isNaN(quantidade) || quantidade < 1) {
          alert('Preencha todos os campos corretamente!');
          return;
      }

      const produto = produtos.find(p => p.id === produtoId);
      if (!produto) {
          alert('Produto não encontrado!');
          return;
      }

      if (quantidade > produto.quantidade) {
          alert('Quantidade excede o estoque disponível!');
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

      formVendaVendas.classList.add('oculto');
      formVendaVendas.reset();
      valorTotalInputVendas.value = '';

      atualizarTabelaVendas();
      atualizarSelectProdutos();
  });

  tbodyVendasVendas.addEventListener('click', (e) => {
      if (e.target.classList.contains('btnExcluir')) {
          const id = parseInt(e.target.dataset.id);
          if (confirm('Deseja excluir esta venda?')) {
              excluirVenda(id);
          }
      }
  });

  document.addEventListener('DOMContentLoaded', () => {
      atualizarTabelaVendas();
  });
})();
