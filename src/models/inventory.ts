import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Inventory extends Model {
  public declare inventory_id: number;
  public declare film_id: number;
  public declare store_id: number;
  public declare last_update: Date;
}

Inventory.init(
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    film_id: { type: DataTypes.INTEGER, allowNull: false },
    store_id: { type: DataTypes.INTEGER, allowNull: false },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "inventory", timestamps: false }
);
