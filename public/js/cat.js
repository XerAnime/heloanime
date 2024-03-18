document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/popular/";
    let pageNumber = 1; 
    const paginationContainer = document.getElementById('paginationContainer');
    const loader = document.getElementById('preloder'); 
    function showLoader() {
        document.getElementById('customLoader').classList.remove('loader-hidden');
    }
    function hideLoader() {
        document.getElementById('customLoader').classList.add('loader-hidden');
    }
    function updatePaginationLinks(currentPage) {
        paginationContainer.innerHTML = ''; 
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i > 0) {
                const link = document.createElement('a');
                link.href = "#";
                link.textContent = i;
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    pageNumber = i;
                    showLoader(); 
                    fetchData(pageNumber);
                    updatePaginationLinks(pageNumber);
                });
                if (i === currentPage) {
                    link.classList.add('current-page');
                }
                paginationContainer.appendChild(link);
            }
        }
    }
    function fetchData(page, sortBy) {
        const url = `${apiUrl}${page}?sortBy=${sortBy}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                hideLoader(); 
                let animeList = data.results; 
                animeList.sort((a, b) => a.title.localeCompare(b.title));
                const animeContainer = document.querySelector(".product__page__content .row");
                animeContainer.innerHTML = ''; 
                animeList.forEach(anime => {
                    const item = document.createElement("div");
                    item.classList.add("col-lg-4", "col-md-6", "col-sm-6");
                    item.innerHTML = `
                        <div class="product__item">
                            <div class="product__item__pic set-bg" style="background-image: url('${anime.image}')">
                                <!-- Set background image using inline style -->
                                <div class="ep">${anime.releaseDate}</div>
                                <!-- Assuming 'releaseDate' is the episode count -->
                                <div class="comment"><i class="fa fa-comments"></i> ${anime.id}</div>
                                <!-- Assuming 'id' is the comment count -->
                                <div class="view"><i class="fa fa-eye"></i> ${anime.releaseDate}</div>
                                <!-- Show release date in the 'view' section -->
                            </div>
                            <div class="product__item__text">
                                <ul>
                                    <li>Active</li>
                                    <li>Movie</li>
                                </ul>
                                <h5><a href="anime-details.html?anime=${encodeURIComponent(anime.title)}">${anime.title}</a></h5>
                                <!-- Link to anime details using 'anime' key -->
                            </div>
                        </div>
                    `;
                    animeContainer.appendChild(item);
                });
                $('.product__page__filter select').niceSelect();
                $('.section-title h4').text('All Anime');
                animeContainer.querySelectorAll('h5 a').forEach(animeLink => {
                    animeLink.addEventListener('click', function (e) {
                        e.preventDefault();
                        const animeName = animeLink.textContent;
                        window.location.href = `anime-details.html?anime=${encodeURIComponent(animeName)}`;
                    });
                });
                animeContainer.querySelectorAll('.product__item__pic').forEach(animePic => {
                    animePic.addEventListener('click', function (e) {
                        e.preventDefault();
                        const animeName = animePic.nextElementSibling.querySelector('h5 a').textContent;
                        window.location.href = `anime-details.html?anime=${encodeURIComponent(animeName)}`;
                    });
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                hideLoader(); 
            });
    }

    document.getElementById('orderSelect').addEventListener('change', function () {
        pageNumber = 1; 
        const sortBy = this.value; 
        showLoader(); 
        fetchData(pageNumber, sortBy); 
        updatePaginationLinks(pageNumber); 
    });

    document.querySelectorAll('.product__pagination a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            if (!link.classList.contains('current-page')) {
                pageNumber = parseInt(link.textContent);
                showLoader(); 
                fetchData(pageNumber); 
            }
        });
    });

    showLoader(); 
    fetchData(pageNumber, 'title'); 
    updatePaginationLinks(pageNumber); 
});

fetch('https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/upcoming/1')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.product__sidebar__comment');
        const animeList = data.results.slice(0, 6); 
        animeList.forEach(item => {
            if (!item.media || !item.media.title) {

                return;
            }

            const commentItem = document.createElement('div');
            commentItem.className = 'product__sidebar__comment__item';

            const commentItemPic = document.createElement('div');
            commentItemPic.className = 'product__sidebar__comment__item__pic';
            const img = document.createElement('img');
            img.src = item.media.coverImage.medium || ''; 
            img.alt = item.media.title.userPreferred || '';
            commentItemPic.appendChild(img);

            const commentItemText = document.createElement('div');
            commentItemText.className = 'product__sidebar__comment__item__text';

            const ul = document.createElement('ul');
            const li1 = document.createElement('li');
            li1.textContent = `Genre: ${item.media.genres.join(', ')}`; 
            const li2 = document.createElement('li');
            li2.textContent = `Format: ${item.media.format}`;
            ul.appendChild(li1);
            ul.appendChild(li2);

            const h5 = document.createElement('h5');
            const a = document.createElement('a');
            a.style.color = 'white';
            a.textContent = item.media.title.userPreferred || ''; 
            h5.appendChild(a);

            const span = document.createElement('span');
            span.innerHTML = `<i class="fa fa-eye"></i> ${item.media.popularity} Views`;
            commentItemText.appendChild(ul);
            commentItemText.appendChild(h5);
            commentItemText.appendChild(span);
            commentItem.appendChild(commentItemPic);
            commentItem.appendChild(commentItemText);
            container.appendChild(commentItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

//recent
document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/recent/"; 
    const recentAnimeContainer = document.getElementById('recentAnimeContainer');

    function fetchData(page) {
        fetch(apiUrl + page)
            .then(response => response.json())
            .then(data => {
                const animeList = data.results.slice(0, 9); 

                recentAnimeContainer.innerHTML = ''; 
                animeList.forEach(anime => {
                    const item = document.createElement("div");
                    item.classList.add("product__sidebar__view__item", "set-bg", "mix", "day");
                    item.style.backgroundImage = `url('${anime.image}')`;
                    item.innerHTML = `
                        <div class="ep">${anime.episode}</div>
                        <div class="view"><i class="fa fa-eye"></i> ${anime.releaseDate}</div>
                        <h5><a href="anime-details.html?anime=${encodeURIComponent(anime.title)}">${anime.title}</a></h5>
                        <!-- Update URL parameter to 'anime' -->
                    `;
                    item.addEventListener('click', function () {
                        window.location.href = `anime-details.html?anime=${encodeURIComponent(anime.title)}`;
                    });
                    recentAnimeContainer.appendChild(item);
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    fetchData(1);
});
