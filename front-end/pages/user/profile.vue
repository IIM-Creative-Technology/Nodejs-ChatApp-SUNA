<template>
  <div class="bg-white max-w-lg mx-auto p-8 md:p-12 mt-14 rounded-lg shadow-2xl">

    <form class="flex flex-col" @submit.prevent="UpdateProfile()">
      <h2 class="font-bold text-2xl text-gray-600 pb-2">Edit your profile</h2>
      <!-- username -->
      <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="username">Edit username*</label>
          <input type="text" id="username" v-model.trim="formProfile.username"
          class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div><!-- username -->

      <!-- email -->
      <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Edit email*</label>
          <input type="email" id="email" v-model.trim="formProfile.email"
          class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div><!-- email -->
      <!-- password -->
      <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password*</label>
          <input autocomplete="on" type="password" id="password" v-model.trim="formProfile.password"
          class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div><!-- password -->

      <!-- error -->
      <p class="text-red-500 mb-6" v-if="formProfile.error">
        {{ formProfile.error }}
      </p><!-- error -->

      <button class="bg-gray-800 uppercase hover:bg-gray-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Edit profile</button>

      <!-- success -->
      <p v-if="formProfile.success" class="mt-6 py-5 px-5 text-green-100 bg-green-700 rounded-lg focus:shadow-outline text-center">
        {{ formProfile.success }}
      </p><!-- success -->
    </form>

    <form class="flex flex-col" @submit.prevent="UpdatePassword()">
      <h2 class="font-bold text-2xl text-gray-600 pb-2 pt-16">Edit your password</h2>
      <!-- password -->
      <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Older Password*</label>
          <input autocomplete="on" type="password" id="password" v-model.trim="formPassword.password"
          class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div><!-- password -->
      <!-- password -->
      <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">New Password*</label>
          <input autocomplete="on" type="password" id="password" v-model.trim="formPassword.newPassword"
          class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div><!-- password -->
      <div class="mb-6 pt-3 rounded bg-gray-200">
          <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Confirm new Password*</label>
          <input autocomplete="on" type="password" id="password" v-model.trim="formPassword.confirmNewPassword"
          class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
      </div><!-- password -->

      <!-- error -->
      <p class="text-red-500 mb-6" v-if="formPassword.error">
        {{ formPassword.error }}
      </p><!-- error -->

      <button class="bg-gray-800 uppercase hover:bg-gray-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Edit password</button>

      <!-- success -->
      <p v-if="formPassword.success" class="mt-6 py-5 px-5 text-green-100 bg-green-700 rounded-lg focus:shadow-outline text-center">
        {{ formPassword.success }}
      </p><!-- success -->
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formProfile : {
        username : this.$auth.user.username,
        email : this.$auth.user.email,
        password : null,
        error : null,
        success : null
      },
      formPassword : {
        password : null,
        newPassword : null,
        confirmNewPassword : null,
        error : null,
        success : null
      },
    }
  },
  methods : {
    // update profile
    UpdateProfile() {
      this.formProfile.error = null
      // no fields empty
      if (!this.formProfile.username || !this.formProfile.email || !this.formProfile.password) return (this.formProfile.error = 'All fields are necessary')
      const token = this.$auth.user._id
      this.$axios
        .put(`/api/users/user-update`, {
          username: this.formProfile.username,
          email: this.formProfile.email,
          password: this.formProfile.password,
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          this.formProfile.success = "Update done"
        })
        .catch((error) => {
          this.formProfile.error = "An error occured"
        })
    },

    // update password
    UpdatePassword() {
       this.formPassword.error = null

      // no fields empty
      if (!this.formPassword.password || !this.formPassword.newPassword || !this.formPassword.confirmNewPassword) return (this.formPassword.error = 'All fields are necessary')

      if(this.formPassword.newPassword != !this.formPassword.confirmNewPassword) return (this.formPassword.error = 'The new password and its confirmation are different')

      this.$axios
        .put(`/api/users/user-update`, {
          password: this.formPassword.password,
          newPassword: this.formPassword.newPassword,

          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          this.formPassword.success = "Update done"
        })
        .catch((error) => {
          this.formPassword.error = "An error occured"
        })
    }
  }
}
</script>
