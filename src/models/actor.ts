import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Actor extends Model {
  public declare actor_id: number;
  public declare first_name: string;
  public declare last_name: string;
  public declare last_update: Date;
}

Actor.init(
  {
    actor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "actor", timestamps: false }
);
