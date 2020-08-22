<template>
  <el-menu class="navbar" mode="horizontal">
    <router-link :to="{ name: 'Home' }" class="navbar__items">
      Главная
    </router-link>
    <router-link
      :to="{ name: 'Places' }"
      class="navbar__items"
      v-if="this.login"
    >
      Мои заведения
    </router-link>
    <div class="navbar__profile">
      <p class="navbar__login" v-if="this.login">
        Вы вошли как {{ this.login }}
      </p>
      <el-link @click="logOut" class="navbar__exit" v-if="this.login">
        Выйти
      </el-link>
      <router-link
        :to="{ name: 'Auth' }"
        class="navbar__items"
        v-if="!this.login"
      >
        Войти как владелец заведения
      </router-link>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    login() {
      return this.$store.state.token.user.username;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logout");
      await this.$router.push({ name: "Auth" });
    }
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orange;
  color: black;
}
.navbar__items {
  margin: 1%;
}

.navbar__profile {
  display: flex;
  margin-left: auto;
  align-items: center;
}
.navbar__exit {
  margin: 3%;
  padding: 2%;
}
</style>
