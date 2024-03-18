//ANIME WATCHING HTML
document.addEventListener('DOMContentLoaded', function () {
    function fetchEpisodeDetails(episodeTitle) {
        if (!episodeTitle) {
            console.error('Episode title parameter is undefined or missing.');
            return;
        }

        const apiUrl = `https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/episode/${encodeURIComponent(episodeTitle)}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                console.log('Stream object:', data.results.servers.stream);
                const sources = data.results.stream.sources;
                if (!sources || sources.length === 0) {
                    throw new Error('Episode sources not found or empty.');
                }
                const episodeUrl = sources[0].file; 
                if (!episodeUrl) {
                    throw new Error('Episode URL not found.');
                }
                // Initialize the video player using HLS.js
                const video = document.getElementById('player');
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(episodeUrl);
                    hls.attachMedia(video);
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = episodeUrl;
                } else {
                    console.error('HLS is not supported.');
                }
                const animeNameSpan = document.getElementById('animeName');
                animeNameSpan.textContent = `${data.results.name}`;
            })
            .catch(error => {
                console.error('Error fetching episode details:', error);
            });
    }
    function getParam(name) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(name);
    }
    const episodeTitle = getParam('episode');
    fetchEpisodeDetails(episodeTitle);
    const episodeLinks = document.querySelectorAll('.episode-link');
    episodeLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const newEpisodeTitle = this.dataset.episode;
            fetchEpisodeDetails(newEpisodeTitle);
            const currentAnime = getParam('anime');
            const newUrl = `anime-watching.html?anime=${encodeURIComponent(currentAnime)}&episode=${encodeURIComponent(newEpisodeTitle)}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    function fetchEpisodeList(animeName) {
        const apiUrl = `https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/anime/${encodeURIComponent(animeName)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const episodes = data.results.episodes;
                const episodeListContainer = document.querySelector('.anime__details__episodes');
                episodeListContainer.innerHTML = '<div class="section-title"><h5>Episode List</h5></div>';

                episodes.forEach(episode => {
                    const episodeLink = document.createElement('a');
                    episodeLink.href = `anime-watching.html?anime=${encodeURIComponent(animeName)}&episode=${encodeURIComponent(episode[1])}`;
                    episodeLink.textContent = `Ep ${episode[0]}`;
                    episodeListContainer.appendChild(episodeLink);
                });
            })
            .catch(error => {
                console.error('Error fetching episode list:', error);
            });
    }
    function getParam(name) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(name);
    }

    const animeName = getParam('anime');
    fetchEpisodeList(animeName);
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