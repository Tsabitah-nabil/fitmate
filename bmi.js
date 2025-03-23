function hitungBMI(berat, tinggi) {
    if (tinggi <= 0) {
        return 0;
    }
    return berat / (tinggi * tinggi);
}

const bmiClasses = {
    'Underweight': {
        min: 0,
        max: 18.5,
        title: 'Kurus',
    },
    'Ideal': {
        min: 18.5,
        max: 23,
        title: 'Normal',
    },
    'Overweight': {
        min: 23,
        max: 25,
        title: 'Kegemukan',
    },
    'Obesitas1': {
        min: 25,
        max: 30,
        title: 'Obesitas 1',
    },
    'Obesitas2': {
        min: 30,
        max: Infinity,
        title: 'Obesitas 2',
    },
}

function getBmiClass(bmi) {
    for (const [key, value] of Object.entries(bmiClasses)) {
        if (bmi >= value.min && bmi < value.max) {
            return key;
        }
    }
    return 'Ideal';
}

function handleLoad() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const result = document.getElementById('result');
    const category = document.getElementById('category');
    const recommendation = document.getElementById('recommendation');
    const articleItem = document.getElementById('article-item');
    const articleTitle = document.getElementById('article-title');
    const articleSubtitle = document.getElementById('article-subtitle');

    const articleMeta = {};

    const articleMetaUrl = 'articles/articles.json';
    fetch(articleMetaUrl)
        .then(response => response.json())
        .then(data => {
            for (const article of data) {
                articleMeta[article.path] = article;
            }
        });

    function updateResult() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        if (isNaN(weight) || isNaN(height)) {
            result.innerHTML = '0.0';
            category.innerHTML = 'Tidak diketahui';
            recommendation.style.opacity = 0;
            return;
        }
        const bmi = hitungBMI(weight, height / 100);
        const bmiClass = getBmiClass(bmi);
        result.innerHTML = bmi.toFixed(2);
        category.innerHTML = bmiClasses[bmiClass].title;
        const article = articleMeta[bmiClass];
        if (article) {
            recommendation.style.opacity = 1;
            articleItem.setAttribute('data-href', 'article?id=' + article.path);
            articleTitle.innerHTML = article.title;
            articleSubtitle.innerHTML = 'Oleh ' + article.author;
            scanLink();
        } else {
            recommendation.style.opacity = 0;
        }
    }

    weightInput.addEventListener('input', updateResult);
    heightInput.addEventListener('input', updateResult);
    updateResult();
}

document.addEventListener('DOMContentLoaded', handleLoad);