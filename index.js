const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

let lastResult = null;

app.get('/', (req, res) => {
  res.render('home', { output: lastResult });
});

app.post('/compute', (req, res) => {
  const { x, y, op } = req.body;
  const num1 = parseFloat(x);
  const num2 = parseFloat(y);

  switch (op) {
    case '+':
      lastResult = num1 + num2;
      break;
    case '-':
      lastResult = num1 - num2;
      break;
    case '*':
      lastResult = num1 * num2;
      break;
    case '/':
      lastResult = num2 !== 0 ? num1 / num2 : 'Error: Divide by zero';
      break;
    default:
      lastResult = 'Invalid operation';
  }

  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
