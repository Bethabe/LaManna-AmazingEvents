const queryString = location.search;
console.log(queryString)
const params = new URLSearchParams(queryString);
console.log(params);
const id = params.get("id");
console.log(id);

const contenedor = document.getElementById("contenedor-cardDetail");

for(let elemento of data.events){
    if (elemento._id == id){

        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML= `<div class=" d-flex justify-content-end flex-row w-100 h-100">
                            <div class="d-flex align-items-center w-75">
                                <img src="${elemento.image}" class="img-fluid px-3" alt="${elemento.name}">
                            </div>
                            <div class="d-flex flex-column align-content-start mx-3">
                                <div class="card-body w-100 h-100">
                                    <div class="d-flex justify-content-between">
                                        <h5 class="card-title">${elemento.name}</h5>
                                        <p class="card-text">${elemento.date} </p>
                                    </div>
                                    <p class="card-text">${elemento.description}</p>
                                <div class="d-flex justify-content-between">
                                <div>
                                <h6>Category: </h6>
                                <p>${elemento.category}</p>     
                                </div> 
                                <div>
                                <h6>Place: </h6>
                                <p>${elemento.place}</p>    
                                </div>  
                                </div>
                                <div class="d-flex justify-content-between">
                                <div>
                                <h6>Capacity: </h6>
                                <p>${elemento.capacity}</p>    
                                </div>
                                <div>
                                <h6>${elemento.assistance?"Assistence":"Estimate"} </h6>
                                <p>${elemento.assistance?elemento.assistance:elemento.estimate}</p>    
                                </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                <div>
                                <h6>Price: </h6>
                                <p>$${elemento.price}</p>    
                                </div>
                                <div class="d-flex justify-content-end flex-wrap h-75">
                                <button height="10" id="regreso" href=""><svg xmlns="http://www.w3.org/2000/svg" style="color:black;"  width="40" height="20" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                </svg></button>
                                </div>
                                </div>
                                </div>
                                
                            </div>`
        contenedor.appendChild(div); 
    }     
}



 const btnVolver = document.getElementById('regreso');
 console.log(btnVolver);
 btnVolver.addEventListener('click', (e)=>{
    window.history.back();
 })


