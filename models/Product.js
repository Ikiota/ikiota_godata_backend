
var Product = function(product){



    this.name                       = product.name;
    this.description                = product.description;
    this.type                       = product.type;
    this.sector                     = product.sector;
    this.valueMin                   = product.valueMin;
    this.valueMax                   = product.valueMax;
    this.maturity                   = product.maturity;
    this.warranty                   = product.warranty;
    this.provider                   = product.provider;
    this.cover                      = product.cover;
    this.status                     = product.status ?? "active";
    this.dateCreated                = product.dateCreated ?? new Date();
    
  };


  


module.exports = Product;