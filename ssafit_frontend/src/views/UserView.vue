<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { globalColor } from "../global/rootColor";
const primaryColorBabyBlue = ref(globalColor.primaryColorBabyBlue);
const primaryColorTiffanyBlue = ref(globalColor.primaryColorTiffanyBlue);
const router = useRouter();
</script>

<style>
.user-link {
  color: black;
}

.view {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid v-bind(primaryColorBabyBlue);
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}
:focus {
  border: 1px solid v-bind(primaryColorTiffanyBlue);
  outline: none;
}

label {
  display: inline-block;
  width: 130px;
}

.btn {
  width: 8%;
  background-color: #d0d3d0;
  color: rgb(80, 82, 79);
  padding: 14px 20px;
  margin: 8px;
  border: 1px solid #787878;
  border-radius: 4px;
  font-size: large;
  cursor: pointer;
}

/* 테이블 CSS */
.user-list {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin: auto;
}

.user-list td,
.user-list th {
  border: 1px solid black;
}
</style>
