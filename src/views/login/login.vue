<template>
  <div>
    <div class="container-fluid position-relative bg-white d-flex p-0">
      <Loading :active="isLoading"
               :color="'#40B883'"
               :height="70"
               :width="70"
               backgroundColor="rgba(192,192,192,1)"
               :is-full-page="true"/>
      <div class="container-fluid">
        <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
          <div class="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-5">
            <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <router-link to="/" class="text-decoration-none">
                  <h3 style="color: #00B074;"><i class="fa fa-hashtag me-2"></i>BLOG</h3>
                </router-link>
                <h3>Login</h3>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingUser" placeholder="name@example.com" v-model="email" required autocomplete="off">
                <label for="floatingUser">Email</label>
              </div>
              <div class="text-center text-danger" v-html="messageEmail"></div>
              <div class="form-floating mb-4">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" required autocomplete="off">
                <label for="floatingPassword">Password</label>
              </div>
              <div class="text-center text-danger" v-html="messagePass"></div>
              <div class="d-flex align-items-center justify-content-between mb-4">
                <router-link to="/forget-password">Forget password</router-link>
              </div>
              <button type="button" class="btn btn-primary py-3 w-100 mb-2" @click="login()" :disabled="isValid" >Login</button>
              <RouterLink class="text-dark" to="/"><button type="button" class="py-3 w-100 mb-2 button">back to home</button></RouterLink>

              <p class="text-center mb-0">Don't have an account yet? <RouterLink to="/register">Register</RouterLink></p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./login.js"></script>
<style src="./login.css" scoped></style>
