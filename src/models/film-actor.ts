import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class FilmActor extends Model {
  public declare film_id: number;
  public declare actor_id: number;
  public declare last_update: Date;
}

FilmActor.init(
  {
    film_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    actor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "film_actor", timestamps: false }
);
