// 作成中
const btn = document.getElementById('1');

// ボタンがクリックされたときの処理を登録
btn.addEventListener('click', () => {
  // 1. 新しいタブ（about:blank）を開く
const newWindow = window.open('about:blank', '_blank');

if (newWindow) {
    // 2. 挿入したいHTMLコードを定義する
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta charset="UTF-8">
            <title>挿入されたページ</title>
            <style>
                body { font-family: sans-serif; text-align: center; padding-top: 50px; background-color: #f0f0f0; }
                h1 { color: #333; }
            </style>
        </head>
        <body>
            <h1>Hello, about:blank!</h1>
            <p>このコンテンツはJavaScriptによって動的に挿入されました。</p>
        </body>
        </html>
    `;

    // 3. ドキュメントを開いてHTMLを書き込み、閉じる
    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
} else {
    alert('ポップアップがブロックされました。ブラウザの設定を許可してください。');
}

});
