<template>
  <div>
    <h1 class="font-bold text-2xl text-center p-8">Message with {{friend}}</h1>
    <section class="containerMessage">
    <MessageContainer v-for="message in messages" :key="message.id" :message="message"/>
    </section>
    <div class="form">
      <textarea name="" id="" cols="30" rows="10" class="textarea"></textarea>
      <input type="submit" value="Valider" @click="sendMessage">
    </div>

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
          if(resp.data[0][i]._idUser1.length != 0){
            console.log("dans le if");
            this.friend = resp.data[0][i]._idUser2.username
          }
          else{
            console.log("dans le if");
            this.friend = resp.data[0][i]._idUser1.username
          }
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
    })
  },
  methods: {
    sendMessage(){
      console.log(this.$auth.user._id)
      this.$axios.post(`/api/messages/addMessage`, {
        _idConv: this.$route.path.split('/')[2],
        _idUser1: this.$auth.user._id,
        message: document.getElementsByClassName('textarea')[0].value
      }).then(() => {
        this.messages.push({
          _idConv: this.$route.path.split('/')[2],
          _idUser1: {id : this.$auth.user._id,},
          message: document.getElementsByClassName('textarea')[0].value
        })
      })
    }
  }
}
</script>

<style scoped>
.containerMessage {
  width: 90%;
  margin: 10px auto;
}

.form{
  display: flex;
  flex-direction: column;
}
</style>
