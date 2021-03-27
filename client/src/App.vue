<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" fixed="top">
      <b-navbar-nav>
        <b-nav-item :to="{ path: '/#/' }">Home</b-nav-item>
        <b-nav-item :to="{ path: '/#/add/movie/' }">Ajouter</b-nav-item>
        <!-- Navbar dropdowns -->
      </b-navbar-nav>
    </b-navbar>
    <div class="container mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      columnDefs: null,
      rowData: null,
      message: "Mes films préférés de la vie:",
      nameMovie: "",
      yearMovie: "",
      directorMovie: "",
      synopsisMovie: "",
      searchMovie: "",
      movies: [
        {
          title: "Inception",
          year: 2010,
          director: "Nolan",
          synopsis: "C'est des rêves.",
          showSynopsis: false
        },
        {
          title: "Star Wars",
          year: 1977,
          director: "Lucas",
          synopsis: "Bataille dans l'espace.",
          showSynopsis: false
        }
      ]
    };
  },
  beforeMount() {
    this.columnDefs = [
      { field: "make" },
      { field: "model" },
      { field: "price" }
    ];

    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ];
  },
  methods: {
    addMovieHandler(movie) {
      this.movies.push({
        title: movie.nameMovie,
        year: movie.yearMovie,
        director: movie.directorMovie,
        synopsis: movie.synopsisMovie,
        showSynopsis: false
      });
    },
    removeMovieHandler(movie) {
      var index = this.movies.indexOf(movie);
      if (index > -1) {
        this.movies.splice(index, 1);
      }
    },
    editMovieHandler(movie) {
      (this.nameMovie = movie.title),
        (this.yearMovie = movie.year),
        (this.directorMovie = movie.director),
        (this.synopsisMovie = movie.synopsis),
        this.movies.splice(this.movies.indexOf(movie), 1);
    },
    showSynopsisMovieHandler(movie) {
      movie.showSynopsis = !movie.showSynopsis;
    }
  },
  computed: {
    countMovies() {
      return this.movies.length;
    },
    filterMovies() {
      return this.movies.filter(movie => {
        return (
          movie.title.toLowerCase().includes(this.searchMovie) ||
          movie.year.toString().includes(this.searchMovie) ||
          movie.director.toLowerCase().includes(this.searchMovie)
        );
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#img-logo {
  text-align: center;
}
</style>
