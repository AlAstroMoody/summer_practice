<template>
  <el-menu class="navbar" mode="horizontal">
    <router-link :to="{ name: 'Home' }" class="navbar__items">
      Главная
    </router-link>
    <router-link
      :to="{ name: 'Places' }"
      class="navbar__items"
      v-if="statusAuth"
    >
      Мои заведения
    </router-link>
    <div class="navbar__profile">
      <p class="navbar__login" v-if="statusAuth">
        Вы вошли как {{ login }}
      </p>
      <el-button type="text" @click="logOut" class="navbar__exit" v-if="statusAuth">
        Выйти
      </el-button>
      <router-link
        :to="{ name: 'Auth' }"
        class="navbar__items"
        v-if="!statusAuth"
      >
        Войти как владелец заведения
      </router-link>
    </div>
  </el-menu>
</template>

<script>


import {mapGetters} from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters("auth", { login: "username", statusAuth: "statusAuth" }),
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "Auth" });
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
.navbar__items {
  text-decoration: none;
  position: relative;
  font-size: 1.3rem;
  cursor: pointer;
}
.navbar__items:after {
  display: block;
  position: absolute;
  right: 0;
  width: 0;
  height: 2px;
  background-color: black;
  content: "";
  transition: width 0.3s ease-out;
}

.navbar__items:hover:after,
.navbar__items:focus:after {
  width: 100%;
}
</style>
