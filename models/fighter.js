// (Étape 1) Import du DRM mongoose et luxon
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

// (Étape 2) Définition du schéma Fighter
const fighterSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  category: { type: Number, ref: "categories" },
  dateOfBirth: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
fighterSchema.virtual("id").get(function () {
  return this._id;
});

// (Étape 3) Définition de l'objet qui sera retourné lorsque la méthode toJSON est appelée
fighterSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// (Étape 4) Export du modèle Fighter
module.exports = mongoose.model("Fighter", fighterSchema);