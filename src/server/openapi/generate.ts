import { writeFileSync } from "node:fs";
import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry";

const generator = new OpenApiGeneratorV31(registry.definitions);

const document = generator.generateDocument({
  openapi: "3.1.0",
  info: { title: "To-Do API", version: "1.0.0" },
});

writeFileSync("openapi.json", JSON.stringify(document, null, 2));
console.log("Wrote openapi.json");
