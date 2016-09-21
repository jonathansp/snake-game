NODE_MODULES = ./node_modules

.PHONY: webpack babel-node babel-node-api setup-api setup test

setup-api:
	sudo apt-get install python2.7 python redis-server
	cd snake-api && npm install

setup: setup-api
	npm install

webpack:
	${NODE_MODULES}/webpack/bin/webpack.js -p

babel-node:
	${NODE_MODULES}/babel-cli/bin/babel-node.js src/server.js

babel-node-api:
	${NODE_MODULES}/babel-cli/bin/babel-node.js snake-api

test:
	echo 'testing...'
