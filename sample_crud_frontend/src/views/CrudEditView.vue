<template>
  <ItemForm :id="id" />
</template>
<script setup lang="ts">
import ItemForm from "@/components/ItemForm.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id as string;
</script>
