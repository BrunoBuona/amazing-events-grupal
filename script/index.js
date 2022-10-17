let cardsJs = document.getElementById("cards-js");
let buscador = document.getElementById("buscador")
let imprimir = events.forEach(e => {
  cardsJs.innerHTML += `
            <div class="card">
            <img src=${e.image} class="card-img-top" alt="Card">
            <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <a href="#" class="btn btn-primary">See more</a>
            </div>
  `;
});
let arrayNames = events.map((names) => names.name.toLowerCase())


let element = []
buscador.addEventListener("keyup", e => {
  elementFiltrados = arrayNames.filter(names => names.includes(e.target.value.toLowerCase()))
  cardsJs.innerHTML = ''
  elementFiltrados.forEach(e => {
    cardsJs.innerHTML += `
<div class="card">
<img src=${e.image} class="card-img-top" alt="Card">
<div class="card-body">
<h5 class="card-title">${e.name}</h5>
<p class="card-text">${e.description}</p>
<a href="#" class="btn btn-primary">See more</a>
</div>
`;
  });
})
// checksWCheck=[]
// document.addEventListener("change", e=>{
//   if(e.target.checked){
//    checksWCheck = checksWCheck.concat(events.filter(categorys.includes(e.target.checked)))
//   }if(!e.target.checked){

//   }else{

//   }
// })