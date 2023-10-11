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
              <button onclick="fetchDetails('${vehicle.id}')" class="button-green">See More</button>
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
function fetchDetails(vehiclesId){
    return fetch(`http://localhost:3000/vehicles/${vehiclesId}`)
        .then(response=> response.json())
        .then(data => {displayVehicleDetails(data);
        })
}
//DisplayVehicleDetails
function displayVehicleDetails(vehicle){
    const detailsSection= document.getElementById('details-container');
    const image = document.createElement('img');
    image.src = vehicle.image;
    image.alt = 'Loading ..';
    const details= document.createElement('div');
    details.innerHTML=`
    <h5>${vehicle.model}</h5>
    <div class="main-details">
        Price :
        <p>${vehicle.price}</p>
        Mileage in KM:
        <p>${vehicle.mileage}</p>
        Engine Type:
        <p>${vehicle.engine}</p>
        CC :
        <p>${vehicle.cc}</p>
    </div>
    <div>
        <button class="button-green">BID</button>
        <button class="button-green">Edit</button>
        <button class="button-red">Delete</button>
    </div>
    
    `
    const specs= document.createElement('section')
    specs.innerHTML=`
    <h6>Description :</h6>
    <p class="main-description">${vehicle.description}</p>
    `

    detailsSection.innerHTML = '';

    detailsSection.appendChild(image);
    detailsSection.appendChild(details);
    detailsSection.appendChild(specs);

}


