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
      console.log(resp.data[0])
     var tableData = []
      for(var i=0; i<resp.data.length; i++){
        console.log('for1')
        for(var j =0; j<resp.data[i].length; j++){
          tableData.push(resp.data[i][j])
        }
      }

      this.ids = tableData
      var userModified = this.users

      for(var i = 0; i < this.users.length+1; i++){
        console.log(this.$auth.user._id)

        if(this.$auth.user._id == this.users[i].id){
          console.log('premier if')
          userModified.splice(i,1)
        }
        for(var j = 0; j < this.ids.length; j++){

          if((this.$auth.user._id == this.ids[j]._idUser1 && this.users[i].id == this.ids[j]._idUser2.id) || (this.users[i].id == this.ids[j]._idUser1.id && this.$auth.user._id == this.ids[j]._idUser2) ){
            console.log('dans le if');
            userModified.splice(i,1)
          }
        }
      }
    this.users = userModified
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

