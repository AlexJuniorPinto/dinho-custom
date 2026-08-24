/* ==========================================================================
   JOAO CUSTOM — comportamento
   Sem dependências. Tudo degrada quando o JS não roda.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------- *
   * Config — o destino do lead entra em um lugar só
   *
   * PENDÊNCIA: enquanto LEAD_MAIL estiver vazio o formulário não tem para
   * onde enviar. Preencha com o e-mail comercial e o envio passa a funcionar.
   * ---------------------------------------------------------------------- */

  var LEAD_MAIL = '';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

  function mailLink(subject, body) {
    return 'mailto:' + LEAD_MAIL +
           '?subject=' + encodeURIComponent(subject) +
           '&body=' + encodeURIComponent(body);
  }

  function on(el, ev, fn, opts) {
    if (el) el.addEventListener(ev, fn, opts);
  }

  function all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ---------------------------------------------------------------------- *
   * CTAs de orçamento
   * Cada link declara data-quote="<assunto>". Se a página tem formulário,
   * o CTA rola até ele; se não tem, manda para a página de contato.
   * O assunto vai junto e o formulário já abre com o serviço marcado.
   * ---------------------------------------------------------------------- */

  function quoteTarget() {
    var form = document.querySelector('[data-quote-form]');
    if (form) {
      if (!form.id) form.id = 'orcamento';
      return '#' + form.id;
    }
    var nav = document.querySelector('a[href$="contato/"]');
    return nav ? nav.getAttribute('href') : 'contato/';
  }

  function wireQuoteLinks() {
    var target = quoteTarget();
    all('[data-quote]').forEach(function (el) {
      el.setAttribute('href', target);
    });
  }

  /* ---------------------------------------------------------------------- *
   * Herói — a sequência autoral de carga
   * ---------------------------------------------------------------------- */

  // Esperar a fonte evita a linha subir com a métrica errada. Teto de 900ms:
  // fonte lenta não segura a página.
  function whenFontsReady(fn) {
    var settled = false;
    var go = function () { if (!settled) { settled = true; requestAnimationFrame(fn); } };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(go);
      setTimeout(go, 900);
    } else {
      requestAnimationFrame(go);
    }
  }

  // Prepara o herói e devolve o gatilho. Quem decide a hora é a entrada:
  // sem ela, é a fonte; com ela, é o momento em que a cortina começa a sair.
  function prepareHero() {
    var hero = document.querySelector('.hero, .phero');
    if (!hero) return function () {};

    all('.reveal-line, .mark i', hero).forEach(function (el, i) {
      el.style.setProperty('--i', i);
    });

    var started = false;
    return function () {
      if (started) return;
      started = true;
      hero.classList.add('is-live');
    };
  }

  /* ---------------------------------------------------------------------- *
   * Entrada — as barras // da logo até a marca do herói
   *
   * FLIP: as barras grandes crescem centradas na tela preta e são levadas por
   * translate + scale até o retângulo exato de .hero .mark, medido no momento
   * do voo. No pouso a marca real assume, sem transição, e a entrada é
   * removida do DOM. A cortina sai enviesada nos mesmos -18deg da barra.
   * ---------------------------------------------------------------------- */

  function bootIntro(startHero) {
    // As barras levam ~710ms para crescer no centro; ENTER dá o respiro antes
    // do voo. Somados, a entrada inteira fica em ~1,9s.
    var ENTER = 1000;
    var FLIGHT = 860;   // deve casar com a transição de .intro__mark no CSS

    var intro = document.querySelector('.intro');
    var introMark = intro && intro.querySelector('.intro__mark');
    var hero = document.querySelector('.hero');
    var mark = hero && hero.querySelector('.mark');
    var bar = mark && mark.querySelector('i');

    // Sem entrada na página, sem alvo para pousar, com movimento reduzido, ou
    // quando o visitante já chega no meio da página (âncora, scroll restaurado):
    // o herói entra direto, como se a entrada não existisse.
    if (!intro || !introMark || !mark || !bar || REDUCED.matches ||
        window.location.hash || window.scrollY > 40) {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
      whenFontsReady(startHero);
      return;
    }

    var timers = [];
    var flying = false;
    var landed = false;

    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function stop() { timers.forEach(clearTimeout); timers.length = 0; }

    var EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'];
    function watch(add) {
      EVENTS.forEach(function (ev) {
        window[(add ? 'add' : 'remove') + 'EventListener'](ev, cut, { passive: true });
      });
    }

    // Pouso: a marca real toma o lugar da barra que voou, no mesmo quadro.
    function hand() {
      if (landed) return;
      landed = true;
      stop();
      watch(false);
      hero.classList.remove('is-intro');
      hero.classList.add('is-handoff');
      startHero();
    }

    // Fora do controle de stop(): a cortina sai mesmo se algo cancelar o resto.
    function drop(ms) {
      window.setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, ms || 0);
    }

    function fly(ms) {
      if (flying || landed) return;
      flying = true;

      var t = mark.getBoundingClientRect();
      var m = introMark.getBoundingClientRect();

      // Alvo fora de vista ou sem altura: não existe pouso honesto, sai por fade
      if (t.height < 4 || m.height < 4 || t.top < 0 || t.bottom > intro.clientHeight) {
        intro.classList.add('is-out');
        hand();
        drop(360);
        return;
      }

      // Delta entre dois retângulos medidos: não há suposição sobre viewport,
      // scrollbar ou compensação óptica — o que estiver na tela é o que vale.
      intro.style.setProperty('--dx', (t.left - m.left).toFixed(2) + 'px');
      intro.style.setProperty('--dy', (t.top - m.top).toFixed(2) + 'px');
      intro.style.setProperty('--land-s', (t.height / m.height).toFixed(4));
      intro.classList.add('is-flying');

      // O herói entra enquanto a cortina ainda está saindo: as duas coisas são
      // um movimento só, não uma depois da outra.
      later(startHero, 90);
      later(function () { hand(); drop(0); }, ms);
    }

    // Visitante interrompeu. Se as barras já estão no ar, deixa terminar.
    function cut(e) {
      if (landed || flying) return;
      // Scroll fantasma não é intenção de ninguém: restauração de posição,
      // resize do painel do DevTools e imagem que entra tarde disparam scroll
      // com a página ainda no topo. Só corta quando a página realmente saiu.
      if (e && e.type === 'scroll' && window.scrollY < 8) return;
      // Modificador sozinho (Alt+Tab, Shift ao voltar para a janela) também não
      if (e && e.type === 'keydown' &&
          (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta')) return;
      stop();
      intro.classList.add('is-fast');
      fly(320);
    }

    hero.classList.add('is-intro');

    // A barra grande herda a proporção exata da marca pequena. Sem isso o
    // pouso cai perto, não em cima, e a troca pisca.
    var cs = window.getComputedStyle(bar);
    var bw = parseFloat(cs.width);
    var bh = parseFloat(cs.height);
    var gap = parseFloat(window.getComputedStyle(mark).columnGap) || 4;
    if (bw && bh) {
      intro.style.setProperty('--bar-w', 'calc(var(--bar-h) * ' + (bw / bh).toFixed(4) + ')');
      intro.style.setProperty('--bar-gap', 'calc(var(--bar-h) * ' + (gap / bh).toFixed(4) + ')');
    }

    intro.classList.add('is-ready');

    watch(true);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { intro.classList.add('is-in'); });
    });

    // O voo espera a fonte: a posição da marca no herói depende da métrica do
    // título que está embaixo dela. O teto de whenFontsReady é 900ms, abaixo
    // de ENTER, então na prática quem manda é o tempo da entrada.
    var minDone = false;
    var fontsDone = false;
    function ready() { if (minDone && fontsDone) fly(FLIGHT); }

    whenFontsReady(function () { fontsDone = true; ready(); });
    later(function () { minDone = true; ready(); }, ENTER);

    // Rede de segurança: nada pode deixar o herói preso atrás da cortina.
    window.setTimeout(function () { hand(); drop(0); }, 5200);
  }

  /* ---------------------------------------------------------------------- *
   * Navegação
   * ---------------------------------------------------------------------- */

  function wireNav() {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav__toggle');
    var menu = document.getElementById('menu');

    if (nav) {
      var stuck = false;
      var onScroll = function () {
        var should = window.scrollY > 24;
        if (should !== stuck) {
          stuck = should;
          nav.classList.toggle('is-stuck', should);
        }
      };
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();
    }

    if (!toggle || !menu) return;

    var lastFocus = null;

    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('is-locked', open);
      all('use', toggle).forEach(function (u) {
        u.setAttribute('href', open ? '#i-close' : '#i-menu');
      });

      if (open) {
        lastFocus = document.activeElement;
        var first = menu.querySelector('a, button');
        if (first) first.focus();
      } else if (lastFocus) {
        lastFocus.focus();
      }
    }

    setMenu(false);
    on(toggle, 'click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    all('a', menu).forEach(function (a) {
      on(a, 'click', function () { setMenu(false); });
    });
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ---------------------------------------------------------------------- *
   * Revelação em scroll — cada grupo recebe seu índice de stagger
   * ---------------------------------------------------------------------- */

  function wireReveals() {
    var groups = [
      '[data-in]',
      '.services__item',
      '.why__item',
      '.work',
      '.process__step'
    ];

    var targets = [];
    groups.forEach(function (sel) {
      var items = all(sel);
      var byParent = new Map();
      items.forEach(function (el) {
        var key = el.parentNode;
        if (!byParent.has(key)) byParent.set(key, 0);
        var i = byParent.get(key);
        // teto de 5 posições mantém o stagger abaixo de 500ms
        el.style.setProperty('--i', Math.min(i, 5));
        byParent.set(key, i + 1);
        targets.push(el);
      });
    });

    if (!targets.length) return;

    function revealAll() {
      targets.forEach(function (el) { el.classList.add('is-in'); });
    }

    if (!('IntersectionObserver' in window) || REDUCED.matches) {
      revealAll();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(function (el) { io.observe(el); });

    // Rede de segurança: nada de conteúdo preso invisível.
    // Quem já está na primeira dobra aparece de imediato; o resto tem um
    // prazo máximo, caso o observer não dispare (aba em segundo plano,
    // restauração de scroll, salto direto para uma âncora).
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
    });
    setTimeout(revealAll, 4000);
  }

  /* ---------------------------------------------------------------------- *
   * Antes e depois
   * ---------------------------------------------------------------------- */

  function wireCompare() {
    all('[data-compare]').forEach(function (root) {
      var handle = root.querySelector('.compare__handle');
      var after = root.querySelector('.compare__pane--after');
      if (!handle || !after) return;

      var pos = 50;
      var dragging = false;

      function paint(v) {
        pos = Math.max(0, Math.min(100, v));
        root.style.setProperty('--pos', pos + '%');
        handle.setAttribute('aria-valuenow', Math.round(pos));
      }

      function fromEvent(e) {
        var rect = root.getBoundingClientRect();
        var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        paint((x / rect.width) * 100);
      }

      function down(e) {
        dragging = true;
        root.classList.remove('is-taught');
        fromEvent(e);
        if (e.cancelable) e.preventDefault();
      }
      function move(e) { if (dragging) fromEvent(e); }
      function up() { dragging = false; }

      on(root, 'mousedown', down);
      on(window, 'mousemove', move);
      on(window, 'mouseup', up);
      on(root, 'touchstart', down, { passive: false });
      on(window, 'touchmove', move, { passive: true });
      on(window, 'touchend', up);

      on(handle, 'keydown', function (e) {
        var step = e.shiftKey ? 10 : 2;
        if (e.key === 'ArrowLeft') { paint(pos - step); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { paint(pos + step); e.preventDefault(); }
        else if (e.key === 'Home') { paint(0); e.preventDefault(); }
        else if (e.key === 'End') { paint(100); e.preventDefault(); }
      });

      paint(50);

      // Nudge de aprendizado: uma vez só, quando entra em tela
      if ('IntersectionObserver' in window && !REDUCED.matches) {
        var taught = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            root.classList.add('is-taught');
            taught.disconnect();
          });
        }, { threshold: 0.5 });
        taught.observe(root);
      }

      // Troca de case. Enquanto o par de fotos não existe, o lado volta para o slot
      // nomeado — é o `ready` do data-case que decide, não a presença do arquivo.
      function fillPane(side, src, alt, ready) {
        var pane = root.querySelector('.compare__pane--' + side);
        if (!pane) return;
        var img = pane.querySelector('[data-compare-img]');
        var slot = pane.querySelector('[data-compare-slot]');
        var name = slot && slot.querySelector('.slot__name');

        if (name && src) name.textContent = src;
        if (img) {
          if (ready && src) { img.src = src; img.alt = alt || ''; }
          else { img.removeAttribute('src'); img.alt = ''; }
          img.hidden = !(ready && src);
        }
        if (slot) slot.hidden = !!(ready && src);
      }

      var tabs = all('[role="tab"]', root.closest('[data-compare-group]') || document);
      tabs.forEach(function (tab) {
        on(tab, 'click', function () {
          tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
          tab.setAttribute('aria-selected', 'true');

          var data = JSON.parse(tab.getAttribute('data-case') || '{}');
          fillPane('before', data.before, data.altBefore, data.ready);
          fillPane('after', data.after, data.altAfter, data.ready);

          var cap = document.querySelector('[data-compare-caption]');
          if (cap && data.caption) cap.innerHTML = data.caption;

          paint(50);
        });
      });
    });
  }

  /* ---------------------------------------------------------------------- *
   * Filtro do portfólio
   * ---------------------------------------------------------------------- */

  function wireFilters() {
    var bar = document.querySelector('[data-filters]');
    if (!bar) return;

    var buttons = all('button', bar);
    var items = all('[data-tags]');
    var live = document.querySelector('[data-filter-status]');

    buttons.forEach(function (btn) {
      on(btn, 'click', function () {
        var f = btn.getAttribute('data-filter');
        buttons.forEach(function (b) { b.setAttribute('aria-selected', String(b === btn)); });

        var shown = 0;
        items.forEach(function (item) {
          var match = f === 'all' || (item.getAttribute('data-tags') || '').split(' ').indexOf(f) > -1;
          item.hidden = !match;
          if (match) shown++;
        });

        if (live) {
          live.textContent = shown + (shown === 1 ? ' trabalho' : ' trabalhos') + ' em exibição.';
        }
      });
    });
  }

  /* ---------------------------------------------------------------------- *
   * FAQ
   * ---------------------------------------------------------------------- */

  function wireFaq() {
    all('.faq__q').forEach(function (btn) {
      on(btn, 'click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
      });
    });
  }

  /* ---------------------------------------------------------------------- *
   * Processo — a linha preenche conforme o leitor avança
   * ---------------------------------------------------------------------- */

  function wireProcess() {
    var proc = document.querySelector('.process');
    var line = document.querySelector('.process__line');
    if (!proc || !line || REDUCED.matches) return;

    var ticking = false;
    function update() {
      var rect = proc.getBoundingClientRect();
      var vh = window.innerHeight;
      var span = rect.height + vh * 0.5;
      var passed = vh * 0.75 - rect.top;
      // Fração 0–1: a linha preenche por transform, não por height/width
      var pct = Math.max(0, Math.min(1, passed / span));
      line.style.setProperty('--fill', pct.toFixed(3));
      ticking = false;
    }

    on(window, 'scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    on(window, 'resize', update);
    update();
  }

  /* ---------------------------------------------------------------------- *
   * Mapa — fachada leve, o iframe só carrega no clique
   * ---------------------------------------------------------------------- */

  function wireMap() {
    var facade = document.querySelector('.map__facade');
    if (!facade) return;

    on(facade, 'click', function () {
      var src = facade.getAttribute('data-src');
      var frame = document.createElement('iframe');
      frame.src = src;
      frame.title = 'Mapa com a localização da Joao Custom em Formiga, MG';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.allowFullscreen = true;
      facade.parentNode.appendChild(frame);
      facade.remove();
    });
  }

  /* ---------------------------------------------------------------------- *
   * CTA flutuante — entra depois que o herói sai
   * ---------------------------------------------------------------------- */

  function wireFloat() {
    var float = document.querySelector('.cta-float');
    if (!float) return;

    if (REDUCED.matches) { float.classList.add('is-in'); return; }

    var show = function () {
      float.classList.toggle('is-in', window.scrollY > window.innerHeight * 0.55);
    };
    on(window, 'scroll', show, { passive: true });
    show();
  }

  /* ---------------------------------------------------------------------- *
   * Formulário de orçamento
   * Sem back-end: monta a mensagem no navegador e entrega ao canal
   * configurado em LEAD_MAIL. Sem esse dado o envio fica bloqueado, com
   * aviso na tela — melhor do que abrir um destino vazio.
   * ---------------------------------------------------------------------- */

  function wireForm() {
    var form = document.querySelector('[data-quote-form]');
    if (!form) return;

    function fieldOf(input) { return input.closest('.field') || input.closest('.check'); }

    function say(message, isError) {
      var slot = form.querySelector('[data-form-status]');
      if (!slot) {
        slot = document.createElement('p');
        slot.className = 'form__note';
        slot.setAttribute('data-form-status', '');
        slot.setAttribute('role', 'status');
        form.appendChild(slot);
      }
      slot.textContent = message;
      slot.style.color = isError ? 'var(--red)' : '';
    }

    function setError(input, message) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.add('field--error');
      input.setAttribute('aria-invalid', 'true');
      var slot = field.querySelector('.field__error');
      if (slot) slot.textContent = message;
    }

    function clearError(input) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.remove('field--error');
      input.removeAttribute('aria-invalid');
    }

    all('input, select, textarea', form).forEach(function (input) {
      on(input, 'input', function () { clearError(input); });
      on(input, 'change', function () { clearError(input); });
    });

    on(form, 'submit', function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var problems = [];

      var nome = (data.get('nome') || '').toString().trim();
      var zap = (data.get('whatsapp') || '').toString().trim();
      var servico = (data.get('servico') || '').toString().trim();
      var consent = form.querySelector('[name="consent"]');

      if (nome.length < 2) {
        setError(form.querySelector('[name="nome"]'), 'Escreva seu nome para a gente saber com quem fala.');
        problems.push(form.querySelector('[name="nome"]'));
      }
      if (zap.replace(/\D/g, '').length < 10) {
        setError(form.querySelector('[name="whatsapp"]'), 'Faltam dígitos. Use DDD + número, como 37 99999-0000.');
        problems.push(form.querySelector('[name="whatsapp"]'));
      }
      if (!servico) {
        setError(form.querySelector('[name="servico"]'), 'Escolha o serviço para o orçamento sair certo.');
        problems.push(form.querySelector('[name="servico"]'));
      }
      if (consent && !consent.checked) {
        setError(consent, 'Precisamos do seu aceite para responder sobre o orçamento.');
        problems.push(consent);
      }

      if (problems.length) {
        problems[0].focus();
        return;
      }

      var lines = [
        'Olá! Pedido de orçamento pelo site.',
        '',
        'Nome: ' + nome,
        'WhatsApp: ' + zap,
        'Cidade: ' + ((data.get('cidade') || '—')),
        'Veículo: ' + ((data.get('veiculo') || '—')),
        'Ano: ' + ((data.get('ano') || '—')),
        'Serviço: ' + servico
      ];

      var obs = (data.get('mensagem') || '').toString().trim();
      if (obs) { lines.push(''); lines.push('Observações: ' + obs); }

      var btn = form.querySelector('[type="submit"]');

      // Sem destino configurado não há envio: avisa antes de mexer no botão,
      // em vez de abrir um mailto vazio que o navegador engole em silêncio.
      if (!LEAD_MAIL) {
        say('Canal de envio ainda não configurado. Preencha LEAD_MAIL em js/main.js.', true);
        return;
      }

      if (btn) {
        btn.disabled = true;
        var label = btn.querySelector('span');
        if (label) label.textContent = 'Enviando…';
      }

      window.location.href = mailLink('Pedido de orçamento pelo site', lines.join(String.fromCharCode(10)));
      say('Pedido montado. Confira e envie pelo seu programa de e-mail.', false);

      setTimeout(function () {
        if (btn) {
          btn.disabled = false;
          var l = btn.querySelector('span');
          if (l) l.textContent = 'Enviar pedido';
        }
      }, 2500);
    });
  }

  /* ---------------------------------------------------------------------- *
   * Ano no rodapé
   * ---------------------------------------------------------------------- */

  function wireYear() {
    all('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------------------------------------------------------------- *
   * Início
   * ---------------------------------------------------------------------- */

  function init() {
    wireQuoteLinks();
    wireNav();
    bootIntro(prepareHero());
    wireReveals();
    wireCompare();
    wireFilters();
    wireFaq();
    wireProcess();
    wireMap();
    wireFloat();
    wireForm();
    wireYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
