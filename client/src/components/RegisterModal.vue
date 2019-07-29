<template>
  <!-- ========================== REGISTER MODAL -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Register New Account</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form class="d-flex flex-column">
          <div class="modal-body">
            <h5>Username:</h5>
            <input type="text" placeholder="Enter your Username" v-model="formRegister.username" />
            <h5>Email:</h5>
            <input type="text" placeholder="Enter your Email" v-model="formRegister.email" />
            <h5>Password:</h5>
            <input
              type="password"
              placeholder="Enter your Password"
              v-model="formRegister.password"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="register"
              data-dismiss="modal"
            >Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formRegister: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/signup",
        data: {
          username: this.formRegister.username,
          email: this.formRegister.email,
          password: this.formRegister.password
        }
      })
        .then(({ data }) => {
          console.log("successfuly register new account");
          Swal.fire({
            type: "success",
            title: "Congratulations!",
            text: "Please login to grab your new machine!"
          });
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
            type: "error",
            title: "Whoopsy!",
            text: "Please input all required fields",
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    }
  }
};
</script>

<style scoped>
input {
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(129, 129, 129);
  font-family: "Oswald";
  margin-bottom: 30px;
  width: 80%;
}

.modal-footer,
.modal-header {
  background-color: rgb(51, 51, 51);
}

.modal-content {
  border-radius: 10px;
}

.modal-body h5 {
  font-family: "Oswald";
}

.modal-title {
  color: white;
  font-family: "Oswald";
}
</style>
