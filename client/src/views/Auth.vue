<template>
  <div class="auth">
    <el-card class="auth__card">
      <h3>Вход в систему</h3>
      <el-input class="auth__input" placeholder="логин" v-model="login">
      </el-input>
      <el-input class="auth__input" placeholder="пароль" v-model="password">
      </el-input>
      <div class="auth__buttons">
        <el-button type="success" @click="signIn">
          Войти
        </el-button>
        <router-link :to="{ name: 'Register' }">
          Регистрация
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import { validate } from "@/components/utils/validate";
export default {
  name: "Auth",
  data() {
    return {
      login: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters("auth", { statusAuth: "statusAuth" })
  },
  methods: {
    async signIn() {
      const data = validate(this.login, this.password, this.password);
      if (data[0]) {
        try {
          await this.$store.dispatch("auth/auth", data[1]);
        } catch (e) {
          this.$message.error("Неверный логин/пароль");
        }
        if (this.statusAuth) {
          await this.$router.push({ name: "Places" });
        }
      } else this.$message.error(data[1]);
    }
  }
};
</script>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  margin: 10% auto;
  max-width: 600px;
  min-width: 300px;
}

.auth__card {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 80%;
  text-align: left;
}

.auth__input {
  margin-bottom: 2%;
}

.auth__buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
