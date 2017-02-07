NODE_MODULES = ./node_modules

.PHONY: webpack babel-node babel-node-api setup-api setup setup-node test

setup-node:
	sudo apt-get install curl
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get install -y nodejs

setup-api: setup-node
	sudo apt-get install python2.7 python redis-server
	cd snake-api && npm install

setup: setup-node setup-api
	npm install

webpack:
	${NODE_MODULES}/webpack/bin/webpack.js -p

babel-node:
	${NODE_MODULES}/babel-cli/bin/babel-node.js src/server.js

babel-node-api:
	sudo /etc/init.d/redis-server restart
	${NODE_MODULES}/babel-cli/bin/babel-node.js snake-api

test:
	echo 'testing...'
