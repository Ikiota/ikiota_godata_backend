//Buyer object create
var Driver = function(driver){
    this.firstName      = driver.firstName;
    this.otherNames     = driver.otherNames;
    this.phone          = driver.phone;
    this.email          = driver.email;
    this.password       = driver.password;
    this.profile        = driver.profile;
    this.service        = driver.service;
    this.vehicle        = driver.vehicle;
    this.numberPlate    = driver.numberPlate;
    this.status         = driver.status ?? "active";
    this.dateCreated    = driver.dateCreated ?? new Date();
    
  };
module.exports = Driver;