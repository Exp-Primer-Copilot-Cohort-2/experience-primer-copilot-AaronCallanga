//Create web server
//Create API
//Create a comment
//Read the comments
//Update a comment
//Delete a comment
//Comment = {id: 1, body: "some text", postId: 1, createdAt: new Date(), updatedAt: new Date()}

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();
app.use(bodyParser.json());

// Database
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
});

// Model
const Comment = db.define('comment', {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Create a comment
app.post('/comments', async (req, res) => {
    const comment = await Comment.create(req.body);
    res.json(comment);
});

// Read the comments
app.get('/comments', async (req, res) => {
    const comments = await Comment.findAll();
    res.json(comments);
});

// Update a comment
app.put('/comments/:id', async (req, res) => {
    await Comment.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ success: true });
});

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
    await Comment.destroy({
        where: { id: req.params.id }
    });
    res.json({ success: true });
});

// Sync Database
const init = async () => {
    await db.sync({ force: true });
    await Comment.bulkCreate([
        { body: 'Comment 1' },
        { body: 'Comment 2' },
        { body: 'Comment 3' }
    ]);
    app.listen(1337, () => {
        console.log('Server listening on port 1337');
    });
};

init();