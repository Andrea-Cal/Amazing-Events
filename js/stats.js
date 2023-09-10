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
  eventoConMayorCapacidad(arrayEventos, tabla1Dato3);
  const categorias = [ ...new Set(arrayDeEventosFuturos.map(objeto => objeto.category))];
  // por cada categoria
  generarDatos(categorias, arrayDeEventosFuturos, tabla2); 
})
.catch( error => { console.log(error);})

// contenedor carousel
const carouselStats = document.getElementById('carousel-stats');
// celdas de la tabla 1
const tabla1Dato1 = document.getElementById('td-tabla1-1');
const tabla1Dato2 = document.getElementById('td-tabla1-2');
const tabla1Dato3 = document.getElementById('td-tabla1-3');
// contenedor tabla 2
const tabla2 = document.getElementById('tabla2');

// mostrar imagenes de los primeros 3 eventos en el carousel
function mostrarImagenesEnCarousel(array, elementoHtml){
  let templateCarousel = '';
  for (let i = 0; i < 3; i++) {
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

// crear estructura de tabla (tabla2)
function crearEstructuraTabla2(categoria, recaudacion, porcentaje){
  let template = '';
  template += `
    <tr>
      <td class="col-4 border border-secondary-subtle">${categoria}</td>
      <td class="col-4 border border-secondary-subtle">${recaudacion}</td>
      <td class="col-4 border border-secondary-subtle">${porcentaje}</td>
    </tr>
  `
  return template;
}

// eventos futuros
//let eventosFuturos = data.events.filter(objetoEvento => data.currentDate <= objetoEvento.date);
// array de categorias de eventos futuros
//const categorias = [ ...new Set(eventosFuturos.map(objeto => objeto.category))];

// por cada categoria 
function generarDatos(arrayDeCategorias, arrayObjetos, elementoHtml){
  let estructura = "";
  arrayDeCategorias.forEach(categoria => { 
    let eventosFiltrados = arrayObjetos.filter(objetoEvento => objetoEvento.category.includes(categoria));
    let recaudacion = calcularRecaudacionPorCategoria(eventosFiltrados);
    let porcentaje = calcularPorcentajeDeAsistencia(eventosFiltrados);
    estructura += crearEstructuraTabla2(categoria, recaudacion, porcentaje);
  });
  elementoHtml.innerHTML = estructura;
}

// funcion que calcula el total de ingresos por categoria
function calcularRecaudacionPorCategoria(array){
  let recaudacion = 0;
  array.forEach(element => { recaudacion += (element.estimate*element.price) });    
  return recaudacion;
}

// funcion que calcula el porcentaje de asistencia estimada de todos los eventos de una misma categoria
function calcularPorcentajeDeAsistencia(array){  
  let suma = 0;
  array.forEach(element => { suma += ((element.estimate*100)/element.capacity) });  
  let porcentajeAsistencia = (suma/array.length).toFixed(2);  
  return porcentajeAsistencia;
}

