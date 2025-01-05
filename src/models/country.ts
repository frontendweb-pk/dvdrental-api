import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Country extends Model {
  public declare country_id: number;
  public declare country: string;
  public declare last_update: Date;
}

Country.init(
  {
    country_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: { type: DataTypes.STRING, allowNull: false },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "country", timestamps: false }
);
