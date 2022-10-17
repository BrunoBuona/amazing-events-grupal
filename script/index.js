/* EN ESTOS CONTENEDORES GUARDAMOS LOS CONTENEDORES DE HTML
PARA LUEGO MANIPULARLOS EN LOS MOMENTOS REQUERIDOS */
let cardsJs = document.getElementById("cards-js");
let buscador = document.getElementById("buscador")
let checkbox = document.getElementById("category-js")



// Esta funcion toma un array y un contenedor de DOM, para imprimir en pantalla los resultados.
function imprimir (array,contenedor){

    array.forEach (e => {contenedor.innerHTML += // Esto previene que el contenido se sobre-escriba, en cambio, las acumula en el contenedor correspondiente.
            `
            <div class="card">
            <img src=${e.image} class="card-img-top" alt="Card">
            <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <a href="#" class="btn btn-primary">See more</a>
            </div>
             `
})
};
imprimir(events,cardsJs) // Mediante esta funcion invocamos la impresion de todas las cards dentro del contenedor CardJS para que al cargar la pagina, ya esten renderizadas.

function notCoincidence(array, contenedor){ // Esta funcion busca si no hay coincidencias con la barra de busqueda y el array correspondiente. En caos de no haberlas, imprimirá en pantalla un H2 advirtiendo que no hay coincidencias.
  if(array <= 0){
    contenedor.innerHTML= // Lo ponemos asi porque queremos que sobre-escriba cualquier posible contenido.
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
  checkbox.innerHTML+= //Esto solo imprime el nombre de las categorias. Les asignamos tambien un ID para poder manipularlo luego en la logica de los checkbox.
    ` 
    <div class="form-check form-switch">
    <input class="form-check-input" id="${nombreCategoria}" type="checkbox" role="switch" id="flexSwitchCheckDefault">
    <label class="form-check-label" for="flexSwitchCheckDefault">${nombreCategoria}</label>
    </div> 
    `
})


let listChecked = [] // Guardamos acá, los filtros recolectados por medio del estado de los checkbox.

//Aca indicamos el contenedor al que le agregamos el evento (checkbox). Esto lo declaramos mas arriba del archivo, en la categoria // DOM.
checkbox.addEventListener(`change`, e=>{ // Aca indicamos que cada vez que el estado de un checkbox cambie (change), sucederá algo. Guardamos los
  // cambios de los eventos en el parametro "e".
    if (e.target.checked) { // Esto indica que cuando el evento este checked (tildado), ejecutará las instrucciones dentro de las llaves.
        listChecked = listChecked.concat(events.filter(evento=> evento.category.toLowerCase().includes(e.target.id.toLowerCase())))
        // Contenedor de Array = Unificamos cada coincidencia con el concat, si no ponemos el concat, se sobre-escribirá en cada vuelta.
        // El filter agarra el parametro evento, que es un objeto, que a su vez es un objeto iterado en el array de events. Este objeto sirve como parametro
        // del cual en cada vuelta, solo extraemos  la categoria EN MINUSCULA y buscamos si hay una coincidencia con el ID del checkbox (tambien en minuscula)
        // y los nombres de las categorias recorridas en events.
        console.log(listChecked); // Este console.log es simplemente para verificar si se estan añadiendo bien al contenedor, los respectivos filtros.
        cardsJs.innerHTML = '' // Esto es para que en cada cambio del evento (cada vez que checkeas) se limpie el contenedor de las tarjetas para asi poder
        // imprimir y sobre-escribir la informacion que se habia mostrado antes. Si no hacemos esto, se acumularán con las cards que imprimimos al inicio.
        imprimir(listChecked, cardsJs) // Finalmente le indicamos que queremos que imprima el array filtrado (listChecked) dentro del contenedor de las cards (cardsJs)
    }

   else if(!e.target.checked){ // Acá, al negar el checked, basicamente indicamos que cuando el evento sea "descheckear", sucederán las instrucciones correspondientes.
    listChecked = listChecked.filter(evento => !evento.category.toLowerCase().includes( e.target.id.toLowerCase() ) )
    //Volvemos a chequear los objetos guardados en ListChecked. En base a esos elementos, filtramos solamente los que no coincidan con el ID del checkbox que se acaba de des-tildar. Hacemos esto, principalmente para ahorrar tiempo. Tambien podria simplemente sacarse los que coincidan con el ID del checkbox, pero no sabiamos hacerlo.
    // Por lo que, en resumen, si hay alguna coincidencia entre las categorias de listChecked y el ID del checkbox, entonces se ignorarán. Ya que el algoritmo solo
    // añadirá a ListChecked, aquellos elementos que NO coincidan con el ID del checkbox DESTILDADO.
    cardsJs.innerHTML = '' // Volvemos a limpiar la pagina para re-imprimir solamente las tarjetas de los checkbox que siguen tildados.
    imprimir(listChecked, cardsJs) //Re-imprimimos las cards.
    }

    if (listChecked.length === 0){ // Si la longitud del array que contiene el filtro es igual a 0, se imprimirán TODAS las cards nuevamente.
      imprimir(events,cardsJs) //Re-imprimimos las cards.
      }
    }
)


