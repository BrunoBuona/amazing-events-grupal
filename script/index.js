let cardsJs = document.getElementById("cards-js");
let buscador = document.getElementById("buscador")
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
  // Aca, en base a lo filtrado, imprimirá por pantalla las coincidencias.
  // Dato curioso, si el usuario no ingresó nada, o borró lo que escribia
  // esto mostrará igualmente TODAS las tarjetas, ya que el filtro dejará pasar
  // a todas las tarjetas.
  imprimir(elementosFiltrados,cardsJs)
})

// CHECKBOXS...



// checksWCheck=[]
// document.addEventListener("change", e=>{
//   if(e.target.checked){
//    checksWCheck = checksWCheck.concat(events.filter(categorys.includes(e.target.checked)))
//   }if(!e.target.checked){

//   }else{

//   }
// })