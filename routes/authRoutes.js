//packages
import express from "express";
import rateLimit from "express-rate-limit";
//files
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//Ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

//object
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:            # <-- should be 'schemas', not 'schema'
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id by MongoDB for documents
 *         name:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User password (minimum 6 characters)
 *         location:
 *           type: string
 *           description: User location (city or country)
 *       example:
 *         id: 64f9bcdad6c3a9f2e9d8a321
 *         name: John
 *         lastName: Lee
 *         email: john@gmail.com
 *         password: john@123
 *         location: Canada
 *
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID by MongoDB
 *         company:
 *           type: string
 *           description: Name of the company offering the job
 *         position:
 *           type: string
 *           description: Job position or title
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - rejected
 *             - interview
 *           description: Current status of the job application
 *           default: pending
 *         workType:
 *           type: string
 *           enum:
 *             - full-time
 *             - part-time
 *             - internship
 *             - contract based
 *           description: Type of employment
 *           default: full-time
 *         workLocation:
 *           type: string
 *           description: Location of the job
 *           default: Mumbai
 *         createdBy:
 *           type: string
 *           description: MongoDB ObjectId of the user who created this job
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Time when the job entry was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Time when the job entry was last updated
 *       example:
 *         id: 64f9bcdad6c3a9f2e9d8a456
 *         company: Google
 *         position: Software Engineer
 *         status: interview
 *         workType: full-time
 *         workLocation: Bengaluru
 *         createdBy: 64f9bcdad6c3a9f2e9d8a123
 *         createdAt: 2025-10-24T10:30:00Z
 *         updatedAt: 2025-10-24T12:00:00Z
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: John
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: john@123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated requests
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

//REGISTER || POST
router.post("/register", limiter, registerController);

//LOGIN || POST
router.post("/login", limiter, loginController);

//export
export default router;
