const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');
const validateObjectId = require('../middleware/validateObjectId');
const validateContact = require('../middleware/validateContact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single contact by id
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new contact
router.post('/', validateContact, async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const db = getDb();

    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    // Duplicate email, if you added a unique index on email
    if (err.code === 11000) {
      return res.status(409).json({ error: 'A contact with this email already exists.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an existing contact
router.put('/:id', validateObjectId, validateContact, async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const db = getDb();
    const contactId = new ObjectId(req.params.id);

    const result = await db.collection('contacts').updateOne(
      { _id: contactId },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully.' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'A contact with this email already exists.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE a contact
router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);

    const result = await db.collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;