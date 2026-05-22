const tabuleiro = document.getElementById('tabuleiro');

const pecas = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖']
];

let selecionada = null;
let linhaSelecionada = null;
let colunaSelecionada = null;

let turno = 'branco';

for (let linha = 0; linha < 8; linha++) {

  for (let coluna = 0; coluna < 8; coluna++) {

    const casa = document.createElement('div');

    casa.classList.add('casa');

    if ((linha + coluna) % 2 === 0) {
      casa.classList.add('branca');
    } else {
      casa.classList.add('preta');
    }

    casa.textContent = pecas[linha][coluna];

    // COR DAS PEÇAS
    if (
      ['♙','♖','♘','♗','♕','♔']
      .includes(pecas[linha][coluna])
    ) {

      casa.style.color = 'white';

    } else {

      casa.style.color = 'black';
    }

    // CLIQUE
    casa.addEventListener('click', () => {

      // SELECIONAR PEÇA
      if (!selecionada && casa.textContent !== '') {

        const peca = casa.textContent;

        // TURNO BRANCO
        if (
          turno === 'branco' &&
          ['♙','♖','♘','♗','♕','♔'].includes(peca)
        ) {

          selecionada = casa;

          linhaSelecionada = linha;
          colunaSelecionada = coluna;

          casa.classList.add('selecionada');
        }

        // TURNO PRETO
        else if (
          turno === 'preto' &&
          ['♟','♜','♞','♝','♛','♚'].includes(peca)
        ) {

          selecionada = casa;

          linhaSelecionada = linha;
          colunaSelecionada = coluna;

          casa.classList.add('selecionada');
        }
      }

      // MOVER PEÇA
      else if (selecionada) {

        const peca = selecionada.textContent;

        // PEÃO BRANCO
        if (
          peca === '♙' &&
          coluna === colunaSelecionada &&
          linha === linhaSelecionada - 1 &&
          casa.textContent === ''
        ) {

          casa.textContent = peca;

          casa.style.color = selecionada.style.color;

          selecionada.textContent = '';

          turno = 'preto';
        }

        // PEÃO PRETO
        else if (
          peca === '♟' &&
          coluna === colunaSelecionada &&
          linha === linhaSelecionada + 1 &&
          casa.textContent === ''
        ) {

          casa.textContent = peca;

          casa.style.color = selecionada.style.color;

          selecionada.textContent = '';

          turno = 'branco';
        }

        selecionada.classList.remove('selecionada');

        selecionada = null;
      }
    });

    tabuleiro.appendChild(casa);
  }
}