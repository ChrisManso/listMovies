const db = require("../models");
const Movie = db.movies;

// Create and Save a new Movie
exports.create = (req, res) => {
    console.log(req.body);

    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Movie
    const movie = new Movie({
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        description: req.body.description,
        language: req.body.language,
        director: {
            name: req.body.director.name,
            nationality: req.body.director.name,
            birthdayDate: req.body.director.birthdayDate,
        },
        genre: req.body.genre,
        score: req.body.score,
        urlPoster: req.body.url,
    });
    
    // Save Movie in the database
    movie.save(movie)
        .then(data => {
            console.log('New movie in database')
            res.send(data);
        })
        .catch(err => {
            console.log(err);
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Movie."
        });
        });
};


// Retrieve all Movies
exports.findAll = (req, res) => {
    Movie
        .find({})
        .then( data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Movies."
            })
        })
};

// Find a single Movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findOne({ _id: id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
};

// Update a Movie by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
            });
        } else res.send({ message: "Movie was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Movie with id=" + id
        });
        });
    };


// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Movie.deleteOne({_id: id})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
          });
        } else {
          res.send({
            message: "Movie was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Movie with id=" + id
        });
      });
  };

// };

