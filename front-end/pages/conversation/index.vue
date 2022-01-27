<template>
  <div class="bg-white max-w-2xl mx-auto p-8 md:p-12 mt-24 rounded-lg shadow-2xl">
    <h1 class="font-bold text-2xl text-center">Conversation</h1>
    <p class="text-gray-600 pt-2">Find all your conversations</p>
    <section>
      <ConversationCard v-for="id in ids" :key="id._id" :id="id"/>
    </section>
  </div>
</template>

<script>

export default {
  data(){
    return {
      ids: null
    }
  },
  mounted(){
    this.$axios
    .get('/api/conv/myConv', {
      token : this.$auth.user._id
    })
    .then((resp)=> {
      this.ids = resp.data[0]
    })
    .catch((error) => {
      this.ids =error
    })
  }
}
</script>

