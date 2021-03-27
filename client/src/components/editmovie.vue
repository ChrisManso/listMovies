<template>
  <div id="addMovie">
    <b-alert :show="success" variant="success"
      ><a href="#" class="alert-link"
        >{{ this.movie.title }} ajouté à la base</a
      ></b-alert
    >
    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Titre du film</b></b-input-group-text
        >
      </template>
      <b-form-input v-model="movie.title"></b-form-input>
    </b-input-group>

    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Année de sortie</b></b-input-group-text
        >
      </template>
      <b-form-input v-model="movie.releaseDate"></b-form-input>
    </b-input-group>

    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Nom du réalisateur</b></b-input-group-text
        >
      </template>
      <b-form-input v-model="movie.director.name"></b-form-input>
    </b-input-group>

    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Nationalité</b></b-input-group-text
        >
      </template>
      <b-form-input v-model="movie.director.nationality"></b-form-input>
    </b-input-group>

    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Date de naissance</b></b-input-group-text
        >
      </template>
      <b-form-datepicker
        v-model="movie.director.birthdayDate"
        placeholder="Choissisez une date"
        dark
        locale="fr"
      ></b-form-datepicker>
    </b-input-group>

    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Langue</b></b-input-group-text
        >
      </template>
      <b-form-input v-model="movie.language"></b-form-input>
    </b-input-group>

    <b-input-group size="sm" class="inputGroupSynopsis">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Synopsis</b></b-input-group-text
        >
      </template>
      <b-form-textarea
        rows="3"
        max-rows="10"
        v-model="movie.synopsis"
      ></b-form-textarea>
    </b-input-group>

    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput"
          ><b>Genre (Science-Fiction, Historique etc...)</b></b-input-group-text
        >
      </template>
      <b-form-input v-model="movie.genre"></b-form-input>
    </b-input-group>

    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput" required
          ><b>Url du poster (en option)</b></b-input-group-text
        >
      </template>
      <b-form-input v-model="movie.urlPoster" :type="url"></b-form-input>
    </b-input-group>
    <b-input-group size="sm" class="inputGroup">
      <template #prepend>
        <b-input-group-text class="groupTextInput" required
          ><b>Note du téléspéctateur</b></b-input-group-text
        >
      </template>
      <b-form-rating
        id="rating-10"
        v-model="movie.score"
        stars="5"
      ></b-form-rating>
    </b-input-group>
    <button @click="saveMovie" class="btn btn-success">Ajouter</button>
  </div>
</template>
<script>
import MovieDataService from "../services/MovieDataService";
export default {
  name: "editMovie",
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
    saveMovie() {
      let dataMovie = { ...this.movie };
      MovieDataService.update(this.movie._id, dataMovie)
        .then(response => {
          console.log(response.data);
          this.success = 2;
        })
        .catch(e => {
          console.log(e);
        });
      this.$router.push({
        name: "movies"
      });
    }
  }
};
</script>
<style scoped>
#movieEdit {
  display: flex;
  margin: 100px auto;
  width: 60em;
}
.inputGroup {
  margin: 1em auto;
  width: 60em;
}
.groupTextInput {
  background-color: orange;
}
.inputGroupSynopsis {
  margin: 1em auto;
  width: 60em;
  height: auto;
}
.btn-success {
  display: flex;
  margin: auto;
  width: auto;
}
#addButton {
  margin: 50px auto;
  display: flex;
  width: auto;
  text-align: center;
  background-color: green;
}
p {
  margin: 50px auto;
  text-align: center;
  color: white;
  font-size: 30px;
}
</style>
