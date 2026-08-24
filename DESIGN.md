# Design — Joao Custom

Registro do sistema **como ele foi construído**, não como foi planejado.
Fonte da verdade: `css/main.css`. A verdade do produto vive em `PRODUCT.md`.

## Direção

O padrão da categoria — a estrutura convencional de site de aplicador de PPF premium —
executado no nível de acabamento de site de montadora premium. Essa combinação foi
escolhida pelo cliente e é o que governa cada decisão abaixo.

Consequência mais importante e mais frágil: **o vermelho da marca é marcador, não
ambiente.** Ele aparece em fio de cabelo, nas barras `//`, em estado ativo, em ícone e
em borda de foco. Nunca como fundo de seção, nunca como gradiente, nunca como sombra
colorida. A ação primária é branca sobre preto. É isso que separa este site do
"preto com vermelho neon" que todo concorrente publica — e é a primeira coisa que se
perde numa edição descuidada.

## Cor

O ground é escuro por decisão de marca e por cena de uso: quase todo o tráfego chega
do Instagram, à noite, no celular.

| Token | Valor | Papel |
|---|---|---|
| `--ink-900` | `#08090b` | Ground da página. Não é `#000` — preto puro borra em OLED |
| `--ink-850` | `#0b0d10` | Seções alternadas (`.section--alt`) |
| `--ink-800` / `--ink-750` / `--ink-700` | `#0f1114` / `#14161a` / `#191c21` | Superfícies e campos de formulário |
| `--line-faint` / `--line` / `--line-strong` | branco a 5% / 9% / 16% | Fios de cabelo. Substituem borda de card |
| `--chalk` | `#f4f4f2` | Texto primário. Off-white amostrado do wordmark (`#FBFBF9`) |
| `--steel` | `#a9afb8` | Texto secundário |
| `--steel-dim` | `#767c86` | Rótulos e legendas |
| `--red` | `#fa4b3c` | **Marcador da marca** |
| `--red-hi` | `#ff6151` | Hover sobre superfície vermelha |
| `--red-ink` | `#0a0b0d` | Texto sobre vermelho |
| `--red-deep` | `#c0301f` | Raro: quando exige texto branco por cima |
| `--wpp` / `--wpp-ink` | `#25d366` / `#06210f` | Único canal funcional fora da paleta |

`--red` **não foi suposto**. Foi extraído do `joao-logo.png`: mediana de 7.838 pixels do
núcleo erodido das barras `//`. O briefing supunha `#E1121C`, um vermelho-fogo puro; o
vermelho real da marca é bem mais quente. O fundo do PNG original é `#0C0D11`, quase
idêntico ao ground escolhido.

**Contrastes verificados:** `--red` sobre `--ink-900` = **5,73:1** (passa AA como texto e
como superfície). `--red-ink` sobre `--red` = 5,73:1. Branco sobre `--red` dá só 3,42:1 —
por isso a aba selecionada do comparador usa texto escuro, e não branco. Branco sobre
`--red-deep` = 5,7:1. `--wpp-ink` sobre `--wpp` = 10,6:1.

## Tipografia

Duas famílias, ambas variáveis, via Google Fonts com `preconnect` e `display=swap`.

- **Archivo** (`--font-display`) — títulos, botões, rótulos, dados. Peso 800 padrão, 900
  no itálico. O itálico pesado é o eco direto do wordmark da logo e está reservado para
  o fecho da headline do herói (`.hero__title em`). Usar em mais lugares dilui.
- **Manrope** (`--font-body`) — corpo de texto. Legível a 16px em tela pequena, que é
  onde este site vive.

Sem monoespaçada. Dado numérico usa Archivo com `font-variant-numeric: tabular-nums`
(classe `.spec`) — mono como fantasia de "técnico" é justamente o clichê a evitar.

Escala em `clamp()`, do menor ao maior viewport:

| Token | Faixa | Uso |
|---|---|---|
| `--fs-display-xl` | 2,75 → 6rem | Só o `h1` do herói. `line-height: 0.92`, tracking `-0.035em` |
| `--fs-display-l` | 2 → 3,5rem | `h2` de seção |
| `--fs-display-m` | 1,5 → 2,125rem | `h3` |
| `--fs-lead` | 1,0625 → 1,1875rem | Parágrafo de abertura |
| `--fs-label` | 0,75rem | Rótulo em caixa alta, tracking `0.16em` |

Piso de tracking: `-0.035em`. Medida de leitura: `p { max-width: 68ch }`.

**Banido: eyebrow.** Nenhum rótulo em caixa alta acima de um heading. O `//` (`.mark`) é
dispositivo gráfico, não rótulo de texto — pode preceder o heading; um `// NOSSOS SERVIÇOS`
não pode.

## Estrutura

- `.wrap` — 1320px, gutter `clamp(1.25rem, 5vw, 4rem)`
- `.section` — padding vertical `clamp(4.5rem, 11vh, 9rem)`
- `.section__head` — margem inferior `clamp(2.5rem, 5vw, 4.5rem)`, sempre menor que o
  padding acima. Mais espaço em cima do heading do que embaixo.
- `.split` — coluna de título fixa (`position: sticky`) + coluna de conteúdo corrida,
  a partir de 1000px. É o esqueleto de "por que", FAQ e páginas de serviço.
- `--radius: 2px` — praticamente reto. Nada arredondado, exceto o botão flutuante do
  WhatsApp, que precisa da forma de pílula para ser reconhecido.

**Cards são exceção, não estrutura.** Os quatro serviços não são quatro cartões iguais
com ícone: o tile de PPF ocupa a faixa inteira (prioridade 1 do negócio virou escala) e
os outros três fecham a linha abaixo. Diferencial, FAQ e especificação usam fio de cabelo
e tabela, não caixa.

Números de seção (`01/02/…`) existem **só no processo de atendimento**, onde a ordem é a
informação. Em nenhum outro lugar.

## Movimento

Personalidade **Premium**: lento, sem overshoot, nada pisca.

- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` — entradas
- `--ease-inout: cubic-bezier(0.4, 0, 0.2, 1)` — mudanças de estado
- `--t-quick: 180ms` · `--t-base: 420ms` · `--t-slow: 900ms`

**O momento autoral é a carga do herói**, e só ele. Três linhas sobem de uma máscara em
stagger de 90ms, as barras `//` crescem em `scaleY`, a mídia desce de `scale(1.07)` em
2,2s, e a régua vermelha de scroll começa a pulsar — ela abre o bloco, 24px acima do `//` e
no mesmo eixo do texto e do botão. É absoluta dentro de `.hero__inner`, não do herói, para
acompanhar o bloco em qualquer altura de tela; abaixo de 760px de altura ela some, porque o
bloco encosta na sarjeta do topo e ela entraria por baixo do nav. A sequência espera `document.fonts.ready`
(com teto de 900ms) para a linha não subir com a métrica errada.

### Entrada (só na home)

Antes da carga do herói, `.intro` — ~1,9s, e é a única coisa no site que segura a página.
Só as barras `//` da logo entram: nenhum wordmark, nenhum spinner, nenhuma porcentagem.

1. **0–710ms** — tela `--ink-900`. As duas barras abrem em vermelho **do meio para as duas
   pontas**, no centro exato da tela, stagger de 90ms, `--ease-out`. A abertura é
   `clip-path: inset(50% 0)` → `inset(0)`, e não `scaleY`, porque o `transform` precisa
   ficar intocado: ele tem que ser idêntico ao de `.mark i` para o pouso cair em cima.
2. **1000ms** — voo. O JS mede `.hero .mark` e leva a barra grande até o retângulo exato
   dela por `translate` + `scale` (FLIP), em 860ms. Ao mesmo tempo a cortina sai
   enviesada nos mesmos **-18deg** da barra, com um fio vermelho de 2px na borda que
   varre a tela — o `/` cortando o preto. O herói entra 90ms depois do voo começar: a
   revelação e a carga são um movimento só.
3. **1860ms** — pouso. `.hero.is-handoff` faz a marca real assumir sem transição, e a
   entrada sai do DOM. As duas são pixel a pixel a mesma coisa: erro medido de **0,26px**
   em 1440×900, 390×844 e 1280×560.

O que faz a troca funcionar, e o que quebra se alguém mexer:

- `.intro__mark i` repete `transform-origin: bottom` de `.mark i`. Com a origem no centro,
  o `skewX(-18deg)` desloca a barra em 0,16 × a altura e o pouso pisca de lado.
- A proporção da barra grande não é chutada: o JS lê `width`, `height` e `gap` computados
  da marca pequena e reescreve `--bar-w` e `--bar-gap` como fração de `--bar-h`.
- **Quem centraliza é o navegador**, com `place-items: center` no `.intro__stage`. A conta
  em JS que existia antes lia a viewport antes do layout assentar e errava o centro em
  ~14px. O voo virou delta entre dois retângulos medidos (`--dx`/`--dy`), então nenhuma
  suposição sobre viewport, scrollbar ou compensação sobra no caminho.
- O centro é **óptico, não geométrico**: o skew joga o topo da barra `tan(18deg) × altura`
  para a direita, e isso é compensado por `padding-right` no palco. Tem que ser padding, e
  não margem na marca — dentro do grid a margem entra na conta da centralização e metade
  da compensação se anula.
- A medida do alvo acontece **na hora do voo**, depois da fonte, porque a marca fica
  acima de um `h1` de três linhas num herói ancorado embaixo: métrica errada, alvo errado.

Saídas, todas testadas: `prefers-reduced-motion` e ausência de JS matam a entrada por CSS
(`.intro { display: none }`, liberada só por `.js`); âncora na URL ou scroll já rolado
pulam a entrada; qualquer toque, tecla, clique ou scroll durante a entrada encurta tudo
para 320ms; alvo sem altura ou fora da viewport sai por fade; um `setTimeout` de 5,2s no
JS e uma animação de 6s no CSS garantem que ninguém fique preso atrás do preto.

Cada seção depois disso tem entrada **própria**, nunca a mesma repetida:

| Seção | Movimento | Por quê |
|---|---|---|
| Credibilidade | Marquee contínuo, 42s, pausa no hover | Ambiente, não entrada |
| Serviços | Cortina sólida sai em `scaleX` da direita | O filme sendo assentado |
| Diferenciais | Fade + subida de 24px, stagger 70ms | Lista, lê-se de cima |
| Antes/depois | Sem entrada. Um nudge único ao aparecer | Ensina o gesto de arrastar |
| Portfólio | Fade + `scale(0.97)`, stagger 55ms | Grade |
| Processo | Linha preenche conforme o scroll | O movimento é o conteúdo |

Stagger sempre limitado a 5 posições (`Math.min(i, 5)`), teto de 500ms.

**Armadilha registrada:** a cortina dos serviços é uma sobreposição (`::after`), e não um
`clip-path` no próprio tile. Clipar o alvo zera a área dele e o `IntersectionObserver`
nunca dispara — o elemento se esconde de um jeito que impede a própria revelação. Este
bug já aconteceu neste build. Não reintroduza.

Existe rede de segurança em `wireReveals()`: quem já está na primeira dobra aparece
imediatamente, e um `setTimeout` de 4s revela tudo se o observer não disparar. Conteúdo
nunca fica preso invisível.

`prefers-reduced-motion` degrada por inteiro: marquee vira lista estática, parallax e
máscaras somem, tudo nasce visível.

## Componentes

- **Ações** — `.btn--primary` (giz sobre preto) é a ação principal. `.btn--ghost` é a
  secundária. `.btn--wpp` só onde a mensagem realmente abre o WhatsApp. `.link-arrow` é a
  ação terciária, com sublinhado que vira vermelho no hover. Altura mínima 52px (44px no
  nav), acima do mínimo de toque.
- **Ícones** — sprite SVG autoral no topo do `<body>`, `stroke-width: 1.5`, cantos e pontas
  redondos, viewBox 24. Emoji e glifo Unicode não entram. Marca de terceiro é a única
  exceção: o glifo do WhatsApp é sólido, não traçado, e pede `.icon--brand`
  (`fill: currentColor; stroke: none`) — sem ele o `.icon` do set contorna o logo e o
  deforma. O viewBox dele tem folga (`-2.4 -2.4 28.8 28.8`) para o desenho, que ocupa a
  caixa inteira, pesar o mesmo que os ícones traçados ao lado.
- **`.slot`** — o placeholder de imagem. Gradiente escuro, textura hexagonal a 3,5%
  (referência à iluminação do box real), e o nome do arquivo que deve substituí-lo escrito
  na tela. Em herói e tiles de serviço o rótulo sai do centro para não brigar com o título.
- **`.todo`** — etiqueta vermelha de pendência. Cada uma corresponde a uma linha do
  `PENDENCIAS.md`. Somem conforme o dado real chega.
- **`.compare`** — arrastável com mouse e toque, e operável por teclado (`role="slider"`,
  setas, Home/End, `aria-valuenow` atualizado).

## Regras que não podem cair

1. Vermelho é marcador. Nunca fundo de seção, gradiente ou sombra colorida.
2. Nenhum eyebrow acima de heading.
3. Sombra só com deslocamento e desfoque. Halo colorido de raio zero é decoração.
4. Nada de texto em gradiente. Ênfase vem de peso e tamanho.
5. Nenhum número inventado. Prazo de garantia só aparece com o número e a origem.
6. Tabela larga sempre dentro de `.table-scroll`. A página nunca rola na horizontal.
7. Toda animação tem contrapartida em `prefers-reduced-motion`.

## Verificação do build

Playwright em 1440×900 e 390×844, nas 7 páginas: **zero erro de console, zero recurso
faltando, zero imagem sem `alt`, zero scroll horizontal**. Detector mecânico do Impeccable:
limpo. Os dois "estouros" relatados pelo scanner são intencionais e contidos — o marquee
mascarado e as tabelas de especificação em `overflow-x: auto`.

A entrada foi verificada à parte, em 1440×900, 1232×1040, 390×844, 1280×560 e 800×360:
centro da tinta com erro **0,0px** contra o centro da tela, pouso com erro máximo de
0,26px contra a marca real, zero erro de console, zero scroll horizontal, e o herói sempre
chega em `is-live` — com clique, tecla ou scroll no meio da entrada, com
`prefers-reduced-motion`, com âncora na URL e com o JS desligado.
