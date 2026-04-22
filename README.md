# レジ操作マニュアル — リデザイン変更点まとめ

## 概要

ファイル構成（`index.html` / `style.css` / `script.js`）は変わらず、見た目・構造・操作性を全面的に刷新しています。

---

## index.html

### レイアウト構造の変更

| 変更前 | 変更後 |
|--------|--------|
| `.container` + `.grid` の2カラム構成 | `.app-shell` による Flexbox ベースのサイドバー＋メインの2ペイン構成 |
| `<div class="sidebar">` | `<aside class="sidebar">` にセマンティクスを改善 |
| `<div class="header">` でページ上部にタイトル | `<div class="page-header">` をメインペイン内のスティッキーヘッダーとして配置 |

### サイドバーの変更

- **ブランドエリア追加** — アイコン・タイトル・サブタイトルを含む `.sidebar-brand` ブロックを新設
- **フッター追加** — 店舗名（羽鳥店）を表示する `.sidebar-footer` を新設
- **ナビボタンの構造変更** — `<button class="nav-button">` → `<button class="nav-item">` に変更し、内部要素を `.nav-item-icon` / `.nav-item-text` / `.nav-item-arrow` の3要素に分割
- **絵文字アイコン廃止** — `<span class="nav-icon">` の絵文字をインラインSVGアイコンに置換
- **ナビラベル追加** — `<span class="nav-label">操作一覧</span>` を追加

### ページヘッダーの追加

元のコードにはなかった `.page-header` を追加。

```html
<div class="page-header">
  <div class="page-header-inner">
    <h1 class="page-title" id="current-section-title">...</h1>
    <div class="page-breadcrumb">
      <span>マニュアル</span>
      <span class="breadcrumb-sep">/</span>
      <span id="current-section-sub">...</span>
    </div>
  </div>
</div>
```

セクション切替のたびにJSでタイトルが更新されます。

### コンテンツカードの構造変更

| 変更前 | 変更後 |
|--------|--------|
| `.content-card` 1枚にすべて収める | `.section-grid` グリッド内に複数の `.card` を並べる |
| `.content-title` でセクション見出し | `.card-header` / `.card-body` でカード単位に分割 |
| `.subsection` で左ボーダー区切り | `.subsection-label` + `.subsection-divider` でカード内を区切る |

### ステップリストの変更

```html
<!-- 変更前 -->
<ol class="steps">
  <li class="step">
    <span class="step-number">1</span>
    <span class="step-text">テキスト</span>
  </li>
</ol>

<!-- 変更後 -->
<ol class="step-list">
  <li class="step-item">
    <div class="step-num">1</div>
    <div class="step-content">テキスト</div>
  </li>
</ol>
```

### アラートの種類追加

| クラス | 用途 |
|--------|------|
| `alert--danger` | 禁止事項・操作不可の警告（赤） |
| `alert--warning` | 注意が必要な操作（黄） |
| `alert--info` | 仕様の説明（青） |
| `alert--inline` | カード内の小さなアラート |

元のコードは `alert-red` 1種類のみでした。

### その他の新規追加要素

- **`<kbd>` タグ** — ボタン名をキー表記でマークアップ（例：`<kbd>確定</kbd>`）
- **`<code>` タグ** — コード・入力値を視覚的に区別（例：`<code>501</code>`）
- **`.card-badge`** — カードヘッダーにステップ数を表示するバッジ
- **`.lamp-grid`** — レジランプの状態を専用グリッドレイアウトで表示（元はテキストの `<p>` のみ）
- **`.info-list` / `.info-item`** — 追加対応などのキーバリュー情報を構造化

### フォントの追加

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

元のコードはシステムフォントのみでした。

---

## style.css

### 設計方針の変更

元のCSSは個別の値をハードコードしていましたが、リデザイン後は**CSSカスタムプロパティ（変数）**でデザイントークンを一元管理しています。

```css
:root {
  --accent:        #2563eb;
  --surface:       #ffffff;
  --border:        #e2e8f0;
  --text-primary:  #0f172a;
  --shadow:        0 4px 12px rgba(0,0,0,.08);
  /* ... */
}
```

### レイアウトの変更

| 変更前 | 変更後 |
|--------|--------|
| `max-width: 1200px` のセンター寄せ | `display: flex` の全画面2ペインレイアウト |
| サイドバーは `position: sticky` のグリッドカラム | サイドバーは `height: 100vh` + `position: sticky` の独立ペイン |
| メインは単一の `.content-card` | `display: grid` の `.section-grid` でカード群を配置 |

### 新規追加スタイル

**ステップコネクター線**
ステップ番号の間に縦線を追加し、フローの流れを視覚化しました。

```css
.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 13px;
  top: 34px;
  bottom: 0;
  width: 1px;
  background: var(--border);
}
```

**ランプアニメーション**
点滅ランプをCSSアニメーションで表現しました。

```css
.lamp--blink {
  animation: lampBlink 1.1s ease-in-out infinite;
}

@keyframes lampBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.15; }
}
```

**KBDスタイル**
ボタン名をキーボードキー風に表示。

```css
kbd {
  font-family: 'DM Mono', monospace;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-bottom-width: 2px;
  border-radius: 4px;
}
```

### レスポンシブ対応の強化

| ブレークポイント | 変更前 | 変更後 |
|-----------------|--------|--------|
| `≥ 1024px` | グリッドで2カラム | 変更なし（元から対応） |
| `≤ 900px` | 記述なし | サイドバー幅を200pxに縮小・カードを1カラムに |
| `≤ 640px` | 記述なし | サイドバーを横スクロールのタブバーに変換 |

---

## script.js

### 変更点

**ページヘッダーの同期更新**
セクション切替時に、ページタイトルとナビを更新する処理を追加しました。

```js
// 変更前: なし

// 変更後
const sectionMeta = {
  reprint:  { title: 'レシート関連操作', sub: 'レシート' },
  // ...
};

function switchSection(targetId) {
  const meta = sectionMeta[targetId];
  if (meta) {
    pageTitle.textContent = meta.title;
    pageSub.textContent   = meta.sub;
  }
}
```

**スクロール先の分岐**
モバイルではサイドバーとメインが縦積みになるため、スクロール先を分岐しました。

```js
// 変更前
window.scrollTo({ top: 0, behavior: 'smooth' });

// 変更後
if (window.innerWidth <= 640) {
  document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
} else {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
```

**関数化によるリファクタリング**
クリックイベントの処理を `switchSection(targetId)` 関数にまとめ、初期表示時にも同じ関数を呼ぶよう統一しました。

---

## ファイル構成

```
/
├── index.html   # マークアップ（構造・セマンティクスを全面改善）
├── style.css    # スタイル（CSS変数・レスポンシブ・アニメーション追加）
├── script.js    # スクリプト（ヘッダー同期・スクロール分岐・関数化）
└── README.md    # 本ファイル
```
