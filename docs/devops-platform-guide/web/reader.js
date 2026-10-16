(() => {
  'use strict';
  const byId = (id) => document.getElementById(id);
  const chapters = JSON.parse(byId('chapter-index').textContent);
  const searchIndex = JSON.parse(byId('search-index').textContent);
  const chapterIds = new Set(chapters.map((chapter) => chapter.id));
  const storage = {
    get(key, fallback = null) {
      try { return localStorage.getItem(`delivery-guide-${key}`) ?? fallback; }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(`delivery-guide-${key}`, value); return true; }
      catch { return false; }
    },
    array(key) {
      try {
        const value = JSON.parse(this.get(key, '[]'));
        return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
      } catch { return []; }
    },
  };
  const read = new Set(storage.array('read').filter((id) => chapterIds.has(id)));
  const tasks = new Set(storage.array('tasks'));
  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    byId('toast').textContent = message;
    byId('toast').classList.add('is-visible');
    toastTimer = setTimeout(() => byId('toast').classList.remove('is-visible'), 2400);
  }

  // Theme and completion are optional enhancements; storage failures never block reading.
  function updateTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    byId('theme-toggle').setAttribute('aria-pressed', String(dark));
    byId('theme-toggle').setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  }
  updateTheme();
  byId('theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    storage.set('theme', theme);
    updateTheme();
  });
  function updateRead() {
    document.querySelectorAll('.mark-read').forEach((button) => {
      const done = read.has(button.dataset.chapter);
      button.setAttribute('aria-pressed', String(done));
      button.querySelector('.read-label').textContent = done ? '已读 · 点击取消' : '标记本章已读';
    });
    document.querySelectorAll('.chapter-link').forEach((link) => link.classList.toggle('is-read', read.has(link.dataset.chapter)));
    byId('read-count').textContent = `${read.size} / ${chapters.length}`;
    byId('completion-fill').style.width = `${read.size / chapters.length * 100}%`;
  }
  updateRead();
  document.querySelectorAll('.mark-read').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.chapter;
      if (read.has(id)) read.delete(id); else read.add(id);
      const saved = storage.set('read', JSON.stringify([...read]));
      updateRead();
      toast(read.has(id) ? `本章已读${saved ? '，进度已保存' : '（当前浏览会话）'}` : '已取消本章已读标记');
    });
  });
  document.querySelectorAll('[data-task]').forEach((input) => {
    input.checked = tasks.has(input.dataset.task);
    input.addEventListener('change', () => {
      if (input.checked) tasks.add(input.dataset.task); else tasks.delete(input.dataset.task);
      storage.set('tasks', JSON.stringify([...tasks]));
    });
  });
  const previous = storage.get('last-chapter');
  const previousChapter = chapters.find((chapter) => chapter.id === previous);
  if (previousChapter) {
    byId('resume-reading').hidden = false;
    byId('resume-reading').href = `#${previousChapter.id}`;
    byId('resume-label').textContent = `${previousChapter.number} ${previousChapter.label}`;
  }

  // A mobile drawer using the same navigation as the desktop edition.
  let menuIsOpen = false;
  function closeMenu(restoreFocus = false) {
    menuIsOpen = false;
    document.body.classList.remove('nav-open');
    byId('menu-toggle').setAttribute('aria-expanded', 'false');
    byId('menu-toggle').setAttribute('aria-label', '打开章节目录');
    byId('nav-scrim').hidden = true;
    if (restoreFocus) byId('menu-toggle').focus({ preventScroll: true });
  }
  byId('menu-toggle').addEventListener('click', () => {
    if (menuIsOpen) return closeMenu(true);
    menuIsOpen = true;
    document.body.classList.add('nav-open');
    byId('menu-toggle').setAttribute('aria-expanded', 'true');
    byId('menu-toggle').setAttribute('aria-label', '关闭章节目录');
    byId('nav-scrim').hidden = false;
    byId('sidebar').querySelector('a').focus({ preventScroll: true });
  });
  byId('nav-scrim').addEventListener('click', () => closeMenu(true));
  byId('sidebar').addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuIsOpen) closeMenu(true);
    if (event.key === 'Tab' && menuIsOpen) {
      const links = [...byId('sidebar').querySelectorAll('a')];
      if (event.shiftKey && document.activeElement === links[0]) {
        event.preventDefault(); links.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
        event.preventDefault(); links[0].focus();
      }
    }
  });

  // Current chapter, local outline and document scroll progress.
  const articles = chapters.map((chapter) => byId(chapter.id));
  let positions = [];
  let currentId = null;
  let currentHeadings = [];
  let scrollPending = false;
  let savePositionTimer;
  function measure() {
    positions = articles.map((article) => article.getBoundingClientRect().top + window.scrollY);
  }
  function setChapter(chapter) {
    const id = chapter?.id ?? null;
    if (id === currentId) return;
    currentId = id;
    byId('current-chapter').textContent = chapter ? `${chapter.number} ${chapter.label}` : '学习手册';
    document.querySelectorAll('.chapter-link').forEach((link) => {
      const active = link.dataset.chapter === id;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const sectionNav = byId('section-navigation');
    sectionNav.replaceChildren();
    currentHeadings = chapter?.headings ?? [];
    if (chapter) {
      byId('outline-current').textContent = chapter.label;
      for (const heading of currentHeadings) {
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.text;
        sectionNav.append(link);
      }
      clearTimeout(savePositionTimer);
      savePositionTimer = setTimeout(() => storage.set('last-chapter', id), 450);
      const active = document.querySelector(`.chapter-link[data-chapter="${id}"]`);
      const nav = document.querySelector('.chapter-navigation');
      if (active && nav.clientHeight) {
        const navRect = nav.getBoundingClientRect(), activeRect = active.getBoundingClientRect();
        if (activeRect.top < navRect.top || activeRect.bottom > navRect.bottom) {
          nav.scrollTop += activeRect.top - navRect.top - nav.clientHeight / 2;
        }
      }
    }
  }
  function updateScroll() {
    scrollPending = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(100, Math.max(0, y / max * 100)) : 0;
    byId('scroll-fill').style.width = `${progress}%`;
    byId('back-to-top').classList.toggle('is-visible', y > 750);
    let current = -1;
    for (let i = 0; i < positions.length; i++) if (positions[i] <= y + 150) current = i;
    document.body.classList.toggle('at-cover', current < 0);
    setChapter(current < 0 ? null : chapters[current]);
    let headingId = null;
    for (const heading of currentHeadings) {
      if (byId(heading.id).getBoundingClientRect().top <= 170) headingId = heading.id;
    }
    byId('section-navigation').querySelectorAll('a').forEach((link) => {
      const active = decodeURIComponent(link.hash.slice(1)) === headingId;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }
  function scheduleScroll() {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
  }
  measure();
  updateScroll();
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    scheduleScroll();
    if (window.innerWidth > 820) closeMenu();
  });
  document.fonts?.ready.then(() => { measure(); scheduleScroll(); });
  document.querySelectorAll('.diagram-source').forEach((details) => details.addEventListener('toggle', () => { measure(); scheduleScroll(); }));

  // Full-text search over the statically rendered guide.
  const dialog = byId('search-dialog');
  const searchInput = byId('search-input');
  const resultsElement = byId('search-results');
  let resultButtons = [];
  let selection = 0;
  let searchTimer;
  let searchPending = false;
  let searchReturnFocus;
  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function highlighted(element, text, terms) {
    if (!terms.length) { element.textContent = text; return; }
    const pattern = new RegExp(terms.map(escapeRegExp).join('|'), 'giu');
    let last = 0;
    for (const match of text.matchAll(pattern)) {
      element.append(document.createTextNode(text.slice(last, match.index)));
      const mark = document.createElement('mark');
      mark.textContent = match[0];
      element.append(mark);
      last = match.index + match[0].length;
    }
    element.append(document.createTextNode(text.slice(last)));
  }
  function selectResult(index, scroll = true) {
    if (!resultButtons.length) return;
    selection = Math.max(0, Math.min(index, resultButtons.length - 1));
    resultButtons.forEach((button, i) => button.classList.toggle('is-selected', i === selection));
    if (scroll) resultButtons[selection].scrollIntoView({ block: 'nearest' });
  }
  function closeSearch(restoreFocus = true) {
    dialog.close();
    document.body.classList.remove('search-open');
    if (restoreFocus && searchReturnFocus instanceof HTMLElement) searchReturnFocus.focus({ preventScroll: true });
  }
  function renderSearch() {
    searchPending = false;
    const query = searchInput.value.trim().normalize('NFKC').toLocaleLowerCase();
    const terms = [...new Set(query.split(/\s+/).filter(Boolean))];
    let matches;
    if (terms.length) {
      matches = searchIndex.map((entry, index) => {
        const title = entry.title.normalize('NFKC').toLocaleLowerCase();
        const chapterLabel = entry.chapterLabel.normalize('NFKC').toLocaleLowerCase();
        const text = entry.text.normalize('NFKC').toLocaleLowerCase();
        if (!terms.every((term) => `${title} ${chapterLabel} ${text}`.includes(term))) return null;
        const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 8 : 0) + (chapterLabel.includes(term) ? 3 : 0) + (text.includes(term) ? 1 : 0), 0);
        return { ...entry, score, order: index };
      }).filter(Boolean).sort((a, b) => b.score - a.score || a.order - b.order);
    } else {
      matches = ['04', '07', '08', '09', '11', '12'].map((number) => searchIndex.find((entry) => entry.chapter === number && entry.id !== `chapter-${number}`)).filter(Boolean);
    }
    byId('search-summary').textContent = terms.length ? `找到 ${matches.length} 处内容${matches.length > 24 ? '，显示前 24 项' : ''}` : '从这些重点章节开始，或输入关键词';
    resultsElement.replaceChildren();
    resultButtons = [];
    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = '没有找到相关内容。试试更短的词，或从章节目录查阅。';
      resultsElement.append(empty);
      return;
    }
    matches.slice(0, 24).forEach((entry) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'search-result';
      const chapter = document.createElement('span');
      chapter.className = 'result-chapter';
      chapter.textContent = `CHAPTER ${entry.chapter} · ${entry.chapterLabel}`;
      const title = document.createElement('span');
      title.className = 'result-title';
      highlighted(title, entry.title, terms);
      const text = document.createElement('span');
      text.className = 'result-text';
      const normalized = entry.text.normalize('NFKC').toLocaleLowerCase();
      const hit = Math.max(0, ...terms.map((term) => normalized.indexOf(term)).filter((index) => index >= 0).slice(0, 1));
      const start = Math.max(0, hit - 35);
      const snippet = `${start ? '…' : ''}${entry.text.slice(start, start + 145)}${entry.text.length > start + 145 ? '…' : ''}`;
      highlighted(text, snippet, terms);
      button.append(chapter, title, text);
      button.addEventListener('click', () => {
        closeSearch(false);
        location.hash = entry.id;
        const target = byId(entry.id);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
      resultsElement.append(button);
      resultButtons.push(button);
    });
    selectResult(0, false);
    resultsElement.scrollTop = 0;
  }
  function openSearch() {
    if (dialog.open) return;
    if (menuIsOpen) closeMenu();
    searchReturnFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('search-open');
    renderSearch();
    searchInput.focus();
    searchInput.select();
  }
  byId('search-open').addEventListener('click', openSearch);
  byId('search-close').addEventListener('click', () => closeSearch());
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchPending = true;
    searchTimer = setTimeout(renderSearch, 90);
  });
  searchInput.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); selectResult(selection + 1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); selectResult(selection - 1); }
    else if (event.key === 'Enter') {
      event.preventDefault();
      if (searchPending) {
        clearTimeout(searchTimer);
        renderSearch();
      }
      resultButtons[selection]?.click();
    }
  });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeSearch(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeSearch();
    }
  });
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeSearch();
  });
  document.addEventListener('keydown', (event) => {
    const editing = event.target instanceof HTMLElement && (event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName));
    if ((event.key === '/' && !editing) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault(); openSearch();
    }
  });

  // Code copy works in a secure browser context, with a local-file fallback.
  document.querySelectorAll('.copy-code').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.closest('.code-block').querySelector('pre').textContent;
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
        else {
          const area = document.createElement('textarea');
          area.value = text;
          area.style.cssText = 'position:fixed;top:0;left:-9999px;';
          document.body.append(area);
          area.select();
          const copied = document.execCommand('copy');
          area.remove();
          button.focus({ preventScroll: true });
          if (!copied) throw new Error('Copy not available');
        }
        button.textContent = '已复制 ✓';
        toast('代码已复制');
        setTimeout(() => { button.innerHTML = '复制代码 <span aria-hidden="true">↗</span>'; }, 2000);
      } catch {
        toast('未能自动复制，请选中代码后复制');
      }
    });
  });
  byId('print-guide').addEventListener('click', () => window.print());
})();
