install:
	npm ci

lint:
	npx eslint .

lint fix:
	npx eslint --fix .

test-coverage:
	npx test -- --coverage --coverageProvider=v8
	
publish:
	npm publish --dry-run