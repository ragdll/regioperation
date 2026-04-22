document.addEventListener('DOMContentLoaded', function () {

  const navItems       = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  const pageTitle      = document.getElementById('current-section-title');
  const pageSub        = document.getElementById('current-section-sub');

  // セクションごとのタイトルマップ
  const sectionMeta = {
    reprint:  { title: 'レシート関連操作',   sub: 'レシート' },
    return:   { title: '返品操作',           sub: '返品' },
    money:    { title: 'お金のトラブル',      sub: 'お金のトラブル' },
    register: { title: 'レジ操作',           sub: 'レジ' },
    payment:  { title: 'セルフレジ',          sub: 'セルフレジ' },
  };

  function switchSection(targetId) {
    // ナビのアクティブ切替
    navItems.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === targetId);
    });

    // セクションのアクティブ切替
    contentSections.forEach(sec => {
      const isTarget = sec.id === targetId;
      sec.classList.toggle('active', isTarget);
    });

    // ページヘッダーのタイトル更新
    const meta = sectionMeta[targetId];
    if (meta && pageTitle && pageSub) {
      pageTitle.textContent = meta.title;
      pageSub.textContent   = meta.sub;
    }

    // モバイル: コンテンツ上端へスクロール
    if (window.innerWidth <= 640) {
      document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navItems.forEach(btn => {
    btn.addEventListener('click', function () {
      switchSection(this.dataset.section);
    });
  });

  // 初期表示: 最初のセクションを確実に表示
  const firstActive = document.querySelector('.nav-item.active');
  if (firstActive) {
    switchSection(firstActive.dataset.section);
  }
});
