import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config/db";
import { Language } from "./language";

export class Film extends Model {
  public declare film_id: number;
  public declare title: string;
  public declare description: string;
  public declare release_year: number;
  public declare language_id: number;
  public declare rental_duration: number;
  public declare rental_rate: number;
  public declare length: number;
  public declare replacement_cost: number;
  public declare rating: string;
  public declare last_update: Date;
  public declare special_features: string;
  public declare fulltext: string;
}

export enum Rating {
  G = "G",
  PG = "PG",
  PG13 = "PG-13",
  R = "R",
  NC17 = "NC-17",
}

Film.init(
  {
    film_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    release_year: { type: DataTypes.INTEGER, allowNull: true },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Language, key: "language_id" },
    },
    rental_duration: { type: DataTypes.INTEGER, allowNull: false },
    rental_rate: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    length: { type: DataTypes.INTEGER, allowNull: true },
    replacement_cost: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    rating: {
      type: DataTypes.ENUM,
      values: Object.values(Rating),
      defaultValue: Rating.G,
      allowNull: true,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    special_features: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    fulltext: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, modelName: "film" }
);
