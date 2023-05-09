
var PublicMessages = function(message){
    this.name                 = message.name;
    this.phone                = message.phone;
    this.email                = message.email;
    this.subject              = message.subject;
    this.description          = message.description;
    this.files                = message.files;
    this.lastUpdate           = message.lastUpdate ?? new Date();
    this.status               = message.status ?? "pending";
    this.dateCreated          = message.dateCreated ?? new Date();
    
  };
module.exports = PublicMessages;