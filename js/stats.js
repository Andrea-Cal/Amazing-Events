fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( (response) => response.json())
.then (data => {  
  let arrayEventos = data.events;
  // llamado a la funcion que muestra imagenes en el carousel
  mostrarImagenesEnCarousel(arrayEventos, carouselStats);  
})
.catch( error => { console.log(error);})

// contenedor carousel
const carouselStats = document.getElementById('carousel-stats');

// mostrar imagenes de los primeros 5 eventos en el carousel
function mostrarImagenesEnCarousel(array, elementoHtml){
  let templateCarousel = '';
  for (let i = 0; i < 5; i++) {
    if(i === 0){
      templateCarousel += `
      <div class="carousel-item active">
        <img src="${array[i].image}" class="d-block w-100" alt="${array[i].name}">
      </div>`
    }else{
      templateCarousel += `
      <div class="carousel-item">
        <img src="${array[i].image}" class="d-block w-100" alt="${array[i].name}">
      </div>`
    }    
  }
  elementoHtml.innerHTML = templateCarousel;
}