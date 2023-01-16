var Supplier = function(supplier){
    this.surName        = supplier.surName;
    this.otherNames     = supplier.otherNames;
    this.phone          = supplier.phone;
    this.email          = supplier.email;
    this.password       = supplier.password;
    this.profile        = supplier.profile;
    this.status         = supplier.status ?? "active";
    this.dateCreated    = supplier.dateCreated ?? new Date();
    
  };
module.exports = Supplier;