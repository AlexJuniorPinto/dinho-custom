/* ==========================================================================
   DINHO CUSTOM — comportamento
   Sem dependências. Tudo degrada quando o JS não roda.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------- *
   * Config — o número entra em um lugar só
   * ---------------------------------------------------------------------- */

  var WPP = '5537999127964';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

  function waLink(message) {
    return 'https://wa.me/' + WPP + '?text=' + encodeURIComponent(message);
  }

  function on(el, ev, fn, opts) {
    if (el) el.addEventListener(ev, fn, opts);
  }

  function all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ---------------------------------------------------------------------- *
   * Links de WhatsApp com contexto de origem
   * Cada link declara data-wpp="<assunto>"; a página declara data-page.
   * O lead chega dizendo de onde veio.
   * ---------------------------------------------------------------------- */

  function wireWhatsapp() {
    var page = document.body.getAttribute('data-page') || 'site';
    all('[data-wpp]').forEach(function (el) {
      var subject = el.getAttribute('data-wpp');
      var msg = 'Olá! Vim pelo site (' + page + ') e queria um orçamento de ' + subject + '.';
      el.setAttribute('href', waLink(msg));
      el.setAttribute('rel', 'noopener');
      el.setAttribute('target', '_blank');
    });
  }

  /* ---------------------------------------------------------------------- *
   * Herói — a sequência autoral de carga
   * ---------------------------------------------------------------------- */

  function bootHero() {
    var hero = document.querySelector('.hero, .phero');
    if (!hero) return;

    all('.reveal-line, .mark i', hero).forEach(function (el, i) {
      el.style.setProperty('--i', i);
    });

    var start = function () { hero.classList.add('is-live'); };

    if (document.fonts && document.fonts.ready) {
      // Esperar a fonte evita a linha subir com a métrica errada
      var settled = false;
      var go = function () { if (!settled) { settled = true; requestAnimationFrame(start); } };
      document.fonts.ready.then(go);
      setTimeout(go, 900);
    } else {
      requestAnimationFrame(start);
    }
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

      // Troca de case
      var tabs = all('[role="tab"]', root.closest('[data-compare-group]') || document);
      tabs.forEach(function (tab) {
        on(tab, 'click', function () {
          tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
          tab.setAttribute('aria-selected', 'true');

          var data = JSON.parse(tab.getAttribute('data-case') || '{}');
          var beforeSlot = root.querySelector('.compare__pane--before .slot__name');
          var afterSlot = root.querySelector('.compare__pane--after .slot__name');
          if (beforeSlot && data.before) beforeSlot.textContent = data.before;
          if (afterSlot && data.after) afterSlot.textContent = data.after;

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
      frame.title = 'Mapa com a localização da Dinho Custom em Formiga, MG';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.allowFullscreen = true;
      facade.parentNode.appendChild(frame);
      facade.remove();
    });
  }

  /* ---------------------------------------------------------------------- *
   * WhatsApp flutuante — entra depois que o herói sai
   * ---------------------------------------------------------------------- */

  function wireFloat() {
    var float = document.querySelector('.wpp-float');
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
   * Sem back-end: monta a mensagem e abre o WhatsApp já preenchido.
   * É o canal confirmado do negócio e o lead chega estruturado.
   * ---------------------------------------------------------------------- */

  function wireForm() {
    var form = document.querySelector('[data-quote-form]');
    if (!form) return;

    function fieldOf(input) { return input.closest('.field') || input.closest('.check'); }

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
        setError(form.querySelector('[name="whatsapp"]'), 'Faltam dígitos. Use DDD + número, como 37 99912-7964.');
        problems.push(form.querySelector('[name="whatsapp"]'));
      }
      if (!servico) {
        setError(form.querySelector('[name="servico"]'), 'Escolha o serviço para o orçamento sair certo.');
        problems.push(form.querySelector('[name="servico"]'));
      }
      if (consent && !consent.checked) {
        setError(consent, 'Precisamos do seu aceite para responder pelo WhatsApp.');
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
      if (btn) {
        btn.disabled = true;
        var label = btn.querySelector('span');
        if (label) label.textContent = 'Abrindo o WhatsApp…';
      }

      window.open(waLink(lines.join('\n')), '_blank', 'noopener');

      setTimeout(function () {
        if (btn) {
          btn.disabled = false;
          var l = btn.querySelector('span');
          if (l) l.textContent = 'Enviar pelo WhatsApp';
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
    wireWhatsapp();
    wireNav();
    bootHero();
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
