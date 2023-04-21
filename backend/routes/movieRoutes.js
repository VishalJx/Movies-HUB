const express = require('express');
const router = express.Router();
const { getDb } = require('../mongoDB');
const { ObjectId } = require('mongodb');
const movieSchema = require('../models/movieSchema');
const db = require('../mongoDB');


//to post a movie
router.post('/addMovie', async (req, res) => {
    const db = getDb();
    const {id, title, genre, year } = req.body;
    const movie = { _id:new ObjectId(id), title, genre, year };
  
    // validate movie object against movieSchema
    for (const field in movieSchema) {
      if (movieSchema[field].required && !movie[field]) {
        return res.status(400).json({message:`${field} is required`});
      }
      if (typeof movie[field] !== movieSchema[field].type) {
        return res.status(400).json({message:`${field} should be of type ${movieSchema[field].type}`});
      }
    }
  
    try {
      const result = await db.collection('movies').insertOne(movie);
      res.json(`Successfully added movie: ${title}`);
    } catch (err) {
      res.status(500).json({message:'Error adding movie to database'});
    }
  });



//to get all the list of movies from database
router.get('/getMovies', async (req, res) => {
    const db = getDb();
  
    try {
      const movies = await db.collection('movies').find().toArray();
      res.send(movies);
    } catch (err) {
      res.status(500).send('Error retrieving movies from database');
    }
  });



//to get a particular movie from database using id
router.get('/getMovie/:id', async (req, res) => {
    const { id } = req.params;
    let movie;
    const db = getDb();

    try {
      movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.error(`Error retrieving movie with id ${id} from database: ${err}`);
      return res.status(500).send('Error retrieving movie from database');
    }
  
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
  
    res.send(movie);
  });


//to get paginated movies from database
router.get('/getPage', async (req, res) => {
  const { page = 1, size = 10 } = req.query; // default to page 1 and 10 items per page
  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;
  const db = getDb();

  try {
    const movies = await db.collection('movies').find().skip(skip).limit(limit).toArray();
    const totalMovies = await db.collection('movies').countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      movies,
      totalPages,
      currentPage: parseInt(page),
      itemsPerPage: limit,
      totalItems: totalMovies,
    });
  } catch (error) {
    console.error(`Error retrieving movies from database: ${error}`);
    res.status(500).send('Error retrieving movies from database');
  }
});

module.exports = router;