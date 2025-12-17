export default `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Express Prompts</title>
				<style>
					body {
						padding: 20px;
						font-family: var(--vscode-font-family);
						color: var(--vscode-foreground);
						background-color: var(--vscode-editor-background);
					}
					h1 {
						color: var(--vscode-foreground);
					}
					p {
						line-height: 1.6;
					}
				</style>
			</head>
			<body>
                <h2>Express Prompts</h2>
                <div>
                    <h3>Controller</h3>
                    <p>full, empy, get, getAll, getOne, getBy, getById, create, update, delete</p>
                    <br />
                    <p>getProductById, getproductbyid, getProduct, getproduct</p>
                    <p>getProducts, getproducts</p>
                    <p>createProduct, createproduct</p>
                    <p>updateProduct, updateproduct</p>
                    <p>deleteProduct, deleteproduct</p>
                    <p>sendMessage, applyCodeToCart</p>
                </div>
                 <div>
                    <h3>Functions</h3>
                    <p>full, empy, get, getAll, getOne, getBy, getById, create, update, delete</p>
                    <br />
                    <p>getProductById, getproductbyid, getProduct, getproduct</p>
                    <p>getProducts, getproducts</p>
                    <p>createProduct, createproduct</p>
                    <p>updateProduct, updateproduct</p>
                    <p>deleteProduct, deleteproduct</p>
                    <p>sendMessage, applyCodeToCart</p>
                    <br />
                    <p>findByPk, findbypk, product findbypk</p>
                    <p>findByPk i a o</p>
                    <p>findByPk i post a userId, name o createdAt</p>
                  
                    <p>include, i, include post, i user posts profile</p>
                    <p>attributes, a, attributes userId name, a userId name age</p>
                    <p>order, o, order productId, o productId</p>
                    <p>where, w, where userId active, w userId active</p>
                </div>
                <div>
                    <h3>Model</h3>
                    <p>notes, userId, layoutId, text, #sort, .price, ?deleted, :status:active:inactive</p>
                    <p>hasone profile, user hasone profile</p>
                    <p>hasMany posts, user hasMany posts</p>
                    <p>include, include user, include posts | i, i user, i posts</p>
                    <p>findbypk, pk, user findbypk, user pk, i a o</p>
                    <p>findone, one, user findOne, user one, i a o</p>
                    <p>findall, all, post findall, post all, w i a o </p>
                </div>
			</body>
			</html>
		`;

