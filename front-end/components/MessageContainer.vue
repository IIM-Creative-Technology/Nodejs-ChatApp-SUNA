<template>
  <div>
    <p class="notFromMe" v-if="$auth.user._id != message._idUser1.id">
      {{message.message}}
    </p>
    <p class="fromMe" v-else>{{message.message}}
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
  }

</style>
