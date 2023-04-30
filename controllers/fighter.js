// Import du modèle Fighter
var Fighter = require("../models/fighter");
var { ObjectId } = require('mongoose').Types;

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const FighterValidationRules = () => {
    return [   
        body("firstName")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("First name must be specified.")
            .isAlphanumeric()
            .withMessage("First name has non-alphanumeric characters."),

        body("lastName")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Last name must be specified.")
            .isAlphanumeric()
            .withMessage("Last name has non-alphanumeric characters."),

        body("dateOfBirth", "Invalid date of birth")
            .optional({ checkFalsy: true })
            .isISO8601()
            .toDate(),
        
        body("category")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Category must be specified.")
        
    
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [bodyIdValidationRule(), FighterValidationRules(), checkValidity, (req, res, next) => {
    
    

    // Création de la nouvelle instance de Fighter à ajouter 
    var fighter = new Fighter({
        _id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        category: req.body.category,
        dateOfBirth: req.body.dateOfBirth,
      });

    // Ajout de Fighter dans la bdd 
    fighter.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Fighter created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    Fighter.find()
      .populate("category")
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
  };

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Fighter.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

// Update
exports.update = [paramIdValidationRule(), FighterValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de Fighter à modifier 
    var fighter = new Fighter({
        _id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        category: req.body.category,
        dateOfBirth: req.body.dateOfBirth,
      });

      Fighter.findByIdAndUpdate(req.params.id, fighter, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Fighter with id "+req.params.id+" is not found !");
        }
        return res.status(201).json("Fighter updated successfully !");
      });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Fighter.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("Fighter with id "+req.params.id+" is not found !");
        }
        return res.status(200).json("Fighter deleted successfully !");
      });
}];