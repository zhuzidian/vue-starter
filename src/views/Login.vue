<template>
  <v-app class="login-page">
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" style="max-width: 500px;">
            <v-card class="mt-12">
              <v-card-text>
                <h1 class="my-8 black--text" style="text-align: center;">
                  vue-starter
                </h1>
                <v-form>
                  <label>ログインID</label>
                  <v-text-field
                    v-model="$v.loginId.$model"
                    :error-messages="loginIdErrors"
                    name="loginId"
                    type="text"
                    outlined
                    dense
                    class="mb-1"
                  >
                  </v-text-field>

                  <label>パスワード</label>
                  <v-text-field
                    v-model="$v.password.$model"
                    :error-messages="passwordErrors"
                    name="password"
                    type="password"
                    outlined
                    dense
                  >
                  </v-text-field>
                  <v-btn
                    color="primary"
                    @click="login"
                    :loading="status === '処理中'"
                    block
                    class="mt-4"
                  >
                    ログイン
                  </v-btn>
                </v-form>
                <v-divider class="my-4"></v-divider>
                <div class="text-center">
                  <v-btn text small color="primary" @click="resetPassword">
                    パスワードをお忘れですか？
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { required } from "vuelidate/lib/validators"

export default {
  name: "Login",

  data() {
    return {
      loginId: "",
      password: "",
      status: "",
    }
  },

  validations: {
    loginId: {
      required,
    },
    password: {
      required,
    },
  },

  computed: {
    loginIdErrors() {
      if (!this.$v.loginId.$dirty) return []
      let errors = []
      if (!this.$v.loginId.required) errors.push("入力してください")
      return errors
    },
    passwordErrors() {
      if (!this.$v.password.$dirty) return []
      let errors = []
      if (!this.$v.password.required) errors.push("入力してください")
      return errors
    },
  },

  methods: {
    async login() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.status = "エラー"
        return
      }
      this.status = "処理中"

      await this.$store.dispatch("auth/login", {
        loginId: this.loginId,
        password: this.password,
      })
      this.$router.push("/home")
    },
    resetPassword() {
      alert("TODO")
    },
  },
}
</script>

<style lang="scss" scoped></style>
