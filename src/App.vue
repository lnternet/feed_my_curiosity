<template>
  <div id="app">
    <h1>Mission manifest:</h1>
    <div class="mission_info">
      <span>
        <b>Rover:</b> {{manifest.name}}<br/>
        <b>Launched:</b> {{manifest.launch_date}}<br/>
        <b>Landed:</b> {{manifest.landing_date}}<br/>
        <b>Status:</b> {{manifest.status}}<br/>
        <b>Total amount of photos taken:</b> {{manifest.total_photos}}<br/>
        <b>Date of last set of photos:</b> {{manifest.max_date}}<br/>
      </span>
    </div>
    <br/>
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
      day: new Date().getDate() - 2,
      manifest: {
        name: null
      }
    }
  },
  mounted: function() {
    //Get mission manifest:
    this.getManifest();

    //Make HTTP request to API to retrieve list of images:
    this.refreshImages();
  },
  methods: {
    refreshImages: function() {
      ApiInterface.getImages(this.year, this.month, this.day).then(response => { this.images = response; });
    },
    getManifest: function() {
      ApiInterface.getMissionManifest().then(response => { this.manifest = response });
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
.mission_info {
  text-align: left;
  display: inline-block;
  margin-bottom: 100px;
}
</style>
