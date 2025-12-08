"use strict";
// Controllers
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_HAS_ONE_TYPESCRIPT = exports.ROUTES_TYPESCRIPT_FULL = exports.ROUTES_TYPESCRIPT_EMPTY = exports.FUNCTIONS_TYPESCRIPT_EMPTY = exports.FUNCTIONS_TYPESCRIPT_FULL = exports.CONTROLLER_TYPESCRIPT_EMPTY = exports.CONTROLLER_TYPESCRIPT_FULL = exports.CUSTOM_FUNCTIONS_TYPESCRIPT = exports.DELETE_FUNCTIONS_TYPESCRIPT = exports.UPDATE_FUNCTIONS_TYPESCRIPT = exports.CREATE_FUNCTIONS_TYPESCRIPT = exports.GET_BY_FUNCTIONS_TYPESCRIPT = exports.GET_ALL_FUNCTIONS_TYPESCRIPT = exports.CUSTOM_CONTROLLER_TYPESCRIPT = exports.DELETE_CONTROLLER_TYPESCRIPT = exports.UPDATE_CONTROLLER_TYPESCRIPT = exports.CREATE_CONTROLLER_TYPESCRIPT = exports.GET_BY_CONTROLLER_TYPESCRIPT = exports.GET_ALL_CONTROLLER_TYPESCRIPT = void 0;
exports.GET_ALL_CONTROLLER_TYPESCRIPT = `export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await fileResourceName.getProducts();
    res.json(products)
  } catch (err) {
    next(err)
  }
}`;
exports.GET_BY_CONTROLLER_TYPESCRIPT = `export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await fileResourceName.getProductById(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.CREATE_CONTROLLER_TYPESCRIPT = `export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const product = await fileResourceName.createProduct(req.body);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.UPDATE_CONTROLLER_TYPESCRIPT = `export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await fileResourceName.updateProduct(req.body, productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.DELETE_CONTROLLER_TYPESCRIPT = `export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await fileResourceName.deleteProduct(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.CUSTOM_CONTROLLER_TYPESCRIPT = `export const functionName = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const result = await fileResourceName.functionName();
    res.json(result)
  } catch (err) {
    next(err)
  }
}`;
// Functions 
exports.GET_ALL_FUNCTIONS_TYPESCRIPT = `export const getProducts = async () => {
    const productInstances = await ProductModel.findAll({
        where: {} 
    });

    const products = productInstances.map((productInstance) => {
        const product = productInstance.get({ plain: true });
        return { ...product };
    })

    return products;
}`;
exports.GET_BY_FUNCTIONS_TYPESCRIPT = `export const getProductById = async (productId: string) => {
    const productInstance = await ProductModel.findByPk({
        where: { productId }
    });

    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });

    return product;
}`;
exports.CREATE_FUNCTIONS_TYPESCRIPT = `export const createProduct = async (data: Product) => {
    const product = await ProductModel.create(data);

    return product;
}`;
exports.UPDATE_FUNCTIONS_TYPESCRIPT = `export const updateProduct = async (data: Product, productId: string) => {
    await ProductModel.update(
      data,
      { where: { productId } }
    );

    const product = await ProductModel.findByPk(productId);
    if (!product) throw new Error('Product not found');

    return product;
}`;
exports.DELETE_FUNCTIONS_TYPESCRIPT = `export const deleteProduct = async (productId: string) => {
    await ProductModel.destroy({ where: { productId }});
    return { productId };
}`;
exports.CUSTOM_FUNCTIONS_TYPESCRIPT = `export const functionName = async () => {

}`;
exports.CONTROLLER_TYPESCRIPT_FULL = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${exports.GET_ALL_CONTROLLER_TYPESCRIPT}

${exports.GET_BY_CONTROLLER_TYPESCRIPT}

${exports.CREATE_CONTROLLER_TYPESCRIPT}

${exports.UPDATE_CONTROLLER_TYPESCRIPT}

${exports.DELETE_CONTROLLER_TYPESCRIPT}
`;
exports.CONTROLLER_TYPESCRIPT_EMPTY = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${exports.GET_ALL_CONTROLLER_TYPESCRIPT}
`;
exports.FUNCTIONS_TYPESCRIPT_FULL = `import ProductModel, { Product } from './products.model

${exports.GET_ALL_FUNCTIONS_TYPESCRIPT}

${exports.GET_BY_FUNCTIONS_TYPESCRIPT}

${exports.CREATE_FUNCTIONS_TYPESCRIPT}

${exports.UPDATE_FUNCTIONS_TYPESCRIPT}

${exports.DELETE_FUNCTIONS_TYPESCRIPT}
`;
exports.FUNCTIONS_TYPESCRIPT_EMPTY = `import ProductModel, { Product } from './products.model

${exports.GET_ALL_FUNCTIONS_TYPESCRIPT}
`;
exports.ROUTES_TYPESCRIPT_EMPTY = `import express, { Router } from 'express'
import { getProducts } from './products.controller'

const router: Router = express.Router();

/* ====================================
   @ /products
==================================== */

router.route('/').get(getProducts)


export default router;
`;
exports.ROUTES_TYPESCRIPT_FULL = `import express, { Router } from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './products.controller'

const router: Router = express.Router();

/* ====================================
   @ /products
==================================== */

router.route('/').get(getProducts)
router.route('/').post(createProduct)

router.route('/:productId').get(getProductById)
router.route('/:productId').put(updateProduct)
router.route('/:productId').delete(deleteProduct)


export default router;
`;
exports.MODEL_HAS_ONE_TYPESCRIPT = `ProductModel.hasOne(ResourceModel, {
    foreignKey: 'resourceId',
    sourceKey: 'resourceId',
    as: 'resource'
});
`;
//# sourceMappingURL=express.js.map