<template>
  <div class="bg-white userCard" @click="StartConv()">
    <h2>{{user.username}}</h2>
    <p>Start Conversation</p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        success: 0,
      }
    },
    mounted(){

    },
    props: ['id', 'user'],
    methods:{
      StartConv(){
        this.$axios.post('/api/conv/create', {
          _idUser1: this.$auth.user._id,
          _idUser2: this.user.id
        })
        .then((resp)=> {
          console.log('success')
          console.log(resp);
          window.location.href='http://localhost:8000/conversation/' + resp.data._id
        })
        .catch((error)=> {
          console.log(error);
        })
      }
    }
  }
</script>
<style scoped>
.userCard{
  width: 30%;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
}
.userCard:hover {
  cursor: pointer;
}
</style>
