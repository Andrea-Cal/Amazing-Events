fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( (response) => response.json())
.then (data => {  
  let objetoData = data;
  let arrayEventos = data.events;
  console.log(arrayEventos);
  // llamado a la funcion que muestra imagenes en el carousel
  mostrarImagenesEnCarousel(arrayEventos, carouselStats);
  // filtramos los eventos pasados
  let arrayDeEventosPasados = arrayEventos.filter(objetoEvento => objetoData.currentDate > objetoEvento.date);
  // filtramos los eventos futuros
  let arrayDeEventosFuturos = arrayEventos.filter(objetoEvento => objetoData.currentDate <= objetoEvento.date);
  // evento con mayor porcentaje de asistencia - tabla 1.1
  eventoConMayorAsistencia(arrayDeEventosPasados);
  // evento con menor porcentaje de asistencia - tabla 1.2
  eventoConMenorAsistencia(arrayDeEventosPasados);
  // evento con mayor capacidad - tabla 1.3
  eventoConMayorCapacidad(arrayEventos);
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


// ------------------------------------------------------------
// evento con mayor porcentaje de asistencia - tabla 1.1
function eventoConMayorAsistencia(array){
  let eventosOrdenadosDeMayorAMenor = array.sort((a,b) => b.assistance - a.assistance);
  let mayor = eventosOrdenadosDeMayorAMenor[0];
  return mayor;
}
// insertar el dato en la celda correspondiente


// ------------------------------------------------------------
// evento con menor porcentaje de asistencia - tabla 1.2
function eventoConMenorAsistencia(array){
  let eventosOrdenadosDeMenorAMayor = array.sort((a,b) => a.assistance - b.assistance);
  let menor = eventosOrdenadosDeMenorAMayor[0];
  return menor;
}
// insertar el dato en la celda correspondiente


// ------------------------------------------------------------
// evento con menor capacidad - tabla 1.3
function eventoConMayorCapacidad(array){
  let eventosOrdenadosDeMayorAMenor = array.sort((a,b) => b.capacity - a.capacity);
  let mayor = eventosOrdenadosDeMayorAMenor[0];
  return mayor;
}
// insertar el dato en la celda correspondiente
// ------------------------------------------------------------