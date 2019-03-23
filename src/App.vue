<template>
  <div id="app">
    <h1>Images from <b>Curiosity</b> rover from yesterday ({{today.getFullYear()}} / {{today.getMonth() + 1}} / {{today.getDate() - 1}})</h1>
    <ImageComponent v-for="image in images" :key="image.id" :title="image.camera.full_name" :url="image.img_src" />
  </div>
</template>

<script>
import ImageComponent from './components/Image.vue';
import axios from 'axios';

const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';
const endpoint = 'rovers/curiosity/photos';
const apiKey = 'h7J2ZGwupdhbIPmMtxf7tZAFfpOq09Qf13NbkW8g';
const now = new Date();
const requestUrl = `${baseUrl}${endpoint}?earth_date=${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}&api_key=${apiKey}`;

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
    axios
      .get(requestUrl)
      .then(response => {
        this.images = response.data.photos;
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
