<template>
    <div class="btnContainer">
        {{ props.text }}
    </div>
</template>
  
  <script setup>
    import { ref } from "vue";
    import {globalColor} from "../global/rootColor"
    const colors = ref(globalColor);

    const props = defineProps({
        text:{
            Type: String,
            required: true
        },
        width : {
            Type : Number,
            default : 70,
        },
        height : {
            Type : Number,
            default : 40,
        },
    });
    

  </script>
  
  <style scoped>
    *{

        font-family: "KoPubDotumBold.ttf";
    }
    .btnContainer{
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border: v-bind(colors.primaryColorTiffanyBlue) 1px solid;
        border-radius: 5px;
        color : v-bind(colors.primaryColor);
        width: v-bind(props.width+"px");
        height: v-bind(props.height + "px");
    }:hover{
        background-color: v-bind(colors.primaryColor);
        color : v-bind(colors.primaryColorBabyBlue);
    }
    
  </style>
  