<template>
<div>
  <nav-header :isLoggedIn="isLoggedIn" :userName="userName" @logout="handleLogout"></nav-header>
  <router-view @login-success="handleLoginSuccess"></router-view>
  <nav-footer></nav-footer>
</div>
</template>

<script>
import navHeader from "@/components/nav-header/nav-header.vue"
import navFooter from "@/components/nav-footer/nav-footer.vue";
export default {
  name: "management",
  components: {
    navHeader,
    navFooter
  },
  data() {
    return {
      isLoggedIn: false,
      userName: ''
    };
  },
  methods: {
    checkLoginStatus() {
      const userData = JSON.parse(localStorage.getItem('current-account'))
      const authToken = localStorage.getItem('token')
      if (userData) {
        if (authToken && userData) {
          this.isLoggedIn = true;
          this.userName = userData.name;
        }
      }
    },
    handleLoginSuccess() {
      this.checkLoginStatus();
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.userName = '';
    }
  },
  beforeMount() {
    this.checkLoginStatus();
  }
}
</script>

<style src="./management.css" scoped></style>
