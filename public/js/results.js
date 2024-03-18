document.addEventListener('DOMContentLoaded', function () {
    const resultsContainer = document.querySelector('.trending__product .row');
    
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    // Function to fetch search results
    function fetchSearchResults(query) {
        fetch(`https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/search?query=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
        
                resultsContainer.innerHTML = '';
                data.results.forEach(result => {
                    const itemHTML = `
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="product__item">
                                <div class="product__item__text">
                                    <ul>
                                        <li>Active</li>
                                        <li>Movie/Series</li>
                                    </ul>
                                    <h5><a class="anime-link" href="${result.link}">${result.title}</a></h5>
                                    <a href="anime-details.html?anime=${result.id}">
                                        <img src="${result.img}" alt="${result.title}" class="product__item__pic" style="width: 500px;">
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                    resultsContainer.insertAdjacentHTML('beforeend', itemHTML);
                });
            })
            .catch(error => console.error('Error fetching search results:', error));
    }

    fetchSearchResults(query);
});

fetch('https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/upcoming/1')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.product__sidebar__comment');

    data.results.forEach(item => {
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
      span.innerHTML = `<i class="fa fa-eye"></i> ${item.media.popularity} Viewes`;

      commentItemText.appendChild(ul);
      commentItemText.appendChild(h5);
      commentItemText.appendChild(span);
      commentItem.appendChild(commentItemPic);
      commentItem.appendChild(commentItemText);
      container.appendChild(commentItem);
    });
  })
  .catch(error => console.error('Error fetching data:', error));