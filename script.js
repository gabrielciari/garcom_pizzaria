
const produtos = [
  { id: 1, nome: "Ração Special Dog Carne (Granel)", preco: 8.5, imagem: "https://i.imgur.com/IEwD1zM.jpg" },
  { id: 2, nome: "Origens Class 15kg", preco: 139.99, imagem: "https://i.imgur.com/GwwhGx7.jpg" },
  { id: 3, nome: "Areia Gatissimo 5kg", preco: 14.90, imagem: "https://i.imgur.com/fhD6A1k.jpg" }
];

let carrinho = [];

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - ${item.qtd} x R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    total += item.qtd * item.preco;
  });

  document.getElementById("total").textContent = "Total: R$ " + total.toFixed(2);
}

function adicionarAoCarrinho(produto) {
  const qtd = produto.nome.includes("Granel") ? parseFloat(prompt("Quantos kg?")) : 1;
  if (!qtd || qtd <= 0) return;

  carrinho.push({ ...produto, qtd });
  atualizarCarrinho();
}

function mostrarProdutos() {
  const container = document.getElementById("produtos");
  produtos.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}${produto.nome.includes("Granel") ? " /kg" : ""}</p>
      <button onclick='adicionarAoCarrinho(${JSON.stringify(produto)})'>Adicionar</button>
    `;
    container.appendChild(div);
  });
}

function calcularFrete() {
  const cep = document.getElementById("cep").value;
  const frete = cep.startsWith("01") ? 5 : 15;
  document.getElementById("valor-frete").textContent = "Frete: R$ " + frete.toFixed(2);
}

function finalizarCompra() {
  const nome = document.getElementById("nome").value;
  const tel = document.getElementById("telefone").value;
  const end = document.getElementById("endereco").value;
  if (!nome || !tel || !end || carrinho.length === 0) {
    alert("Preencha todos os campos e adicione produtos.");
    return;
  }

  let msg = `Pedido de ${nome} (%2B55${tel})%0AEndereço: ${end}%0AItens:%0A`;
  carrinho.forEach(item => {
    msg += `• ${item.nome} - ${item.qtd} x R$ ${item.preco.toFixed(2)}%0A`;
  });

  const total = carrinho.reduce((t, i) => t + i.qtd * i.preco, 0);
  msg += `%0ATotal: R$ ${total.toFixed(2)}`;

  window.open("https://wa.me/5511940678019?text=" + msg, "_blank");
}

window.onload = mostrarProdutos;
