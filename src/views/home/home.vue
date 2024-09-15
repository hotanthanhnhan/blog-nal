<template>
  <div>
    <div class="container py-5">
      <div class="row g-5">
        <div class="col-lg-8">
          <div v-for="blog in blogs" :key="blog.id">
            <div class="blog-item mb-5">
              <div class="row g-0 bg-light overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img class="img-fluid h-100" :src="blog.image.url" style="object-fit: cover;" alt=""/>
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center">
                  <div class="p-4">
                    <div class="d-flex mb-3">
                      <small>
                        <font-awesome-icon class="me-2" :icon="['fas', 'calendar-days']"/>
                        {{ blog.updated_at }}</small>
                    </div>
                    <h5 class="text-uppercase mb-3">{{ blog.title }}</h5>
                    <p>{{ blog.content }}</p>
                    <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="text-decoration-none">
                      <a class="text-primary text-uppercase text-decoration-none" href="">Read More
                        <font-awesome-icon class="i" :icon="['fas', 'chevron-right']"/>
                      </a>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: page === 1 }">
                  <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                </li>
                <li class="page-item" :class="{ active: page === 1 }">
                  <a class="page-link" href="#" @click.prevent="goToPage(1)">1</a>
                </li>
                <li v-if="startPage > 2" class="page-item disabled">
                  <span class="page-link">...</span>
                </li>
                <li v-for="n in middlePages" :key="n" class="page-item" :class="{ active: page === n }"
                >
                  <a class="page-link" href="#" @click.prevent="goToPage(n)">{{ n }}</a>
                </li>
                <li v-if="endPage < totalPages - 1" class="page-item disabled">
                  <span class="page-link">...</span>
                </li>
                <li class="page-item" :class="{ active: page === totalPages }">
                  <a class="page-link" href="#" @click.prevent="goToPage(totalPages)">
                    {{ totalPages }}
                  </a>
                </li>
                <li class="page-item" :class="{ disabled: page === totalPages }">
                  <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="mb-5">
            <div class="input-group">
              <input type="text" class="form-control p-3" placeholder="Keyword" v-model="keyword"
                     @keyup.enter="searchBlogs">
              <button class="btn btn-primary px-4" @click="searchBlogs">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
              </button>
            </div>
          </div>
          <div class="mb-5">
            <h3 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Categories</h3>
            <div class="d-flex flex-column justify-content-start">
              <a class="h5 bg-light py-2 px-3 mb-2" href="#"><i class="bi bi-arrow-right me-2"></i>Web Design</a>
              <a class="h5 bg-light py-2 px-3 mb-2" href="#"><i class="bi bi-arrow-right me-2"></i>Web Development</a>
              <a class="h5 bg-light py-2 px-3 mb-2" href="#"><i class="bi bi-arrow-right me-2"></i>Web Development</a>
              <a class="h5 bg-light py-2 px-3 mb-2" href="#"><i class="bi bi-arrow-right me-2"></i>Keyword Research</a>
              <a class="h5 bg-light py-2 px-3 mb-2" href="#"><i class="bi bi-arrow-right me-2"></i>Email Marketing</a>
            </div>
          </div>
          <div class="mb-5">
            <h3 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Recent Post</h3>
            <div v-for="blog in newestBlogs" :key="blog.id">
              <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="text-decoration-none">
                <div class="d-flex overflow-hidden mb-3">
                  <img class="img-fluid" :src="blog.image.url" style="width: 100px; height: 100px; object-fit: cover;"
                       alt="">
                  <h4 class="h5 d-flex align-self-center bg-light px-3 mb-0 blog-title">{{
                      blog.title
                    }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
          <div class="mb-5">
            <h3 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Tag Cloud</h3>
            <div class="d-flex flex-wrap m-n1">
              <a href="" class="btn btn-primary m-1">Design</a>
              <a href="" class="btn btn-primary m-1">Development</a>
              <a href="" class="btn btn-primary m-1">Marketing</a>
              <a href="" class="btn btn-primary m-1">SEO</a>
              <a href="" class="btn btn-primary m-1">Writing</a>
              <a href="" class="btn btn-primary m-1">Consulting</a>
              <a href="" class="btn btn-primary m-1">Design</a>
              <a href="" class="btn btn-primary m-1">Development</a>
              <a href="" class="btn btn-primary m-1">Marketing</a>
              <a href="" class="btn btn-primary m-1">SEO</a>
              <a href="" class="btn btn-primary m-1">Writing</a>
              <a href="" class="btn btn-primary m-1">Consulting</a>
            </div>
          </div>
          <div>
            <h3 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Plain Text</h3>
            <div class="bg-light text-center" style="padding: 30px;">
              <p>Vero sea et accusam justo dolor accusam lorem consetetur, dolores sit amet sit dolor clita kasd justo,
                diam accusam no sea ut tempor magna takimata, amet sit et diam dolor ipsum amet diam</p>
              <a href="" class="btn btn-primary py-2 px-4">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./home.js"></script>
<style src="./home.css" scoped></style>
