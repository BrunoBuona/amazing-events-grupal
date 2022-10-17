// DOM
let cardsJs = document.getElementById("cards-js");
let buscador = document.getElementById("buscador");
let checkbox = document.getElementById("category-js");

function imprimir (array,contenedor){
    array.forEach (e => {contenedor.innerHTML += 
           `<div class="card">
            <img src=${e.image} class="card-img-top" alt="Card">
            <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <a href="#" class="btn btn-primary">See more</a>
            </div>`})};
imprimir(events,cardsJs)

// Sin coincidencias en la busqueda
function notCoincidence(array, contenedor){
  if(array <= 0){contenedor.innerHTML=`<h2>Sin coincidencias</h2>`}}

// SEARCH LOGIC
buscador.addEventListener("keyup", e => {
  elementosFiltrados = events.filter(names => names.name.toLowerCase().includes(e.target.value.toLowerCase()))
  cardsJs.innerHTML = ''
  notCoincidence(elementosFiltrados, cardsJs)
  imprimir(elementosFiltrados,cardsJs)})

// CHECKBOXS CATEGORYS
let categorias = Array.from(new Set(events.map(objeto => objeto.category)))
categorias.forEach(nombreCategoria => {
  checkbox.innerHTML+=
    `<div class="form-check form-switch">
    <input class="form-check-input" id="${nombreCategoria}" type="checkbox" role="switch" id="flexSwitchCheckDefault">
    <label class="form-check-label" for="flexSwitchCheckDefault">${nombreCategoria}</label>
    </div>`})

// CHECKBOX LOGIC
let listChecked = []
checkbox.addEventListener(`change`, e=>{
    if (e.target.checked) {
        listChecked = listChecked.concat(events.filter(evento=> evento.category.toLowerCase().includes(e.target.id.toLowerCase())))
        console.log(listChecked);
        cardsJs.innerHTML = ''
        imprimir(listChecked, cardsJs)}
   else if(!e.target.checked){
        listChecked = listChecked.filter(evento => !evento.category.toLowerCase().includes( e.target.id.toLowerCase() ) )
        cardsJs.innerHTML = ''
        imprimir(listChecked, cardsJs)}
   if (listChecked.length === 0){
        imprimir(events,cardsJs)}})