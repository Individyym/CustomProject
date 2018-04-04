/*var buttons = document.getElementsByTagName("button");
console.log(buttons);
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", myScript);
    console.log(buttons[i]);
}

function myScript(e) {
    console.log(e.target.style.background);
    if (e.target.style.background == "red") {
        e.target.style.background = "white";
    } else {
        e.target.style.background = "red"
    }
}*/

var loader = document.getElementById("loader");
loader.addEventListener("click", loadNews);
function loadNews(e) {
    var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=d5b9ca969d174ea9a43af44576ace25c';
    var req = new Request(url);
    fetch(req)
        .then(function (response) {
            return response.json();
            //var myObj = JSON.parse(response);
            //console.log(myObj);
        })
        .then(function(myJson) {
        var myElement = document.getElementById("news");
        var section = document.createElement('section');
        section.className = 'loaded-news';
        for(i = 0; i < myJson.articles.length; i++) {
            var p = document.createElement('article');
            p.className = 'my-class';
            var articleTitle = document.createElement('h2');
            articleTitle.innerText = myJson.articles[i].title;
            p.appendChild(articleTitle);
            var articleAuthor = document.createElement("p");
            articleAuthor.innerText = myJson.articles[i].author;
            p.appendChild(articleAuthor);
            var articleDescription = document.createElement("p");
            articleDescription.innerText = myJson.articles[i].description;
            p.appendChild(articleDescription);
            section.appendChild(p);
        }
        myElement.appendChild(section);
        });
}

