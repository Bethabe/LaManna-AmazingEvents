let dataEventosApi = [];
dataEventosApi = obtenerDatos();
let selectoresTildados = [];
let arregloTexto = "";
let currentDate = obtenerCurrentDate();

async function obtenerCurrentDate(){
    try{
        const url = "https://mindhub-xj03.onrender.com/api/amazing"
        const objeto  = await fetch(url);
        console.log(objeto);
        const objetoData = await objeto.json();
        console.log(objetoData);
        const currentDate = objetoData.currentDate;
        return currentDate;
    }
    catch(error){
        throw(error);
    } 
}



async function obtenerDatos(){
    try{
        const url = "https://mindhub-xj03.onrender.com/api/amazing"
        const objeto  = await fetch(url);
        console.log(objeto);
        const objetoData = await objeto.json();
        console.log(objetoData);
        const dataEventos = objetoData.events;
        console.log(dataEventos);
        return dataEventos;
    }
    catch(error){
        throw(error);
    } 
}


async function mostrarTarjetas(arregloApi, idContenedor){
    arreglo = await arregloApi
    let fechaParametro = await currentDate
    let contenedorTarjetas = document.getElementById(idContenedor);
    contenedorTarjetas.innerHTML="";
    if(arreglo.length == 0){
        let div = document.createElement("div");
        div.innerHTML=`<p class="border border-2 p-3">The requested event was not found</p>`
        contenedorTarjetas.appendChild(div);
    }else{
        let fragmento = document.createDocumentFragment();
        for(let elemento of arreglo){
            if(elemento.date > fechaParametro){
                div = document.createElement("div");
                div.classList.add("card");
                div.innerHTML= `<div class="d-flex justify-content-center mt-3">
                        <img src="${elemento.image}" class="card-img-top" alt="${elemento.name}">
                        </div>
                        <div class="card-body">
                        <h5 class="card-title">${elemento.name}</h5>
                        <p class="card-text">${elemento.description}</p>
                        </div>
                        <div class="d-flex justify-content-between mx-2 flex-wrap">
                        <p class="align-self-center">Price: <strong>${"$"+ elemento.price}</strong></p>
                        <button>
                        <a href="./datails.html?id=${elemento._id}" class="text-decoration-none text-dark" >See more...</a>
                        </button>
                        </div>`
                fragmento.appendChild(div);
            }
        }
        contenedorTarjetas.appendChild(fragmento);
    }
}
mostrarTarjetas(dataEventosApi, 'tarjetas-inicio')

async function mostrarCategorias(arregloApi,idContenedor){
        let fragmento = document.createDocumentFragment();
        let contenedor = document.getElementById(idContenedor);
        let categoriasRepetidas = [];
        let categoriasSinRepetir = [];
        arreglo = await arregloApi;
        for(let elemento of arreglo){
            categoriasRepetidas.push(elemento.category);
        }
        console.log(categoriasRepetidas);
        categoriasSinRepetir = categoriasRepetidas.filter((item,index)=>{
            return categoriasRepetidas.indexOf(item) === index;
        })
        console.log(categoriasSinRepetir);

        for(let elemento of categoriasSinRepetir){
            div = document.createElement("div");
            div.innerHTML=`<label><input class="selectores me-1" type="checkbox" name="categoria" id=${elemento.replace(" ","")}>${elemento}</label>`
            fragmento.appendChild(div); 
        }
       return contenedor.appendChild(fragmento);
        }


async function seleccionarSelector(categorias){
    let contenedor = await categorias;
    // console.log(contenedor)
     selectorCategoria = document.querySelectorAll(".selectores")
     selectorCategoria.forEach(elemento => elemento.addEventListener('change', (e) =>{
     selectoresTildados = [...selectorCategoria].filter(x => x.checked).map(elemento => elemento.id)
   
    filtrosCruzados(dataEventosApi);
    }))


}
seleccionarSelector(mostrarCategorias(dataEventosApi, "contenedor-categorias"));

 async function filtroSelector(arregloSelectoresApi, arregloDatos){
    
        let arregloSelectores = await arregloSelectoresApi
        console.log(arregloSelectoresApi)
        let data = await arregloDatos
        console.log(data)
        console.log(arregloSelectores)
        if (arregloSelectores.length == 0) return data
        let nuevoArreglo = data.filter(elemento => arregloSelectores.includes(elemento.category.replace(" ", "")))
        return nuevoArreglo;
    }
// console.log(filtroSelector(seleccionarSelector(mostrarCategorias(dataEventosApi, "contenedor-categorias")), dataEventosApi));

 const input = document.getElementById("buscador");
 input.addEventListener("keyup", (e) =>{
 arregloTexto = input.value;
 console.log(arregloTexto);
 filtrosCruzados(dataEventosApi);
 }
 );
 async function filtroTexto(texto, arregloApi){
    let arrayObject = await arregloApi
     if(texto == "") return arrayObject;
     let newArray = arrayObject.filter(elem => 
     elem.name.toLowerCase().includes(texto.trim().toLowerCase()))
     return newArray
 }

  async function filtrosCruzados(arregloApi){
     arreglo = await arregloApi;
     let arregloPorSelectores = filtroSelector(selectoresTildados, arreglo);
     console.log(arregloPorSelectores);
     let filtroFinal = filtroTexto(arregloTexto, arregloPorSelectores);
     mostrarTarjetas(filtroFinal, "tarjetas-inicio")
  }
