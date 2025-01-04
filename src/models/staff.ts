import { sequelize } from "../config/db";
import { DataTypes, Model } from "sequelize";
import { Password } from "../lib/password";

export class Staff extends Model {
  public declare staff_id: number;
  public declare first_name: string;
  public declare last_name: string;
  public declare address_id: number;
  public declare email: string;
  public declare store_id: number;
  public declare active: boolean;
  public declare username: string;
  public declare password: string;
  public declare last_update: Date;
}

Staff.init(
  {
    staff_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    address_id: { type: DataTypes.INTEGER, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isEmail: true, isLowercase: true },
    },
    store_id: { type: DataTypes.INTEGER, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isAlpha: true, len: [4, 20], notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [8, 20] },
      set(val) {
        console.log("Setting password", val);
        this.setDataValue("password", Password.hash(val as string));
      },
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "staff", timestamps: false }
);
