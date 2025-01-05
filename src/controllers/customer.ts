import { Op } from "sequelize";
import { NotFoundError } from "../errors";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../lib";
import { Customer } from "../models";
import { Request, Response, NextFunction } from "express";

/**
 * Retrieve all customers
 * @param req
 * @param res
 * @param next
 */
const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as { [key: string]: string };
    const page = isNaN(Number(query.page))
      ? DEFAULT_PAGE
      : Math.max(1, Number(query.page));
    const limit = isNaN(Number(query.limit))
      ? DEFAULT_LIMIT
      : Math.max(1, Number(query.limit));

    const sort = query.sort ? query.sort : "customer_id";
    const order = query.order ? query.order : "ASC";

    const search = query.search ?? "";
    console.log(search, "se");
    const where = search
      ? {
          first_name: {
            [Op.iLike]: `%${search}%`,
          },
        }
      : {};

    const customers = await Customer.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [[sort, order]],
    });

    const total = await Customer.count({ where });
    res.status(200).json({
      data: customers,
      pageination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add new customer
 * @param req
 * @param res
 * @param next
 */
const addCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing customer
 * @param req
 * @param res
 * @param next
 */
const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);
    if (!customer) throw new NotFoundError("Customer not found!");

    const result = await customer.update(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete customerf
 * @param req
 * @param res
 * @param next
 */
const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await Customer.findByPk(req.params.customerId);

    if (!customer) throw new NotFoundError("Customer not found");
    await customer.destroy();
    res.status(200).json({
      customer_id: req.params.customerId,
    });
  } catch (error) {
    next(error);
  }
};

export { getCustomers, addCustomer, updateCustomer, deleteCustomer };
