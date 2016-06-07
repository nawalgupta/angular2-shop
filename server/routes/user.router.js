// ```
// _user.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _user.js may be freely distributed under the MIT license
// ```

// */app/routes/_user.router.js*

// ## user API object

// HTTP Verb  Route                 Description

// GET        /api/user             Get all of the user items
// GET        /api/user/:user_id    Get a single user item by user item id
// POST       /api/user             Create a single user item
// DELETE     /api/user/:user_id    Delete a single user item
// PUT        /api/user/:user_id    Update a user item with new info

// Load the user model
import user from '../models/user.model';

export default (app, router) => {

  // ### user API Routes

  // Define routes for the user item API

  router.route('/user')

    // ### Create a user item

    // Accessed at POST http://localhost:8080/api/user

    // Create a user item
    .post((req, res) => {

      user.create({
          // todo check pk
        email : req.body.email,
        username : req.body.email,
        password: req.body.password
        

      }, (err, user) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`user created: ${user}`);

        user.find((err, users) => {
          if(err)
            res.send(err);

          res.json(users);
        });
      });
    })

    // ### Get all of the user items

    // Accessed at GET http://localhost:8080/api/user
    .get((req, res) => {

      // Use mongoose to get all user items in the database
      user.find((err, user) => {

        if(err)
          res.send(err);

        else
          res.json(user);
      });
    });

  router.route('/user/:user_id')

    // ### Get a user item by ID

    // Accessed at GET http://localhost:8080/api/user/:user_id
    .get((req, res) => {

      // Use mongoose to a single user item by id in the database
      user.findOne(req.params.user_id, (err, user) => {

        if(err)
          res.send(err);

        else
          res.json(user);
      });
    })

    // ### Update a user item by ID

    // Accessed at PUT http://localhost:8080/api/user/:user_id
    .put((req, res) => {

      // use our user model to find the user item we want
      user.findOne({

        '_id' : req.params.user_id

      }, (err, user) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.text)
          user.text = req.body.text;
// Only update a field if a new value has been passed in
        if (req.body.amount)
          user.amount = req.body.amount;

        // save the user item
        return user.save((err) => {

          if (err)
            res.send(err);

          return res.send(user);

        });
      });
    })

    // ### Delete a user item by ID

    // Accessed at DELETE http://localhost:8080/api/user/:user_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete user with id: ${req.params.user_id}`);

      user.remove({

        _id : req.params.user_id
      }, (err, user) => {

        if(err)
          res.send(err);

        console.log('user successfully deleted!');

        user.find((err, users) => {
          if(err)
            res.send(err);

          res.json(users);
        });
      });
    });
};
