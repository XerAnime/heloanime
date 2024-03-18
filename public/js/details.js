 //Anime-details.html
       document.addEventListener('DOMContentLoaded', function () {
        function getParam(name) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            return urlParams.get(name);
        }

        function fetchAnimeDetails() {
            const animeTitle = getParam('anime'); 
            const apiUrl = `https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/anime/${animeTitle}`;
    
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('anime-image').src = data.results.image;
                    document.getElementById('AnimeName').innerText = data.results.name; 
                    const animeDetailsList = document.getElementById('anime-details-list');
                    animeDetailsList.innerHTML = `
                        <div class="col-lg-6 col-md-6">
                            <ul>
                                <li><span>Type:</span> ${data.results.type}</li>
                                <li><span>Studios:</span> ${data.results.studios}</li>
                                <li><span>Date aired:</span> ${data.results.released}</li>
                                <li><span>Status:</span> ${data.results.status}</li>
                                <li><span>Genre:</span> ${data.results.genre}</li>
                                <li><span>Source:</span> ${data.results.source}</li>
                                <li><span>Other N:</span> ${data.results.other_name}</li>
                                <li><span>Ep Total:</span> ${data.results.episodes.length}</li>
                            </ul>
                        </div>
                    `;
                    document.getElementById('watch-btn').addEventListener('click', function (event) {
                        event.preventDefault();
                        const firstEpisodeTitle = data.results.episodes[0][1];
                        window.location.href = `anime-watching.html?anime=${encodeURIComponent(data.results.name)}&episode=${firstEpisodeTitle}`; // Redirect to anime-watching.html with anime name and first episode title
                    });
                })
                .catch(error => {
                    console.error('Error fetching anime details:', error);
                });
        }
    
        fetchAnimeDetails();
    });
    
    //search
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('search-input');
        const searchForm = document.querySelector('.search-model-form');
    
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); 
    
            const query = searchInput.value.trim();
    
            window.location.href = `search-results.html?query=${query}`;
        });
    
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); 
    
                const query = searchInput.value.trim();
                window.location.href = `search-results.html?query=${query}`;
            }
        });
    });