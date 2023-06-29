var SubCategory = function(category){
    this.name               = category.name;
    this.category           = category.category;
    this.description        = category.description;
    this.poster             = category.poster;
    this.status             = category.status ?? "active";
    this.dateCreated        = category.dateCreated ?? new Date();
    
  };
module.exports = SubCategory;