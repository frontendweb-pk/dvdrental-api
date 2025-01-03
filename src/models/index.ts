import { sequelize } from "../config/db";
import { Actor } from "./actor";
import { Film } from "./film";
import { Language } from "./language";
import { FilmActor } from "./film-actor";

Film.belongsToMany(Actor, { through: FilmActor, foreignKey: "film_id" });
Actor.belongsToMany(Film, { through: FilmActor, foreignKey: "actor_id" });
Language.hasMany(Film, { foreignKey: "language_id" });
Film.belongsTo(Language, { foreignKey: "language_id" });
export { sequelize, Actor, Film, Language, FilmActor };
