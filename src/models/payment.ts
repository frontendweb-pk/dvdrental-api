import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Payment extends Model {
  public declare payment_id: number;
  public declare customer_id: number;
  public declare staff_id: number;
  public declare rental_id: number;
  public declare amount: number;
  public declare payment_date: Date;
}

Payment.init(
  {
    payment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    staff_id: { type: DataTypes.INTEGER, allowNull: false },
    rental_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "payment", timestamps: false }
);
