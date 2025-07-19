const express = require('express');
const Bookmark = require('../models/Bookmark');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Save new bookmark
router.post('/', authenticate, async (req, res) => {
  try {
    const existing = await Bookmark.findOne({
      user: req.user.id,
      'article.url': req.body.url,
    });

    if (existing) {
      return res.status(400).json({ message: 'Already bookmarked' });
    }

    const bookmark = new Bookmark({
      user: req.user.id,
      article: req.body, // directly use req.body
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save bookmark' });
  }
});

// Get all bookmarks for the user
router.get('/', authenticate, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id });
    const articles = bookmarks.map((b) => b.article); // extract only article
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
});

// Delete bookmark by article URL
router.delete('/', authenticate, async (req, res) => {
  try {
    const result = await Bookmark.findOneAndDelete({
      user: req.user.id,
      'article.url': req.body.url,
    });

    if (!result) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete bookmark' });
  }
});

module.exports = router;
