<template>
  <div class="bg-white max-w-lg mx-auto p-8 md:p-12 mt-24 rounded-lg shadow-2xl">
    <section>
        <h1 class="font-bold text-2xl">Login</h1>
        <p class="text-gray-600 pt-2">Sign in to your account.</p>
    </section>
    <section v-if="!success" class="mt-10">

      <form class="flex flex-col" @submit.prevent="login()">
        <!-- email -->
        <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="username">Username</label>
            <input type="text" id="username" v-model.trim="form.username"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
        </div><!-- email -->

        <!-- password -->
        <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
            <input type="password" id="password" v-model.trim="form.password"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
        </div><!-- password -->

        <!-- error -->
        <p class="text-red-500 mb-6" v-if="error">
          {{ error }}
        </p><!-- error -->

        <button class="uppercase bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
      </form>
    </section>

    <section v-if="success">
      <p class="text-center"> Congratulations ! You can sign in <NuxtLink class="text-red-500 font-bold" to="/login">here</NuxtLink> now ! </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form : {
        username : null,
        password : null
      },
      error : null,
      success : null
    }
  },

  methods : {
    // method togin a user
    login() {
      this.error = null

      // no fields empty
      if (!this.form.username || !this.form.password) return (this.error = 'All fields are necessary')

      this.$auth
        .loginWith('local', {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .then(() => {
          this.$router.push('/user')
        })
        .catch((err) => {
          this.error = err.response.data.message
        })
    }
  }
}
</script>
