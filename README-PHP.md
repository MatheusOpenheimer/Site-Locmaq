# LocMaq — Promoções em PHP + MySQL

## Estrutura
```
index.php          site público (era index.html; agora lê as promoções do banco)
config.php          senhas do banco e configurações (NÃO subir com dados reais pro GitHub público)
db.php               conexão com o MySQL
setup.php            instalador — cria as tabelas e o 1º admin (apagar depois de usar)
admin/index.php      painel de administração (login + CRUD das promoções)
css/promocoes.css    estilo da seção de promoções
css/admin.css         estilo do painel de admin e do setup
uploads/promocoes/   onde as imagens das promoções são salvas (criada automaticamente)
js/dados.js, js/script.js   iguais aos que você já tinha (catálogo de equipamentos)
```
Você ainda precisa colocar `css/style.css` e a pasta `assets/` (logo e fotos dos equipamentos) — não mudei nada neles.

## 1. Testar no seu computador (XAMPP)
1. Instale o XAMPP (apachefriends.org) e abra o **XAMPP Control Panel**.
2. Clique em **Start** em **Apache** e em **MySQL**.
3. Copie a pasta inteira do projeto para `C:\xampp\htdocs\locmaq`.
4. Abra `http://localhost/phpmyadmin`, clique em **Novo** (canto esquerdo) e crie um banco chamado `locmaq` (mesmo nome de `DB_NOME` no `config.php`).
5. Acesse `http://localhost/locmaq/setup.php` — ele cria as tabelas e pede para você criar o usuário e senha do admin.
6. Depois de criar, **apague o `setup.php`** (no XAMPP não tem problema deixar, mas já pegue o hábito, porque na hospedagem é obrigatório apagar).
7. Acesse `http://localhost/locmaq/admin/` e faça login. Cadastre uma promoção de teste.
8. Acesse `http://localhost/locmaq/` e veja a seção de promoções aparecer entre o topo e o catálogo.

No XAMPP, `config.php` já funciona sem alterar nada (`root` sem senha).

## 2. Publicar na hospedagem
1. No painel da hospedagem (cPanel/hPanel), crie um banco de dados MySQL, um usuário e uma senha, e associe o usuário ao banco.
2. Edite `config.php` com o nome do banco, usuário e senha que a hospedagem informou (geralmente algo como `usuario_locmaq`, não só `locmaq`).
3. Envie todos os arquivos do projeto por FTP, mantendo a estrutura de pastas.
4. Acesse `seusite.com/setup.php`, crie o admin.
5. **Apague `setup.php` do servidor imediatamente depois** — se ele continuar lá, qualquer pessoa que descobrir o endereço poderia tentar usá-lo (ele mesmo bloqueia uso depois de configurado, mas é melhor não deixar exposto).
6. Acesse `seusite.com/admin/` para gerenciar as promoções.

## Segurança que já está pronta
- Senha do admin guardada com hash (`password_hash`), nunca em texto puro.
- Proteção contra SQL injection (consultas preparadas em todo lugar).
- Limite de 5 tentativas de login por IP a cada 15 minutos.
- Upload de imagem valida o conteúdo real do arquivo (não só a extensão) e troca o nome por um aleatório — evita que alguém envie um script disfarçado de imagem.
- A pasta `uploads/promocoes/` tem um `.htaccess` que impede qualquer arquivo lá dentro de ser executado como PHP.
- Formulários protegidos contra CSRF (token por sessão).

## O que vale a pena fazer depois
- Trocar a senha do MySQL por uma gerada automaticamente (evite senhas fracas).
- Se quiser, depois posso adicionar HTTPS forçado (redirecionar `http://` para `https://`) — normalmente a própria hospedagem já oferece isso pronto no painel.
