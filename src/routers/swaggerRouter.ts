import express from 'express';

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fastfix API',
      description: 'Fastfix core service',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  // looks for configuration in specified directories
  apis: [`${__dirname}/*.js`],
}
const swaggerSpec = swaggerJsdoc(options)
const router = express.Router();


// Swagger Page
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Documentation in JSON format
router.get('/docs.json', (req: any, res: any) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

export const swaggerRouter = router;