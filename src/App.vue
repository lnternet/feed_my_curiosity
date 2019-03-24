<template>
  <div id="app">
    Year:<input v-model="year"> Month:<input v-model="month"> Day:<input v-model="day"><button v-on:click="refreshImages()">Show</button>
    <h1>Images from <b>Curiosity</b> rover from {{year}} / {{month}} / {{day}}</h1>
    <ImageComponent v-for="image in images" :key="image.id" :title="image.camera.full_name" :url="image.img_src" />
  </div>
</template>

<script>
import ImageComponent from './components/Image.vue';
import * as ApiInterface from './api_interface.js'; 

export default {
  name: 'app',
  components: {
    ImageComponent
  },
  data: function() {
    return {
      images: null,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate() - 2
    }
  },
  mounted: function() {
    //Make HTTP request to API to retrieve list of images:
    this.refreshImages();
  },
  methods: {
    refreshImages: function() {
      ApiInterface.getImages(this.year, this.month, this.day).then(response => {
        this.images = response;
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Courier New', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  margin-left: 20px;
}
</style>
