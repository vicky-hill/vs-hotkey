// Controllers

export const GET_ALL_CONTROLLER_TYPESCRIPT = `export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await fileResourceName.getProducts();
    res.json(products)
  } catch (err) {
    next(err)
  }
}`

export const GET_BY_CONTROLLER_TYPESCRIPT = `export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await fileResourceName.getProductById(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const CREATE_CONTROLLER_TYPESCRIPT = `export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const product = await fileResourceName.createProduct(req.body);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const UPDATE_CONTROLLER_TYPESCRIPT = `export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await fileResourceName.updateProduct(req.body, productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const DELETE_CONTROLLER_TYPESCRIPT = `export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await fileResourceName.deleteProduct(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const CUSTOM_CONTROLLER_TYPESCRIPT = `export const functionName = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const result = await fileResourceName.functionName();
    res.json(result)
  } catch (err) {
    next(err)
  }
}`

// Functions 

export const GET_ALL_FUNCTIONS_TYPESCRIPT = `export const getProducts = async () => {
    const productInstances = await ProductModel.findAll({
        where: {} 
    });

    const products = productInstances.map((productInstance) => {
        const product = productInstance.get({ plain: true });
        return { ...product };
    })

    return products;
}`

export const GET_BY_FUNCTIONS_TYPESCRIPT = `export const getProductById = async (productId: string) => {
    const productInstance = await ProductModel.findByPk({
        where: { productId }
    });

    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });

    return product;
}`

export const CREATE_FUNCTIONS_TYPESCRIPT = `export const createProduct = async (data: Product) => {
    const product = await ProductModel.create(data);

    return product;
}`

export const UPDATE_FUNCTIONS_TYPESCRIPT = `export const updateProduct = async (data: Product, productId: string) => {
    await ProductModel.update(
      data,
      { where: { productId } }
    );

    const product = await ProductModel.findByPk(productId);
    if (!product) throw new Error('Product not found');

    return product;
}`

export const DELETE_FUNCTIONS_TYPESCRIPT = `export const deleteProduct = async (productId: string) => {
    await ProductModel.destroy({ where: { productId }});
    return { productId };
}`

export const CUSTOM_FUNCTIONS_TYPESCRIPT = `export const functionName = async () => {

}`

export const CONTROLLER_TYPESCRIPT_FULL = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${GET_ALL_CONTROLLER_TYPESCRIPT}

${GET_BY_CONTROLLER_TYPESCRIPT}

${CREATE_CONTROLLER_TYPESCRIPT}

${UPDATE_CONTROLLER_TYPESCRIPT}

${DELETE_CONTROLLER_TYPESCRIPT}
`

export const CONTROLLER_TYPESCRIPT_EMPTY = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${GET_ALL_CONTROLLER_TYPESCRIPT}
`

export const FUNCTIONS_TYPESCRIPT_FULL = `import ProductModel, { Product } from './products.model

${GET_ALL_FUNCTIONS_TYPESCRIPT}

${GET_BY_FUNCTIONS_TYPESCRIPT}

${CREATE_FUNCTIONS_TYPESCRIPT}

${UPDATE_FUNCTIONS_TYPESCRIPT}

${DELETE_FUNCTIONS_TYPESCRIPT}
`

export const FUNCTIONS_TYPESCRIPT_EMPTY = `import ProductModel, { Product } from './products.model

${GET_ALL_FUNCTIONS_TYPESCRIPT}
`

export const ROUTES_TYPESCRIPT_EMPTY = `import express, { Router } from 'express'
import { getProducts } from './products.controller'

const router: Router = express.Router();

/* ====================================
   @ /products
==================================== */

router.route('/').get(getProducts)


export default router;
`

export const ROUTES_TYPESCRIPT_FULL = `import express, { Router } from 'express'
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
`

export const MODEL_HAS_ONE_TYPESCRIPT = `FileResourceNameModel.hasOne(ProductModel, {
    foreignKey: 'productId',
    sourceKey: 'productId',
    as: 'product'
});
`

export const MODEL_HAS_MANY_TYPESCRIPT = `FileResourceNameModel.hasMany(ProductModel, {
    foreignKey: 'productId',
    sourceKey: 'productId',
    as: 'products'
});
`