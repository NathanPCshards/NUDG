
/*
const express = require("express");
const app = express.Router();


export {app as routes};

app.get('/', (req,res) =>{
  res.send([{hello: 'world'}]);
})

app.get('/users', (req,res) => res.send([]));

app.post('/users', (req,res) => res.send({body:req.body}));


//Router -------------------------------------------------------------------------------------
function createRouter(db) {
  const router = express.Router();
  const owner = '';
  // the routes are defined here

  router.post('/event', (req, res, next) => {
    console.log("Router Post request in routes.ts")
    db.query(
      'INSERT INTO events (owner, name, description, date) VALUES (?,?,?,?)',
      [owner, req.body.name, req.body.description, new Date(req.body.date)],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/event', function (req, res, next) {
    console.log("Router Get request in routes.ts")

    db.query(
      'SELECT id, name, description, date FROM events WHERE owner=? ORDER BY date LIMIT 10 OFFSET ?',
      [owner, 10*(Number(req.params.page) || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/event/:id', function (req, res, next) {
    console.log("Router Put request in routes.ts")

    db.query(
      'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/event/:id', function (req, res, next) {
    console.log("Router Delete request in routes.ts")

    db.query(
      'DELETE FROM events WHERE id=? AND owner=?',
      [req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}
//-------------------------------------------------------------------------------------------------------

module.exports = createRouter;

*/