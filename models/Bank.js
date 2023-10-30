



var Bank = function(bank){



    this.name                       = bank.name;
    this.description                = bank.description;
    this.type                       = bank.type;
    this.creator                    = bank.creator;
    this.logo                       = bank.logo;
    this.status                     = bank.status ?? "active";
    this.dateCreated                = bank.dateCreated ?? new Date();
    
  };


  


module.exports = Bank;