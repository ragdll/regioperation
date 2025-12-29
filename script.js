// ナビゲーションボタンのクリックイベント
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-button');
  const contentSections = document.querySelectorAll('.content-section');

  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      
      // すべてのボタンとセクションから active クラスを削除
      navButtons.forEach(btn => btn.classList.remove('active'));
      contentSections.forEach(section => section.classList.remove('active'));
      
      // クリックされたボタンと対応するセクションに active クラスを追加
      this.classList.add('active');
      document.getElementById(targetSection).classList.add('active');
      
      // ページトップにスクロール（モバイル用）
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
