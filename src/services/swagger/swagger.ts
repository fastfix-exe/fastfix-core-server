import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fastfix API',
      description: 'Example of CRUD API ',
      version: '1.0.0',
    },
  },
  // looks for configuration in specified directories
  apis: [`${__dirname}/../../router.ts`],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec;