<template>
  <div>
    <h1 class="font-bold text-2xl text-center p-8">Message with </h1>
    <section class="containerMessage">
    <MessageContainer/>
    <MessageContainer/>
    <MessageContainer/>
    <MessageContainer/>
    <MessageContainer/>
    <MessageContainer/>
    </section>
  </div>
</template>
<script>

export default {
  data(){
    return {
      message: null
    }
  },
  mounted(){
    console.log(this.$auth.user._id);

    const url = this.$route.path.split('/')[2]
    this.$axios
    .get('/api/messages/get', {
      params : {
        id: url
      }
    }).then((resp)=> {
      console.log(resp.data[0]);
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
