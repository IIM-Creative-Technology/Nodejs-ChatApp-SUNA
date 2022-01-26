<template>
  <div class="bg-white max-w-lg mx-auto p-8 md:p-12 mt-14 rounded-lg shadow-2xl">
    <section v-if="!success">
        <h1 class="font-bold text-2xl">Register</h1>
        <p class="text-gray-600 pt-2">Sign up now.</p>
    </section>
    <section v-if="!success" class="mt-10">

      <form class="flex flex-col" @submit.prevent="register()">
        <!-- username -->
        <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="username">Username*</label>
            <input type="text" id="username" v-model.trim="form.username"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
        </div><!-- username -->

        <!-- email -->
        <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email*</label>
            <input type="email" id="email" v-model.trim="form.email"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
        </div><!-- email -->

        <!-- password -->
        <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password*</label>
            <input autocomplete="on" type="password" id="password" v-model.trim="form.password"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
        </div><!-- password -->

        <!-- error -->
        <p class="text-red-500 mb-6" v-if="error">
          {{ error }}
        </p><!-- error -->

        <button @click="register()" class="bg-gray-800 uppercase hover:bg-gray-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign Up</button>
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
        email : null,
        password : null
      },
      error : null,
      success : null
    }
  },

  methods : {
    // method to save a user who register
    register() {
      this.error = null

      // no fields empty
      if (!this.form.username || !this.form.email || !this.form.password) return (this.error = 'All fields are necessary')

      this.$axios
        .post(`/api/users/register`, {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        })
        .then(() => {
          this.success = true
        })
        .catch((error) => {
          this.error = error
        })
    }
  }
}
</script>
