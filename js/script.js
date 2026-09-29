// Estado atual da página.
let categoriaAtual = 'all';
let termoBusca = '';
const equipamentosSelecionados = new Map();

// Atalho para buscar elementos do HTML.
function selecionar(seletor) {
  return document.querySelector(seletor);
}

// Escapa texto antes de inseri-lo em HTML criado pelo JavaScript.
function escaparHtml(texto) {
  return texto.replace(/[&<>"]/g, function (caractere) {
    const caracteres = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    };
    return caracteres[caractere];
  });
}

// Remove acentos e transforma o texto em minúsculas para facilitar a busca.
function normalizarTexto(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function contarEquipamentosPorCategoria(categoria) {
  return EQUIPAMENTOS.filter(function (equipamento) {
    return equipamento.c === categoria;
  }).length;
}

function renderizarCategorias() {
  const categorias = [['all', 'Todos', EQUIPAMENTOS.length]];
  CATEGORIAS.forEach(function (categoria) {
    const codigo = categoria[0];
    const nome = categoria[1];
    categorias.push([codigo, nome, contarEquipamentosPorCategoria(codigo)]);
  });

  selecionar('#chips').innerHTML = categorias.map(function (categoria) {
    const codigo = categoria[0];
    const nome = categoria[1];
    const quantidade = categoria[2];
    const selecionada = codigo === categoriaAtual;

    return `<button class="chip" data-k="${codigo}" aria-pressed="${selecionada}">${nome}<small>${quantidade}</small></button>`;
  }).join('');
}

function equipamentoPertenceAosFiltros(equipamento) {
  const pertenceACategoria = categoriaAtual === 'all' || equipamento.c === categoriaAtual;
  const textoEquipamento = normalizarTexto(`${equipamento.n} ${equipamento.d}`);
  const correspondeABusca = textoEquipamento.includes(normalizarTexto(termoBusca));
  return pertenceACategoria && correspondeABusca;
}

function obterEquipamentosFiltrados() {
  return EQUIPAMENTOS.map(function (equipamento, indice) {
    return { equipamento, indice };
  }).filter(function (item) {
    return equipamentoPertenceAosFiltros(item.equipamento);
  });
}

function criarCardEquipamento(equipamento, indice) {
  const quantidade = equipamentosSelecionados.get(indice) || 0;
  const selecionado = quantidade > 0;

  let textoBotao = 'Adicionar à lista';

  if (selecionado) {
    textoBotao = `Na lista · ${quantidade} unidade${quantidade > 1 ? 's' : ''}`;
  }

  return `<article class="card">
    <div class="pic">
      <img loading="lazy" src="${equipamento.i}" alt="${escaparHtml(equipamento.n + ' ' + equipamento.d)}">
    </div>

    <div class="cb">
      <h3>${escaparHtml(equipamento.n)}</h3>

      <p>${escaparHtml(equipamento.d)}</p>

      <button class="add" data-i="${indice}" aria-pressed="${selecionado}">
        ${textoBotao}
      </button>
    </div>
  </article>`;
}

function renderizarGrade() {
  const equipamentosFiltrados = obterEquipamentosFiltrados();
  selecionar('#grid').innerHTML = equipamentosFiltrados.map(function (item) {
    return criarCardEquipamento(item.equipamento, item.indice);
  }).join('');
  selecionar('#empty').hidden = equipamentosFiltrados.length > 0;
}

function criarItemDaLista(equipamento, indice) {
  const quantidade = equipamentosSelecionados.get(indice) || 0;

  return `<li>
    <img src="${equipamento.i}" alt="">

    <div>
      ${escaparHtml(equipamento.n)}
      <br>
      <small>${escaparHtml(equipamento.d)}</small>
    </div>

    <div class="quantidade">
      <button data-diminuir="${indice}" aria-label="Diminuir quantidade">
        −
      </button>

      <span>${quantidade}</span>

      <button data-aumentar="${indice}" aria-label="Aumentar quantidade">
        +
      </button>
    </div>

    <button data-r="${indice}" aria-label="Remover ${escaparHtml(equipamento.n)}">
      ×
    </button>
  </li>`;
}

function criarMensagemWhatsApp() {
  const linhas = Array.from(equipamentosSelecionados).map(function ([indice, quantidade]) {
    const equipamento = EQUIPAMENTOS[indice];
    const descricao = equipamento.d ? ` (${equipamento.d})` : '';

    return `- ${equipamento.n}${descricao} - Quantidade: ${quantidade}`;
  });

  return [
    'Olá, LocMaq! Quero um orçamento destes equipamentos:',
    ...linhas
  ].join('\n');
}

function atualizarListaDeEquipamentos() {
  const indicesSelecionados = Array.from(equipamentosSelecionados.keys());

  selecionar('#qc').textContent = indicesSelecionados.length;
  selecionar('#fab').hidden = indicesSelecionados.length === 0;

  selecionar('#ls').innerHTML = indicesSelecionados.map(function (indice) {
    return criarItemDaLista(EQUIPAMENTOS[indice], indice);
  }).join('');

  const mensagem = criarMensagemWhatsApp();

  selecionar('#send').href =
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

  if (indicesSelecionados.length === 0) {
    selecionar('#dr').hidden = true;
  }
}

function adicionarOuRemoverEquipamento(indice) {
  const quantidadeAtual = equipamentosSelecionados.get(indice) || 0;

  equipamentosSelecionados.set(indice, quantidadeAtual + 1);

  renderizarGrade();
  atualizarListaDeEquipamentos();
}

function abrirListaDeOrcamento() {
  selecionar('#dr').hidden = false;
  selecionar('#cl').focus();
}

function fecharListaDeOrcamento() {
  selecionar('#dr').hidden = true;
}

function configurarEventos() {
  selecionar('#chips').addEventListener('click', function (evento) {
    const botao = evento.target.closest('.chip');
    if (!botao) return;
    categoriaAtual = botao.dataset.k;
    renderizarCategorias();
    renderizarGrade();
  });

  selecionar('#q').addEventListener('input', function (evento) {
    termoBusca = evento.target.value;
    renderizarGrade();
  });

  selecionar('#grid').addEventListener('click', function (evento) {
    const botao = evento.target.closest('.add');
    if (!botao) return;
    adicionarOuRemoverEquipamento(Number(botao.dataset.i));
  });

  selecionar('#ls').addEventListener('click', function (evento) {
  const botaoAumentar = evento.target.closest('[data-aumentar]');
  const botaoDiminuir = evento.target.closest('[data-diminuir]');
  const botaoRemover = evento.target.closest('[data-r]');

  if (botaoAumentar) {
    const indice = Number(botaoAumentar.dataset.aumentar);
    const quantidadeAtual = equipamentosSelecionados.get(indice) || 0;

    equipamentosSelecionados.set(indice, quantidadeAtual + 1);

    renderizarGrade();
    atualizarListaDeEquipamentos();

    return;
  }

  if (botaoDiminuir) {
    const indice = Number(botaoDiminuir.dataset.diminuir);
    const quantidadeAtual = equipamentosSelecionados.get(indice) || 0;

    if (quantidadeAtual > 1) {
      equipamentosSelecionados.set(indice, quantidadeAtual - 1);
    } else {
      equipamentosSelecionados.delete(indice);
    }

    renderizarGrade();
    atualizarListaDeEquipamentos();

    return;
  }

  if (botaoRemover) {
    const indice = Number(botaoRemover.dataset.r);

    equipamentosSelecionados.delete(indice);

    renderizarGrade();
    atualizarListaDeEquipamentos();
  }
});

  selecionar('#fab').addEventListener('click', abrirListaDeOrcamento);
  selecionar('#cl').addEventListener('click', fecharListaDeOrcamento);

  selecionar('#dr').addEventListener('click', function (evento) {
    if (evento.target.id === 'dr') fecharListaDeOrcamento();
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') fecharListaDeOrcamento();
  });
}

function iniciarPagina() {
  selecionar('#cnt').textContent = EQUIPAMENTOS.length;
  configurarEventos();
  renderizarCategorias();
  renderizarGrade();
  atualizarListaDeEquipamentos();
  iniciarProdutosDestaque();
}

document.addEventListener('DOMContentLoaded', iniciarPagina);

function iniciarProdutosDestaque() {
    const area = document.getElementById('produtosDestaque');

    if (!area || !EQUIPAMENTOS.length) {
        return;
    }

    let indiceAtual = 0;

    function trocarProduto() {
        area.innerHTML = '';

        const produto = EQUIPAMENTOS[indiceAtual];

        const imagem = document.createElement('img');

        imagem.src = produto.i;
        imagem.alt = produto.n;

        area.appendChild(imagem);

        requestAnimationFrame(() => {
            imagem.classList.add('ativo');
        });

        indiceAtual++;

        if (indiceAtual >= EQUIPAMENTOS.length) {
            indiceAtual = 0;
        }
    }

    trocarProduto();

    setInterval(trocarProduto, 3000);
}
