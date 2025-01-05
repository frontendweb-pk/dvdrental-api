import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config/db";

export class Rental extends Model {
  public declare rental_id: number;
  public declare rental_date: Date;
  public declare inventory_id: number;
  public declare customer_id: number;
  public declare return_date: Date;
  public declare staff_id: number;
  public declare last_update: Date;
}

Rental.init(
  {
    rental_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    inventory_id: { type: DataTypes.INTEGER, allowNull: false },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    return_date: { type: DataTypes.DATE, allowNull: true },
    staff_id: { type: DataTypes.INTEGER, allowNull: false },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "rental", timestamps: false }
);
