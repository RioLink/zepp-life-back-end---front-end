const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const prisma = require('./database');
const notFoundMiddleware = require('./notFoundMiddleware');
const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors()); // обмежити оріджини в майбутньому

app.use(
  expressSession({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    prisma.user
      .findUnique({
        where: { username: username },
      })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        if (password !== user.password) {
          return done(null, false);
        }

        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  prisma.user
    .findUnique({
      where: { id: id },
    })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    prisma.user
      .findUnique({
        where: { username: username },
      })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
      .catch((err) => {
        return done(err);
      });
  })
);

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/account');
});

app.get('/account', (req, res) => {
  res.send('Ласкаво просимо у ваш аккаунт, ' + req.user.username);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send('ZEPP-LIFE');
});

app.use(express.json());
app.use('/api', require('./routes/userRoutes'));

app.post('/api/saveWorkout', async (req, res) => {
  const { userId, workoutData } = req.body;

  try {
    await prisma.userStats.create({
      data: {
        userId: userId,
        ...workoutData,
      },
    });

    res.status(201).json({ message: 'Дані тренування успішно збережені' });
  } catch (error) {
    console.error('Виникла помилка при збереженні даних', error);
    res.status(500).json({ error: 'Виникла помилка при збереженні даних' });
  }
});


app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json({ userId, username: 'exampleUser', email: 'example@example.com' });
});

app.put('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body; 
  res.json({ message: 'Дані користувача успішно збережені' });
});

app.delete('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json({ message: 'Користувач успішно видалено' });
});


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});