<template>
    <div>
        <h3>{{title}}:</h3>
        <img :src=url />
    </div>    
</template>

<script>
export default {
    name: "ImageComponent",
    props: {
        title: String,
        url: String
    }
}
</script>

<style>
    img {
        width: 40%;
        margin-bottom: 70px;
    }
</style>