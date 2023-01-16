var Store = function(store){
    this.name               = store.name;
    this.owner              = store.owner;
    this.locationLat        = store.locationLat;
    this.locationLng        = store.locationLng;
    this.poster             = store.poster;
    this.status             = store.status ?? "active";
    this.dateCreated        = store.dateCreated ?? new Date();
    
  };
module.exports = Store;