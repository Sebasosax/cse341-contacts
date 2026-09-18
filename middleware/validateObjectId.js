const { ObjectId } = require('mongodb');

// Rejects the request early if :id in the URL isn't a valid MongoDB ObjectId.
const validateObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: `Invalid contact id: ${req.params.id}` });
  }
  next();
};

module.exports = validateObjectId;