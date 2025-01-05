import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Customer extends Model {
  public declare customer_id: number;
  public declare store_id: number;
  public declare first_name: string;
  public declare last_name: string;
  public declare email: string;
  public declare address_id: number;
  public declare active: boolean;
  public declare create_date: Date;
  public declare last_update: Date;
  public declare activebool: boolean;
}

Customer.init(
  {
    customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    store_id: { type: DataTypes.INTEGER, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isEmail: true, isLowercase: true },
    },
    address_id: { type: DataTypes.INTEGER, allowNull: false },
    active: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    activebool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "customer", timestamps: false }
);
