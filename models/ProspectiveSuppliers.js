



var ProspectiveSuppliers = function(prospect){
    this.firstName               = prospect.firstName;
    this.lastName                = prospect.lastName;
    this.phone                   = prospect.phone;
    this.email                   = prospect.email;
    this.category                = prospect.category;
    this.company                 = prospect.company;
    this.product                 = prospect.product;
    this.description             = prospect.description;
    this.status                  = prospect.status ?? "Pending";
    this.dateCreated             = prospect.dateCreated ?? new Date()

   




    
    
  };
module.exports = ProspectiveSuppliers;