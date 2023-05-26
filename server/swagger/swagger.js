const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    info: {
      title: "Your API Name",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    basePath: "/", // Specify the base path of your API
    securityDefinitions: {
      BearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
  apis: [
    "./routes/*.js",
    "./swagger/swaggerPdf.js",
    "./swagger/swaggerUser.js",
    "./swagger/swaggerFavorite.js",
    "./swagger/swaggerBook.js",
    "./swagger/swaggerUserHistory.js",
    "./swagger/swaggerMembership.js",
    "./swagger/swaggerReview.js",
    "./swagger/swaggerAuthor.js",
    "./swagger/swaggerAuth.js",
    "./swagger/swaggerFaq.js",
    "./swagger/swaggerCategories.js",
    "./swagger/swaggerTransaction.js",
    "./swagger/swaggerAdmin.js",
    "./swagger/swaggerUserDetails.js", // Include the path to swaggerUser.js
  ], // Include the path to the swaggerPDF.js file
  tags: [
    {
      name: "Books",
      description: "Endpoints related to books",
    },
    {
      name: "Users",
      description: "Endpoints related to users",
    },
    // Add more tags for other API categories as needed
  ],
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
};
