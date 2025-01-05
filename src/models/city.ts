import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Country } from "./country";

export class City extends Model {
  public declare city_id: number;
  public declare city: string;
  public declare country_id: number;
  public declare last_update: Date;
}

City.init(
  {
    city_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    city: { type: DataTypes.STRING, allowNull: false },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: "country_id",
      },
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "city", timestamps: false }
);
