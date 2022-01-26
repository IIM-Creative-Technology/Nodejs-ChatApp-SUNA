<template>
  <div>
    <p>UserId : {{ $auth.user._id }}</p>
    <p>Email : {{ $auth.user.email }}</p>
    <p>Username : {{ $auth.user.username }}</p>
    <p @click="$auth.logout()">Logout</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
