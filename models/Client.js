
var Client = function(client){
    this.name      = client.name;
    this.phone          = client.phone;
    this.email          = client.email;
    this.password       = client.password;
    this.profile        = client.profile;
    this.company        = client.company;
    this.location       =client.location;
    this.status         = client.status ?? "active";
    this.dateCreated    = client.dateCreated ?? new Date();
    
  };


  


module.exports = Client;