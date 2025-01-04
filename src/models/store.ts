import { sequelize } from "../config/db";
import { DataTypes, Model } from "sequelize";
import { Address } from "./address";

export class Store extends Model {
  public declare store_id: number;
  public declare manager_staff_id: number;
  public declare address_id: number;
  public declare last_update: Date;
}

Store.init(
  {
    store_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    manager_staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Address, key: "address_id" },
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "store", timestamps: false }
);
