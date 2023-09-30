const content = document.getElementsByTagName("content")[0];

async function updateRoute()
{
    let hash = window.location.hash.substring(1);

    // Go to main page when nothing especified in URL
    if (hash == "") {
        location.href = "#intro";
        hash = "intro";
    };

    let url = "docs files/pages/" + hash + ".html";
    let a = fetch(url).then( (res) => res.text())
    .then(
        (html) => {
            content.innerHTML = html;
        }
    ).catch((err) => {
        console.warn(err);
    });
}

window.addEventListener('load', updateRoute);
window.addEventListener('hashchange', updateRoute);