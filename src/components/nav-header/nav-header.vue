<template>
  <div>
    <nav class="py-3">
      <div class="logo">
        <router-link to="/" class="text-decoration-none">
          <h1 class="m-0">Blog</h1>
        </router-link>
      </div>
      <ul class="m-0 d-flex">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li v-if="!localIsLoggedIn">
          <router-link to="/login" class="text-decoration-none">
            <a class="m-0">Login</a>
          </router-link>
        </li>
        <li v-else>
          <div class="dropdown">
            <a class="m-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">{{ userName }}</a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/profile" class="text-decoration-none dropdown-item">
                  <a class="m-0 p-0">Profile</a>
                </router-link>
              </li>
              <li><a class="dropdown-item" href="#" @click="logOut">Log out</a></li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="hamburger" @click="toggleNav">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </nav>
    <div class="menubar">
      <ul class="">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-header",
  data() {
    return {
      navbar: '',
      mobileNav: '',
      localIsLoggedIn: this.isLoggedIn
    }
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      default: ''
    }
  },

  methods: {
    toggleNav() {
      this.mobileNav = document.querySelector(".hamburger");
      this.navbar = document.querySelector(".menubar");
      this.navbar.classList.toggle("active")
      this.mobileNav.classList.toggle("hamburger-active")
    },

    logOut(){
      this.localIsLoggedIn = false;
      localStorage.removeItem('current-account');
      localStorage.removeItem('token')
      axios.defaults.headers["Authorization"] = "";
      this.$router.push({ name: "Home" });
    }
  },
  watch: {
    isLoggedIn(newVal) {
      this.localIsLoggedIn = newVal;
    }
  }
}
</script>
<style src="./nav-header.css" scoped></style>

