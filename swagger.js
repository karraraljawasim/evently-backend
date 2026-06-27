import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerModelValidator from "swagger-model-validator";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config/env.js";

const router = Router();

const option = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Evently",
      version: "1.0.0",
      description: "Evently API documentation",
    },
    tags: [
      {
        name: "auth",
        description: "Auth API",
      },
      {
        name: "attendee",
        description: "Attendee API",
      },
      {
        name: "organizer",
        description: "Organizer API",
      },
    ],
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
          description: "JWT key authorization for API",
        },
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "API key authorization for API",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(option);
swaggerModelValidator(swaggerSpec);

router.get("/json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
