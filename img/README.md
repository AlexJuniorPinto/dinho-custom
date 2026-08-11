# Imagens do site — o que subir e onde

São **44 slots** no total. Cada espaço cinza no site é um **slot nomeado**, e o nome do
arquivo está escrito dentro do próprio slot, na tela. Salve a foto com aquele nome exato,
na pasta indicada, e **troque o bloco do slot pela tag `<img>`** — o site não faz essa
troca sozinho, é uma linha de HTML por foto.

## Já preenchidos — 5 de 44

| Arquivo | Onde |
|---|---|
| `hero-oficina.jpg` | herói da home |
| `servicos/ppf.jpg` · `servicos/peliculas.jpg` · `servicos/envelopamento.jpg` · `servicos/arquitetonico.jpg` | os 4 cards de serviço da home |

Faltam 39: os 5 heróis das páginas internas, os 8 do antes e depois e os 26 do portfólio.

## Como trocar um slot por uma foto

No HTML, cada slot é um bloco assim:

```html
<div class="slot">
  <div class="slot__meta">
    <span class="slot__name">img/portfolio/ferrari-458-full-ppf.jpg</span>
  </div>
</div>
```

Troque o bloco inteiro por:

```html
<img src="img/portfolio/ferrari-458-full-ppf.jpg"
     alt="Full PPF aplicado em Ferrari 458 na Dinho Custom, Formiga MG"
     width="1200" height="900" loading="lazy" decoding="async">
```

O `alt` importa para o Google. Use sempre o padrão **serviço + modelo + cidade**.
As imagens do herói levam `fetchpriority="high"` no lugar de `loading="lazy"`, porque
são a primeira coisa que a pessoa vê.

## Regras que valem para toda foto

| Item | Valor |
|---|---|
| Formato | JPG de qualidade 80–85, ou WebP |
| Peso máximo | 250 KB por imagem. Acima disso o site fica lento no 4G |
| Herói | 1920 × 1080, horizontal |
| Portfólio e serviços | 1200 × 900 (4:3) |
| Antes e depois | 1600 × 900 (16:9), **os dois do par no mesmo enquadramento** |
| Placas | Desfoque ou remoção antes de publicar |
| Foto em pé | Serve: o site corta com `object-fit: cover`. Se o corte pegar a parte errada, use `style="object-position: 50% 50%"` na tag para escolher a altura do corte — 0% puxa para o topo da foto, 100% para a base. É o que enquadra o herói da home no carro |

O ponto mais importante: **fotografe de perto**. O que vende este serviço é a borda,
o recorte no farol, a quina do parachoque. Foto do carro inteiro a cinco metros de
distância não mostra acabamento nenhum.

---

## Lista completa dos slots

### Heróis — 6 fotos horizontais, 1920 × 1080

| Arquivo | O que fotografar |
|---|---|
| ~~`hero-oficina.jpg`~~ | **Feito.** Porsche preto no box, com a iluminação hexagonal refletida na pintura |
| `servicos/ppf-hero.jpg` | Aplicação de PPF em andamento, close no rodo e no filme |
| `servicos/peliculas-hero.jpg` | Aplicação de película em vidro lateral |
| `servicos/envelopamento-hero.jpg` | Grade ou retrovisor em black piano, close |
| `servicos/arquitetonico-hero.jpg` | Ambiente envidraçado com película aplicada |
| `servicos/loja-fachada.jpg` | Fachada ou interior da loja |

### Cards de serviço da home — 4 fotos, 1200 × 900 — **feitos**

Os quatro estão no ar. Vale trocar quando houver foto de trabalho da própria oficina:
as três automotivas são de banco de imagem, e a de casa e comércio tem só 318 px de
largura — no card do desktop ela aparece esticada e um pouco mole.

### Antes e depois — 4 pares, 1600 × 900

Cada par precisa da **mesma distância, mesmo ângulo e mesma luz**. Tire a foto do
"antes" já pensando em repetir exatamente o enquadramento depois. Se as duas fotos
não baterem, o comparador denuncia em vez de convencer.

| Par | Arquivos |
|---|---|
| PPF em capô | `antes-depois/ppf-capo-antes.jpg` · `antes-depois/ppf-capo-depois.jpg` |
| Película nos vidros | `antes-depois/pelicula-lateral-antes.jpg` · `antes-depois/pelicula-lateral-depois.jpg` |
| Grade em black piano | `antes-depois/grade-antes.jpg` · `antes-depois/grade-depois.jpg` |
| PPF em tanque de moto | `antes-depois/moto-tanque-antes.jpg` · `antes-depois/moto-tanque-depois.jpg` |

### Portfólio — 26 fotos, 1200 × 900

Todos os veículos abaixo já aparecem no Instagram. É só recuperar a foto original,
em boa resolução, e salvar com o nome indicado.

**PPF**
- `portfolio/ferrari-458-full-ppf.jpg` — Ferrari 458, Full PPF
- `portfolio/ktm-2026-ppf.jpg` — KTM 2026 0km, PPF completo
- `portfolio/toro-ranch-full-ppf.jpg` — Fiat Toro Ranch 0km, Full PPF
- `portfolio/honda-hrv-full-ppf.jpg` — Honda HR-V, Full PPF
- `portfolio/cbr-fireblade-ppf.jpg` — Honda CBR Fireblade, áreas críticas
- `portfolio/africa-twin-ppf.jpg` — Honda África Twin, áreas críticas

**Películas**
- `portfolio/audi-a4-pelicula.jpg` — Audi A4 Prestige, 5% e 20%
- `portfolio/honda-zrv-pelicula-5.jpg` — Honda ZR-V 0km, 5%
- `portfolio/toyota-sw4-protecao-solar.jpg` — Toyota SW4 0km, proteção solar
- `portfolio/vw-nivus-g20.jpg` — VW Nivus 2024, G20
- `portfolio/honda-hrv-pelicula.jpg` — Honda HR-V, película 5%
- `portfolio/toro-ranch-pelicula.jpg` — Fiat Toro Ranch, laterais e traseiro

**Envelopamento**
- `portfolio/audi-a4-grade-black-piano.jpg` — Audi A4, grade black piano
- `portfolio/kawasaki-zx6r-faixas.jpg` — Kawasaki ZX-6R 2021, faixas originais
- `portfolio/golf-tsi-retrovisores.jpg` — VW Golf TSI, retrovisores
- `portfolio/saveiro-cross-retrovisores.jpg` — VW Saveiro Cross, retrovisores
- `portfolio/honda-civic-grade.jpg` — Honda Civic, grade frontal
- `portfolio/fiat-punto-frente-black.jpg` — Fiat Punto, frente black e faróis
- `portfolio/ford-focus-retrovisores.jpg` — Ford Focus, retrovisores
- `portfolio/honda-xre300-escape.jpg` — Honda XRE 300, protetor de escape

**Residencial e comercial** — *esta é a linha mais carente. O conteúdo do perfil é
de 2022 e não sustenta a página. Vale fotografar os próximos trabalhos.*
- `portfolio/residencial-jateada-porta.jpg` — porta de vidro, película jateada
- `portfolio/residencial-protecao-solar.jpg` — janela residencial
- `portfolio/residencial-planejado-preto.jpg` — armário planejado em preto fosco
- `portfolio/residencial-geladeira.jpg` — geladeira envelopada
- `portfolio/residencial-mesa.jpg` — mesa de jantar envelopada
- `portfolio/residencial-fachada.jpg` — fachada comercial

---

## Logo

Os arquivos em `logo/` foram gerados a partir do `dinho-logo.png` original: fundo
removido, recortados e otimizados. O wordmark saiu de **960 KB para 7,6 KB**.

| Arquivo | Uso |
|---|---|
| `logo/dinho-wordmark.png` | Barra de navegação — só a linha `//DINHO CUSTOM` |
| `logo/dinho-lockup.png` | Rodapé — wordmark mais a assinatura |
| `logo/icon-180.png`, `logo/icon-512.png` | Ícone de app e favicon grande |
| `logo/og-dinho-custom.jpg` | Imagem que aparece ao compartilhar no WhatsApp |

Se o cliente tiver o **arquivo vetorial** (SVG, AI ou EPS), vale substituir: fica mais
nítido em tela retina e pesa menos ainda.
