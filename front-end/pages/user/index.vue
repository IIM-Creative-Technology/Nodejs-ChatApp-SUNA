<template>
  <div class="mt-24 text-center">
    <h1 class="text-3xl font-bold mb-8">Welcome, {{ $auth.user.username }}</h1>
    <NuxtLink to="user/profile" class="bg-gray-800 px-6 uppercase hover:bg-gray-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200">Profile</NuxtLink>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
