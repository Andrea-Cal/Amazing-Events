// carousel
const carouselHome = document.getElementById('carousel-home');

let templateCarousel = '';

for (let evento of data.events) {
  if(data.currentDate < evento.date){
    templateCarousel += `
    <div class="carousel-item active">
      <img src="${evento.image}" class="d-block w-100" alt="${evento.name}">
    </div>`
  }  
};

carouselHome.innerHTML = templateCarousel;


// cards
const cardsHome = document.getElementById('card-section-home');

let templateCards = '';

for (let evento of data.events) {
  templateCards += `<div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
  <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
  <div class="card-body d-flex flex-column justify-content-between">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <div class="d-flex justify-content-between align-items-center">
      <h6 class="card-title mb-0">$ ${evento.price}</h6>
      <a href="#" class="btn btn-primary">Details</a>
    </div>          
  </div>
</div>`
};

cardsHome.innerHTML = templateCards;