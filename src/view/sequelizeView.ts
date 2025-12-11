const hasManyMatching = `UserModel.hasMany(PostModel, {
  foreignKey: 'userId',
  as: 'posts',
  onDelete: 'CASCADE'
})
  
PostModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'posts'
})
`

const hasManyDifferent = `UserModel.hasMany(PostModel, {
    foreignKey: 'from',    // post.from
    sourceKey: 'email',    // user.email
    as: 'posts',
    onDelete: 'CASCADE'
})

PostModel.belongsTo(UserModel, {
  foreignKey: 'from',       // post.from
  targetKey: 'email',       // user.email
  as: 'user'
})
`

const magicAssociations = `const user = await UserModel.create({ name: "max" })

await user.createPost({
  title: "Another post",
  content: "Sequelize is nice"
})

// Magic Association - get
const user = await UserModel.findByPk(1);
const posts = await UserModel.getPosts();
`

export default `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Sequelize</title>
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
                    .code {
                        font-family: monospace;
                        font-size: 13px;
                    }
                    .comment {
                        color: #96928F;
                        font-family: monospace;
                        font-size: 13px;
                        margin-top: 40px;

                    }
				</style>
			</head>
			<body>
                <div>
                    <h2>Model</h2>
                    <h3>HasMany, BelongsTo</h3>
                    
                    <p class="comment">// With matching foreignKey</p>
                    <pre class="code">${hasManyMatching}</pre>

                    <p class="comment">// With different foreignKey</p>
                    <pre class="code">${hasManyDifferent}</pre>

                    <p class="comment">// Magic Associations</p>
                    <pre class="code">${magicAssociations}</pre>
                </div>
			</body>
			</html>
		`;