const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


var corsOptions = {
    origin: "http://localhost:8081"
  };
  
  app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const movies = require("./controllers/movie.controller.js");

const movie1 = new db.movies({
    title: 'Inception',
    releaseDate: '2010',
    description: "Dom Cobb est un voleur expérimenté dans l'art périlleux de `l'extraction' : sa spécialité consiste à s'approprier les secrets les plus précieux d'un individu, enfouis au plus profond de son subconscient, pendant qu'il rêve et que son esprit est particulièrement vulnérable. Très recherché pour ses talents dans l'univers trouble de l'espionnage industriel, Cobb est aussi devenu un fugitif traqué dans le monde entier. Cependant, une ultime mission pourrait lui permettre de retrouver sa vie d'avant.",
    language: "Anglais",
    director: {
        name: "Christopher Nolan",
        nationality: "britannique",
        birthdayDate: "",
    },
    genre: "Science-Fiction",
    score: 2,
    urlPoster:"data:image/jpeg;base64,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",
});
movie1.save(movie1).then(data => {
    console.log('New movie in database')
})
.catch(err => {
    console.log(err);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome ! Hope you enjoy the app" });
});

require("./routes/movie.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});