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
            if(elemento.date < fechaParametro){
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
    //  return selectoresTildados;
    // console.log(filtroSelector(selectoresTildados,dataEventosApi));
    // return selectoresTildados;
    filtrosCruzados(dataEventosApi);
    }))
//    console.log(selectorCategoria);
// return selectoresTildados;
    // console.log(selectoresTildados);

}
seleccionarSelector(mostrarCategorias(dataEventosApi, "contenedor-categorias"));
//el problema que encontré es que no está llegando la informacion de los selectores tildado a la funcion filtro selector.
//hay un problema al haber encapsulado la funcion del evento change con seleccionar selector
// seleccionarSelector((mostrarCategorias(dataEventosApi, "contenedor-categorias")));
// let filtrosSeleccionadosApi = seleccionarSelector(mostrarCategorias(dataEventosApi, "contenedor-categorias"));
// console.log(filtrosSeleccionadosApi);


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


// let selectoresTildados = [];
// let arregloTexto = "";


// function mostrarTarjetas(arreglo, idContenedor){
//     let contenedorTarjetas = document.getElementById(idContenedor);
//     contenedorTarjetas.innerHTML="";
//     if(arreglo.length == 0){
//         let div = document.createElement("div");
//         div.innerHTML=`<p class="border border-2 p-3">No se encontró el evento solicitado</p>`
//         contenedorTarjetas.appendChild(div);
//     }else{
//         let fragmento = document.createDocumentFragment();
//         for(let elemento of arreglo){
//             if(elemento.date < data.currentDate){
//                     div = document.createElement("div");
//                     div.classList.add("card");
//                     div.innerHTML= `<div class="d-flex justify-content-center mt-3">
//                             <img src="${elemento.image}" class="card-img-top" alt="...">
//                             </div>
//                             <div class="card-body">
//                             <h5 class="card-title">${elemento.name}</h5>
//                             <p class="card-text">${elemento.description}</p>
//                             </div>
//                             <div class="d-flex justify-content-between mx-2 flex-wrap">
//                             <p class="align-self-center">Price: <strong>${"$"+ elemento.price}</strong></p>
//                             <button>
//                             <a href="./datails.html?id=${elemento._id}" class="text-decoration-none text-dark" >See more...</a>
//                             </button>
//                             </div>`
//                     fragmento.appendChild(div);
//                 }
                
//             }
//             contenedorTarjetas.appendChild(fragmento);
//     }
// }

// mostrarTarjetas(data.events, 'tarjetas-inicio')

// {
// let fragmento = document.createDocumentFragment();
// let contenedor = document.getElementById("contenedor-categorias");
// let categoriasRepetidas = [];
// let categoriasSinRepetir = []
// for(let elemento of data.events){
//     categoriasRepetidas.push(elemento.category);
// }
// console.log(categoriasRepetidas);
// categoriasSinRepetir = categoriasRepetidas.filter((item,index)=>{
//     return categoriasRepetidas.indexOf(item) === index;
// })
// console.log(categoriasSinRepetir);

// for(let elemento of categoriasSinRepetir){
//     div = document.createElement("div");
//     div.innerHTML=`<label><input class="selectores me-1" type="checkbox" name="categoria" id=${elemento.replace(" ","")}>${elemento}</label>`
//     fragmento.appendChild(div); 
// }
// console.log(fragmento);
// contenedor.appendChild(fragmento);
// }

// const selectorCategoria = document.querySelectorAll(".selectores")
// selectorCategoria.forEach(elemento => elemento.addEventListener('change', (e) =>{
// selectoresTildados = [...selectorCategoria].filter(x => x.checked).map(elemento => elemento.id)
// console.log(selectoresTildados);
// filtrosCruzados(data.events);

// }))
// console.log(selectorCategoria);

// function filtroSelector(arregloSelectores, arregloDatos){
//     if (arregloSelectores.length == 0) return arregloDatos
//     let nuevoArreglo = arregloDatos.filter(elemento => arregloSelectores.includes(elemento.category.replace(" ", "")))
//     return nuevoArreglo;

// }
// const input = document.getElementById("buscador");
// input.addEventListener("keyup", (e) =>{
// arregloTexto = input.value;
// // console.log(arregloTexto);
// filtrosCruzados(data.events);
// }
// );
// function filtroTexto(texto, arrayObject){
//     if(texto == "") return arrayObject;
//     let newArray = arrayObject.filter(elem => 
//     elem.name.toLowerCase().includes(texto.trim().toLowerCase()))
//     return newArray
// }

//  function filtrosCruzados(arreglo){
//     let arregloPorSelectores = filtroSelector(selectoresTildados, arreglo);
//     console.log(arregloPorSelectores);
//     let filtroFinal = filtroTexto(arregloTexto, arregloPorSelectores);
//     mostrarTarjetas(filtroFinal, "tarjetas-inicio")
//  };
// // let fragmento = document.createDocumentFragment();
// // for(let elemento of data.events){
// //     if(elemento.date < data.currentDate){
// // div = document.createElement("div");
// // div.classList.add("card");
// // div.innerHTML= `<div class="d-flex justify-content-center mt-3">
// // <img src="${elemento.image}" class="card-img-top" alt="...">
// // </div>
// // <div class="card-body">
// // <h5 class="card-title">${elemento.name}</h5>
// // <p class="card-text">${elemento.description}</p>
// // </div>
// // <div class="d-flex justify-content-between mx-2 flex-wrap">
// // <p class="align-self-center">Price: <strong>${"$"+ elemento.price}</strong></p>
// // <button class="border border-2 mb-2 pr-2" id="btn-tarjetas" style="box-shadow: -8px -8px 10px 0 rgba(128, 128, 128, 0.548); ><a href="#" class="text-decoration-none text-dark">See more...</a></button>
// // </div>`
// // fragmento.appendChild(div);
// // }
// // }
// // let contenedorTarjetas = document.getElementById("tarjetas-inicio");
// // contenedorTarjetas.appendChild(fragmento)