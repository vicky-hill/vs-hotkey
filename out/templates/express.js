"use strict";
// Controllers
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEQUELIZE_DELETE = exports.SEQUELIZE_UPDATE = exports.SEQUELIZE_CREATE = exports.SEQUELIZE_FIND_ALL_WITH_OPTIONS_PLAIN = exports.SEQUELIZE_FIND_ALL_PLAIN = exports.SEQUELIZE_FIND_ALL_WITH_OPTIONS = exports.SEQUELIZE_FIND_ALL = exports.SEQUELIZE_FIND_ONE_WITH_OPTIONS_PLAIN = exports.SEQUELIZE_FIND_ONE_PLAIN = exports.SEQUELIZE_FIND_ONE_WITH_OPTIONS = exports.SEQUELIZE_FIND_ONE = exports.SEQUELIZE_FIND_BY_PK_WITH_OPTIONS_PLAIN = exports.SEQUELIZE_FIND_BY_PK_PLAIN = exports.SEQUELIZE_FIND_BY_PK_WITH_OPTIONS = exports.SEQUELIZE_FIND_BY_PK = exports.MODEL_HAS_MANY = exports.MODEL_HAS_ONE = exports.ROUTES_FULL = exports.ROUTES_EMPTY = exports.FUNCTIONS_EMPTY = exports.FUNCTIONS_FULL = exports.CONTROLLER_EMPTY = exports.CONTROLLER_FULL = exports.CUSTOM_FUNCTIONS = exports.DELETE_FUNCTIONS = exports.UPDATE_FUNCTIONS = exports.CREATE_FUNCTIONS = exports.GET_BY_FUNCTIONS = exports.GET_ALL_FUNCTIONS = exports.CUSTOM_CONTROLLER = exports.DELETE_CONTROLLER = exports.UPDATE_CONTROLLER = exports.CREATE_CONTROLLER = exports.GET_BY_CONTROLLER = exports.GET_ALL_CONTROLLER = void 0;
exports.GET_ALL_CONTROLLER = `export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await FileResourceName.getProducts();
    res.json(products)
  } catch (err) {
    next(err)
  }
}`;
exports.GET_BY_CONTROLLER = `export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await FileResourceName.getProductById(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.CREATE_CONTROLLER = `export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const product = await FileResourceName.createProduct(req.body);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.UPDATE_CONTROLLER = `export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await FileResourceName.updateProduct(req.body, productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.DELETE_CONTROLLER = `export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    
    const product = await FileResourceName.deleteProduct(productId);
    res.json(product)
  } catch (err) {
    next(err)
  }
}`;
exports.CUSTOM_CONTROLLER = `export const functionName = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const result = await FileResourceName.functionName();
    res.json(result)
  } catch (err) {
    next(err)
  }
}`;
// Functions 
exports.GET_ALL_FUNCTIONS = `export const getProducts = async () => {
    const products = await Product.findAll({
        where: {} 
    });

    return products;
}`;
exports.GET_BY_FUNCTIONS = `export const getProductById = async (productId: string) => {
    const product = await Product.findByPk(productId, {
      rejectOnEmpty: new Error('Product not found')
    });
 
    return product;
}`;
exports.CREATE_FUNCTIONS = `export const createProduct = async (data: ProductAttributes) => {
    const product = await Product.create(data);

    return product;
}`;
exports.UPDATE_FUNCTIONS = `export const updateProduct = async (data: ProductAttributes, productId: string) => {
    const product = await Product.findByPk(productId, {
      rejectOnEmpty: new Error('Product not found')
    });

    await product.update(data);
    
    return product;
}`;
exports.DELETE_FUNCTIONS = `export const deleteProduct = async (productId: string) => {
    const product = await Product.findByPk(productId, {
      rejectOnEmpty: new Error('Product not found')
    });

    await product.destroy();

    return product;
}`;
exports.CUSTOM_FUNCTIONS = `export const functionName = async () => {

}`;
exports.CONTROLLER_FULL = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${exports.GET_ALL_CONTROLLER}

${exports.GET_BY_CONTROLLER}

${exports.CREATE_CONTROLLER}

${exports.UPDATE_CONTROLLER}

${exports.DELETE_CONTROLLER}
`;
exports.CONTROLLER_EMPTY = `import { Request, Response, NextFunction } from 'express'
import * as Product from './products.functions'

${exports.GET_ALL_CONTROLLER}
`;
exports.FUNCTIONS_FULL = `import Product, { ProductAttributes } from './products.model'

${exports.GET_ALL_FUNCTIONS}

${exports.GET_BY_FUNCTIONS}

${exports.CREATE_FUNCTIONS}

${exports.UPDATE_FUNCTIONS}

${exports.DELETE_FUNCTIONS}
`;
exports.FUNCTIONS_EMPTY = `import Product, { ProductAttributes } from './products.model'

${exports.GET_ALL_FUNCTIONS}
`;
exports.ROUTES_EMPTY = `import express, { Router } from 'express'
import { getProducts } from './products.controller'

const router: Router = express.Router();

/* ====================================
   @ /products
==================================== */

router.route('/').get(getProducts)


export default router;
`;
exports.ROUTES_FULL = `import express, { Router } from 'express'
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
exports.MODEL_HAS_ONE = `FileResourceName.hasOne(Product, {
    foreignKey: 'fileResourceNameId',
    as: 'product'
});

Product.belongsTo(FileResourceName, {
  foreignKey: 'fileResourceNameId',
  as: 'fileResourceName',
  onDelete: 'CASCADE'
})
`;
exports.MODEL_HAS_MANY = `FileResourceName.hasMany(Product, {
    foreignKey: 'fileResourceNameId',
    as: 'products'
});

Product.belongsTo(FileResourceName, {
    foreignKey: 'fileResourceNameId',
    as: 'fileResourceName',
    onDelete: 'CASCADE'
})
`;
// FIND_BY_PK
exports.SEQUELIZE_FIND_BY_PK = `    const product = await Product.findByPk(productId)
    
    if (!product) throw new Error('Product not found');
`;
exports.SEQUELIZE_FIND_BY_PK_WITH_OPTIONS = `    const product = await Product.findByPk(productId, {
        ~options~
    })
    
    if (!product) throw new Error('Product not found');
    `;
exports.SEQUELIZE_FIND_BY_PK_PLAIN = `    const productInstance = await Product.findByPk(productId)
    
    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });
    `;
exports.SEQUELIZE_FIND_BY_PK_WITH_OPTIONS_PLAIN = `    const productInstance = await Product.findByPk(productId, {
        ~options~
    })
    
    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });
    `;
// FIND_ONE
exports.SEQUELIZE_FIND_ONE = `    const product = await Product.findOne({
        where: { }
    })
    `;
exports.SEQUELIZE_FIND_ONE_WITH_OPTIONS = `    const product = await Product.findOne({
        where: { },
        ~options~
    })
    `;
exports.SEQUELIZE_FIND_ONE_PLAIN = `    const productInstance = await Product.findOne({
        where: { }
    })

    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });
    `;
exports.SEQUELIZE_FIND_ONE_WITH_OPTIONS_PLAIN = `    const productInstance = await Product.findOne({
        where: { },
        ~options~
    })
        
    if (!productInstance) throw new Error('Product not found');
    const product = productInstance.get({ plain: true });
    `;
// FIND_ALL
exports.SEQUELIZE_FIND_ALL = `    const products = await Product.findAll();
    `;
exports.SEQUELIZE_FIND_ALL_WITH_OPTIONS = `    const products = await Product.findAll({
        ~options~
    })
    `;
exports.SEQUELIZE_FIND_ALL_PLAIN = `    const productInstances = await Product.findAll();

    const products = productInstances.map((productInstance) => {
        const product = productInstance.get({ plain: true });
        return { ...product };
    })
    `;
exports.SEQUELIZE_FIND_ALL_WITH_OPTIONS_PLAIN = `    const productInstances = await Product.findAll({
        ~options~
    })
        
   const products = productInstances.map((productInstance) => {
        const product = productInstance.get({ plain: true });
        return { ...product };
    })
    `;
// CREATE, UPDATE, DELETE
exports.SEQUELIZE_CREATE = `    const product = await Product.create()`;
exports.SEQUELIZE_UPDATE = `    await Product.update(
      { },
      { where: { productId } }
    );
    `;
exports.SEQUELIZE_DELETE = `    await Product.destroy({ where: { }})`;
//# sourceMappingURL=express.js.map