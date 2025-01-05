import { DataTypes, Model } from "sequelize";

import { sequelize } from "../config/db";

export class Category extends Model {
  public declare category_id: number;
  public declare name: string;
  public declare last_update: Date;
}

Category.init(
  {
    category_id: {
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
  { sequelize, modelName: "category", timestamps: false }
);
