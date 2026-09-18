const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Checks that all contact fields are present and reasonably formatted
// before we ever try to write to the database.
const validateContact = (req, res, next) => {
  const errors = [];
  const { email, birthday } = req.body;

  REQUIRED_FIELDS.forEach((field) => {
    const value = req.body[field];
    if (value === undefined || value === null || value.toString().trim() === '') {
      errors.push(`${field} is required`);
    }
  });

  if (email && !EMAIL_REGEX.test(email)) {
    errors.push('email must be a valid email address');
  }

  if (birthday && isNaN(new Date(birthday).getTime())) {
    errors.push('birthday must be a valid date');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = validateContact;