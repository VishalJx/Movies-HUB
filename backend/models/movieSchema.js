const movieSchema = {

  title: { type: 'string', required: true },
  genre: { type: 'string', required: true },
  year: { type: 'string', required: true },

};
module.exports = movieSchema;