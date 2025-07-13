
document.getElementById('pedidoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const quantidade = document.getElementById('quantidade').value;

  const msg = `🚀 Pedido de Seguidores:%0A👤 Nome: ${nome}%0A📱 Perfil: @${usuario}%0A🔢 Quantidade: ${quantidade}`;
  const url = `https://wa.me/5511988553006?text=${msg}`;
  window.open(url, '_blank');
});
