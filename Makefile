NODE_MODULES = ./node_modules

.PHONY: webpack babel-node test

webpack:
	${NODE_MODULES}/webpack/bin/webpack.js

babel-node:
	${NODE_MODULES}/babel-cli/bin/babel-node.js src/server.js

test:
	echo 'testing...'
