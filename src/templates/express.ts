// Controllers

export const GET_ALL_CONTROLLER = `export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await FileResourceName.getProducts();
    res.json(products)
  } catch (err) {
    next(err)
  }
}`

export const GET_BY_CONTROLLER = `export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await FileResourceName.getProductById(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const CREATE_CONTROLLER = `export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const product = await FileResourceName.createProduct(req.body);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const UPDATE_CONTROLLER = `export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await FileResourceName.updateProduct(req.body, productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const DELETE_CONTROLLER = `export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await FileResourceName.deleteProduct(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`

export const CUSTOM_CONTROLLER = `export const functionName = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const result = await FileResourceName.functionName();
    res.json(result)
  } catch (err) {
    next(err)
  }
}`

// Functions 

export const GET_ALL_FUNCTIONS = `export const getProducts = async () => {
    const productInstances = await ProductModel.findAll({
        where: {} 
    });

    const products = productInstances.map((productInstance) => {
        const product = productInstance.get({ plain: true });
        return { ...product };
    })

    return products;
}`

export const GET_BY_FUNCTIONS = `export const getProductById = async (productId: string) => {
    const productInstance = await ProductModel.findByPk(productId, {

    });

    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });

    return product;
}`

export const CREATE_FUNCTIONS = `export const createProduct = async (data: Product) => {
    const product = await ProductModel.create(data);

    return product;
}`

export const UPDATE_FUNCTIONS = `export const updateProduct = async (data: Product, productId: string) => {
    await ProductModel.update(
      data,
      { where: { productId } }
    );

    const product = await ProductModel.findByPk(productId);
    if (!product) throw new Error('Product not found');

    return product;
}`

export const DELETE_FUNCTIONS = `export const deleteProduct = async (productId: string) => {
    await ProductModel.destroy({ where: { productId }});
    return { productId };
}`

export const CUSTOM_FUNCTIONS = `export const functionName = async () => {

}`

export const CONTROLLER_FULL = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${GET_ALL_CONTROLLER}

${GET_BY_CONTROLLER}

${CREATE_CONTROLLER}

${UPDATE_CONTROLLER}

${DELETE_CONTROLLER}
`

export const CONTROLLER_EMPTY = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${GET_ALL_CONTROLLER}
`

export const FUNCTIONS_FULL = `import ProductModel, { Product } from './products.model'

${GET_ALL_FUNCTIONS}

${GET_BY_FUNCTIONS}

${CREATE_FUNCTIONS}

${UPDATE_FUNCTIONS}

${DELETE_FUNCTIONS}
`

export const FUNCTIONS_EMPTY = `import ProductModel, { Product } from './products.model'

${GET_ALL_FUNCTIONS}
`

export const ROUTES_EMPTY = `import express, { Router } from 'express'
import { getProducts } from './products.controller'

const router: Router = express.Router();

/* ====================================
   @ /products
==================================== */

router.route('/').get(getProducts)


export default router;
`

export const ROUTES_FULL = `import express, { Router } from 'express'
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

export const MODEL_HAS_ONE = `FileResourceNameModel.hasOne(ProductModel, {
    foreignKey: 'productId',
    as: 'product'
});

ProductModel.belongsTo(FileResourceNameModel, {
  foreignKey: 'productId',
  as: 'fileResourceName',
  onDelete: 'CASCADE'
})
`

export const MODEL_HAS_MANY = `FileResourceNameModel.hasMany(ProductModel, {
    foreignKey: 'fileResourceNameId',
    as: 'products'
});

ProductModel.belongsTo(FileResourceNameModel, {
    foreignKey: 'fileResourceNameId',
    as: 'fileResourceName',
    onDelete: 'CASCADE'
})
`

export const INCLUDE_FULL = `        include: [{
            model: ProductModel,
            as: 'product'
        }]`

export const SEQUELIZE_FIND_BY_PK = `    const productInstance = await ProductModel.findByPk(productId)
    
    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });
`
export const SEQUELIZE_FIND_BY_PK_WITH_OPTIONS = `    const productInstance = await ProductModel.findByPk(productId, {
        options
    })
    
    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });
`