# Build a API service with ExpressJs, Typescript, Mongoose

## 1. Packages

Dependencies: express
Dev Dependencies: typescript, @types/express

## 2. First setup

### 2.1 Packages

Dependencies: express
Dev Dependencies: typescript, @types/express

### 2.2 Edit _package.json_

Add those scripts:
"dev": "ts-node-dev --respawn --transpile-only --files src/index.ts",
"build": "tsc"

## 2.3 Create _tsconfig.json_

You can run **npx tsc --init** to automatically generate _tsconfig.json_ but it has a lot comments.
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

## 2.4 Create main file _./src/index.ts_

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

## 2.5 Setup Git

Run **git init**
Create _.gitignore_ and add any files or folders you don't want to commit

## 2.6 Run

Run your server **npm run dev** and access http://localhost:4000
