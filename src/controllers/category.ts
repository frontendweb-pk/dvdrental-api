import { Request, Response, NextFunction } from "express";
import { Category } from "../models";
import { NotFoundError } from "../errors";

/**
 * Retrieve all categories
 * @param req
 * @param res
 * @param next
 *
 * @returns Category[]
 */
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

/**
 * Add new category
 * @param req
 * @param res
 * @param next
 *
 * @returns A promise that resolve to category
 */
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

/**
 * Update category
 * @param req
 * @param res
 * @param next
 *
 * @returns
 */
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) {
      throw new NotFoundError("Category not found!");
    }

    const result = await category.update(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete category
 * @param req
 * @param res
 * @param next
 *
 * @returns id
 */
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) throw new NotFoundError("Category not found!");

    await category.destroy();
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
