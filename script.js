// this is my url and my key to some newr=s
const APIKEY = "ebaf59990a2e1943a5356986224a4f93";
const URL = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${APIKEY}`;

// this is the functions to move beteween "pages"
function goHome() {
    document.getElementById('home-page').classList.add('active');
    document.getElementById('create-page').classList.remove('active');
    document.getElementById('long-pages').classList.remove('active');
}

function goCreate() {
    document.getElementById('create-page').classList.add('active');
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('long-pages').classList.remove('active');
}

function goLongPages() {
    document.getElementById('long-pages').classList.add('active');
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('create-page').classList.remove('active');
}

// load news from local storage
function loadNews() {
    const data = localStorage.getItem('news');         // save the data in "data"

    if (data) {                                        // if is exsists show
        renderNews(JSON.parse(data));
    } else {                                           // if not go to url
        fetch(URL)
            .then(function(response) {                 // create the "box" with the code
                return response.json();
            })
            .then(function(data) {                     // than read it and create artichle tag with the value of the new
                if (data.articles) {
                    localStorage.setItem('news', JSON.stringify(data.articles));
                    renderNews(data.articles);
                }
            })
            .catch(function(error) {
                console.log("Error:", error);
            });
    }
}

// נרצה לשלוח את מה שטענו לפונקציה
// its functions to show news
function renderNews(articles) {
    const list = document.getElementById('news-list'); // get news list 
    list.innerHTML = '';                               // clean the list (html) from news

    articles.forEach(function(item) {                  // for all new
        const card = document.createElement('article');// create card in it show the details
        card.className = 'card';                       // the name of class for this card is card
                                                       // put the details inside the tag
        card.innerHTML = `                             
            <div class="card-header">
                <img src="${item.image || item.urlToImage}" alt="news">
                <div>
                    <p class="author">${item.author}</p>
                    <h2>${item.title}</h2>
                </div>
            </div>
            <p class="desc">${item.description}</p>
        `;
        list.appendChild(card);
    });
}


const APIKEY = "ebaf59990a2e1943a5356986224a4f93";
const URL = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${APIKEY}`;

function goHome() {
    document.getElementById('home-page').classList.add('active');
    document.getElementById('create-page').classList.remove('active');
    document.getElementById('long-pages').classList.remove('active');
}

function goCreate() {
    document.getElementById('create-page').classList.add('active');
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('long-pages').classList.remove('active');
}

function goForm() {
    goCreate();
}

function goLongPages() {
    document.getElementById('long-pages').classList.add('active');
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('create-page').classList.remove('active');
}

function loadNews() {
    const cachedData = localStorage.getItem('news');

    if (cachedData) {
        renderNews(JSON.parse(cachedData));
    } else {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                if (data.articles) {
                    localStorage.setItem('news', JSON.stringify(data.articles));
                    renderNews(data.articles);
                }
            })
            .catch(err => console.error(err));
    }
}

function renderNews(articles) {
    const list = document.getElementById('news-list');
    list.innerHTML = '';

    articles.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${item.image || item.urlToImage || 'https://via.placeholder.com/150'}" alt="news">
                <div>
                    <p class="author">${item.author || 'System'}</p>
                    <h2>${item.title}</h2>
                </div>
            </div>
            <p class="desc">${item.description || ''}</p>
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
        author: "",             //defult?
        image: "",              //defult??
        description: text.value
    };

    let currentNews = JSON.parse(localStorage.getItem('news'));       // טעינה
    currentNews = [newStory, ...currentNews];                         // שמירה ראשון

    localStorage.setItem('news', JSON.stringify(currentNews));        // שמירה חזרה
    renderNews(currentNews);                                          // קורא לפןנקציה להצגת חדשות
    
}

loadNews();