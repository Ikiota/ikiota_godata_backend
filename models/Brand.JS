var Brand = function(bland){
    this.name               = bland.name;
    this.description        = bland.description;
    this.type               = bland.type;
    this.poster             = bland.poster;
    this.status             = bland.status ?? "active";
    this.dateCreated        = bland.dateCreated ?? new Date();
    
  };
module.exports = Brand;