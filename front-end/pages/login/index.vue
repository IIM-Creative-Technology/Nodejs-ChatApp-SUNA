<template>
  <div class="bg-white max-w-lg mx-auto p-8 md:p-12 mt-24 rounded-lg shadow-2xl">
    <section>
        <h1 class="font-bold text-2xl">Login</h1>
        <p class="text-gray-600 pt-2">Sign in to your account.</p>
    </section>
    <section class="mt-10">

      <form class="flex flex-col" method="POST" action="#">
        <!-- email -->
        <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
            <input type="text" id="email"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
        </div><!-- email -->

        <!-- password -->
        <div class="mb-6 pt-3 rounded bg-gray-200">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
            <input type="password" id="password"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
        </div><!-- password -->

        <button class="uppercase bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
      </form>

    </section>
  </div>
</template>

<script>
export default {
  layout : 'default'
}
</script>
