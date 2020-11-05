# angular-hybrid-webpack

This sandbox for showing possibility "hybrid approach", migration from AngularJs to Angular

### Hybrid app, all Angular modules there are in folders which are named in kebab case, appropriately AngularJs modules are named in lowerCamelCase

## Getting started

Install JSON Server

```
npm install -g json-server
```

Start JSON Server

```bash
json-server --watch ./db/db.accounts.json
```
## Routes

Based on the previous `./db/db.accounts.json` file, here are all the default routes. You can also add [other routes](#add-custom-routes) using `--routes`.

### Plural routes

```
GET    /accounts
GET    /accounts/1
POST   /accounts
PUT    /accounts/1
PATCH  /accounts/1
DELETE /accounts/1
```

### Singular routes

```
GET    /accounts
POST   /accounts
PUT    /accounts
PATCH  /accounts
```

### Run angular-hybrid-webpack

```
npm run dev
```
