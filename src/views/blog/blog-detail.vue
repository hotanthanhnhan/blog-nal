<template>
  <div class="container mt-5">
    <div class="row g-5">
      <div class="col-lg-8">
        <div v-if="blog">
          <div v-if="blog.image">
            <img :src="blog.image.url" alt="Blog image" class="img-fluid"/>
          </div>
          <h1>{{ blog.title }}</h1>
          <p>{{ blog.content }}</p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mb-5">
          <h3 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Newest Post</h3>
          <div v-for="blog in newestBlogs" :key="blog.id">
            <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="text-decoration-none">
              <div class="d-flex overflow-hidden mb-3">
                <img class="img-fluid" :src="blog.image.url" style="width: 100px; height: 100px; object-fit: cover;"
                     alt="">
                <h4 class="h5 d-flex align-self-center bg-light px-3 mb-0 blog-title">{{ blog.title}}
                </h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./blog-detail.js"></script>
<style src="./blog-detail.css" scoped></style>