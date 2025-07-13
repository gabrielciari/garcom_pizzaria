<?php
$db = new PDO('sqlite:pedidos.db');
$pedidos = $db->query("SELECT * FROM pedidos ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><title>Pedidos</title></head><body>
<h1>Pedidos Recebidos</h1>
<?php foreach($pedidos as $p): ?>
<div style="margin-bottom:20px;border-bottom:1px solid #ccc;">
  <p><strong>Nome:</strong> <?= htmlspecialchars($p['nome']) ?></p>
  <p><strong>Instagram:</strong> <?= htmlspecialchars($p['instagram']) ?></p>
  <p><strong>Email:</strong> <?= htmlspecialchars($p['email']) ?></p>
  <p><strong>Data:</strong> <?= $p['data_pedido'] ?></p>
  <p><strong>Carrinho:</strong> <?= htmlspecialchars($p['carrinho']) ?></p>
</div>
<?php endforeach; ?>
</body></html>