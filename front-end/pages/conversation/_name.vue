<template>
  <div>
    <h1 class="font-bold text-2xl text-center p-8">Message with {{friend}}</h1>
    <section class="containerMessage">
    <MessageContainer v-for="message in messages" :key="message.id" :message="message"/>
    </section>
    <textarea name="" id="" cols="30" rows="10" class="textarea"></textarea>
    <input type="input" value="envoyer" @click="sendMessage">
  </div>
</template>
<script>

export default {
  data(){
    return {
      messages: null,
      friend: ''
    }
  },
  mounted(){
    const url = this.$route.path.split('/')[2]
    this.$axios
    .get('/api/messages/get', {
      params : {
        id: url
      }
    }).then((resp)=> {
      this.messages = resp.data.message
      this.friend = this.messages[0]._idConv._idUser2.username
    })
  }
}
</script>

<style scoped>
.containerMessage {
  width: 90%;
  margin: 10px auto;
}
</style>
