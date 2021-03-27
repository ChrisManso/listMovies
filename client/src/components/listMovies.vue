<template>
  <div id="listMovie">
    <div
      v-for="subSectionmovies in listeMovies"
      :key="subSectionmovies[0].title"
      class="row"
    >
      <div
        class="col-sm-3 rowMovies"
        v-for="movie in subSectionmovies"
        :key="movie._id"
      >
        <b-card-group v-if="movie">
          <b-card
            border-variant="primary"
            :header="movie.title"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
          >
            <b-card-text
              >Réalisé par {{ movie.director.name }}, sortie en
              {{ new Date(movie.releaseDate).getFullYear() }}</b-card-text
            >
            <b-button-group>
              <b-button
                variant="success"
                v-on:click.self="movieSelected(movie._id)"
                >Editer</b-button
              >
              <b-button
                variant="danger"
                v-on:click.self="deleteMovie(movie._id)"
                >Supprimer</b-button
              >
            </b-button-group>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>
<script>
//import StarRating from 'vue-star-rating';
import MovieDataService from "../services/MovieDataService";

export default {
  name: "listMovie",
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      listeMovies: []
    };
  },
  components: {},
  mounted() {
    this.refreshMovies();
  },
  methods: {
    refreshMovies() {
      this.listeMovies = [];
      MovieDataService.getAll()
        .then(response => {
          console.log(response.data);
          //Need to be better but i can't right now
          for (let i = 0; i < response.data.length; i = i + 3) {
            console.log(response.data[response.data.length - 1].director.name);
            this.listeMovies.push([
              response.data[i],
              response.data[i + 1] ? response.data[i + 1] : "",
              response.data[i + 2] ? response.data[i + 2] : ""
            ]);
          }
          console.log(this.listeMovies);
        })
        .catch(err => {
          console.log(err);
        });
    },
    movieSelected(movieId) {
      this.$router.push({
        name: "movie-details",
        params: {
          id: movieId
        }
      });
    },
    deleteMovie(movieId) {
      MovieDataService.delete(movieId)
        .then(response => {
          this.refreshMovies();
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
      this.refreshMovies();
    }
  }
};
</script>
<style lang="scss">
#listMovie {
  margin: 100px auto;
  width: 80m;
}
.rowMovies {
  padding-top: 30px;
  margin: auto;
}
</style>
