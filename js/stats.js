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
  eventoConMayorAsistencia(arrayDeEventosPasados, tabla1Dato1);
  // evento con menor porcentaje de asistencia - tabla 1.2
  eventoConMenorAsistencia(arrayDeEventosPasados, tabla1Dato2);
  // evento con mayor capacidad - tabla 1.3
 console.log( eventoConMayorCapacidad(arrayEventos, tabla1Dato3));
})
.catch( error => { console.log(error);})

// contenedor carousel
const carouselStats = document.getElementById('carousel-stats');
const tabla1Dato1 = document.getElementById('td-tabla1-1');
const tabla1Dato2 = document.getElementById('td-tabla1-2');
const tabla1Dato3 = document.getElementById('td-tabla1-3');

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
function eventoConMayorAsistencia(array, elementoHtml){
  let eventosOrdenadosDeMayorAMenor = array.sort((a,b) => ((b.assistance*100)/b.capacity) - ((a.assistance*100)/a.capacity));
  let mayor = eventosOrdenadosDeMayorAMenor[0];  
  elementoHtml.innerHTML = `${mayor.name} : ${((mayor.assistance*100)/mayor.capacity).toFixed(2)} %`;
}
// ------------------------------------------------------------
// evento con menor porcentaje de asistencia - tabla 1.2
function eventoConMenorAsistencia(array, elementoHtml){
  let eventosOrdenadosDeMayorAMenor = array.sort((a,b) => ((a.assistance*100)/a.capacity) - ((b.assistance*100)/b.capacity));
  let menor = eventosOrdenadosDeMayorAMenor[0];  
  elementoHtml.innerHTML = `${menor.name} : ${((menor.assistance*100)/menor.capacity).toFixed(2)} %`;
}
// ------------------------------------------------------------
// evento con menor capacidad - tabla 1.3
function eventoConMayorCapacidad(array, elementoHtml){
  let eventosOrdenadosDeMayorAMenor = array.sort((a,b) => b.capacity - a.capacity);
  let mayor = eventosOrdenadosDeMayorAMenor[0];
  elementoHtml.innerHTML = `${mayor.name}: ${mayor.capacity}`;  
}
// ------------------------------------------------------------


