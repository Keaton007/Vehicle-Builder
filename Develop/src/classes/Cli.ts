// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import { parse } from "path";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          answers.topSpeed.toString(),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          answers.topSpeed.toString(),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers) => {
        const frontWheel = new Wheel(answers.frontWheelBrand, answers.frontWheelDiameter.toString());
        const rearWheel = new Wheel(answers.rearWheelBrand, answers.rearWheelDiameter.toString());
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [frontWheel, rearWheel]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then((answers) => {
        const selectedVehicle = answers.vehicleToTow;
        if (selectedVehicle === truck) {
          console.log('You cannot tow the truck itself');
        } else if (selectedVehicle.weight <= truck.towingCapacity) {
          truck.tow(selectedVehicle);
        }
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action',
        choices: [
          'Print details',
          'Start vehicle',
          'Accelerate 5 MPH',
          'Decelerate 5 MPH',
          'Stop vehicle',
          'Turn right',
          'Turn left',
          'Tow',
          'Wheelie',
          'Reverse',
          'Select or create another vehicle',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      // perform the selected action
      if (answers.action === 'Print details') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].printDetails();
          }
        }
      } else if (answers.action === 'Start vehicle') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].start();
          }
        }
      } else if (answers.action === 'Accelerate 5 MPH') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].accelerate(5);
          }
        }
      } else if (answers.action === 'Decelerate 5 MPH') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].decelerate(5);
          }
        }
      } else if (answers.action === 'Stop vehicle') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].stop();
          }
        }
      } else if (answers.action === 'Turn right') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].turn('right');
          }
        }
      } else if (answers.action === 'Turn left') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].turn('left');
          }
        }
      } else if (answers.action === 'Tow') {
        const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
        if (selectedVehicle instanceof Truck) {
          this.findVehicleToTow(selectedVehicle);
          return;
        } else {
          console.log('Only Trucks can tow other vehicles');
        }
      } else if (answers.action === 'Wheelie') {
        const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
        if (selectedVehicle instanceof Motorbike) {
          selectedVehicle.wheelie();
        } else {
          console.log('Only Motorbikes can perform a wheelie');
        }
      } else if (answers.action === 'Reverse') {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            this.vehicles[i].reverse();
          }
        }
      } else if (answers.action === 'Select or create another vehicle') {
        // This option starts the CLI again and should not call performActions
        this.startCli();
        return; // return early to prevent the next cycle
      } else {
        // "Exit" selected
        this.exit = true;
      }

      // Only call performActions again if the user did not exit or create another vehicle
      if (!this.exit) {
        this.performActions();
      }
    });
}


  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
