<template>
  <div id="app">
    <h1>Images from <b>Curiosity</b> rover from yesterday ({{today.getFullYear()}} / {{today.getMonth() + 1}} / {{today.getDate() - 1}})</h1>
    <ImageComponent v-for="image in images" :key="image.id" :title="image.camera.full_name" :url="image.img_src" />
  </div>
</template>

<script>
import ImageComponent from './components/Image.vue';
import * as ApiInterface from './api_interface.js'; 

const now = new Date();

export default {
  name: 'app',
  components: {
    ImageComponent
  },
  data: function() {
    return {
      images: null,
      today: now
    }
  },
  mounted: function() {
    //Make HTTP request to API to retrieve list of images:
    ApiInterface.getImages().then(response => {
      this.images = response;
    });
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
</style>
