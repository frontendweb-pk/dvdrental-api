import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class FilmCategory extends Model {
  public declare film_id: number;
  public declare category_id: number;
  public declare last_update: Date;
}

FilmCategory.init(
  {
    film_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "film_category", timestamps: false }
);
