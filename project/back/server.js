const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const path = require("path");

// Import routes
const authRoutes = require('./routes/authRoutes');
const quizzezRoute = require('./routes/quizzezRoute');
const lessonRout = require('./routes/lessonRoute');
const materialRoute = require('./routes/materialRoutes');
const savedQuizRoutes = require('./routes/savedQuizTeacherRoutes');
const classRoutes = require('./routes/classRoute');
const authRoutsStudent = require('./routes/authRoutsStudent');
const studentMaterialRoutes = require('./routes/studentMaterialRoutes');
const tasksRouter = require('./routes/tasksRoutes');
const teacherProfileRoutes = require('./routes/teacherProfileRoutes');
const teacherConsultantRoutes = require('./routes/teacherConsultantRoutes');
const consultantAvailabilityRoute = require('./routes/consultantAvailabilityRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const authAdmin = require('./routes/adminAuth');
const payment = require('./routes/payment')

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' , 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
  maxAge: 600
};

// Security configuration
const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "http://localhost:5173", "http://localhost:3000"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://www.paypal.com",
        "https://*.paypal.com"
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "http://localhost:3000", "https://localhost:3000", "blob:", "https://*.paypal.com"],
      connectSrc: [
        "'self'",
        "http://localhost:3000",
        "http://localhost:5173",
        "ws://localhost:5173",
        "https://*.paypal.com"
      ],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'", "https://*.paypal.com"],
      baseUri: ["'self'"],
      formAction: ["'self'", "https://*.paypal.com"],
      childSrc: ["'self'", "https://*.paypal.com"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  noSniff: true,
  dnsPrefetchControl: { allow: false },
  frameguard: false, // Disable frameguard as PayPal needs to load in an iframe
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  xssFilter: true
};

// Apply middleware
app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

// Serve static files with proper headers
app.use('/uploads', (req, res, next) => {
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Apply routes
app.use('/api', authRoutes);
app.use('/api', materialRoute);
app.use('/api', quizzezRoute);
app.use('/api', savedQuizRoutes);
app.use('/api', lessonRout);
app.use('/api', classRoutes);
app.use('/api', authRoutsStudent);
app.use('/api', studentMaterialRoutes);
app.use('/api', tasksRouter);
app.use('/api', teacherProfileRoutes);
app.use('/api', teacherConsultantRoutes);
app.use('/api', consultantAvailabilityRoute);
app.use('/api', appointmentRoute);
app.use('/api', payment);
app.use('/api/admin', authAdmin);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.get('/users', async (req, res, next) => {
  try {
    const users = await db('user').select('*');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;




// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const helmet = require("helmet");
// require("dotenv").config();
// const knex = require("knex");
// const knexConfig = require("./knexfile");
// const db = knex(knexConfig.development);
// const authRoutes = require('./routes/authRoutes')
// const quizzezRoute = require('./routes/quizzezRoute')
// const lessonRout = require('./routes/lessonRoute')
// const materialRoute = require('./routes/materialRoutes')
// const savedQuizRoutes = require('./routes/savedQuizTeacherRoutes')
// const classRoutes = require('./routes/classRoute')
// const authRoutsStudent = require('./routes/authRoutsStudent');
// const studentMaterialRoutes = require('./routes/studentMaterialRoutes')
// const tasksRouter = require('./routes/tasksRoutes')
// const teacherProfileRoutes = require('./routes/teacherProfileRoutes')
// const teacherConsultantRoutes = require('./routes/teacherConsultantRoutes')
// const consultantAvailabilityRoute = require('./routes/consultantAvailabilityRoute')
// const appointmentRoute = require('./routes/appointmentRoute')
// const authAdmin = require('./routes/adminAuth')


// const app = express();

// // Middleware
// app.use(cors({
//   origin: ["http://localhost:5173"],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
//   credentials: true,
//   exposedHeaders: ['set-cookie'],
//   maxAge: 600
// }));

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'"],
//         imgSrc: ["'self'", "data:", "http://localhost:3000", "https://localhost:3000"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//         connectSrc: ["'self'", "http://localhost:3000"],
//         frameSrc: ["'self'"],
//       },
//     },
//   })
// );



// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(express.json());

// const path = require("path");
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


// //routes
// app.use('/api' , authRoutes);
// app.use('/api' , materialRoute)
// app.use('/api' , quizzezRoute)
// app.use('/api', savedQuizRoutes); 
// app.use('/api' , lessonRout )
// app.use('/api', classRoutes);
// app.use('/api', authRoutsStudent);
// app.use('/api', studentMaterialRoutes);
// app.use('/api', tasksRouter);
// app.use('/api', teacherProfileRoutes);
// app.use('/api', teacherConsultantRoutes);
// app.use('/api' ,consultantAvailabilityRoute)
// app.use('/api' , appointmentRoute)
// app.use('/api/admin' , authAdmin)




// app.get('/users', async (req, res) => {
//     try {
//       const users = await db('user').select('*'); // Get all user records
//       res.status(200).json(users); // Send the data as JSON response
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error fetching users' });
//     }
//   });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });