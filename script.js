let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('itens-carrinho');
  const totalEl = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.onclick = () => removerDoCarrinho(index);
    li.appendChild(btn);
    lista.appendChild(li);
    total += item.preco;
  });

  totalEl.textContent = total.toFixed(2);
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Compra finalizada com sucesso!');
  carrinho = [];
  atualizarCarrinho();
}

function salvarFeedback() {
  const texto = document.getElementById('feedback-texto').value;
  if (!texto) return alert('Digite algo!');
  let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbacks.push(texto);
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  document.getElementById('feedback-texto').value = '';
  listarFeedbacks();
}

function listarFeedbacks() {
  const lista = document.getElementById('lista-feedbacks');
  lista.innerHTML = '';
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbacks.forEach(txt => {
    const li = document.createElement('li');
    li.textContent = txt;
    lista.appendChild(li);
  });
}

listarFeedbacks();