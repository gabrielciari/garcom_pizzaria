const produtos = [
  { nome: "Ração Premium 10kg", preco: 89.99, imagem: "https://via.placeholder.com/300x200?text=Ração" },
  { nome: "Bifinho Petisco 500g", preco: 19.90, imagem: "https://via.placeholder.com/300x200?text=Petisco" },
  { nome: "Bolinha de Borracha", preco: 9.90, imagem: "https://via.placeholder.com/300x200?text=Brinquedo" },
  { nome: "Vale-Compras Digital", preco: 50.00, imagem: "https://via.placeholder.com/300x200?text=Vale+Compras" },
];

let carrinho = [];

function renderProducts() {
  const container = document.getElementById("product-list");
  produtos.forEach((prod, i) => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="card">
        <img src="${prod.imagem}" class="card-img-top" alt="${prod.nome}">
        <div class="card-body">
          <h5 class="card-title">${prod.nome}</h5>
          <p class="card-text">R$ ${prod.preco.toFixed(2)}</p>
          <button class="btn btn-primary w-100" onclick="adicionar(${i})">Adicionar</button>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

function adicionar(i) {
  carrinho.push(produtos[i]);
  document.getElementById("cart-count").innerText = carrinho.length;
}

function sendWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }
  let mensagem = "Olá! Gostaria de fazer o pedido:\n";
  carrinho.forEach(p => mensagem += `• ${p.nome} - R$ ${p.preco.toFixed(2)}\n`);
  const url = `https://wa.me/5511988553006?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

renderProducts();