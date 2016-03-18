/**
 * Author Allar
 * E-mail allarvendla@gmail.com
 * Version 1.1
 */


// Define global variables
var vehicles = []; // An array to hold vehicle objects
var selectElement;
// Define NAMESPACES, Classes and properties/methods
var UNIQUE = {
    ABSTRACT: {
        Vehicle: {
            setName: function(name) {this.name = name;},
            getName: function() {return this.name;},
            get seatsValue() {return this.seats;},
            set seatsValue(seats) {this.seats = seats;},
            get wheelsValue() {return this.wheels;},
            set wheelsValue(wheels) {this.wheels = wheels;}
        }
    },
    INSTANCES: {
        Car: {},
        Motorcycle: {}
    }
};

// When DOM is loaded inherit vehicle properties and populate vehicle type SELECT with OPTIONs
window.addEventListener("DOMContentLoaded", function() {
    selectElement = document.getElementById("vehicle-type");
    // For loop is used in case there are more instances of vehicles
    for (var i = 0; i < Object.keys(UNIQUE.INSTANCES).length; i++){
        var instance, option;

        instance = Object.keys(UNIQUE.INSTANCES)[i];
        UNIQUE.INSTANCES[instance] = Object.create(UNIQUE.ABSTRACT.Vehicle);

        // Populate SELECT with OPTIONs
        option = document.createElement("OPTION");
        option.value = instance;
        option.innerHTML = instance;
        selectElement.appendChild(option);
    }
});

// Create object
function createVehicle(name, type) {
    var seats, wheels, vehicle, vehicleIndex;

    if (name === "") {
        alert("Name was not inserted!");
        resetForm();
        return;
    } else if (type === "") {
        alert(("Type was not selected!"));
        return;
    }

    // Define the number of wheels and seats based on vehicle type
    switch(type) {
        case "Car": seats = 5; wheels = 4; break;
        case "Motorcycle": seats = 2; wheels = 2; break;
        default: seats = 1; wheels = 2; // Vehicle must have at least one seat for the driver and 2 wheels
    }
    // Create new vehicle object
    vehicle = Object.create(UNIQUE.INSTANCES[type]);
    vehicle.setName(name);
    vehicle.seatsValue = seats;
    vehicle.wheelsValue = wheels;
    vehicles.push(vehicle);
    vehicleIndex = vehicles.length - 1;
    createListItem(name, type, vehicleIndex);
}

// Create list item with vehicle name and info button
function createListItem(name, type, index){
    var li, span, spanText, button, buttonText;

    li = document.createElement("LI");
    span = document.createElement("SPAN");
    spanText = document.createTextNode(name+" ");
    span.appendChild(spanText);
    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Info");
    button.setAttribute("id", "button-nr-" + index );
    button.appendChild(buttonText);
    li.appendChild(span);
    li.appendChild(button);
    document.getElementById("vehicle-list").appendChild(li);
    document.getElementById("button-nr-" + index).addEventListener("click", function(){info(index, type);});
    resetForm();
}

// Info function that alerts the object values
function info(index, instanceType){
    var name = vehicles[index].getName();
    var seats = vehicles[index].seats;
    var wheels = vehicles[index].wheels;
    alert("The " + instanceType.toLowerCase() + " name is " + name +".\n" + name + " has " + seats + " seats and " +
        wheels + " wheels.");
}

// Reset fields after inserting new vehicle
function resetForm(){
    document.getElementById("vehicle-form").reset();
}