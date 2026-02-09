const APIKEY = "ebaf59990a2e1943a5356986224a4f93";
const URL = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${APIKEY}`;

// Functions to move pages
function goHome() {
    document.getElementById('home-page').classList.add('active');
    document.getElementById('create-page').classList.remove('active');
    document.getElementById('long-pages').classList.remove('active');
}

function goLongPages() {
    document.getElementById('long-pages').classList.add('active');
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('create-page').classList.remove('active');
}

function goCreate() {
    document.getElementById('create-page').classList.add('active');
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('long-pages').classList.remove('active');
}

// load local storage
function loadNews() {
    const data = localStorage.getItem('news') || [];
    // console.log(data);
    
    if (data.length > 0) {
        renderNews(JSON.parse(data));
    } else {
        fetch(URL)
            .then(function(response) {
                return response.json();
            })    
            .then(function(data) {
                if (data.articles) {
                        console.log(data.articles);

                    localStorage.setItem('news', JSON.stringify(data.articles));
                    renderNews(data.articles);
                }
            })
            .catch(function(error) {
                console.log("Error:", error);
            });
    }
}




function renderNews(articles) {
    // reset html news
    const list = document.getElementById('news-list');
    list.innerHTML = '';
    // for every new - get, add class, inner to html with separted values, and push to list
    articles.forEach(function(item) {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `                             
            <div class="card-header">
                <img src="${item.image || item.urlToImage}" alt="news">
                <div>
                    <p class="author">${item.source.name}</p>
                    <h2>${item.title}</h2>
                </div>
            </div>
            <p class="desc">${item.description}</p>
        `;
        list.appendChild(card);
    });
}




function addNewStory() {
    const title = document.getElementById('title');
    const text = document.getElementById('text');

    if (!title.value || !text.value) {
        return;
    }

    const newStory = {
        title: title.value,
        name: "",
        image: "",
        description: text.value
    };

    let currentNews = JSON.parse(localStorage.getItem('news'));
    currentNews = [newStory, ...currentNews];

    localStorage.setItem('news', JSON.stringify(currentNews));
    renderNews(currentNews);
    
}

loadNews();