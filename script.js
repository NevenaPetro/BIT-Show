const mainHeaderShow = document.createElement('h3');
const container = document.createElement('div');
mainHeaderShow.textContent = 'Popular shows';
mainHeaderShow.className = 'mainHeaderShow';
container.className = 'content';
const main = document.querySelector('.main');
const logo = document.querySelector('.logo');
const searchInput = document.querySelector('.search');
let allShows = [];

main.append(mainHeaderShow);
main.append(container);

(function handleRequest() {
  fetch('http://api.tvmaze.com/shows')
    .then((response) => response.json())
    .then((data) => {
      handleResponse(data);
      allShows = data;
    });
})();

searchInput.addEventListener('input', (event) => {
  doSearch(event);
});

function doSearch(e) {
  searchQuery = e.srcElement.value;

  filteredShows = allShows.filter((el) =>
    el.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  handleResponse(filteredShows);
}

function handleResponse(data) {
  console.log(data);
  let a = data.sort((a, b) => b.rating.average - a.rating.average);
  for (let i = 0; i < 50; i++) {
    const movieDiv = document.createElement('div');
    const parag = document.createElement('p');
    const img = document.createElement('img');
    const imgBig = document.createElement('img');
    const divBottomShowDetails = document.createElement('div');
    divBottomShowDetails.className = 'bottomInfo';
    movieDiv.className = 'card';
    container.append(movieDiv);
    parag.textContent = a[i].name;
    img.src = a[i].image.medium;
    imgBig.src = a[i].image.original;
    divBottomShowDetails.innerHTML = a[i].summary;
    movieDiv.append(img, parag);
    movieDiv.id = a[i].id;
    movieDiv.addEventListener('click', () => {
      container.style.display = 'none';
      mainHeaderShow.textContent = a[i].name;
      const backButton = document.createElement('div');
      backButton.className = 'backButton';
      backButton.textContent = '< BACK';
      (function handleRequestShow() {
        fetch(`https://api.tvmaze.com/shows/${movieDiv.id}/seasons`)
          .then((response) => response.json())
          .then((data) => handleResponseShow(data));
      })();
      const showDivInfo = document.createElement('div');
      const sideInfoShow = document.createElement('div');
      const bottomInfoShow = document.createElement('div');
      bottomInfoShow.className = 'bottomInfo';
      function handleResponseShow(data) {
        const headerLista = document.createElement('h3');
        const headerBottom = document.createElement('h3');
        const showImageBig = document.createElement('img');
        const ulLista = document.createElement('ul');
        showDivInfo.className = 'aboutMovie';
        sideInfoShow.className = 'sideInfo';
        headerLista.textContent = `Seasons(${data.length})`;
        headerBottom.textContent = 'About';
        showImageBig.src = imgBig.src;
        main.append(showDivInfo);
        showDivInfo.append(showImageBig);
        showDivInfo.append(sideInfoShow);
        sideInfoShow.append(headerLista);
        sideInfoShow.append(ulLista);
        showDivInfo.append(bottomInfoShow);
        bottomInfoShow.append(headerBottom);
        bottomInfoShow.append(divBottomShowDetails);
        showDivInfo.append(backButton);
        data.forEach((el) => {
          const liLista = document.createElement('li');
          liLista.textContent = `${el.premiereDate} - ${el.endDate}`;
          ulLista.append(liLista);
        });
        backButton.addEventListener('click', () => {
          showDivInfo.style.display = 'none';
          container.style.display = 'flex';
          mainHeaderShow.textContent = 'Popular shows';
        });
        logo.addEventListener('click', () => {
          showDivInfo.style.display = 'none';
          container.style.display = 'flex';
          mainHeaderShow.textContent = 'Popular shows';
        });
      }
      (function handleRequestShowCast() {
        fetch(`https://api.tvmaze.com/shows/${movieDiv.id}/cast`)
          .then((response) => response.json())
          .then((data) => handleResponseShowCast(data));
      })();
      function handleResponseShowCast(data) {
        const headerListCast = document.createElement('h3');
        const ulListaCast = document.createElement('ul');
        headerListCast.textContent = 'Cast';
        sideInfoShow.append(headerListCast);
        sideInfoShow.append(ulListaCast);
        for (let i = 0; i < 10 && i < data.length; i++) {
          console.log(data[i].person.name);
          const liListaCast = document.createElement('li');
          liListaCast.textContent = data[i].person.name;
          ulListaCast.append(liListaCast);
        }
      }
    });
  }
}
