<template>
  <div id="displayMovie" class="box">
    <b-card
      :title="movie.title"
      :sub-title="movie.director.name"
      :img-src="movie.urlPoster"
      img-alt="Image"
      img-left
    >
      <b-card-text>
        {{ movie.description }}
      </b-card-text>
      <b-form-rating
        id="rating-5"
        variant="warning"
        style="width:100px"
        v-model="movie.score"
        stars="5"
        no-border
        readonly
        size="sm"
      ></b-form-rating>
      <br />
      <b-button @click="editMovie()" class="card-link">Modifier</b-button>
    </b-card>
    <!--<li v:if="movie" title="movie" v-on:click="showSynopsisMovie()" > 
          {{ movie.title }} sortie en {{ movie.year }} 
          <b-button v-on:click="editMovie()"> Modifier </b-button> 
          <b-button v-on:click="removeMovie()"> Supprimer </b-button> <br> 
          <p v-if="movie.showSynopsis"> Synopsis : <br> {{ movie.synopsis }} </p>
          </li> -->
  </div>
</template>

<script>
import MovieDataService from "../services/MovieDataService";

export default {
  name: "movieItem",
  props: ["movieId"],
  data() {
    return {
      movie: {}
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    MovieDataService.get(this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.movie = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    removeMovie() {
      this.$emit("remove");
      //this.movies.splice(this.movies.indexOf(movie), 1);
    },
    editMovie() {
      this.$router.push({
        name: "edit-movie",
        params: {
          id: this.movie._id
        }
      });
    },
    showSynopsisMovie() {
      this.movie.showSynopsis = !this.movie.showSynopsis;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  margin: 200px auto;
  width: 60em;
}
</style>
