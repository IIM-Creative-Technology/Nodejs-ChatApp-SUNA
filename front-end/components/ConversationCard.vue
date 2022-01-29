<template>
 <NuxtLink :to="{name:'conversation-name', params: {name: id._id}}" title="Go to the conversation">
  <div class="bg-white max-w-lg mx-auto p-4 md:p-12 mt-10 rounded-lg shadow-2xl">
    <h2 v-if="id._idUser2.username">{{id._idUser2.username}}</h2>
    <h2 v-else>{{id._idUser1.username}}</h2>
    <p>Last message for the conversation</p>
  </div>
  </NuxtLink>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    props: ['id'],
  }
</script>

