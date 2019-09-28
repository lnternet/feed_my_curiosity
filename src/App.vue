<template>
  <div id="app">
    <img id="logo" src="./assets/mars.svg" />
    <h1>Curiosity rover mission manifest</h1>
    <div class="mission_info">
      <span>
        <b>Launched from Earth:</b> {{manifest.launch_date}}<br/>
        <b>Landed on Mars:</b> {{manifest.landing_date}}<br/>
        <b>Current status:</b> {{manifest.status}}<br/>
        <b>Total amount of pictures taken:</b> {{manifest.total_photos}}<br/>
        <b>Last set of pictures received on:</b> {{manifest.max_date}}<br/>
      </span>
    </div>
    <br/>
    <hr>
    <p>View what pictures Curiosity rover made on any specific date using input fields below:</p>
    Year:<input v-model="year"> Month:<input v-model="month"> Day:<input v-model="day"><button v-on:click="refreshImages()">Load pictures</button>
    <hr>
    <!-- <h2>Images from <b>Curiosity</b> rover from {{year}}-{{month}}-{{day}}</h2> -->
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
      year: null,
      month: null,
      day: null,
      manifest: { }
    }
  },
  mounted: function() {
    //Get mission manifest:
    this.getManifest();
  },
  methods: {
    refreshImages: function() {
      let date = `${this.year}-${this.month}-${this.day}`;
      ApiInterface.getImages(date).then(response => { this.images = response; });
    },
    getManifest: function() {
      ApiInterface.getMissionManifest().then(response => { 
        this.manifest = response;
        let dateParts = this.manifest.max_date.split('-');
        this.year = dateParts[0];
        this.month = dateParts[1];
        this.day = dateParts[2];
        this.getInitialImages(); 
        });
    },
    getInitialImages: function() {
      ApiInterface.getImages(this.manifest.max_date).then(response => { this.images = response; });
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
  margin-top: 10px;
}
button {
  margin-left: 20px;
}
.mission_info {
  text-align: left;
  display: inline-block;
}
#logo {
  width: 20%;
  min-width: 140px;
  margin-bottom: -40px !important;
}
input {
  width: 40px;
  text-align: center;
}
hr {
  width: 70%;
  opacity: 0.2;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
