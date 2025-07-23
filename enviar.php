<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $nota = $_POST['nota'];
    $comentario = htmlspecialchars($_POST['comentario']);

    // Salvar em arquivo (pode ser banco depois)
    $linha = "$nome | $email | Nota: $nota | Comentário: $comentario\n";
    file_put_contents("feedbacks.txt", $linha, FILE_APPEND);

    header("Location: obrigado.html");
    exit();
}
?>
