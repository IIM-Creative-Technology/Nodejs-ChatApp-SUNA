<template>
  <div>

    <p class="notFromMe" v-if="$auth.user._id != message._idUser1.id">
      {{message.message}}
    </p>
    <p class="fromMe" v-else>{{message.message}}<button @click="deleteMessage(message.id)">X</button>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        me: 0
      }
    },
    props: ['message'],

    mounted() {
      console.log(this.message);
      console.log(this.$auth.user._id);

    },
    methods : {
      deleteMessage(idMsg){
        console.log('delete function')
        this.$axios.delete(`/api/messages/delete`, {
          params : {
            id: idMsg
          }
        })
        .then(() => {
          console.log('success')
          location.reload()
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }

</script>


<style scoped>
  .notFromMe {
    max-width: 45%;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: grey;
    color: white;
    margin-bottom: 10px;
  }

  .fromMe {
    max-width: 45%;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: rgb(47, 47, 247);
    color: white;
    margin-bottom: 10px;
    margin-left: auto;
    position: relative;
  }

  .fromMe button{
    margin-left: auto;
    position: absolute;
    right: 15px;
  }

</style>
