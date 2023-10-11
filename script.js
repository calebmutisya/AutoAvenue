//Fetch vehicles from database
document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://localhost:3000/vehicles')
    .then(response=> response.json())
    .then(data=> {displayVehicles(data);})
});
//Display vehicles
function displayVehicles(vehicles){
    const carList= document.getElementById('carList');
    vehicles.forEach((vehicle)=>{
        const singleVehicle= document.createElement('div')
        singleVehicle.innerHTML=`
        <div class="display-card">
            <img id="cardImage"  src="${vehicle.image}" class="card-img" alt="Loading...">
            <div class="card-bottom">
              <h5 id="cardTitle" class="card-title">${vehicle.model}</h5>
              </br>
              Price in Ksh:
              <p id="cardPrice" class="card-text">${vehicle.price}</p>
              Mileage(KM):
              <p id="cardMileage" class="card-text">${vehicle.mileage}</p>
              Engine Type:
              <p id="cardEngine" class="card-text">${vehicle.engine}</p>
              <button onclick="displayDetails(${vehicle.id})" class="button-green">See More</button>
            </div>
          </div>
        `
        carList.appendChild(singleVehicle); 
    });
}
//Add Car to List of Vehicles
document.addEventListener('DOMContentLoaded',()=>{
    const carForm= document.getElementById('new-car');
    carForm.addEventListener('submit',(event)=>{
        event.preventDefault();

        const Model= document.getElementById('newModel').value;
        const Price= document.getElementById('newPrice').value;
        const Engine= document.getElementById('newEngine').value;
        const cc= document.getElementById('newCC').value;
        const Mileage= document.getElementById('newMileage').value;
        const Image= document.getElementById('newImage').value;
        const Description= document.getElementById('newDescription').value;

        const newCar={
            model: Model,
            price: Price,
            engine: Engine,
            cc: cc,
            mileage: Mileage,
            image: Image,
            description: Description,
        };

        fetch(`http://localhost:3000/vehicles`,{
            method:'POST',
            body: JSON.stringify(newCar),
            headers:{
                'Content-Type':'application/json',
            },
            
        })
        .then(response=> response.json())
        .then((data)=>(alert('Car On Sale')));
    });
})

//FetchDisplayDetails
function displayDetails(vehiclesId){
    return fetch(`http://localhost:3000/vehicles/${vehiclesId}`)
        .then(response=> response.json())
        .then(data => {displayVehicleDetails(data);
        })
}
//DisplayVehicleDetails
function displayVehicleDetails(vehicle){
    const detailsSection= document.getElementByClass('car-specs');
    detailsSection.innerHTML=`
    <img class="main-img" src="${vehicle.image}" alt="Loading ..">
          <div class="details-section">
            <h5>${vehicle.model}</h5>
            <div class="main-details ">
              <p>${vehicle.price}</p>
              <p>${vehicle.mileage}</p>
              <p>${vehicle.engine}</p>
              <p>${vehicle.cc}</p>
            </div  >
            <div>
              <button class="button-green">BID</button>
              <button class="button-green">Edit</button>
              <button class="button-red">Delete</button>
            </div>
            <h6>Description :</h6>
            <p class="main-description">${vehicle.description}</p>

          </div>
    `


}

