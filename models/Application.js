
                
var Application = function(application){



    this.object                         = application.object;
    this.description                    = application.description;
    this.product                        = application.product;
    this.company                        = application.company;
    this.amount                         = application.amount;
    this.project                        = application.project;
    this.otherDocs                      = application.otherDocs;
    this.status                         = application.status ?? "active";
    this.dateCreated                    = application.dateCreated ?? new Date();
    
  };


  


module.exports = Application;