const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось создать пользователя' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось получить пользователей' });
  }
});

router.get('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось получить пользователя' });
  }
});

router.put('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось обновить пользователя' });
  }
});

router.delete('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: 'Пользователь удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Не удалось удалить пользователя' });
  }
});

module.exports = router;
