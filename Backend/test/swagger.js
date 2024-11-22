const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const express = require("express");
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Unified Event Planner",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./routes/testing.js"], // Update the path to the correct route file
};

const swaggerSpecs = swaggerJSDoc(options);
app.use(
  "/unified-event-planner",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpecs)
);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

/**
 * @swagger
 * /:
 * get:
 * summary: get is here
 */


app.get('/',(req, res) =>{
    res.status(200).send('GET REQ wkorking')
})