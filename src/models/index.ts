/**
 * This module sets up the associations between the models in the dvdrental-api.
 *
 * Imports:
 * - `sequelize` from the database configuration.
 * - `Actor`, `Film`, `Language`, and `FilmActor` models.
 *
 * Associations:
 * - `Film` belongs to many `Actor` through `FilmActor` with `film_id` as the foreign key.
 * - `Actor` belongs to many `Film` through `FilmActor` with `actor_id` as the foreign key.
 * - `Language` has many `Film` with `language_id` as the foreign key.
 * - `Film` belongs to `Language` with `language_id` as the foreign key.
 *
 * Exports:
 * - `sequelize`
 * - `Actor`
 * - `Film`
 * - `Language`
 * - `FilmActor`
 */
import { sequelize } from "../config/db";
import { Actor } from "./actor";
import { Film } from "./film";
import { Language } from "./language";
import { FilmActor } from "./film-actor";
import { Store } from "./store";
import { Address } from "./address";
import { Staff } from "./staff";

Film.belongsToMany(Actor, { through: FilmActor, foreignKey: "film_id" });
Actor.belongsToMany(Film, { through: FilmActor, foreignKey: "actor_id" });

Language.hasMany(Film, { foreignKey: "language_id" });
Film.belongsTo(Language, { foreignKey: "language_id" });

// Address.hasMany(Store,{foreignKey:''})
Store.hasOne(Address, { foreignKey: "address_id" });
Address.belongsTo(Store, { foreignKey: "address_id" });

// staff
Staff.hasOne(Store, { foreignKey: "manager_staff_id" });
Staff.hasOne(Address, { foreignKey: "address_id" });
Store.belongsTo(Address, { foreignKey: "address_id" });
Store.belongsTo(Staff, { foreignKey: "manager_staff_id" });
export { sequelize, Actor, Film, Language, FilmActor, Store, Address, Staff };
