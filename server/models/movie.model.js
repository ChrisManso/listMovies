module.exports = mongoose => {
    var movie = mongoose.Schema(
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
          },
          title: String,
          releaseDate: Date,
          description: String,
          language: String,
          director: {
              name: String,
              nationality: String,
              birthdayDate: Date,
          },
          genre: String,
          urlPoster: String,
          score: Number,
        },
        { timestamps: true }
      )
    const Movie = mongoose.model("movie",movie);
  
    return Movie;
  };