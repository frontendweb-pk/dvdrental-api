import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Address extends Model {
  public declare address_id: number;
  public declare address: string;
  public declare address2: string;
  public declare district: string;
  public declare city_id: number;
  public declare postal_code: string;
  public declare phone: string;
  public declare last_update: Date;
}

Address.init(
  {
    address_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "address", timestamps: false }
);
