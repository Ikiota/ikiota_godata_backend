

        var Address = function(address){
            this.userID         = address.userID;
            this.label          = address.label;
            this.contactName    = address.contactName;
            this.contactPhone   = address.contactPhone;
            this.place          = address.place;
            this.latitude       = address.latitude;
            this.longitude      = address.longitude;
            this.status         = address.status ?? "active";
            this.dateCreated    = address.dateCreated ?? new Date();
            
          };
        module.exports = Address;