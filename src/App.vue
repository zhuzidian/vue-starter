<template>
  <v-app>
    <v-app-bar app color="primary" dense dark elevation="0" v-if="account">
      <v-toolbar-title>vue-starter</v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="body-1 mr-4">{{ account.loginId }}</span>

      <v-btn text @click="logout">
        <span class="mr-2">ログアウト</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app stateless v-model="drawer" v-if="account">
      <v-list nav dense>
        <v-list-item
          v-for="menu in menuList"
          :key="menu.title"
          link
          :to="menu.path"
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
// import Header from "./components/Header.vue";

export default {
  name: "App",

  components: {
    // Header,
  },

  data() {
    return {
      drawer: true,

      menuList: [
        { title: "トップ", icon: "mdi-home", path: "/home" },
        { title: "組織一覧", icon: "mdi-account-multiple", path: "" },
        { title: "アカウント一覧", icon: "mdi-account", path: "" },
        { title: "お知らせ一覧", icon: "mdi-information", path: "/notification/list" },
      ],
    }
  },

  computed: {
    ...mapState("auth", [
      "account",
    ]),
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login")
      })
    },
  },
}
</script>

<style lang="scss">
#app.theme--light.v-application {
  background-color: #fafafa;
  color: #262626;
}

.v-input--dense > .v-input__append-outer {
  margin-top: 0 !important;
}
</style>
