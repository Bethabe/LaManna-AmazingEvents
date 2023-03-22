obtenerDatos();
categoriasSinRepetir = [];

async function obtenerDatos(){
    try{
        const url = "https://mindhub-xj03.onrender.com/api/amazing"
        const objeto  = await fetch(url);
        console.log(objeto);
        const objetoData = await objeto.json();
        console.log(objetoData);
        const dataEventos = objetoData.events;
        console.log(dataEventos);
        pintarTablaUno(dataEventos,"tabla-uno");
        categoriasSinRepetir = CategoriasSinRepetir(dataEventos);
        let arrayTablaDos  = listarGrupoCategorias(categoriasSinRepetir,dataEventos,"estimate");
        let arrayTablaTres = listarGrupoCategorias(categoriasSinRepetir,dataEventos,"assistance");
        pintarTabla(arrayTablaDos, "tabla-dos");
        pintarTabla(arrayTablaTres, "tabla-estadistica-pasados");
    }
    catch(error){
        throw(error);
    }
}

 function traerAsistencias(arrayDataApi){
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
    let maximo = Math.max(...porcentajes);
    let indiceMaximo =  porcentajes.indexOf(Math.max(...porcentajes));
    let nombreEventoMaximo = elementosAssitance[indiceMaximo].name;
    let result = [];
    result.push(nombreEventoMinimo,minimo, nombreEventoMaximo, maximo)
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

function pintarTablaUno(arrayDataApi, idTbody){
    let tBody = document.getElementById(idTbody)
    let arreglo =   arrayDataApi
    let filaTablaUno= document.createElement('tr');
    let menorAsistencia = traerAsistencias(arreglo);
    let menorCapacidad = traerEventoMayorCapacidad(arreglo);
    filaTablaUno.innerHTML=`<td>${menorAsistencia[2]} (${menorAsistencia[3]}%)</td>
                            <td>${menorAsistencia[0]} (${menorAsistencia[1]}%)</td>
                            <td>${menorCapacidad[0]} (${menorCapacidad[1]})</td>`

    tBody.appendChild(filaTablaUno);
}

function CategoriasSinRepetir(array){
    let arrayDataApi =  array;
    let categorias = arrayDataApi.map(elemento => elemento.category)
    let categoriasSinRepetir = categorias.filter((item,index)=>{
        return categorias.indexOf(item) === index;
    })
    return categoriasSinRepetir;
};

function listarGrupoCategorias(arregloCategorias, arrayDataApi, string){
                let arreglo =  arrayDataApi;
                let categorias =  arregloCategorias;
                let nuevoArregloFinal = []
                for (let x = 0; x < categorias.length; x++) {
                    let suma = 0;
                    let attendance = 0;
                    let contadorEventos = 0;
                        for (let index = 0; index < arreglo.length; index++) {
                            if(arreglo[index].category == categorias[x] && arreglo[index][string]){
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

function pintarTabla(arrayTabla,idTabla){
    let tBody = document.getElementById(idTabla);
    let array = arrayTabla; 
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
