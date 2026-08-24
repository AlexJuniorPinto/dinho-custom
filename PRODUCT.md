# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML + CSS + JavaScript puro, sem build step e sem dependências de runtime (escolha confirmada pelo usuário). Fontes auto-hospedadas ou via Google Fonts com preconnect. Motion em CSS nativo + Web Animations / IntersectionObserver. Hospedagem estática (GitHub Pages, Hostinger ou similar). Mesmo padrão dos projetos irmãos em `propostas de sites/`.

## Users

**Primário — Proprietário de carro 0km ou seminovo de médio/alto padrão.** 28 a 55 anos, Formiga/MG e Centro-Oeste mineiro. Chega pelo Instagram ou busca no Google, quase sempre pelo celular. Está com o carro novo na garagem e uma dúvida específica: "vale a pena proteger?" ou "quanto custa escurecer os vidros?". Dores confirmadas: calor no interior, medo de riscar a pintura e desvalorizar, falta de privacidade, e desconfiança de acabamento amador (bolha, corte com lâmina na borracha, descolamento).

**Secundário — Motociclista de esportiva ou trail.** 25 a 45 anos. Quer proteger tanque e carenagem sem repintar, e personalizar sem perder originalidade.

**Terciário — Decisor residencial, arquiteto ou comércio.** 30 a 60 anos. Ambiente envidraçado quente e sem privacidade, ou móveis planejados datados sem verba de troca.

Todos avaliam pelo mesmo critério e não sabem verbalizá-lo: acabamento. Nenhum deles sabe o que significa VLT 5%, nem a diferença entre PPF e vitrificação.

## Product Purpose

Joao Custom aplica películas e filmes de proteção em Formiga/MG: PPF (proteção de pintura), películas automotivas de controle solar, envelopamento e películas arquitetônicas. O negócio não tem site — hoje 100% da captação passa pelo Instagram (@joaocustom, 639 seguidores, 38 posts) e converte por WhatsApp.

Sucesso do site = mais orçamentos qualificados no WhatsApp, com o cliente chegando já entendendo o que está comprando. A maior alavanca de conversão identificada é **tradução técnica**: explicar VLT, PPF e garantia em linguagem que o dono do carro entende antes de ele pedir preço.

## Positioning

**Corte computadorizado em plotter Tech-Cut.** O filme é cortado por máquina a partir do molde digital do veículo, fora do carro. Nenhuma lâmina encosta na pintura, na borracha ou no vidro. É o argumento que o concorrente local que corta a mão não pode copiar, e é o que produz o acabamento que os comentários do perfil elogiam sem saber nomear.

Reforçado por: instalador certificado (certificados expostos na loja), marcas homologadas com garantia de fábrica (Nexus Window Film, ALLTAK), e portfólio com veículos de alto valor (Ferrari 458, Audi A4, KTM 2026, SUVs e picapes 0km) numa cidade do interior.

## Operating Context

- **Canal de contato:** a definir. O WhatsApp e o Instagram foram retirados do site a pedido do cliente, e o formulário de orçamento passou a ser o único caminho de conversão. Falta um destino para os leads — ver `PENDENCIAS.md`.
- **Endereço:** a definir. A rua saiu do site e está marcada como pendência; a cidade (Formiga/MG) continua. Espaço próprio inaugurado em dezembro de 2023.
- **Estrutura física:** box com iluminação hexagonal em LED, piso modular, ambiente controlado. É visualmente forte e já é o cenário da maior parte do conteúdo do perfil.
- **Serviço exige diagnóstico presencial.** Não há preço de tabela: depende de porte do veículo, estado da pintura e escopo. E-commerce/checkout foi descartado no briefing.
- **Região de atendimento:** Formiga, Divinópolis, Arcos, Pains, Córrego Fundo, Lagoa da Prata, Pimenta, Candeias; eventualmente Belo Horizonte.
- **Tráfego será majoritariamente mobile**, vindo de busca local. O link da bio do Instagram era a outra fonte prevista, mas o perfil saiu do site.

## Capabilities and Constraints

**Serviços confirmados (ordem de prioridade do briefing):**
1. **PPF** — Full PPF (veículo completo) e PPF de áreas críticas (parachoque, capô, retrovisores, colunas). Filme regenerativo. Carros e motos.
2. **Películas automotivas de controle solar** — marca principal Nexus Window Film. Linha NX Ceramic (VLT 5%, 20%, 30%; UVR 99%; não bloqueia sinal eletrônico; garantia de 5 anos) e linha NX Carbono. Inclui para-brisa, laterais, traseiro, e fumê em faróis e lanternas.
3. **Envelopamento** — grades, retrovisores, frentes, faixas de moto, protetor de escape. Materiais: ALLTAK, black piano, preto fosco.
4. **Arquitetônico/residencial** — película jateada, proteção solar residencial, envelopamento de planejados, geladeira e mesa.

**Restrições técnicas do site:**
- Sem build step, sem framework, sem dependência de runtime.
- Mobile-first obrigatório. LCP < 2,5s, CLS < 0,1.
- Imagens em WebP/AVIF com lazy loading; vídeo com poster e carregamento sob demanda.
- Sem chatbot e sem checkout (decisão do briefing).

**Terminologia que o site deve traduzir, nunca assumir:** VLT, PPF, filme regenerativo, rejeição de calor, UVR, película cerâmica x carbono, vitrificação.

**Fatos de produto explicitamente indecididos** (não inventar, ver Evidence on Hand):
razão social, CNPJ, e-mail comercial, telefone fixo, CEP, horário de funcionamento, política de agendamento, tempo de mercado exato, garantia do PPF, garantia da linha NX Carbono, faixas de preço, grafia oficial do nome do responsável.

## Brand Commitments

- **Nome:** Joao Custom. Handle: @joaocustom.
- **Logo confirmada:** `joao-logo.png` — wordmark "JOAO CUSTOM" em sans-serif pesada itálica, caixa alta, branca, precedida por duas barras inclinadas vermelhas (`//`). Assinatura secundária em vermelho: "Envelopamento e film residencial". Fundo preto.
- **As barras `//` são o elemento gráfico proprietário da marca** e o único sinal de identidade que existe além do wordmark.
- **Paleta observada:** preto e grafite dominantes, branco, vermelho de destaque.
- **Posicionamento declarado pelo próprio negócio:** "Novo padrão de excelência em películas".
- **Marca pessoal forte:** o responsável (apelido "Joao") aparece executando os serviços na maioria dos vídeos. Isso é um ativo, não um detalhe.
- **Tom de voz atual:** direto, técnico, orgulhoso. O briefing pede manter a energia e a confiança, mas traduzir o jargão, e evitar excesso de emoji, termo técnico sem explicação e promessa sem número de garantia.
- **Arquivo vetorial da logo (SVG/AI/EPS) não existe em mãos** — solicitar ao cliente.
- **Preferência declarada de direção (2026-08-11):** o usuário escolheu explicitamente o padrão da categoria — a estrutura convencional de site de aplicador de PPF premium (hero com mídia cheia + headline + CTA duplo, barra de credibilidade, cards de serviço, slider antes/depois, portfólio, depoimentos, processo, FAQ, mapa, WhatsApp flutuante). Essa convenção é agora um compromisso de marca, não uma escolha de rodada.
- **Régua de acabamento declarada (2026-08-11):** sites de montadoras premium (Porsche, Polestar, BMW M). O nível de execução exigido é o deles: mídia cinematográfica sangrando na tela, tipografia grande e travada, espaço negativo generoso, dados em tabela com fios de cabelo, e motion lento e contido. Consequência direta e vinculante: **o vermelho da marca é marcador, não ambiente** — hairlines, `//`, estados ativos e acentos. Nada de glow neon, nada de gradiente vermelho de fundo, nada de sombra colorida. A ação primária é branca sobre preto; o verde do WhatsApp é a única exceção funcional.

## Evidence on Hand

**Real e verificável:**
- `joao-custom-site.json` — briefing completo extraído de 38 posts públicos do Instagram (análise de 2026-08-11).
- `joao-logo.png` — logo em PNG sobre fundo preto.
- WhatsApp, endereço e serviços listados acima.
- Cases reais citados no perfil, por serviço: Ferrari 458 (Full PPF), Honda HR-V (Full PPF), Fiat Toro Ranch 0km (Full PPF), KTM 2026 0km (PPF completo), Honda CBR Fireblade e África Twin (PPF áreas críticas), Audi A4 Prestige (película 5% e 20% + grade black piano), Honda ZR-V 0km (película 5%), Toyota SW4 0km, VW Nivus 2024 (G20), Kawasaki ZX-6R 2021 (faixas), VW Golf TSI, VW Saveiro Cross, Ford Focus, Honda Civic, Fiat Punto, Honda XRE 300.
- Garantias com número confirmado: **5 anos na linha NX Ceramic**, **3 anos em proteção solar**.
- Parceiros e fornecedores: Nexus Window Film (@nexuswindowfilm), ALLTAK, Tech-Cut (@tech_cut).

**Ausente — não fabricar:**
- **Nenhum depoimento estruturado existe.** Há elogios orgânicos em comentários (acabamento, profissionalismo), sem nome, cidade ou veículo. Depoimentos com atribuição só entram no site com material real do cliente.
- **Nenhuma foto ou vídeo próprio está em mãos.** O usuário informou que subirá as imagens ao longo da construção. O site deve ser construído com slots de mídia nomeados e documentados, prontos para troca.
- **Nenhum preço, nenhuma faixa de preço, nenhum "a partir de".**
- **Nenhuma avaliação do Google** — o Google Meu Negócio não foi evidenciado e provavelmente não existe.
- Nenhum número de clientes atendidos, anos de mercado ou volume de serviços.

## Product Principles

1. **Traduzir antes de vender.** Todo termo técnico aparece junto da sua consequência prática para o dono do carro. "VLT 5%" nunca aparece sozinho; aparece como "o quanto você enxerga de fora para dentro".
2. **O acabamento é o produto.** A prova de qualidade é visual e está no detalhe: borda, recorte, ausência de bolha. O site precisa mostrar de perto, não de longe.
3. **Toda ação termina no WhatsApp, com contexto.** O lead chega identificando de qual página e de qual serviço veio. Captura de e-mail é secundária.
4. **Nunca prometer sem número.** Garantia só aparece com prazo e origem (fábrica/marca). Onde o dado não está confirmado, o site diz o que sabe e não preenche o resto.
5. **Mobile é o site.** O desktop é a versão secundária. Peso, toque e legibilidade em tela pequena vêm antes de qualquer efeito.

## Accessibility & Inclusion

Contraste mínimo AA sobre fundo escuro (o site é dark-primary por decisão de marca). Navegação completa por teclado com foco visível. Alt descritivo em todas as imagens no padrão serviço + modelo + cidade. Labels visíveis em todos os campos de formulário. `prefers-reduced-motion` respeitado — o site tem motion pesado e precisa degradar por inteiro.
