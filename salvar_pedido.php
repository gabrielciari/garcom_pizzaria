<?php
// Ativar erros
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Receber os dados em JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Verificar se dados básicos existem
if (!isset($data['nome'], $data['instagram'], $data['email'], $data['carrinho'])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

// Conectar ou criar o banco SQLite
$db = new PDO('sqlite:pedidos.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Criar tabela se não existir
$db->exec("CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    instagram TEXT,
    email TEXT,
    carrinho TEXT,
    data_pedido TEXT
)");

// Inserir o pedido
$stmt = $db->prepare("INSERT INTO pedidos (nome, instagram, email, carrinho, data_pedido) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([
    $data['nome'],
    $data['instagram'],
    $data['email'],
    json_encode($data['carrinho']),
    date('Y-m-d H:i:s')
]);

echo json_encode(['status' => 'Pedido salvo com sucesso']);