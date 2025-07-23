let cart = [];

function addToCart(vehicle, price) {
  cart.push({ vehicle, price });
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `${item.vehicle} - R$${item.price} <button onclick="removeFromCart(${index})">Remover</button>`;
    list.appendChild(li);
  });

  document.getElementById('total').innerText = `Total: R$${total}`;
}

function finalizarCompra() {
  if (cart.length === 0) {
    alert("Adicione algum veículo ao carrinho!");
    return;
  }

  const numeroWhatsApp = "5511999999999"; // coloque seu número com DDD aqui
  const texto = cart.map(item => `🚗 ${item.vehicle} - R$${item.price}`).join('%0A');
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const url = `https://wa.me/${numeroWhatsApp}?text=Olá! Quero alugar os seguintes veículos:%0A${texto}%0A%0ATotal: R$${total}`;
  window.open(url, '_blank');
}

function salvarFeedback() {
  const input = document.getElementById('feedback');
  const texto = input.value.trim();
  if (!texto) return;

  let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  feedbacks.push(texto);
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  input.value = '';
  renderFeedbacks();
}

function renderFeedbacks() {
  const div = document.getElementById('feedbacks');
  let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  div.innerHTML = '<h3>📝 Feedbacks anteriores:</h3><ul>' + feedbacks.map(f => `<li>${f}</li>`).join('') + '</ul>';
}

window.onload = renderFeedbacks;