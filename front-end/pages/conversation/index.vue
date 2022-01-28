<template>
  <div class="bg-white max-w-2xl mx-auto p-8 md:p-12 mt-24 rounded-lg shadow-2xl">
    <h1 class="font-bold text-2xl text-center">Conversation</h1>
    <p class="text-gray-600 pt-2">Find all your conversations</p>
    <section>
      <ConversationCard v-for="id in ids" :key="id._id" :id="id"/>
    </section>
    <section class="startConversation max-w-2xl">
      <UserCard v-for="user in users" :key="user.id" :user="user"/>
    </section>
  </div>
</template>

<script>

export default {
  data(){
    return {
      ids: null,
      users: null,
      convs: null,
    }
  },
  mounted(){
    this.$axios.get('/api/users/all')
    .then((resp)=> {
      this.users = resp.data


    this.$axios
    .get('/api/conv/myConv', {
      token : this.$auth.user._id
    })
    .then((resp)=> {
      this.ids = resp.data[0]
      console.log(this.ids.length);
      for(var i = 0; i < this.users.length; i++){
        console.log("dans le 1for");
        for(var j = 0; j < this.ids.length; j++){
          console.log("dans le 2for");
          if((this.$auth.user._id == this.ids[j]._idUser1 && this.users[i].id == this.ids[j]._idUser2.id) || (this.users[i].id == this.ids[j]._idUser1 && this.$auth.user._id == this.ids[j]._idUser2.id) ){
            console.log("dans le if");
            console.log(i);
            this.users.splice(i,1)
          }
        }
      }
    })




    })

    .catch((error) => {
      this.ids =error
    })

  }
}
</script>
<style scoped>
.startConversation {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>

