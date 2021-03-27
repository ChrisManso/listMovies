<template>
  <div id="addMovie">
    <b-alert :show="success" variant="success"
      ><a href="#" class="alert-link"
        >{{ this.movie.title }} ajouté à la base</a
      ></b-alert
    >
    <b-input-group size="sm" style="marginTop: 100px" class="inputGroup">
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
      <b-form-input v-model="this.movie.urlPoster" :type="url"></b-form-input>
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
  name: "addMovie",
  data() {
    return {
      movie: {
        title: "",
        releaseDate: "",
        description: "",
        language: "",
        director: {
          name: "",
          nationality: "",
          birthdayDate: ""
        },
        genre: "",
        urlPoster: "",
        score: 2
      },
      success: 0
    };
  },
  methods: {
    saveMovie() {
      console.log({ ...this.movie });
      let dataMovie = { ...this.movie };
      MovieDataService.create(dataMovie)
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
#addMovie {
  max-width: 40em;
  margin: auto;
}
.inputGroup {
  margin: 2em auto;
}
.groupTextInput {
  background-color: #f1ba53;
}
</style>
