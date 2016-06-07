import authRoutes from './routes/auth.router.js';
import shopRoutes from './routes/shop.router.js';
import productRoutes from './routes/product.router.js';
import cartRoutes from './routes/cart.router.js';
import orderRoutes from './routes/order.router.js';


export default (app, router, passport) => {

    console.log('router ...'); // DEBUG

  // ### Express Middlware to use for all requests
  router.use((req, res, next) => {

    console.log('I sense a disturbance in the force...'); // DEBUG

    // Make sure we go to the next routes and don't stop here...
    next();
  });

  // Define a middleware function to be used for all secured routes
  let auth = (req, res, next) => {

    //if (!req.isAuthenticated())
    //  res.send(401);

    //else
      next();
  };

  // Define a middleware function to be used for all secured administration
  // routes
  let admin = (req, res, next) => {

    //if (!req.isAuthenticated() || req.user.role !== 'admin')
    //  res.send(401);

    //else
      next();
  };

  // ### Server Routes

  // Handle things like API calls,

  // #### Authentication routes

  // Pass in our Express app and Router.
  // Also pass in auth & admin middleware and Passport instance
  authRoutes(app, router, passport, auth, admin);

  // #### RESTful API Routes

  // Pass in our Express app and Router
    shopRoutes(app, router);

	productRoutes(app, router);
  
  cartRoutes(app, router);
  orderRoutes(app, router);
  console.log('Router Changes');
  //productRoutes(app, router);
  
  //shopRoutes(app, router);
  

	// All of our routes will be prefixed with /api
	app.use('/api', router);

  // ### Frontend Routes

  // Route to handle all Angular requests
  app.get('*', (req, res) => {

    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    res.sendFile('/dist/index.html', { root: __dirname + "/../"});
  });
};
