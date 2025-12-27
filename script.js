function showSection(sectionId, button) {
    // すべてのセクションを非表示
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // すべてのボタンのactiveクラスを削除
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 選択されたセクションを表示
    document.getElementById(sectionId).classList.remove('hidden');
    
    // 選択されたボタンにactiveクラスを追加
    button.classList.add('active');
}
