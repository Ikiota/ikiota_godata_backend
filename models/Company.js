
var Company = function(company){

    this.raisonSociale                          = company.raisonSociale;
    this.sigle                                  = company.sigle;
    this.formeJuridique                         = company.formeJuridique;
    this.logo                                   = company.logo;
    this.statutsOrganigramme                    = company.statutsOrganigramme;
    this.dateCreation                           = company.dateCreation;
    this.dateDebutTravaux                       = company.dateDebutTravaux;
    this.dateAutorisation                       = company.dateAutorisation;
    this.autorisationOuverture                  = company.autorisationOuverture;
    this.activitePrincipale                     = company.activitePrincipale;
    this.activiteSecondaire                     = company.activiteSecondaire;
    this.capital                                = company.capital;
    this.actionaires                            = company.actionaires;
    this.cvActionnaireMajoritaire               = company.cvActionnaireMajoritaire;
    this.activiteActionnaireMajoritaire         = company.activiteActionnaireMajoritaire;
    this.numeroRccm                             = company.numeroRccm;
    this.dateRccm                               = company.dateRccm;
    this.placeRccm                              = company.placeRccm;
    this.rccmDocument                           = company.rccmDocument;
    this.numeroIdNat                            = company.numeroIdNat;
    this.dateIdNat                              = company.dateIdNat;
    this.placeIdNat                             = company.placeIdNat;
    this.idNatDocument                          = company.idNatDocument;
    this.numeroImpot                            = company.numeroImpot;
    this.dateNumeroImpot                        = company.dateNumeroImpot;
    this.placeNumeroImpot                       = company.placeNumeroImpot;
    this.numeroImpotDocument                    = company.numeroImpotDocument;
    this.attestationFiscaleDocument             = company.attestationFiscaleDocument;
    this.siegeSocial                            = company.siegeSocial;
    this.natureSiegeSocial                      = company.natureSiegeSocial;
    this.siegeExploitation                      = company.siegeExploitation;
    this.natureSiegeExploitation                = company.natureSiegeExploitation;
    this.contacts                               = company.contacts;
    this.referencesBancaires                    = company.referencesBancaires;
    this.manager                                = company.manager;
    this.patrimoines                            = company.patrimoines;
    this.stocks                                 = company.stocks;
    this.difficultes                            = company.difficultes;
    this.personnels                             = company.personnels;
    this.perspectives                           = company.perspectives;
    this.activitesSousTraitees                  = company.activitesSousTraitees;
    this.etatsFinanciers                        = company.etatsFinanciers;
    this.concoursFinanciers                     = company.concoursFinanciers;
    this.detailsFaillite                        = company.detailsFaillite;
    this.detailsPoursuitesJudiciaires           = company.detailsPoursuitesJudiciaires;
    this.detailsAntecedentsFiscales             = company.detailsAntecedentsFiscales;
    this.user                                   = company.user;
    this.status                                 = company.status;
    this.creditScore                            = company.creditScore;
    this.carboneFootprint                       = company.carboneFootprint;
    this.financialNote                          = company.financialNote;
    
    
  };


  


module.exports = Company;