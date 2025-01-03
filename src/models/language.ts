import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Language extends Model {
  public declare language_id: number;
  public declare name: string;
  public declare last_update: Date;
}

Language.init(
  {
    language_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "language", timestamps: false }
);
