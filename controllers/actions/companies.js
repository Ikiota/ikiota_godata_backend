

const mysqlConnection = require('../../db');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Companies = require('../../models/Company.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllCompanies = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM companies';


        const date = new Date();
       

        mysqlConnection.query(mQuery, (error, rows, fields) => {
            
            if (!error)
            
            res.status(200).json({
                success: true,
                contentData: rows
            });

            else
            //console.log(err.sqlMessage);

            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
            })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}

const getCompany = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM companies WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Company not found"
                    });
                else     
                    res.status(200).json({
                        success: true,
                        contentData: rows[0]
                    });

            else
            //console.log(err.sqlMessage);

            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
            })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }

}

const registerCompany = async (req, res) => {
   
    

    let bodyData =  JSON.parse(req.body.bodyData);


   
    

    const newCompany = new Companies({
    raisonSociale                          : bodyData.raisonSociale,
    sigle                                  : bodyData.sigle,
    formeJuridique                         : bodyData.formeJuridique,
    logo                                   : bodyData.logo,
    statutsOrganigramme                    : bodyData.statutsOrganigramme,
    dateCreation                           : bodyData.dateCreation,
    tdateDebutTravaux                      : bodyData.dateDebutTravaux,
    dateAutorisation                       : bodyData.dateAutorisation,
    autorisationOuverture                  : bodyData.autorisationOuverture,
    activitePrincipale                     : bodyData.activitePrincipale,
    activiteSecondaire                     : bodyData.activiteSecondaire,
    capital                                : bodyData.capital,
    actionaires                            : bodyData.actionaires,                                                                                                                                                                                                                                                  
    cvActionnaireMajoritaire               : bodyData.cvActionnaireMajoritaire,
    activiteActionnaireMajoritaire         : bodyData.activiteActionnaireMajoritaire,
    numeroRccm                             : bodyData.numeroRccm,
    dateRccm                               : bodyData.dateRccm,
    placeRccm                              : bodyData.placeRccm,
    rccmDocument                           : bodyData.rccmDocument,
    numeroIdNat                            : bodyData.numeroIdNat,
    dateIdNat                              : bodyData.dateIdNat,
    placeIdNat                             : bodyData.placeIdNat,
    idNatDocument                          : bodyData.idNatDocument,
    numeroImpot                            : bodyData.numeroImpot,
    dateNumeroImpot                        : bodyData.dateNumeroImpot,
    placeNumeroImpot                       : bodyData.placeNumeroImpot,
    numeroImpotDocument                    : bodyData.numeroImpotDocument,
    attestationFiscaleDocument             : bodyData.attestationFiscaleDocument,
    siegeSocial                            : bodyData.siegeSocial,
    natureSiegeSocial                      : bodyData.natureSiegeSocial,
    siegeExploitation                      : bodyData.siegeExploitation,
    natureSiegeExploitation                : bodyData.natureSiegeExploitation,
    contacts                               : bodyData.contacts,
    referencesBancaires                    : bodyData.referencesBancaires,
    manager                                : bodyData.manager,
    patrimoines                            : bodyData.patrimoines,
    stocks                                 : bodyData.stocks,
    difficultes                            : bodyData.difficultes,
    personnels                             : bodyData.personnels,
    perspectives                           : bodyData.perspectives,
    activitesSousTraitees                  : bodyData.activitesSousTraitees,
    etatsFinanciers                        : bodyData.etatsFinanciers,
    concoursFinanciers                     : bodyData.concoursFinanciers,
    detailsFaillite                        : bodyData.detailsFaillite,
    detailsPoursuitesJudiciaires           : bodyData.detailsPoursuitesJudiciaires,
    detailsAntecedentsFiscales             : bodyData.detailsAntecedentsFiscales,
    user                                   : bodyData.user,
    status                                 : bodyData.status,
    quote                                  : bodyData.quote
    
});
    
    try{
        

        const mQuerySelect = 'SELECT * FROM companies WHERE raisonSociale = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.raisonSociale], (error, rows, fields) => {
            
            if (!error){
                

                if(rows[0]){

                    res.status(404).json({
                        success: false,
                        message: "A company has already been registered with this raisonSociale!"
                    });

                   
                }else{

                    const mQuery = 'INSERT INTO companies SET?';
                    mysqlConnection.query(mQuery, newCompany, (error, rows, fields) => {
                        

                        console.log("======== inserted company");
                        console.log(rows.insertId);
                       
                        if (!error){
            
            
                          
                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM companies WHERE id = ?';
       

                            
                            mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                                
                                

                                if (!error)
                                    if(!rows)
                                        res.status(404).json({
                                            success: false,
                                            message: "Company not found"
                                        });
                                    else     
                                        res.status(200).json({
                                            success: true,
                                            contentData: rows[0]
                                        });
                    
                                else
                               
                    
                                res.status(404).json({
                                    success: false,
                                    message: error.sqlMessage
                                });
                                })
                      
                        }
                       else
                       
                        res.status(404).json({
                            success: false,
                            message: error.sqlMessage
                        });
                         })

                }
            }
            })


       

       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}


const loginCompany = async (req, res) => {

    

    const bodyData = req.body;
    

    try{

        const mQuerySelect = 'SELECT * FROM companies WHERE email = ?';
       
        
        mysqlConnection.query(mQuerySelect,[bodyData.email], async (error, rows, fields) => {
           
            if (!error)
            
                if(rows[0]){
                    const company =  rows[0];

                    
                    const validPass =bodyData.password === company.password;
                    if(!validPass) return res.status(400).json({
                        success: false,
                        message: 'Invalid password'});
                
                
                        const token = jwt.sign({_id: company.id.toString()}, process.env.TOKEN_SECRET);
                
                        res.header('auth-token', token).json(
                        { 
                            success: true,
                            message: company.id.toString(),
                            authToken: token,
                            contentData: company
                
                        });
                }else{

                    return res.status(400).json({
                        success: false,
                        message: 'Incorect email or password'});
                }
            })

        }catch(err){

            res.status(404).json({
                success: false,
                message: err
            });
        }


    
}


const updateCompany = async (req, res) => {

    const uID = req.params.uID;
    
   
    let bodyData =  JSON.parse(req.body.bodyData);

    const mCompany = new Companies({


            

    raisonSociale                          : bodyData.raisonSociale,
    sigle                                  : bodyData.sigle,
    formeJuridique                         : bodyData.formeJuridique,
    statutsOrganigramme                    : bodyData.statutsOrganigramme,
    logo                                   : bodyData.logo,
    dateCreation                           : bodyData.dateCreation,
    tdateDebutTravaux                      : bodyData.dateDebutTravaux,
    dateAutorisation                       : bodyData.dateAutorisation,
    autorisationOuverture                  : bodyData.autorisationOuverture,
    activitePrincipale                     : bodyData.activitePrincipale,
    activiteSecondaire                     : bodyData.activiteSecondaire,
    capital                                : bodyData.capital,
    actionaires                            : bodyData.actionaires,                                                                                                                                                                                                                                                  
    cvActionnaireMajoritaire               : bodyData.cvActionnaireMajoritaire,
    activiteActionnaireMajoritaire         : bodyData.activiteActionnaireMajoritaire,
    numeroRccm                             : bodyData.numeroRccm,
    dateRccm                               : bodyData.dateRccm,
    placeRccm                              : bodyData.placeRccm,
    rccmDocument                           : bodyData.rccmDocument,
    numeroIdNat                            : bodyData.numeroIdNat,
    dateIdNat                              : bodyData.dateIdNat,
    placeIdNat                             : bodyData.placeIdNat,
    idNatDocument                          : bodyData.idNatDocument,
    numeroImpot                            : bodyData.numeroImpot,
    dateNumeroImpot                        : bodyData.dateNumeroImpot,
    placeNumeroImpot                       : bodyData.placeNumeroImpot,
    numeroImpotDocument                    : bodyData.numeroImpotDocument,
    attestationFiscaleDocument             : bodyData.attestationFiscaleDocument,
    siegeSocial                            : bodyData.siegeSocial,
    natureSiegeSocial                      : bodyData.natureSiegeSocial,
    siegeExploitation                      : bodyData.siegeExploitation,
    natureSiegeExploitation                : bodyData.natureSiegeExploitation,
    contacts                               : bodyData.contacts,
    referencesBancaires                    : bodyData.referencesBancaires,
    manager                                : bodyData.manager,
    patrimoines                            : bodyData.patrimoines,
    stocks                                 : bodyData.stocks,
    difficultes                            : bodyData.difficultes,
    personnels                             : bodyData.personnels,
    perspectives                           : bodyData.perspectives,
    activitesSousTraitees                  : bodyData.activitesSousTraitees,
    etatsFinanciers                        : bodyData.etatsFinanciers,
    concoursFinanciers                     : bodyData.concoursFinanciers,
    detailsFaillite                        : bodyData.detailsFaillite,
    detailsPoursuitesJudiciaires           : bodyData.detailsPoursuitesJudiciaires,
    detailsAntecedentsFiscales             : bodyData.detailsAntecedentsFiscales,
    user                                   : bodyData.user,
    status                                 : bodyData.status,
    quote                                  : bodyData.quote,
    
        });
    
    try{

        const mQuery = 'UPDATE companies SET? WHERE id =?';
        mysqlConnection.query(mQuery, [mCompany, uID], (error, rows, fields) => {
            


            if (!error){


                const mQuerySelect = 'SELECT * FROM companies WHERE id = ?';
       
        
                mysqlConnection.query(mQuerySelect,[uID], async (error, rows, fields) => {
                    
                    if (!error){
                        if(rows[0]){
                            const company =  rows[0];
                            res.status(200).json({
                                success: true,
                                contentData: company
                            });
                           
                        }else{
        
                            return res.status(400).json({
                                success: false,
                                message: 'Company not found'});
                        }
                    }else{
                        console.log(error);

                        return res.status(400).json({
                            success: false,
                            message:error
                        });
                    }
                        
                    })
                    



          
            }
           else
           
            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
             })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}


const deleteCompany = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM companies WHERE id = ?';
        mysqlConnection.query(mQuery, [uID], (error, rows, fields) => {
            
            if (!error){


                res.status(200).json({
                    success: true,
                    contentData: rows
                });

          
            }
           else
           
            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
             })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}


module.exports.getAllCompanies = getAllCompanies;
module.exports.registerCompany = registerCompany;
module.exports.loginCompany = loginCompany;
module.exports.getCompany = getCompany;
module.exports.updateCompany = updateCompany;
module.exports.deleteCompany = deleteCompany;