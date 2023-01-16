var Ad = function(ad){
    this.title               = ad.title;
    this.description        = ad.description;
    this.type               = ad.type;
    this.poster             = ad.poster;
    this.category           = ad.category;
    this.link               = ad.link;
    this.keyWords           = ad.keyWords;
    this.status             = ad.status ?? "valid";
    this.dateCreated        = ad.dateCreated ?? new Date();
    
  };
module.exports = Ad;


