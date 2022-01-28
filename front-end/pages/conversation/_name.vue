<template>
  <div>
    <h1 class="font-bold text-2xl text-center p-8">Message with {{friend}}</h1>
    <section class="containerMessage">
    <MessageContainer v-for="message in messages" :key="message.id" :message="message"/>
    </section>
  </div>
</template>
<script>

export default {
  data(){
    return {
      messages: null,
      friend: '',
    }
  },
  mounted(){
    const url = this.$route.path.split('/')[2]
    this.$axios
    .get('/api/conv/myConv', {
      token : this.$auth.user._id
    })
    .then((resp)=>{
      for(var i = 0; i < resp.data[0].length; i++){
        if(resp.data[0][i]._id == url){
          this.friend = resp.data[0][i]._idUser2.username

        }
      }
    })
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
