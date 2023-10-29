# Build a API service with ExpressJs, Typescript, Mongoose

## 1. Packages

**Dependencies:** express, mongoose, dotenv <br/>
**Dev Dependencies:** typescript, @types/express <br/>

## 2. First setup

### 2.1 Packages

```
npm init
npm i express
npm i --save-dev typescript @types/express
```

### 2.2 Edit _package.json_

Add those scripts:

```
  "scripts": {
    //...
    "dev": "ts-node-dev --respawn --transpile-only --files src/index.ts",
    "build": "tsc"
  }
```

### 2.3 Create _tsconfig.json_

You can run `npx tsc --init` to automatically generate _tsconfig.json_ but it has a lot comments. <br/>
So let's just create it manually:

```
{
  "compilerOptions": {
    "target": "es2015",
    "outDir": "./build",
    "strict": true,
    "module": "commonjs",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### 2.4 Create main file _./src/index.ts_

```
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
```

### 2.5 Setup Git

Run

```
git init
```

Create _.gitignore_ and add any files or folders you don't want to commit

```
/node_modules
/.env
```

### 2.6 Run

Run your server

```
npm run dev
```

and access http://localhost:4000 <br/>

## 3. Setup Mongodb

### 3.1 Connect to Mongodb

1. Create database with first-freed cluster at www.mongodb.com/atlas <br/>
2. Need to config something likes user and security <br/>
3. Get the connection string and add to your _.env_ file <br/>
   The connection string has the format:
   ```
   mongodb+srv://<user>:<password>@cluster0.hxavdit.mongodb.net/<database>?retryWrites=true&w=majority
   ```
   Remember to replace `<user>`, `<password>`, and `<database>` <br/>
4. Install packages:

```
npm i mongoose dotenv
```

5. Edit _src/index.ts_ <br/>

```
//...
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MG_URI!)
  .then(() => {
    console.log("Connected to Mongodb");
    StartServer();
  })
  .catch((e) => {
    console.log("Error on connecting to Mongodb: ", e);
  });

const StartServer = () => {
  // app.use()
  // app.get()
  // app.listen(PORT)
};
```

### 3.2 Create first model

Model named Brand

1. Define model at _src/models/brand.model.ts_ <br/>

```
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const brandModel = mongoose.model("Brand", brandSchema);
```

2. Create CRUD functions at _src/controllers/brand.controller.ts_ <br/>
   `create(), getAll(), getById(), updateById(), deleteById()`

```
import { NextFunction, Request, Response } from "express";
import { brandModel } from "../models/brand.model";
import { failedResponse, successResponse } from "../utils/response";

const readAllBrand = (req: Request, res: Response, next: NextFunction) => {
  return brandModel
    .find()
    .then((brands) => {
      if (brands) {
        res.status(200).json(successResponse({ brands }));
      } else {
        res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch(() => res.status(500).json(failedResponse("Cannot read all")));
};

//...
```

3. Define router at _src/routes/brand.route.ts_ <br/>

```
import express from "express";
import brandController from "../controllers/brand.controller";

export const brandRouter = express.Router();

brandRouter.post("/create", brandController.createBrand);
brandRouter.get("", brandController.readAllBrand);
brandRouter.get("/:id", brandController.readBrandById);
brandRouter.post("/update/:id", brandController.updateBrandById);
brandRouter.post("/delete/:id", brandController.deleteBrandById);
```

4. Use router for app at file _src/index.ts_

```
const StartServer = () => {
  //...
  app.use("/api/brands", brandRouter);
  // app.listen()
}
```

## 4. Config CORS for Front-end fetching

Install packages

```
npm i cors
npm i --save-dev @types/cors
```

Edit _src/index.ts_

```
//...
import cors from "cors";

//...
const StartServer = () => {
  //...
  app.use(
    cors({
      credentials: true,
      origin: process.env.FE_URI,
    })
  );

  // app.listen()
}
```
