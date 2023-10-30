
var User = function(user){
    this.name           = user.name;
    this.phone          = user.phone;
    this.email          = user.email;
    this.password       = user.password;
    this.profile        = user.profile;
    this.company        = user.company;
    this.type           = user.type
    this.location       = user.location;
    this.status         = user.status ?? "active";
    this.dateCreated    = user.dateCreated ?? new Date();
    
  };


  


module.exports = User;