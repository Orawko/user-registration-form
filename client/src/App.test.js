const {validateEmail, validatePassword} = require('./App');

test('Check if given email is valid', () => {
  const email = validateEmail("jakub@gmail.com");
  expect(email).toBe(true);
});

test('Check if the password meets given conditions', () => {
  const email = validatePassword("qwerty");
  expect(email).toBe(false);
});