// 作成まで待機してね
    document.getElementById('openBtn').addEventListener('click', () => {
        // 1. まず完全に空の「about:blank」ページを新しいタブで開く
        const newWindow = window.open('about:blank', '_blank');

        if (newWindow) {
            // 2. 表示したいHTMLコンテンツを定義する（ここに好きなデザインを書けます）
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="ja">
                <head>
                    <meta charset="UTF-8">
                    <title>about:blankの中に作ったページ</title>
                    <style>
                        body { font-family: sans-serif; padding: 20px; background: #f0f2f5; text-align: center; }
                        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; }
                        h1 { color: #1a73e8; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>Slow_scriptへようこそ！</h1>
                        <p>Slow_scriptはabout:blankを経由して<b>履歴に残さない</b>ツールサイトです。</p>
                        <p>さっそくですがYoutube見たいですよね？そんなあなたには<b>Youtubeダウンローダー</b>を使いましょう。YoutubeダウンローダーはYoutubeのリンクを打つだけでなんとYoutubeの動画が見れます！ですが、ブロックツールがダウンロードを妨害する可能性があります。</p>
<button id="1">Youtubeダウンローダーへ</button>

            `;

            // 3. 開いた「about:blank」のドキュメントにHTMLを直接書き込む
            newWindow.document.open();
            newWindow.document.write(htmlContent);
            newWindow.document.close(); // 書き込み完了をブラウザに伝える
        } else {
            alert('ポップアップがブロックされました。ブラウザの設定を許可してください。');
        }
    });

// about:blank層は終わり
const btn = document.getElementById('1');

const newWindow = window.open('about:blank', '_blank');

if (newWindow) {
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
            <p>このコンテンツはJavaScriptによって挿入されました。</p>
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
