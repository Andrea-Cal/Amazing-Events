const contenedorDetails = document.getElementById('contenedor-details');
const queryString = location.search;
const params = new URLSearchParams(queryString);
const idBuscado = params.get("id");

const eventoAMostrar = data.events.find(objetoEvento => objetoEvento._id == idBuscado);
/* function buscarEvento(arrayDeEventos){
  const eventoAMostrar = arrayDeEventos.find(objetoEvento => objetoEvento._id == idBuscado);
  return eventoAMostrar;
} */
console.log(eventoAMostrar);

function crearEstructuraDetail(objetoEvento){
  let template = "";
  template = `
  <div class="row g-0" >
    <div class="col-md-6">
      <img src="${objetoEvento.image}" class="img-fluid rounded-start object-fit-cover w-100 h-100" alt="${objetoEvento.name}">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title text-center">${objetoEvento.name}</h5>
        <p class="card-text">${objetoEvento.description}</p>
        <p class="card-text">${objetoEvento.category}</p>
        <p class="card-text">${objetoEvento.date}</p>
        <h5 class="card-title mb-0">$ ${objetoEvento.price}</h5>
        <p class="card-text"><small class="text-body-secondary">${objetoEvento.place}</small></p>
        <a href="./index.html" class="btn btn-primary">Go back</a>
        </div>
    </div>
  </div>`
  return template;
}

function imprimirDetail(objetoEvento, elementoHtml){
  let estructura = crearEstructuraDetail(objetoEvento);
  elementoHtml.innerHTML = estructura;
}
imprimirDetail(eventoAMostrar, contenedorDetails);