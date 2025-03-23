function closeArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    if (articleId) {
        window.location.href = appendHtml ? 'article.html' : 'article';
    } else {
        window.location.href = appendHtml ? 'index.html' : 'index';
    }
}
function onArticleLoad() {
    // in search param ?id=1
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    if (articleId) {
        console.log('Loading article', articleId);
        const article = document.getElementById('article');
        if (article) {
            const articleUrl = 'articles/' + articleId + '.md';
            console.log('Loading article from', articleUrl);
            fetch(articleUrl)
                .then(response => response.text())
                .then(text => {
                    console.log('Article loaded', articleId);
                    article.innerHTML = new showdown.Converter().makeHtml(text);
                    const articleBanner = document.getElementById('article-banner');
                    if (articleBanner) {
                        articleBanner.innerHTML = '<img src="articles/' + articleId + '.png" />';
                        articleBanner.style.display = 'block';
                    }
                }).catch((error) => {
                    console.error('Error loading article', articleId, error);
                    article.innerHTML = '<p>Article not found</p>';
                });
        }
    } else {
        document.querySelector('#article').classList.add('article-list');
        const articleMetaUrl = 'articles/articles.json';
        console.log('Loading article meta from', articleMetaUrl);
        fetch(articleMetaUrl)
            .then(response => response.json())
            .then(articleMeta => {
                console.log('Article meta loaded', articleId);
                if (articleMeta) {
                    document.getElementById('article').innerHTML = '';
                    for (const article of articleMeta) {
                        const itemHtml = `
                            <div class="article-item" data-href="article?id=${article.path}">
                                <div class="article-item-title">${article.title}</div>
                                <div class="article-item-subtitle">Oleh ${article.author}</div>
                            </div>
                            `;
                        const div = document.createElement('div');
                        document.getElementById('article').appendChild(div);
                        div.outerHTML = itemHtml;
                    }
                    scanLink();
                } else {
                    console.error('Article not found', articleId);
                    document.getElementById('article').innerHTML = '<p>Article not found</p>';
                }
            }).catch((error) => {
                console.error('Error loading article meta', articleId, error);
                document.getElementById('article').innerHTML = '<p>Article not found</p>';
            });
    }
}

window.addEventListener('load', onArticleLoad);