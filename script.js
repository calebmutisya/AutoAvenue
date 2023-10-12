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
            potential_buyers: [],
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
        Price(Ksh) :
        <p>${vehicle.price}</p>
        Mileage in KM:
        <p>${vehicle.mileage}</p>
        Engine Type:
        <p>${vehicle.engine}</p>
        CC :
        <p>${vehicle.cc}</p>
    </div>
    <div>
        <button onclick="updateBuyers('${vehicle.id}')" class="button-green">GET THIS RIDE</button>
        <button onclick="updateDetails('${vehicle.id}')" class="button-green">Edit</button>
        <button onclick="deleteVehicle('${vehicle.id}')" class="button-red">Delete</button>
        <div>
            <button onclick="fetchAndDisplayBuyers('${vehicle.id}')" class="button-green">POTENTIAL BUYERS</button>
        </div>
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
//Delete function
function deleteVehicle(id){
    fetch(`http://localhost:3000/vehicles/${id}`,{
    method:'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('Vehicle Deleted');
        } else {
            alert('Failed to delete the vehicle.');
        }
    })
};
//Edit details
function updateDetails(Id){
    fetch(`http://localhost:3000/vehicles/${Id}`)
    .then(response=> response.json())
    .then((data)=>{
        const editForm=document.getElementById('editForm')
        editForm.innerHTML=`
        <h5>Update Details:</h5>
        <div id="edit-car">
            <div>
                <input id="editModel" value="${data.model}" type="text" placeholder="Model Name"><br>
                <input id="editPrice" value="${data.price}" type="text" placeholder="Price in Ksh"><br>
                <input id="editEngine" value="${data.engine}" type="text" placeholder="Engine(Petrol,Diesel,Hybrid)"><br>
                <input id="editCC" value="${data.cc}"type="number" placeholder="CC"><br>
                <input id="editMileage" value="${data.mileage}" type="number" placeholder="Mileage in KM"><br>
                <input id="editImage" value="${data.image}" type="text" placeholder="Image Url"><br>
            </div>
            <div class="editB">
                <textarea id="editDescription"  placeholder="Description" cols="50" rows="5">${data.description}</textarea><br>
                <button onclick="update('${data.id}')" type="submit" class="button-green">SAVE</button>
                <button class="closeEdit-button">Close</button>

            </div>
        </div>
        `
        const closeButton = editForm.querySelector('.closeEdit-button');
        closeButton.addEventListener('click', () => {
            editForm.innerHTML=''; // Remove the form on close
        });
    })
}

function update(id){
    const model=document.getElementById('editModel').value;
    const price=document.getElementById('editPrice').value;
    const engine=document.getElementById('editEngine').value;
    const cc=document.getElementById('editCC').value;
    const mileage=document.getElementById('editMileage').value;
    const image=document.getElementById('editImage').value;
    const description=document.getElementById('editDescription').value;

    const updatedVehicle={
        model: model,
        price: price,
        engine: engine,
        cc: cc,
        mileage: mileage,
        image: image,
        description: description,
    };
    fetch(`http://localhost:3000/vehicles/${id}`,{
        method:'PATCH',
        body: JSON.stringify(updatedVehicle),
        headers:{
            'Content-Type':'application/json',
        },
        
    })
    .then(response=> response.json())
    .then((data)=>(alert('Vehicle Updated')));

}
//Bid for car function
function updateBuyers(carId) {
    // Check if the form already exists
    const existingForm = document.querySelector('#purchase-container form.buy-form');

    if (!existingForm) {
        fetch(`http://localhost:3000/vehicles/${carId}`)
            .then(response => response.json())
            .then((data) => {
                const purchaseSlot = document.getElementById('purchase-container');
                const buyForm = document.createElement('form');
                buyForm.classList.add('buy-form'); // Add a class to the form
                buyForm.innerHTML = `
                    <h5>Purchase Request Form</h5>
                    <p>${data.model}</p>
                    <input id="buyName" type="text" placeholder="Your Name"><br>
                    <input id="buyerContact" type="text" placeholder="Contact (email, phone):"><br>
                    <input id="buyerPrice" type="text" placeholder="Your Price"><br>
                    <p>Seller will contact you.<br/>
                        Close this form to make purchase<br/> request for another vehicle!!
                    </p>
                    
                    <button onclick=updateBuyerDetails('${data.id}') type="button" class="button-green">SEND REQUEST</button>
                    <button class="close-button">Close</button>
                    <br>
                `;
                purchaseSlot.appendChild(buyForm);

                //Close button
                const closeButton = buyForm.querySelector('.close-button');
                closeButton.addEventListener('click', () => {
                    purchaseSlot.removeChild(buyForm); // Remove the form on close
                });

            });
    }
}


function updateBuyerDetails(carId){
    // Get the form input values
    const name = document.getElementById('buyName').value;
    const contact = document.getElementById('buyerContact').value;
    const price = parseFloat(document.getElementById('buyerPrice').value);

    // Create the new buyer object
    const newBuyer = {
        name: name,
        contact_information: contact,
        price: price,
    };

    // Fetch the vehicle data
    fetch(`http://localhost:3000/vehicles/${carId}`)
        .then((response) => response.json())
        .then((data) => {
            // Add the new buyer to the existing list of potential buyers
            data.potential_buyers.push(newBuyer);

            // Send a PATCH request to update the vehicle data
            fetch(`http://localhost:3000/vehicles/${carId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((newData) => {
                    // Handle the response data or update your UI as needed
                    alert('Bid posted successfully')
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                });
        });
};
//Display potential buyers
// Function to fetch and display potential buyers for a specific vehicle
function fetchAndDisplayBuyers(vehicleId) {
    fetch(`http://localhost:3000/vehicles/${vehicleId}`)
      .then((response) => response.json())
      .then((data) => {

        const bidList = document.getElementById("bidList");
        bidList.innerHTML = `
        <p>${data.model} Potential Buyers<button onclick="clearBidList();" class="button-red">Close</button>
        </p>
        `
  
        // Create an unordered list to display buyers
        const ul = document.createElement("ul");
  
        // Loop through potential buyers and create list items
        data.potential_buyers.forEach((buyer) => {
        const li = document.createElement("li");
        li.textContent = `Name: ${buyer.name}, Contact: ${buyer.contact_information}, Price: Ksh ${buyer.price.toLocaleString()}`;
        ul.appendChild(li);
        });
  
        // Append the list to the bidList element
        bidList.appendChild(ul);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
}
//Close button for Bid List
function clearBidList() {
    const bidList = document.getElementById("bidList");
    bidList.innerHTML = "";
}

  

