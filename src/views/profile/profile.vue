<template>
  <!-- Modal -->
  <modal :visible="modalStatus" width="600px" title="Update Profile" :cancelButton="{
              text: 'Cancel',
              onclick: isHide,
           }"
         :okButton="{
              text: 'Update',
              onclick: updateProfile,
              disable: isUpdateButtonDisabled
           }"
         zIndex="2000" :closable="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="name" class="form-label">Tên</label>
              <input type="text" class="form-control" id="name" v-model="profileUpdate.name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="profileUpdate.email" required>
            </div>
            <div class="mb-3">
              <label for="avatarUrl" class="form-label">URL Ảnh đại diện</label>
              <input type="url" class="form-control" id="avatarUrl" v-model="profileUpdate.avatar.url"
                     placeholder="https://example.com/avatar.jpg">
            </div>
          </form>
        </div>
      </div>
    </div>
  </modal>

  <div class="container mt-3 profile">
    <div class="row align-items-center">
      <div class="col-lg-5 col-md-6 mb-3">
        <div class="about-img">
          <img :src="imageUrl"
               @error="setDefaultImage"
               alt="Image">
        </div>
      </div>
      <div class="col-lg-7 col-md-6">
        <div class="section-header text-center">
          <h2>{{ profile.name }}</h2>
          <p>{{ profile.email }}</p>
        </div>
        <div class="text-center">
          <button class="btn btn-primary mt-3 btn-update" type="button" @click="isShow">
            Update profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./profile.css"></style>
<script src="./profile.js"></script>