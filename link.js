const socialLinks = {
    'youtube': 'https://www.youtube.com/',
    'threads': 'https://www.thread.net/',
    'instagram': 'https://www.instagram.com/',
}

const appendHtml = true;
function scanLink() {
    const links = document.querySelectorAll('[data-href]');
    links.forEach((link) => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            let href = link.getAttribute('data-href');
            if (href != null) {
                if (appendHtml) {
                    if (!href) {
                        href = 'index';
                    }
                    let split = href.split('?');
                    if (split.length > 1) {
                        href = split[0] + '.html?' + split[1];
                    } else {
                        href = href + '.html';
                    }
                }
                window.location.href = href;
            }
        });
    });

    for (const [key, value] of Object.entries(socialLinks)) {
        const link = document.getElementById(key);
        if (link) {
            link.style.cursor = 'pointer';
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = value;
            });
        }
    }
}

function shareLink() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: document.title,
            url: url,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    } else {
        // copy to clipboard
        navigator.clipboard.writeText(url)
            .then(() => console.log('URL copied to clipboard'))
            .catch((error) => console.log('Error copying URL to clipboard', error));
    }
}

document.addEventListener('DOMContentLoaded', scanLink);