
let fragmento = document.createDocumentFragment();
for(let elemento of data.events){
div = document.createElement("div");
div.classList.add("card");
div.innerHTML= `<div class="d-flex justify-content-center mt-3">
<img src="${elemento.image}" class="card-img-top" alt="...">
</div>
<div class="card-body">
<h5 class="card-title">${elemento.name}</h5>
<p class="card-text">${elemento.description}</p>
</div>
<div class="d-flex justify-content-between mx-2 flex-wrap">
<p class="align-self-center">Price: <strong>${"$"+ elemento.price}</strong></p>
<button class="border border-2 mb-2 pr-2" id="btn-tarjetas" style="box-shadow: -8px -8px 10px 0 rgba(128, 128, 128, 0.548); ><a href="#" class="text-decoration-none text-dark" >See more...</a></<button type=""></button>
</div>`
fragmento.appendChild(div);
}
let contenedorTarjetas = document.getElementById("tarjetas-inicio");
contenedorTarjetas.appendChild(fragmento);