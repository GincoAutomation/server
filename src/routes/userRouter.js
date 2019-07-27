const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');

const { ObjectId } = require('mongodb');
const db = require('../database');

// User router
router
  .route('/users')
  .get(
    asyncHandler(async (req, res) => {
      const docs = await db
        .collection('users')
        .find({})
        .limit(50)
        .toArray();
      const total = await db.collection('users').countDocuments();
      res.json({
        results: docs,
        nr: docs.length,
        total
      });
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      // TODO validate input (req.body)
      const result = await db.collection('users').insertOne(req.body);
      res.json({ status: 'inserted', id: result.insertedId });
    })
  );

router
  .route('/user/:id')
  .get(
    asyncHandler(async (req, res) => {
      const doc = await db.collection('users').findOne(ObjectId(req.params.id));
      if (doc) res.json(doc);
      else res.status(404).send(`Id ${req.params.id} could not be found`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      delete req.body._id; // do not update _id
      const result = await db.collection('users').updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
      if (result.modifiedCount == 1) res.json({ status: 'updated', id: req.params.id });
      else res.status(404).send(`Id ${req.params.id} could not be found`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const result = await db.collection('users').deleteOne({ _id: ObjectId(req.params.id) });
      if (result.deletedCount == 1) res.json({ status: 'deleted', id: req.params.id });
      else res.status(404).send(`Id ${req.params.id} could not be found`);
    })
  );

module.exports = router;
