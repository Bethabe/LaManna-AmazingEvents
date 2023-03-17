let dataEventosApi = obtenerDatos();
let categoriasSinRepetir = CategoriasSinRepetir(dataEventosApi)
// let gruposCategorias = listarGrupoCategorias(dataEventosApi)
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

 function traerMayorAsistencia(arrayDataApi){
        let sum = 0;
        arreglo = arrayDataApi
        let porcentajes = []
        let valores = []
        const elementosAssitance =  arreglo.filter(elemento => elemento.assistance)
        console.log(elementosAssitance);
        for(elemento of elementosAssitance){
            porcentajes.push(Math.round((elemento.assistance/elemento.capacity) *100))
        }
        let maximo = Math.max(...porcentajes);
        let indiceMaximo =  porcentajes.indexOf(Math.max(...porcentajes));
        let nombreEventoMaximo = elementosAssitance[indiceMaximo].name;
        let resultado = [];
        resultado.push(nombreEventoMaximo, maximo)
        return resultado;
        console.log(indiceMaximo)
        console.log(valores)
        console.log(sum)
        console.log(porcentajes)
        console.log(maximo);
        console.log(nombreEventoMaximo)
}

 function traerMenorAsistencia(arrayDataApi){
    let sum = 0;
    arreglo = arrayDataApi
    let porcentajes = []
    const elementosAssitance =  arreglo.filter(elemento => elemento.assistance)
    console.log(elementosAssitance);
    for(elemento of elementosAssitance){
        porcentajes.push(Math.round((elemento.assistance/elemento.capacity) *100))
    }
    let minimo = Math.min(...porcentajes);
    let indiceMinimo =  porcentajes.indexOf(Math.min(...porcentajes));
    let nombreEventoMinimo = elementosAssitance[indiceMinimo].name;
    let result = [];
    result.push(nombreEventoMinimo,minimo)
    return result
}
function traerEventoMayorCapacidad(arregloDatosApi){
arreglo =  arregloDatosApi;
let mayorCapacidad = (Math.max(...arreglo.map(elemento => elemento.capacity)))
let indiceMayorCapacidad = (arreglo.map(elemento => elemento.capacity)).indexOf(mayorCapacidad)
let eventoMayorCapacidad = arreglo[indiceMayorCapacidad].name;
let resultado = []
resultado.push(eventoMayorCapacidad, mayorCapacidad)
return resultado;

}
// traerEventoMayorCapacidad(dataEventosApi);

async function pintarTablaUno(arrayDataApi, idTbody){
        let tBody = document.getElementById(idTbody)
        let arreglo =  await arrayDataApi
        let filaTablaUno= document.createElement('tr');
        let mayorAsistencia = traerMayorAsistencia(arreglo);
        let menorAsistencia = traerMenorAsistencia(arreglo);
        let menorCapacidad = traerEventoMayorCapacidad(arreglo);
        filaTablaUno.innerHTML=`<td>${mayorAsistencia[0]} (${mayorAsistencia[1]}%)</td>
                                <td>${menorAsistencia[0]} (${menorAsistencia[1]}%)</td>
                                <td>${menorCapacidad[0]} (${menorCapacidad[1]})</td>`

        tBody.appendChild(filaTablaUno);
}
pintarTablaUno(dataEventosApi,"tabla-uno")

 async function CategoriasSinRepetir(array){
    let arrayDataApi = await array;
    let categorias = arrayDataApi.map(elemento => elemento.category)
    let categoriasSinRepetir = categorias.filter((item,index)=>{
        return categorias.indexOf(item) === index;
    })
    return categoriasSinRepetir;
};
let arrayTablaDos  = listarGrupoCategorias(categoriasSinRepetir,dataEventosApi,"estimate")
let arrayTablaTres = listarGrupoCategorias(categoriasSinRepetir,dataEventosApi,"assistance")
async function listarGrupoCategorias(arregloCategorias, arrayDataApi, string){
                let arreglo = await arrayDataApi;
                let categorias = await arregloCategorias;
                let nuevoArregloFinal = []
                console.log(categorias)
                for (let x = 0; x < categorias.length; x++) {
                let suma = 0;
                let attendance = 0;
                let contadorEventos = 0;
                for (let index = 0; index < arreglo.length; index++) {
                    if (arreglo[index].category == categorias[x] && arreglo[index][string]){
                    suma += arreglo[index].price*(arreglo[index][string]) 
                    attendance +=  (arreglo[index][string]/arreglo[index].capacity)*100
                        contadorEventos ++
                    }
                }
                let nuevoArreglo = [categorias[x], suma, (attendance/contadorEventos).toFixed(2)]
                nuevoArregloFinal.push(nuevoArreglo);
                }

              return nuevoArregloFinal
}

 async function pintarTabla(arrayTabla,idTabla){
    let tBody = document.getElementById(idTabla);
    let array = await arrayTabla; 
    console.log(array)
    let template = ""; 
    for(elemento of array){
        if(elemento[1] != 0){
            template += `<tr>
                        <td>${elemento[0]}</td>
                        <td>${elemento[1]}</td>
                        <td>${elemento[2]} %</td> 
                        </tr>`
             
        }
    
    }
    tBody.innerHTML = template;
}
pintarTabla(arrayTablaDos, "tabla-dos");
pintarTabla(arrayTablaTres, "tabla-estadistica-pasados");