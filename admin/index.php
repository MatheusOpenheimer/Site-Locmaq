<?php
declare(strict_types=1);

require_once __DIR__ . '/../db.php';

// ---------- Sessão ----------
session_name('locmaq_admin');
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure'   => !empty($_SERVER['HTTPS']),
]);
session_start();

if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
}

function csrf_valido(): bool
{
    return isset($_POST['csrf']) && hash_equals($_SESSION['csrf'], (string) $_POST['csrf']);
}

function campo_csrf(): string
{
    return '<input type="hidden" name="csrf" value="' . e($_SESSION['csrf']) . '">';
}

function ip_cliente(): string
{
    return substr((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'), 0, 45);
}

function avisar(string $tipo, string $texto): void
{
    $_SESSION['aviso'] = [$tipo, $texto];
}

function voltar(string $destino = 'index.php')
{
    header('Location: ' . $destino);
    exit;
}

// ---------- Imagens ----------
function salvar_imagem(array $arq): string
{
    if ($arq['error'] !== UPLOAD_ERR_OK) {
        $msgs = [
            UPLOAD_ERR_INI_SIZE  => 'A imagem é maior que o limite do servidor.',
            UPLOAD_ERR_FORM_SIZE => 'A imagem é grande demais.',
            UPLOAD_ERR_PARTIAL   => 'O envio da imagem foi interrompido. Tente de novo.',
        ];
        throw new RuntimeException($msgs[$arq['error']] ?? 'Não foi possível enviar a imagem.');
    }

    if ($arq['size'] > UPLOAD_MAX_BYTES) {
        throw new RuntimeException('A imagem deve ter no máximo ' . (UPLOAD_MAX_BYTES / 1024 / 1024) . ' MB.');
    }

    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($arq['tmp_name']);
    $extensoes = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];

    if (!isset($extensoes[$mime]) || @getimagesize($arq['tmp_name']) === false) {
        throw new RuntimeException('Formato inválido. Envie uma imagem JPG, PNG ou WebP.');
    }

    if (!is_dir(PASTA_UPLOAD) && !mkdir(PASTA_UPLOAD, 0755, true)) {
        throw new RuntimeException('Não consegui criar a pasta de imagens no servidor.');
    }

    // Nome aleatório: ignora o nome enviado pelo usuário.
    $nome = bin2hex(random_bytes(12)) . '.' . $extensoes[$mime];

    if (!move_uploaded_file($arq['tmp_name'], PASTA_UPLOAD . $nome)) {
        throw new RuntimeException('Não consegui salvar a imagem no servidor.');
    }

    return $nome;
}

function apagar_imagem(string $nome): void
{
    $caminho = PASTA_UPLOAD . basename($nome);
    if (is_file($caminho)) {
        @unlink($caminho);
    }
}

// ---------- Limite de tentativas de login ----------
function tentativas_recentes(): int
{
    $st = pdo()->prepare('SELECT COUNT(*) FROM login_tentativas WHERE ip = ? AND criado_em > (NOW() - INTERVAL 15 MINUTE)');
    $st->execute([ip_cliente()]);
    return (int) $st->fetchColumn();
}

// ---------- Ações (POST) ----------
$erroLogin = '';

try {
    $pdo = pdo();
} catch (Throwable $ex) {
    http_response_code(500);
    exit('Erro ao conectar ao banco de dados. Confira o config.php.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_valido()) {
        http_response_code(400);
        exit('Requisição inválida. Volte e recarregue a página.');
    }

    $acao = (string) ($_POST['acao'] ?? '');
    $logado = !empty($_SESSION['admin_id']);

    // Login
    if (!$logado && $acao === 'entrar') {
        if (tentativas_recentes() >= 5) {
            $erroLogin = 'Muitas tentativas. Aguarde 15 minutos e tente de novo.';
        } else {
            $st = $pdo->prepare('SELECT id, senha_hash FROM admins WHERE usuario = ?');
            $st->execute([trim((string) ($_POST['usuario'] ?? ''))]);
            $admin = $st->fetch();

            if ($admin && password_verify((string) ($_POST['senha'] ?? ''), $admin['senha_hash'])) {
                session_regenerate_id(true);
                $_SESSION['admin_id'] = (int) $admin['id'];
                $pdo->prepare('DELETE FROM login_tentativas WHERE ip = ?')->execute([ip_cliente()]);
                voltar();
            }

            $pdo->prepare('INSERT INTO login_tentativas (ip) VALUES (?)')->execute([ip_cliente()]);
            $erroLogin = 'Usuário ou senha inválidos.';
        }
    }

    // Ações que exigem login
    if ($logado) {
        if ($acao === 'sair') {
            $_SESSION = [];
            session_destroy();
            voltar();
        }

        if ($acao === 'salvar') {
            $id        = (int) ($_POST['id'] ?? 0);
            $descricao = trim((string) ($_POST['descricao'] ?? ''));
            $ordem     = (int) ($_POST['ordem'] ?? 0);
            $ativo     = isset($_POST['ativo']) ? 1 : 0;
            $temImagem = isset($_FILES['imagem']) && $_FILES['imagem']['error'] !== UPLOAD_ERR_NO_FILE;

            try {
                if ($descricao === '') {
                    throw new RuntimeException('Preencha a descrição (ela vira a mensagem do WhatsApp).');
                }
                if (function_exists('mb_strlen') ? mb_strlen($descricao) > 500 : strlen($descricao) > 500) {
                    throw new RuntimeException('A descrição pode ter no máximo 500 caracteres.');
                }
                if ($id === 0 && !$temImagem) {
                    throw new RuntimeException('Escolha uma imagem para a nova promoção.');
                }

                $novaImagem = $temImagem ? salvar_imagem($_FILES['imagem']) : null;

                if ($id > 0) {
                    $st = $pdo->prepare('SELECT imagem FROM promocoes WHERE id = ?');
                    $st->execute([$id]);
                    $atual = $st->fetch();
                    if (!$atual) {
                        throw new RuntimeException('Promoção não encontrada.');
                    }

                    $st = $pdo->prepare('UPDATE promocoes SET descricao = ?, ordem = ?, ativo = ?, imagem = ? WHERE id = ?');
                    $st->execute([$descricao, $ordem, $ativo, $novaImagem ?? $atual['imagem'], $id]);

                    if ($novaImagem !== null) {
                        apagar_imagem($atual['imagem']);
                    }
                    avisar('ok', 'Promoção atualizada.');
                } else {
                    $st = $pdo->prepare('INSERT INTO promocoes (imagem, descricao, ordem, ativo) VALUES (?, ?, ?, ?)');
                    $st->execute([$novaImagem, $descricao, $ordem, $ativo]);
                    avisar('ok', 'Promoção cadastrada.');
                }
            } catch (RuntimeException $ex) {
                avisar('erro', $ex->getMessage());
                voltar($id > 0 ? 'index.php?editar=' . $id : 'index.php');
            }
            voltar();
        }

        if ($acao === 'alternar') {
            $pdo->prepare('UPDATE promocoes SET ativo = 1 - ativo WHERE id = ?')->execute([(int) ($_POST['id'] ?? 0)]);
            voltar();
        }

        if ($acao === 'excluir') {
            $id = (int) ($_POST['id'] ?? 0);
            $st = $pdo->prepare('SELECT imagem FROM promocoes WHERE id = ?');
            $st->execute([$id]);
            if ($promo = $st->fetch()) {
                $pdo->prepare('DELETE FROM promocoes WHERE id = ?')->execute([$id]);
                apagar_imagem($promo['imagem']);
                avisar('ok', 'Promoção excluída.');
            }
            voltar();
        }
    }
}

// ---------- Tela (GET) ----------
$logado = !empty($_SESSION['admin_id']);
$aviso = $_SESSION['aviso'] ?? null;
unset($_SESSION['aviso']);

$promocoes = [];
$emEdicao = null;

if ($logado) {
    $promocoes = $pdo->query('SELECT * FROM promocoes ORDER BY ordem ASC, id DESC')->fetchAll();

    if (isset($_GET['editar'])) {
        $st = $pdo->prepare('SELECT * FROM promocoes WHERE id = ?');
        $st->execute([(int) $_GET['editar']]);
        $emEdicao = $st->fetch() ?: null;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>LocMaq — Administração de promoções</title>
<link rel="stylesheet" href="../css/admin.css">
</head>
<body class="adm">
<main class="caixa <?= $logado ? 'larga' : '' ?>">
  <h1>LocMaq · Promoções</h1>

  <?php if ($aviso): ?>
    <p class="<?= $aviso[0] === 'ok' ? 'ok' : 'erro' ?>"><?= e($aviso[1]) ?></p>
  <?php endif; ?>

  <?php if (!$logado): ?>

    <p>Entre com seu usuário e senha de administrador.</p>
    <?php if ($erroLogin): ?><p class="erro"><?= e($erroLogin) ?></p><?php endif; ?>
    <form method="post" autocomplete="on">
      <?= campo_csrf() ?>
      <input type="hidden" name="acao" value="entrar">
      <label for="usuario">Usuário</label>
      <input id="usuario" name="usuario" required autocomplete="username">
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" required autocomplete="current-password">
      <button class="btn-principal" type="submit">Entrar</button>
    </form>

  <?php else: ?>

    <div class="topo">
      <a href="../" target="_blank" rel="noopener">Ver o site ↗</a>
      <form method="post">
        <?= campo_csrf() ?>
        <input type="hidden" name="acao" value="sair">
        <button class="btn-sec" type="submit">Sair</button>
      </form>
    </div>

    <h2><?= $emEdicao ? 'Editar promoção' : 'Nova promoção' ?></h2>
    <form method="post" enctype="multipart/form-data">
      <?= campo_csrf() ?>
      <input type="hidden" name="acao" value="salvar">
      <input type="hidden" name="id" value="<?= $emEdicao ? (int) $emEdicao['id'] : 0 ?>">

      <label for="imagem">Imagem da promoção (JPG, PNG ou WebP, até 3 MB)<?= $emEdicao ? ' — deixe vazio para manter a atual' : '' ?></label>
      <input id="imagem" name="imagem" type="file" accept="image/jpeg,image/png,image/webp" <?= $emEdicao ? '' : 'required' ?>>
      <?php if ($emEdicao): ?>
        <img class="previa" src="../<?= e(URL_UPLOAD . $emEdicao['imagem']) ?>" alt="Imagem atual da promoção">
      <?php endif; ?>

      <label for="descricao">Descrição (só vira a mensagem do WhatsApp; não aparece no site)</label>
      <textarea id="descricao" name="descricao" required maxlength="500" placeholder="Ex: Olá, LocMaq! Quero aproveitar a promoção da betoneira 400L."><?= e($emEdicao['descricao'] ?? '') ?></textarea>

      <label for="ordem">Ordem de exibição (menor aparece primeiro)</label>
      <input id="ordem" name="ordem" type="number" value="<?= (int) ($emEdicao['ordem'] ?? 0) ?>">

      <label class="check">
        <input name="ativo" type="checkbox" <?= (!$emEdicao || $emEdicao['ativo']) ? 'checked' : '' ?>>
        Promoção ativa (visível no site)
      </label>

      <button class="btn-principal" type="submit">Salvar promoção</button>
      <?php if ($emEdicao): ?><a class="btn-sec" href="index.php">Cancelar edição</a><?php endif; ?>
    </form>

    <h2>Promoções cadastradas</h2>
    <?php if (!$promocoes): ?>
      <p>Nenhuma promoção cadastrada ainda.</p>
    <?php endif; ?>

    <div class="lista">
      <?php foreach ($promocoes as $p): ?>
        <div class="item">
          <img src="../<?= e(URL_UPLOAD . $p['imagem']) ?>" alt="">
          <div>
            <div class="desc"><?= e($p['descricao']) ?></div>
            <div class="status <?= $p['ativo'] ? 'on' : 'off' ?>"><?= $p['ativo'] ? 'Ativa' : 'Inativa' ?> · ordem <?= (int) $p['ordem'] ?></div>
          </div>
          <div class="acoes">
            <a class="btn-sec" href="index.php?editar=<?= (int) $p['id'] ?>">Editar</a>
            <form method="post">
              <?= campo_csrf() ?>
              <input type="hidden" name="acao" value="alternar">
              <input type="hidden" name="id" value="<?= (int) $p['id'] ?>">
              <button class="btn-sec" type="submit"><?= $p['ativo'] ? 'Desativar' : 'Ativar' ?></button>
            </form>
            <form method="post" onsubmit="return confirm('Excluir esta promoção?');">
              <?= campo_csrf() ?>
              <input type="hidden" name="acao" value="excluir">
              <input type="hidden" name="id" value="<?= (int) $p['id'] ?>">
              <button class="btn-perigo" type="submit">Excluir</button>
            </form>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

  <?php endif; ?>
</main>
</body>
</html>
