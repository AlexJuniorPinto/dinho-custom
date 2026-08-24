# Pendências — o que falta para o site ir ao ar

O site está funcionando por inteiro. O que está aqui é **dado que eu não podia inventar**.
Cada item abaixo aparece marcado no site com uma etiqueta vermelha `PREENCHER` ou similar,
então é fácil achar o que já foi resolvido.

Ordem de prioridade: **bloqueia a publicação** → **custa conversão** → **pode esperar**.

---

## 1. Bloqueia a publicação

### 1.1 Domínio
Hoje o site aponta para `https://www.joaocustom.com.br` em todas as tags canônicas,
Open Graph, sitemap e robots. Se o domínio registrado for outro, é uma busca e
substituição em 7 arquivos.

**Arquivos:** `index.html`, `ppf/index.html`, `peliculas-automotivas/index.html`,
`envelopamento/index.html`, `peliculas-residenciais/index.html`, `contato/index.html`,
`politica-de-privacidade.html`, `sitemap.xml`, `robots.txt`

### 1.2 Horário de funcionamento
Aparece marcado em **dois lugares**: seção "Onde ficamos" da home e página de contato.

Precisa de: dias e horários, e se atende sábado. Também define se o negócio trabalha
**por agendamento** ou por ordem de chegada — isso muda o texto do passo 4 do processo.

Depois de confirmar, acrescente também no bloco `openingHoursSpecification` do
schema em `index.html` (há um comentário no arquivo indicando o lugar exato).
Horário no Google é o dado que mais gera ligação em negócio local.

### 1.3 Razão social e CNPJ
Aparece no rodapé de todas as páginas e na política de privacidade.
Exigência legal para site comercial.

### 1.4 Política de privacidade — revisão
O texto em `politica-de-privacidade.html` descreve corretamente como o site funciona
(ele não guarda dado nenhum: o formulário monta a mensagem no próprio navegador).
Falta preencher o responsável e o contato oficial, definir o canal de destino do
formulário, e revisar se o cliente concorda com o trecho sobre imagem de veículos.

### 1.5 Canal de destino do formulário
**Esta é a pendência mais dura da lista: hoje o formulário não envia.**

O site foi construído em cima do WhatsApp — 45 botões em 7 páginas apontavam para
o número do negócio, e o próprio formulário entregava o lead por lá. Com a retirada
do telefone, os botões passaram a rolar até o formulário, mas o formulário ficou sem
para onde mandar.

Preencha `LEAD_MAIL` no topo de `js/main.js` com o e-mail comercial e o envio volta
a funcionar, montando a mensagem por `mailto:`. Enquanto estiver vazio, quem enviar
vê o aviso *"Canal de envio ainda não configurado"* — é proposital: melhor travar
com aviso do que abrir um destino vazio em silêncio.

Se o canal preferido não for e-mail, a troca é num lugar só: a função `mailLink()`,
logo abaixo da constante.

### 1.6 Endereço
Saiu do site a pedido, e está marcado como `Endereço a definir` em dois lugares:
seção "Onde ficamos" da home e página de contato. A cidade (Formiga, MG) continua
em toda parte — títulos, meta, SEO local e região atendida não foram tocados.

Junto com o endereço saíram o mapa incorporado e os botões "Traçar rota até a loja",
que não tinham para onde apontar. Quando o endereço entrar, vale repor os dois: o
mapa era uma fachada leve, que só carrega o Google quando a pessoa clica.

No `schema.org` de cada página o campo `streetAddress` foi removido, mas
`addressLocality` e `addressRegion` continuam — o endereço segue válido para o
Google, só menos específico.

---

## 2. Custa conversão enquanto estiver vazio

### 2.1 Depoimentos — a maior lacuna do site
São **três blocos reservados** na home, hoje visivelmente marcados como exemplo.

Não inventei nenhum, de propósito: depoimento falso é o tipo de coisa que destrói
confiança quando descoberto, e o perfil não tem nenhum depoimento estruturado hoje —
só elogios soltos em comentário, sem nome nem veículo.

**O que fazer:** mandar mensagem para três clientes recentes pedindo uma frase.
Cada depoimento precisa de **frase + nome e sobrenome + cidade + veículo e serviço**.
Sem os quatro, não convence. O ideal é um de PPF, um de película e um de moto.

**Arquivo:** `index.html`, seção "O que os clientes falam"

### 2.2 Fotos
Todos os espaços cinzas do site são slots nomeados. A lista completa dos **44 arquivos**,
com o nome exato e o que fotografar em cada um, está em **`img/README.md`**.

Já entraram 9: o herói da home, os 4 cards de serviço, o par de antes e depois do
capô e os 2 primeiros tiles do portfólio (Ferrari 458 e KTM). Faltam 35.

**Achado ao subir a Ferrari:** o arquivo do herói da home é byte a byte o mesmo da
Ferrari do portfólio, e é um PNG de 2,3 MB com extensão `.jpg` — sendo a imagem de LCP
da página. Os dois problemas estão descritos em `img/README.md`.

Prioridade agora: os **3 pares de antes e depois que faltam** — película nos vidros,
grade em black piano e tanque de moto. É a prova visual mais forte que este negócio
tem, e o comparador arrastável já está no ar com o primeiro par.
Atenção ao detalhe que faz ou quebra a seção: **as duas fotos do par precisam do mesmo
enquadramento, mesma distância e mesma luz.**

### 2.3 Faixa de preço
O briefing marcou como lacuna de alto impacto, e concordo. Hoje a resposta da FAQ
"Quanto custa?" diz honestamente que não há tabela e pede o modelo pelo WhatsApp.

Se o cliente topar publicar um **"a partir de"** por serviço, filtra curioso e melhora
a qualidade do lead. Se não topar, o texto atual funciona e pode ficar como está —
mas aí vale remover a etiqueta de pendência.

### 2.4 Garantias — padronizar
Os prazos **confirmados** já estão no site: 5 anos na linha NX Ceramic e 3 anos na
proteção solar. Estão na tabela da página de películas e na FAQ.

Faltam dois, e ambos estão marcados:
- **garantia do PPF** (aparece na FAQ da página de PPF)
- **garantia da linha NX Carbono** (aparece na tabela de películas)

O briefing apontou que hoje as garantias são citadas de forma inconsistente nos posts.
Vale fechar o número e usar sempre o mesmo em toda comunicação.

---

## 3. Pode esperar, mas rende muito

### 3.1 Google Meu Negócio
O briefing classificou como **"muito alto — maior ganho rápido"** e não encontrou
perfil ativo. Para um negócio local em cidade de 70 mil habitantes, isso costuma
render mais que o site inteiro no primeiro mês.

Ao criar, use o mesmo endereço, telefone e nome que estiverem no site, caractere por
caractere. Divergência entre as duas fontes atrapalha o ranqueamento local — e hoje
o site não traz nem endereço nem telefone, então isso depende das pendências 1.5 e 1.6.

### 3.2 Analytics
Não instalei nada, porque tag de terceiro pesa e precisa da conta do cliente.
Quando quiser, os eventos que valem a pena medir são: `clique_whatsapp`,
`envio_formulario`, `clique_rota` e `visualizacao_portfolio`.

Se instalar Google Analytics ou Meta Pixel, **atualize a política de privacidade** —
há um trecho marcado esperando exatamente por isso.

### 3.3 Logo em vetor
A logo foi extraída do PNG que você enviou: fundo removido, recortada e otimizada
de **960 KB para 5,6 KB**. Está ótima para uso em tela.

Atenção: como o PNG original trazia a palavra *Dinho Custom*, o wordmark foi
**redesenhado em Archivo Italic** para dizer *Joao Custom*. A tipografia é muito
próxima da original, mas não é a mesma fonte — as barras `//` e a assinatura
vermelha, sim, continuam sendo os pixels originais.

Se existir o arquivo original em SVG, AI ou EPS — ou se a marca tiver uma fonte
oficial —, vale substituir: fica mais nítido em tela retina, pesa menos ainda e
elimina a aproximação tipográfica.

### 3.3.1 A placa da parede nas fotos
A parede da oficina, nas fotos, tinha a placa física `//DINHO CUSTOM`. As letras
foram substituídas por `JOAO CUSTOM` no herói da home e nas duas fotos da Ferrari
— as barras `//` são as originais. O retoque aguenta bem o tamanho em que as fotos
aparecem no site, mas é retoque: em zoom de 100% um olho treinado percebe.

O ideal é fotografar a oficina de novo depois que a placa física for trocada.
Enquanto isso não acontece, as imagens atuais resolvem.

### 3.4 E-mail comercial
Não existe hoje. O site inteiro converte por WhatsApp, que é o canal confirmado do
negócio, então isso não bloqueia nada. Mas um e-mail no domínio próprio ajuda na
credibilidade com cliente de arquitetura e com condomínio, que é o público da
linha residencial.

### 3.5 Fase 2 sugerida
Ficaram de fora desta entrega, por decisão de escopo: Portfólio como página própria,
Sobre, Blog, e as duas landing pages de SEO local (`/ppf-formiga-mg` e
`/insulfilm-formiga-mg`). A estrutura do site já comporta todas.

---

## Como o site funciona, em duas linhas

**Não tem back-end e não tem banco de dados.** O formulário de orçamento monta uma
mensagem de texto com o que a pessoa preencheu e a entrega ao canal configurado em
`LEAD_MAIL`, no topo de `js/main.js`. Ela confere e envia. Cada botão do site rola
até o formulário mais próximo — ou, nas páginas sem formulário, leva para `/contato/`.

**Enquanto `LEAD_MAIL` estiver vazio o envio fica bloqueado**, com aviso na tela.
É de propósito: melhor travar do que abrir um destino vazio em silêncio.

Isso significa hospedagem estática barata (ou de graça no GitHub Pages), zero
manutenção de servidor e nada de dado de cliente parado em lugar nenhum.
