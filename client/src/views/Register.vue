<template>
  <div class="auth">
    <el-card class="auth__card">
      <h3>Регистрация в системе</h3>
      <el-input class="auth__input" placeholder="логин" v-model="login">
      </el-input>
      <el-input class="auth__input" placeholder="пароль" v-model="password">
      </el-input>
      <el-input
        class="auth__input"
        placeholder="подтверждение пароля"
        v-model="passwordRepeat"
      >
      </el-input>
      <div class="auth__buttons">
        <el-button type="success" @click="signIn">
          Зарегистрироваться
        </el-button>
        <router-link :to="{ name: 'Auth' }">
          Вход
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { validate } from "@/components/utils/validate";
import {mapGetters} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      login: "",
      password: "",
      passwordRepeat: ""
    };
  },
  computed: {
    ...mapGetters("auth", { statusAuth: "statusAuth" }),
    ...mapGetters("auth", { error: "error" })
  },
  methods: {
    async signIn() {
      const data = validate(this.login, this.password, this.passwordRepeat);
      if (data[0]) {
        await this.$store.dispatch("auth/registerNewUser", data[1]);
        if (this.statusAuth) {
          await this.$router.push({ name: "Places" });
        } else
          this.$message.error(
            `Ошибка при регистрации! Вероятно логин уже занят`
          );
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
