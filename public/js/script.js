//Test fetch
fetch('https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/recent/1') 
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.trending__product .row');
    data.results.forEach(item => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 col-sm-6';
      const productItem = document.createElement('div');
      productItem.className = 'product__item';
      const productItemPic = document.createElement('div');
      productItemPic.className = 'product__item__pic set-bg';
      productItemPic.style.backgroundImage = `url(${item.image})`; 
      const ep = document.createElement('div');
      ep.className = 'ep';
      ep.textContent = item.episode;
      const view = document.createElement('div');
      view.className = 'view';
      view.innerHTML = `<i class="fa fa-eye"></i> ${item.id}`;

      const productItemText = document.createElement('div');
      productItemText.className = 'product__item__text';

      const ul = document.createElement('ul');
      const li1 = document.createElement('li');
      li1.textContent = 'Active';
      const li2 = document.createElement('li');
      li2.textContent = 'Movie/Series';
      ul.appendChild(li1);
      ul.appendChild(li2);

      const h5 = document.createElement('h5');
      const a = document.createElement('a');
      a.href = `anime-details.html?anime=${item.title}`; 
      a.textContent = item.title;
      h5.appendChild(a);

      productItemPic.appendChild(ep);
      productItemPic.appendChild(view);
      productItem.appendChild(productItemPic);
      productItemText.appendChild(ul);
      productItemText.appendChild(h5);
      productItem.appendChild(productItemText);
      col.appendChild(productItem);
      container.appendChild(col);

      productItem.addEventListener('click', () => {
        window.location.href = `anime-details.html?anime=${item.title}`;
      });
    });
  })
  .catch(error => console.error('Error fetching recent anime data:', error));

fetch('https://worker-curly-feather-750f.jhonrickcieloe.workers.dev/?u=https://testaopi.vercel.app/api/popular/1')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.popular__product .row');

   
    data.results.forEach(item => {

      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 col-sm-6';

      const productItem = document.createElement('div');
      productItem.className = 'product__item';

      const productItemPic = document.createElement('div');
      productItemPic.className = 'product__item__pic set-bg';
      productItemPic.style.backgroundImage = `url(${item.image})`;

      const ep = document.createElement('div');
      ep.className = 'ep';
      ep.textContent = `${item.releaseDate} / ${item.releaseDate}`;

      const view = document.createElement('div');
      view.className = 'view';
      view.innerHTML = `<i class="fa fa-eye"></i> ${item.id}`;

      const productItemText = document.createElement('div');
      productItemText.className = 'product__item__text';

      const ul = document.createElement('ul');
      const li1 = document.createElement('li');
      li1.textContent = `Released: ${item.releaseDate}`;
      const li2 = document.createElement('li');
      ul.appendChild(li1);

      const h5 = document.createElement('h5');
      const a = document.createElement('a');
      a.href = `anime-details.html?anime=${item.title}`; 
      a.textContent = item.title;
      h5.appendChild(a);

      productItemPic.appendChild(ep);
      productItemPic.appendChild(view);
      productItem.appendChild(productItemPic);
      productItemText.appendChild(ul);
      productItemText.appendChild(h5);
      productItem.appendChild(productItemText);
      col.appendChild(productItem);
      container.appendChild(col);

     
      productItem.addEventListener('click', () => {
        window.location.href = `anime-details.html?anime=${item.title}`;
      });
    });
  })
  .catch(error => console.error('Error fetching popular anime data:', error));

// test upcoming fetch
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


//view all anime
document.addEventListener('DOMContentLoaded', function () {
  const viewAllButton = document.querySelector('.btn__all a');
  viewAllButton.addEventListener('click', function (event) {
      event.preventDefault(); 
      window.location.href = 'categories.html'; 
  });
});
