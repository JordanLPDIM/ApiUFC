// (Étape 1) Import de express
var express = require('express');

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur fighter
var fighter_controller = require("../controllers/fighter");

// (Étape 2) Ajout de la route qui permet d'ajouter un combattant
router.post("/", fighter_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les combattants
router.get("/", fighter_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul combattant grâce à son identifant
router.get("/:id", fighter_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul combattant grâce à son identifant
router.put("/:id", fighter_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul combattant grâce à son identifant
router.delete("/:id", fighter_controller.delete);

// (Étape 1) Export du router
module.exports = router;

// (Étape 2) Ajout de la route qui permet de modifier un seul combattant grâce à son identifant
router.put("/:id", (req, res) => {
    return res.status(200).json("UPDATE !");
});

// (Étape 2) Ajout de la route qui permet de supprimer un seul combattant grâce à son identifant
router.delete("/:id", (req, res) => {
    return res.status(200).json("DELETE !");
});

// (Étape 1) Export du router
module.exports = router;