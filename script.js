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
              <button class="button">See More</button>
            </div>
          </div>
        `
        carList.appendChild(singleVehicle); 
        
        

    });
}
