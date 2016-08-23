NODE_MODULES = ./node_modules

.PHONY: webpack babel-node

webpack:
	${NODE_MODULES}/webpack/bin/webpack.js

babel-node:
	${NODE_MODULES}/babel-cli/bin/babel-node.js src/server.js
