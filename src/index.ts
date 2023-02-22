import express, { Express } from "express";
import http from "http";
import dotenv from "dotenv";
import serveStatic from "serve-static";
import RiseactSDK from "@riseact/riseact-node-sdk";

const PORT = 3000;
dotenv.config();

async function createServer() {
  const app: Express = express();
  const server = http.createServer(app);

  // Create the Riseact SDK instance with the client ID and client secret generated from Riseact
  const riseact = await RiseactSDK({
    auth: {
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    },
  });

  app.enable("trust proxy");

  // Create the OAuth endpoints for Riseact and check if the user is authenticated
  app.use(riseact.auth.authMiddleware);

  // Create an endpoint for the GraphQL API that will proxy the request to Riseact
  app.use("/graphql", riseact.network.gqlRewriterHandler);

  /* ----------------------------- Your code here ----------------------------- */

  app.get("/api/hello", (req, res) => {
    res.send("Hello World!");
  });

  /* -------------------------------------------------------------------------- */

  if (process.env.NODE_ENV === "production") {
    app.use(serveStatic(`${process.cwd()}/frontend/dist`, { index: false }));
  } else {
    app.use(riseact.tools.devMiddleware);
    server.on("upgrade", riseact.tools.hmrProxyHandler);
  }

  server.listen(PORT, () => {
    console.log(`⚡️[app]: Server is running at http://localhost:${PORT}`);
  });
}

createServer();
