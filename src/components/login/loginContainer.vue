<script setup>
import formvue from './form.vue'
</script>

<template>
    <div class="backg">
        <formvue></formvue>
    </div>
</template>

<style scoped>
.backg{
  background: url("@/assets/photo/pexels-steve-johnson-1269968.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: center; */
  /* background-attachment:fixed; */
  height: 100hv;
  width: 100vw;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>