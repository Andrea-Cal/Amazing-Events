// contenedor carousel
const carouselHome = document.getElementById('carousel-home');
// contenedor cards
const cardsHome = document.getElementById('card-section-home');
// contenedor checkbox categorias
const checkboxCategorias = document.getElementById('checkbox-categorias');
// input del buscador
const barraDeBusqueda = document.querySelector('input[type=search]');
// boton del buscador
const botonBusqueda = document.querySelector('button[type=submit]');


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


// filtra las categorias del array original sin repetir
const categoriasSinRepetir = [ ...new Set(data.events.map(objeto => objeto.category))];

// funcion que crea la estructura HTML de los checkbox
function crearEstructuraChecks(categoria){
  let templateCheckBox = "";
  templateCheckBox = `<label><input type="checkbox" id="${categoria}" name="cbox" value="${categoria}"/> ${categoria}</label>`;  
  return templateCheckBox;
}

// funcion que imprime las categorias
function imprimirCategoriasEnHtml(arrayDeCategorias, elementoHtml){
  let estructura = "";  
  arrayDeCategorias.forEach(categoria => {
    estructura += crearEstructuraChecks(categoria)
  });
  elementoHtml.innerHTML = estructura;
}
imprimirCategoriasEnHtml(categoriasSinRepetir, checkboxCategorias);

// escuchador de eventos de los checkbox
checkboxCategorias.addEventListener("change", (e)=> {   
  const returnFiltrosCombinados = filtroCombinado(data.events, barraDeBusqueda);  
  imprimirCardsEnHtml(returnFiltrosCombinados, cardsHome);
});

// funcion de filtro por checkbox
function filtroCheckbox(arrayDeEventos){
  let nodeList = document.querySelectorAll("input[type='checkbox']:checked");  
  let arrayValues = Array.from(nodeList).map(input => input.value);
  if(arrayValues.length > 0){
    let eventosFiltradosCheck = arrayDeEventos.filter(objetoEvento => arrayValues.includes(objetoEvento.category));
    return eventosFiltradosCheck;
  }else{
    return arrayDeEventos;
  }    
}

// escuchador de eventos del boton de busqueda
botonBusqueda.addEventListener("click", (e)=> {
  const returnFiltrosCombinados = filtroCombinado(data.events, barraDeBusqueda);
  imprimirCardsEnHtml(returnFiltrosCombinados, cardsHome);
  e.preventDefault();
});

// Funcion normalizar imput
function capitalizarPrimeraLetra(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

// funcion de filtro por barra de busqueda
function filtroBuscador(arrayDeEventos, input){  
  let inputNormalizado = capitalizarPrimeraLetra(input.value);
  let eventosFiltradosBusqueda = arrayDeEventos.filter(objetoEvento => objetoEvento.name.includes(inputNormalizado));
  return eventosFiltradosBusqueda;
}

// funcion de filtros combinados
function filtroCombinado(arrayDeEventos, input){
  const eventosFiltradosCheck = filtroCheckbox(arrayDeEventos);
  const resultadofiltroCombinado = filtroBuscador(eventosFiltradosCheck, input);  
  return resultadofiltroCombinado;
}

// funcion que crea la estructura HTML de las cards
function crearEstructuraCard(objetoEvento){
  let template = "";
  template = `
  <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <img src="${objetoEvento.image}" class="card-img-top" alt="${objetoEvento.name}">  
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${objetoEvento.name}</h5>
      <p class="card-text">${objetoEvento.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">$ ${objetoEvento.price}</h5>
        <a href="./details.html?id=${objetoEvento._id}" class="btn btn-primary">Details</a>
      </div>          
    </div>
  </div>`;
  return template;
}

// funcion que imprime las cards
function imprimirCardsEnHtml(arrayDeEventos, elementoHtml){
  let estructura = "";
  if(arrayDeEventos.length > 0){
    arrayDeEventos.forEach (objetoEvento => { 
      estructura += crearEstructuraCard(objetoEvento)
    })
    elementoHtml.innerHTML = estructura;
  }else{
    imprimirMensajeBusquedaNoCoincide(elementoHtml);
  }
  
}
imprimirCardsEnHtml(data.events, cardsHome);

function crearEstructuraMensaje(){
  let template = `
    <div class="card text-center">
      <div class="card-header" id="mensaje-error">
        Search results
      </div>
      <div class="card-body">
        <h5 class="card-title">Ups!</h5>
        <p class="card-text">We did not find events that match your search. Please, try again.</p>
        <a href="./index.html" class="btn btn-primary">Go back</a>
      </div>  
    </div>`;
  return template;
}

function imprimirMensajeBusquedaNoCoincide(elementoHtml){ 
  let template = crearEstructuraMensaje();
  elementoHtml.innerHTML = template;
}
