async function obtenerDatos(){
    try{
        const url = " https://mindhub-xj03.onrender.com/api/amazing "
        const objeto  = await fetch(url);
        console.log(objeto);
        const objetoData = await objeto.json();
        console.log(objetoData);
        const dataEventos = objetoData.events;
        return dataEventos;
    }
    catch(error){
        throw(error);
    }
  
}
obtenerDatos();