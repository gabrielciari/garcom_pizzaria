<?php
$db = new PDO('sqlite:pedidos.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec("CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  instagram TEXT,
  email TEXT,
  carrinho TEXT,
  data_pedido TEXT
)");
$data = json_decode(file_get_contents('php://input'), true);
$nome = $data['nome'] ?? '';
$instagram = $data['instagram'] ?? '';
$email = $data['email'] ?? '';
$carrinho = json_encode($data['carrinho']);
$data_pedido = date('Y-m-d H:i:s');
$stmt = $db->prepare("INSERT INTO pedidos (nome, instagram, email, carrinho, data_pedido) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$nome, $instagram, $email, $carrinho, $data_pedido]);
echo json_encode(['status' => 'ok']);
?>