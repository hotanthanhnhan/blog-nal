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
          <div class="col-12 col-sm-8 col-lg-5">
            <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <router-link to="/" class="text-decoration-none">
                  <h3 style="color: #00B074;"><i class="fa fa-hashtag me-2"></i>BLOG</h3>
                </router-link>
                <h3>Register</h3>
              </div>


              <div class="inpution justify-content-between">
                <div class="form-floating m-1 ">
                  <input type="text" class="form-control w-100" id="floatingText" placeholder="jhondoe" v-model="name" autocomplete="off">
                  <label for="floatingText">Name</label>
                </div>
                <div class="form-floating m-1">
                  <input type="email" class="form-control w-100" id="floatingInput email"
                         placeholder="name@example.com" v-model="email" autocomplete="off">
                  <label for="floatingInput">Email</label>
                </div>
              </div>

              <div class="d-flex">
                <div class="text-center text-danger fs-6 col-md-6 col-sm-12" v-html="messageName"></div>
                <div class="text-center text-danger fs-6 col-md-6 col-sm-12" v-html="messageMail"></div>
              </div>

              <div class="inpution justify-content-between">
                <div class="form-floating m-1 ">
                  <input type="text" class="form-control w-100" id="floatingPassword"
                         placeholder="Password" v-model="password" autocomplete="off">
                  <label for="floatingPassword">Password</label>
                </div>
              </div>

              <div class="d-flex">
                <div class="text-center text-danger fs-6 col-md-6 col-sm-12" v-html="messagePass"></div>
              </div>

              <div class="text-center text-danger" v-html="message"></div>
              <button type="button" class="btn btn-primary py-3 w-100 mb-2 mt-2" @click="register()" :disabled="isValid">Register</button>
              <RouterLink class="text-dark" to="/"><button type="button" class="py-3 w-100 mb-4 button1 ">Back to home</button></RouterLink>
              <p class="text-center mb-0">Already have an account? <RouterLink to="/login">Login</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Sign Up End -->
    </div>
  </div>
</template>

<script src="./register.js"></script>
<style src="./register.css" scoped></style>
