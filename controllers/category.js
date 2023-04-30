// Import du modèle category
var Category = require("../models/category");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const categoryValidationRules = () => {
    return [   
        body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Category must be specified.")
        .isIn(["Lightweight", "Welterweight", "Middleweight", "Heavyweight"])
        .withMessage("Invalid category. Please choose from 'Lightweight', 'Welterweight', 'Middleweight', 'Heavyweight'.")
    
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
exports.create = [bodyIdValidationRule(), categoryValidationRules(), checkValidity, (req, res, next) => {
    
    // Création de la nouvelle instance de category à ajouter 
    var category = new Category({
        _id: req.body.id,
        name: req.body.name,
        
      });

    // Ajout de category dans la bdd 
    category.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("category created successfully !");
    });
}];

// Read
exports.getAll = (req, res, next) => {
    Category.find
    (function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Category.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
    });
}];

// Update
exports.update = [paramIdValidationRule(), categoryValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de category à modifier 
    var category = new Category({
        _id: req.params.id,
        name: req.body.name,
        
      });

      Category.findByIdAndUpdate(req.params.id, category, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("category with id "+req.params.id+" is not found !");
        }
        return res.status(201).json("category updated successfully !");
      });
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Category.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        if(!result){
            res.status(404).json("category with id "+req.params.id+" is not found !");
        }
        return res.status(200).json("category deleted successfully !");
      });
}];