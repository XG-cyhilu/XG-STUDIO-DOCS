/* XG STUDIO Documentation — shell, tree navigation, i18n, theme, on-page TOC */
(function () {
  'use strict';

  var REPO = 'XG-cyhilu/XG-STUDIO-DOCS';
  var ROOT = document.body.getAttribute('data-root') || '.';

  var NAV = [
    {
      group: { zh: '概述', en: 'Overview' },
      items: [
        { href: 'index.html', zh: '文档首页', en: 'Documentation Home' }
      ]
    },
    {
      group: { zh: '项目文档', en: 'Projects' },
      items: [
        {
          href: 'projects/xgstudio-cpp-ui/index.html',
          zh: 'XGStudio-cpp-UI', en: 'XGStudio-cpp-UI',
          children: [
            { href: 'projects/xgstudio-cpp-ui/index.html', zh: '说明', en: 'Overview' },
            { href: 'projects/xgstudio-cpp-ui/reference.html', zh: '参考', en: 'Reference' },
            { href: 'projects/xgstudio-cpp-ui/development.html', zh: '开发', en: 'Development' }
          ]
        },
        {
          href: 'projects/xgstudio-cpp-core/index.html',
          zh: 'XGStudio-cpp-Core', en: 'XGStudio-cpp-Core',
          children: [
            { href: 'projects/xgstudio-cpp-core/index.html', zh: '说明', en: 'Overview' },
            { href: 'projects/xgstudio-cpp-core/reference.html', zh: '参考', en: 'Reference' },
            { href: 'projects/xgstudio-cpp-core/development.html', zh: '开发', en: 'Development' }
          ]
        },
        {
          href: 'projects/void-craft-launcher/index.html',
          zh: 'Void Craft Launcher', en: 'Void Craft Launcher',
          children: [
            { href: 'projects/void-craft-launcher/index.html', zh: '说明', en: 'Overview' },
            { href: 'projects/void-craft-launcher/reference.html', zh: '参考', en: 'Reference' },
            { href: 'projects/void-craft-launcher/development.html', zh: '开发', en: 'Development' }
          ]
        }
      ]
    },
    {
      group: { zh: '通用文档', en: 'General' },
      items: [
        { href: 'general/quick-start.html', zh: '快速开始', en: 'Quick Start' },
        { href: 'general/toolchain.html', zh: '环境与工具链', en: 'Environment & Toolchain' },
        { href: 'general/design.html', zh: '设计与视觉规范', en: 'Design & Visual System' },
        { href: 'general/licensing.html', zh: '许可证与合规', en: 'Licenses & Compliance' }
      ]
    },
    {
      group: { zh: '资源', en: 'Resources' },
      items: [
        { href: 'https://github.com/' + REPO, zh: 'GitHub 仓库', en: 'GitHub Repository', external: true },
        { href: 'https://github.com/' + REPO + '/issues', zh: '问题反馈', en: 'Issue Tracker', external: true }
      ]
    }
  ];

  var LABELS = {
    home: { zh: '首页', en: 'Home' },
    projects: { zh: '项目文档', en: 'Projects' },
    general: { zh: '通用文档', en: 'General' },
    licenses: { zh: '许可证', en: 'Licenses' },
    prev: { zh: '上一篇', en: 'Previous' },
    next: { zh: '下一篇', en: 'Next' },
    edit: { zh: '在 GitHub 上编辑此页', en: 'Edit this page on GitHub' },
    menu: { zh: '文档目录', en: 'Documentation menu' },
    theme: { zh: '切换深色 / 浅色主题', en: 'Toggle dark / light theme' },
    copy: { zh: '复制', en: 'Copy' },
    copied: { zh: '已复制', en: 'Copied' },
    github: { zh: 'GitHub', en: 'GitHub' },
    onthispage: { zh: '本页内容', en: 'On this page' },
    backtop: { zh: '返回顶部', en: 'Back to top' }
  };

  var state = { lang: 'zh', theme: 'light' };

  try {
    var savedLang = localStorage.getItem('xgdocs-lang');
    var qs = new URLSearchParams(location.search).get('lang');
    state.lang = (qs === 'en' || qs === 'zh') ? qs : (savedLang === 'en' ? 'en' : 'zh');
    var savedTheme = localStorage.getItem('xgdocs-theme');
    state.theme = savedTheme === 'dark' ? 'dark' : 'light';
  } catch (e) {}

  function L(obj) { return state.lang === 'en' ? (obj.en || obj.zh) : obj.zh; }

  function pages() {
    var out = [];
    NAV.forEach(function (g) {
      if (g.group.zh === '资源') return;
      g.items.forEach(function (it) {
        if (it.external) return;
        out.push(it);
        (it.children || []).forEach(function (c) { out.push(c); });
      });
    });
    return out;
  }

  function currentPath() {
    var p = location.pathname;
    var idx = p.indexOf('/XG-STUDIO-DOCS');
    if (idx !== -1) p = p.slice(idx + '/XG-STUDIO-DOCS'.length);
    if (p === '' || p === '/') p = '/index.html';
    return p.replace(/^\//, '');
  }

  function hrefFor(href) {
    if (/^https?:/.test(href)) return href;
    return ROOT + '/' + href;
  }

  function isActive(href) { return currentPath() === href; }

  /* ---------------- header ---------------- */
  function renderHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML =
      '<div class="header-inner">' +
        '<a class="brand" href="' + hrefFor('index.html') + '">' +
          '<span class="brand-mark">XG</span>' +
          '<span class="brand-name">XG STUDIO</span>' +
          '<span class="brand-sub">DOCS</span>' +
        '</a>' +
        '<nav class="header-nav" aria-label="' + L({ zh: '主导航', en: 'Main navigation' }) + '">' +
          '<a href="' + hrefFor('index.html') + '">' + L(LABELS.home) + '</a>' +
          '<a href="' + hrefFor('projects/xgstudio-cpp-ui/index.html') + '">' + L(LABELS.projects) + '</a>' +
          '<a href="' + hrefFor('general/quick-start.html') + '">' + L(LABELS.general) + '</a>' +
          '<a href="' + hrefFor('general/licensing.html') + '">' + L(LABELS.licenses) + '</a>' +
        '</nav>' +
        '<div class="header-tools">' +
          '<button class="icon-btn nav-toggle" type="button" data-action="toggle-nav" aria-label="' + L(LABELS.menu) + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          '</button>' +
          '<div class="lang-switch" role="group" aria-label="Language">' +
            '<button type="button" data-action="lang-zh" aria-pressed="' + (state.lang === 'zh') + '">中文</button>' +
            '<button type="button" data-action="lang-en" aria-pressed="' + (state.lang === 'en') + '">EN</button>' +
          '</div>' +
          '<button class="icon-btn" type="button" data-action="toggle-theme" aria-label="' + L(LABELS.theme) + '">' +
            (state.theme === 'dark'
              ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg>'
              : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>') +
          '</button>' +
          '<a class="gh" href="https://github.com/' + REPO + '" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>' +
            '<span>' + L(LABELS.github) + '</span>' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<noscript><div style="padding:10px 24px;font-size:13px;background:var(--surface);border-top:1px solid var(--line)">' +
        '<a href="' + hrefFor('index.html') + '">Home</a> · ' +
        '<a href="' + hrefFor('projects/xgstudio-cpp-ui/index.html') + '">XGStudio-cpp-UI</a> · ' +
        '<a href="' + hrefFor('projects/xgstudio-cpp-core/index.html') + '">XGStudio-cpp-Core</a> · ' +
        '<a href="' + hrefFor('projects/void-craft-launcher/index.html') + '">Void Craft Launcher</a> · ' +
        '<a href="' + hrefFor('general/quick-start.html') + '">Quick Start</a> · ' +
        '<a href="' + hrefFor('general/licensing.html') + '">Licenses</a>' +
      '</div></noscript>';
  }

  /* ---------------- sidebar tree ---------------- */
  function renderSidebar() {
    var el = document.getElementById('site-sidebar');
    if (!el) return;
    var html = '';
    NAV.forEach(function (g) {
      html += '<div class="side-group"><p class="side-title">' + L(g.group) + '</p>';
      g.items.forEach(function (it) {
        var kids = it.children || [];
        var branchActive = kids.some(function (c) { return isActive(c.href); });
        var cls = 'side-link' + (it.external ? ' ext' : '') + (kids.length ? ' side-branch' : '');
        var attrs = it.external
          ? ' target="_blank" rel="noopener"'
          : (isActive(it.href) ? ' aria-current="page"' : '');
        html += '<a class="' + cls + '" href="' + hrefFor(it.href) + '"' + attrs + '>' +
          L(it) + '</a>';
        if (kids.length) {
          html += '<div class="side-sub">';
          kids.forEach(function (c) {
            html += '<a class="side-link" href="' + hrefFor(c.href) + '"' +
              (isActive(c.href) ? ' aria-current="page"' : '') + '>' + L(c) + '</a>';
          });
          html += '</div>';
        }
      });
      html += '</div>';
    });
    el.innerHTML = html;
  }

  /* ---------------- on-page TOC ---------------- */
  function headingText(h) {
    var spans = h.querySelectorAll('[data-lang]');
    if (!spans.length) return h.textContent.replace(/\s+/g, ' ').trim();
    var pick = h.querySelector('[data-lang="' + state.lang + '"]');
    var text = pick ? pick.textContent : h.textContent;
    return text.replace(/\s+/g, ' ').trim();
  }

  function buildToc() {
    var toc = document.getElementById('page-toc');
    if (!toc) return;
    var main = document.getElementById('main');
    var heads = main ? main.querySelectorAll('h2[id], h3[id]') : [];
    if (!heads.length) { toc.innerHTML = ''; return; }

    var html = '<p class="toc-title">' + L(LABELS.onthispage) + '</p>';
    Array.prototype.forEach.call(heads, function (h) {
      html += '<a class="lvl' + h.tagName.slice(1) + '" href="#' + h.id + '">' + headingText(h) + '</a>';
    });
    html += '<a class="toc-top" href="#main">' + L(LABELS.backtop) + ' ↑</a>';
    toc.innerHTML = html;
    spy();
  }

  function spy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('#page-toc a[href^="#"]'));
    if (!links.length) return;
    var heads = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    if (!heads.length) return;

    function update() {
      var y = window.scrollY + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) + 40;
      var idx = 0;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].getBoundingClientRect().top + window.scrollY <= y) idx = i;
      }
      links.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------------- pager & edit link ---------------- */
  function renderFooterNav() {
    var pager = document.getElementById('pager');
    var list = pages();
    var cur = currentPath();
    var idx = -1;
    for (var i = 0; i < list.length; i++) { if (list[i].href === cur) { idx = i; break; } }

    if (pager) {
      var out = '';
      if (idx > 0) {
        var prev = list[idx - 1];
        out += '<a href="' + hrefFor(prev.href) + '"><span class="dir">' + L(LABELS.prev) + '</span><span class="name">' + L(prev) + '</span></a>';
      }
      if (idx !== -1 && idx < list.length - 1) {
        var next = list[idx + 1];
        out += '<a class="next" href="' + hrefFor(next.href) + '"><span class="dir">' + L(LABELS.next) + '</span><span class="name">' + L(next) + '</span></a>';
      }
      pager.innerHTML = out;
    }

    var edit = document.getElementById('edit-row');
    if (edit) {
      var p = currentPath();
      var url = 'https://github.com/' + REPO + '/blob/main/docs/' + p;
      edit.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener">' + L(LABELS.edit) + ' ↗</a>';
    }
  }

  /* ---------------- footer ---------------- */
  function renderFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML =
      '<div class="footer-inner">' +
        '<p>© 2026 XG STUDIO. ' + L({ zh: '代码采用 Apache-2.0；文档内容采用 CC BY-NC-SA 4.0。<br>Void Craft Launcher 采用 AGPL-3.0。', en: 'Code is licensed under Apache-2.0; documentation content under CC BY-NC-SA 4.0.<br>Void Craft Launcher is licensed under AGPL-3.0.' }) + '</p>' +
        '<div class="footer-links">' +
          '<a href="' + hrefFor('general/licensing.html') + '">' + L({ zh: '许可证', en: 'Licenses' }) + '</a>' +
          '<a href="' + hrefFor('general/quick-start.html') + '">' + L({ zh: '快速开始', en: 'Quick Start' }) + '</a>' +
          '<a href="https://github.com/' + REPO + '/issues" target="_blank" rel="noopener">' + L({ zh: '问题反馈', en: 'Issues' }) + '</a>' +
          '<a href="https://github.com/' + REPO + '" target="_blank" rel="noopener">GitHub</a>' +
        '</div>' +
      '</div>';
  }

  function applyTitle() {
    var titleEl = document.querySelector('title');
    if (!titleEl) return;
    var zh = titleEl.getAttribute('data-zh');
    var en = titleEl.getAttribute('data-en');
    if (zh && en) document.title = state.lang === 'en' ? en : zh;
  }

  function applyLang() {
    document.documentElement.setAttribute('data-lang', state.lang);
    document.documentElement.setAttribute('lang', state.lang === 'en' ? 'en' : 'zh-CN');
    try { localStorage.setItem('xgdocs-lang', state.lang); } catch (e) {}
    applyTitle();
    renderHeader();
    renderSidebar();
    buildToc();
    renderFooterNav();
    renderFooter();
    applyCodeCopyLabels();
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    try { localStorage.setItem('xgdocs-theme', state.theme); } catch (e) {}
    renderHeader();
  }

  /* ---------------- code blocks ---------------- */
  function enhanceCode() {
    Array.prototype.forEach.call(document.querySelectorAll('pre'), function (pre) {
      if (pre.closest('.code-block')) return;
      var wrap = document.createElement('div');
      wrap.className = 'code-block';
      var head = document.createElement('div');
      head.className = 'code-head';
      var name = pre.getAttribute('data-file') || 'code';
      head.innerHTML = '<span class="file">' + name + '</span>' +
        '<button class="copy-btn" type="button" data-action="copy">' + L(LABELS.copy) + '</button>';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(head);
      wrap.appendChild(pre);
      pre.removeAttribute('data-file');
    });
  }

  function applyCodeCopyLabels() {
    document.querySelectorAll('.copy-btn').forEach(function (b) {
      if (!b.classList.contains('done')) b.textContent = L(LABELS.copy);
    });
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var target = e.target.closest('[data-action]');
    if (!target) {
      if (document.body.classList.contains('nav-open') && !e.target.closest('.sidebar') && !e.target.closest('.nav-toggle')) {
        document.body.classList.remove('nav-open');
      }
      return;
    }
    var action = target.getAttribute('data-action');

    if (action === 'lang-zh' || action === 'lang-en') {
      state.lang = action === 'lang-zh' ? 'zh' : 'en';
      applyLang();
      return;
    }
    if (action === 'toggle-theme') {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      return;
    }
    if (action === 'toggle-nav') {
      document.body.classList.toggle('nav-open');
      return;
    }
    if (action === 'copy') {
      var btn = target;
      var block = btn.closest('.code-block');
      var codeEl = block ? block.querySelector('pre') : null;
      if (!codeEl) return;
      var text = codeEl.textContent;
      var done = function () {
        btn.textContent = L(LABELS.copied);
        btn.classList.add('done');
        setTimeout(function () { btn.textContent = L(LABELS.copy); btn.classList.remove('done'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(ta);
        done();
      }
    }
  });

  /* ---------------- init ---------------- */
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.setAttribute('data-lang', state.lang);
  applyTitle();
  renderHeader();
  renderSidebar();
  renderFooter();
  enhanceCode();
  buildToc();
  renderFooterNav();
})();
