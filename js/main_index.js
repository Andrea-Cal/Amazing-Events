// carousel
const carouselHome = document.getElementById('carousel-home');
let templateCarousel = '';

for (let i = 0; i < data.events.length; i++) {
  if(i === 0){
    templateCarousel += `
    <div class="carousel-item active">
      <img src="${data.events[i].image}" class="d-block w-100" alt="${data.events[i].name}">
    </div>`
  }else{
    templateCarousel += `
    <div class="carousel-item">
      <img src="${data.events[i].image}" class="d-block w-100" alt="${data.events[i].name}">
    </div>`
  }    
}
carouselHome.innerHTML = templateCarousel;


// cards
const cardsHome = document.getElementById('card-section-home');
let templateCards = '';

for (let evento of data.events) {
  templateCards += `<div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
  <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
  <div class="card-body d-flex flex-column justify-content-between">
    <h5 class="card-title">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="card-title mb-0">$ ${evento.price}</h5>
      <a href="#" class="btn btn-primary">Details</a>
    </div>          
  </div>
</div>`
};

cardsHome.innerHTML = templateCards;

// checkbox categorias
const checkboxCategorias = document.getElementById('checkbox-categorias');
let templateCategorias = '';
let listadoDeCategorias = [];

for (let evento of data.events) {
  if(!listadoDeCategorias.includes(evento.category)){
    listadoDeCategorias.push(evento.category)    
  }  
};
for (let categoria of listadoDeCategorias) {
  templateCategorias += `<label><input type="checkbox" id="cbox${categoria.indexOf}" name="cbox" value="${categoria}"/> ${categoria}</label>`
}
checkboxCategorias.innerHTML = templateCategorias;
