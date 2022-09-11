import express from 'express';

import swaggerSpec from '../services/swagger/swagger';
import * as swaggerUi from 'swagger-ui-express';

const router = express.Router();


// Swagger Page
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Documentation in JSON format
router.get('/docs.json', (req: any, res: any) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

export const swaggerRouter = router;