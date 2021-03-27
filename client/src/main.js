import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import VueRouter from 'vue-router'
import movieItem from './components/movieitem.vue'
import editMovie from './components/editmovie.vue'
import listMovie from './components/listMovies.vue'
import addMovie from './components/addMovie.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(VueRouter);

//object to share (movie)
window.shared_data = {
  moviesShared: [
    {
        title : "Inception",
        year : 2010,
        director : {
          firstName: "Nolan",
          lastName: "Christopher",
          nationality: "Canadien",
          birthdayDate: new Date("10/05/1996")
        },
        synopsis : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel ante quis est dignissim tincidunt. Sed metus nisi, tempor eget vulputate eget, egestas sodales leo. Donec orci libero, sagittis ultricies lacus ut, tincidunt congue dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris nec facilisis purus, vel auctor tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam consectetur, velit in imperdiet ullamcorper, leo mi feugiat quam, nec cursus arcu ipsum id tortor. Pellentesque eu risus dapibus tortor pharetra condimentum ac id justo. Cras eu finibus eros. Duis sit amet ornare purus. Nullam sagittis blandit nulla, et consectetur mauris fermentum sit amet. Aenean ac magna venenatis, ultrices velit non, accumsan odio. Sed leo eros, porttitor sed sapien quis, finibus tincidunt sem. ",
        language: "Anglais",
        showSynopsis: false,
        score: 0,
        category: "Science-Fiction",
        imgUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRhJNaN0nQi5oaoWPNzCEDgc-bXdofmz6LT7GbxjoukjWSgC-p"
    },
    {
        title : "Star Wars",
        year : 1977,
        director : {
          firstName: "Lucas",
          lastName: "George",
          nationality: "Americain",
          birthdayDate: new Date("20/05/1996"),
        },
        synopsis : "Bataille dans l'espace.",
        score: 3, 
        showSynopsis: false,
    }
],
}
const router = new VueRouter({
  routes: [
    { 
      path: '/', 
      name: 'movies',
      component: listMovie
    },
    { 
      path: '/movie/:id',
      name: 'movie-details',
      component: movieItem,
      props: true,
    },
    { 
      path: '/movie/:id/edit', 
      name: 'edit-movie',
      component: editMovie,
      props: true,
    },
    { 
      path: '/add/movie/', 
      name: 'add-movie',
      component: addMovie,
    },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
