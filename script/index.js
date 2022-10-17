let cardsJs = document.getElementById("cards-js");
let buscador = document.getElementById("buscador")
let checkbox = document.getElementById("category-js")
// Imprime las cards al cargar la pagina

function imprimir (array,contenedor){
    array.forEach (e => {contenedor.innerHTML += `
            <div class="card">
            <img src=${e.image} class="card-img-top" alt="Card">
            <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <a href="#" class="btn btn-primary">See more</a>
            </div>
  `;
})
};
imprimir(events,cardsJs)
function notCoincidence(array, contenedor){
  if(array <= 0){
    contenedor.innerHTML=
    `
    <h2>Sin coincidencias</h2>
    `
  }
}
// SEARCH BAR...


// Esto hace que cada vez que el usuario deja de escribir en el input, empieza a ejecutar sus instrucciones paso a paso.
buscador.addEventListener("keyup", e => {
  // Primer instruccion: Filtro del array de eventos y comparo si dentro de mi objeto names y su propiedad .name hay
  // alguna coincidencia con el string que puso el usuario dentro del input.
  // Al terminar de filtrar, guarda todos los objectos que hayan tenido coincidencia con lo que escribio el usuario
  // dentro de la variable elementosFiltrados
  elementosFiltrados = events.filter(names => names.name.toLowerCase().includes(e.target.value.toLowerCase()))
  // Aca vaciamos el contenedor de cards nuevamente, para no sobre-escribir ni acumular tarjetas a las que ya teniamos.
  // Es decir, lo vaciamos para poder mostrar nuevas tarjetas.
  cardsJs.innerHTML = ''
  // Aca simplemente por medio de la funcion notCoincidence, preguntamos si el array elementosfiltrados tiene elementos dentro
  // En caso de que no, es decir, que tenga 0 valores, es decir, que se cumpla la condicion del if de esta funcion, entonces
  // se ejecutará la funcion y mostrará en el HTML que no hubo coincidencias con la busqueda.
  notCoincidence(elementosFiltrados, cardsJs)

  // Aca, en base a lo filtrado, imprimirá por pantalla las coincidencias.
  // Dato curioso, si el usuario no ingresó nada, o borró lo que escribia
  // esto mostrará igualmente TODAS las tarjetas, ya que el filtro dejará pasar
  // a todas las tarjetas.
  imprimir(elementosFiltrados,cardsJs)
})

// CHECKBOXS...

// Aca guardamos dentro de la variable categorias, el mapeado que hicimos sobre events extrayendo unicamente la categoria de cada objeto del array de events.
// A ese mapeado, le hicimos un SET, para que todos los nombres repetidos, se eliminen.
// Luego lo re-convertimos en array, para tener un array y no un SET. Parecidos, pero no iguales.
let categorias = Array.from(new Set(events.map(objeto => objeto.category)))
// Luego con el forEach recorremos las categorias e imprimimos los checkbox con las categorias dinamicamente extraidas en el paso anterior dentro de su contenedor HTML.
categorias.forEach(nombreCategoria => {
  checkbox.innerHTML+=
    `
    <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
    <label class="form-check-label" for="flexSwitchCheckDefault">${nombreCategoria}</label>
    </div> 
    `
})



checkbox.addEventListener(`change`, e=>{
    
    if (e.target.checked) {
        let listChecked = []
        listChecked = events.filter(evento=> evento.category.toLowerCase().includes(e.target.checked))
        console.log(listChecked);
    }
})

// checksWCheck=[]
// document.addEventListener("change", e=>{
//   if(e.target.checked){
//    checksWCheck = checksWCheck.concat(events.filter(categorys.includes(e.target.checked)))
//   }if(!e.target.checked){

//   }else{

//   }
// })