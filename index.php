<?php
require_once __DIR__ . '/db.php';

try {
    $promocoes = pdo()->query(
        'SELECT * FROM promocoes WHERE ativo = 1 ORDER BY ordem ASC, id DESC'
    )->fetchAll();
} catch (Throwable $ex) {
    // Se o banco cair, o site não quebra — só some a seção de promoções.
    $promocoes = [];
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>LocMaq — Locação de equipamentos para construção civil</title>
<link rel="preconnect" href="https://googleapis.com">
<link rel="preconnect" href="https://gstatic.com" crossorigin>
<link href="https://googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Public+Sans:wght@400;500;700&display=swap">

  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/promocoes.css">
</head>
<body>
<header>
  <div class="w">
    <a href="#topo" aria-label="LocMaq, início"><img src="assets/logo.webp" alt="LocMaq — locação de equipamentos para construção civil"></a>
    <nav aria-label="Principal"><a href="#catalogo">Equipamentos</a><a href="#como">Como alugar</a><a href="#contato">Contato</a></nav>
    <a class="btn by" href="https://wa.me/553598219921?text=Ol%C3%A1%2C%20LocMaq!%20Quero%20um%20or%C3%A7amento." target="_blank" rel="noopener">Pedir orçamento</a>
  </div>
</header>
<div class="tape" aria-hidden="true"></div>
<main id="topo">
<div class="hero">
  <div class="w">
    <div>
      <h1>Tudo o que sua obra precisa, para alugar</h1>
      <p>Betoneiras, martelos demolidores, geradores, andaimes e mais <span id="cnt">75</span> equipamentos de marcas como Bosch, Makita, Stihl e Toyama, prontos para o seu canteiro.</p>
      <div class="ct"><a class="btn by" href="#catalogo">Ver equipamentos</a><a class="btn bo" href="https://wa.me/553598219921" target="_blank" rel="noopener">Chamar no WhatsApp</a></div>
    </div>
   <div class="stage" id="produtosDestaque" aria-hidden="true"></div>
  </div>
</div>
<div class="tape" aria-hidden="true"></div>

<?php if ($promocoes): ?>
<section id="promocoes" class="promos">
  <div class="w">
    <h2>Promoções</h2>
    <p>Clique e peça</p>
    <div class="promos-grid">
      <?php foreach ($promocoes as $p):
        $mensagem = rawurlencode($p['descricao']);
        $link = 'https://wa.me/' . WHATSAPP . '?text=' . $mensagem;
      ?>
        <a class="promo-card" href="<?= e($link) ?>" target="_blank" rel="noopener" aria-label="Ver promoção no WhatsApp">
          <img loading="lazy" src="<?= e(URL_UPLOAD . $p['imagem']) ?>" alt="Promoção LocMaq">
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<section id="catalogo">
  <div class="w">
    <h2>Catálogo de equipamentos</h2>
    <p class="sub">Escolha o que precisa, monte sua lista e envie pelo WhatsApp para receber valores e disponibilidade.</p>
    <div class="bar"><input id="q" type="search" placeholder="Buscar equipamento ou marca" aria-label="Buscar equipamento ou marca"></div>
    <div class="chips" id="chips" role="group" aria-label="Categorias"></div>
    <div class="grid" id="grid"></div>
    <p class="empty" id="empty" hidden>Nenhum equipamento encontrado. Limpe a busca ou fale com a gente no WhatsApp.</p>
  </div>
</section>

<div class="brands"><div class="w"><p>Bosch · Makita · DeWalt · Stihl · Husqvarna · Toyama · Einhell · Vonder · Menegotti · Sorrag · CSM · Buffalo</p></div></div>

<section id="como">
  <div class="w">
    <h2>Como alugar</h2>
    <ol class="steps">
      <li><b>Escolha</b><span>Navegue pelo catálogo e adicione os equipamentos à sua lista.</span></li>
      <li><b>Envie a lista</b><span>Mande o pedido pelo WhatsApp com um clique.</span></li>
      <li><b>Combine</b><span>Confirmamos valores, período e a retirada.</span></li>
      <li><b>Devolva</b><span>Termine o serviço e devolva o equipamento.</span></li>
    </ol>
  </div>
</section>

<section class="contact" id="contato">
  <div class="w">
    <div>
      <h2>Fale com a LocMaq</h2>
      <p class="sub">Não achou o que procura ou precisa de vários equipamentos? Mande uma mensagem com o que a obra pede.</p>
    </div>
    <div class="links">
      <a href="https://wa.me/553598219921" target="_blank" rel="noopener"><small>WhatsApp</small><strong>(35) 99821-9921</strong></a>
      <a href="mailto:locmaq.pa@gmail.com"><small>E-mail</small><strong>locmaq.pa@gmail.com</strong></a>
    </div>
  </div>
</section>
</main>
<footer><div class="w">LocMaq · Locação de equipamentos para construção civil · © 2026</div></footer>

<button id="fab" hidden>Minha lista (<span id="qc">0</span>)</button>
<div id="dr" hidden>
  <aside class="pan" role="dialog" aria-modal="true" aria-labelledby="dt">
    <header><h2 id="dt">Minha lista</h2><button class="x" id="cl" aria-label="Fechar">×</button></header>
    <ul id="ls"></ul>
    <a class="btn by" id="send" target="_blank" rel="noopener">Enviar pelo WhatsApp</a>
  </aside>
</div>

  <script src="js/dados.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
