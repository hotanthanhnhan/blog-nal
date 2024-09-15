import axios from "../../config/axios";

import {useToast} from 'vue-toastification';
import Loading from 'vue-loading-overlay';

const toast = useToast();

export default {
    name: "register",
    components: {
        Loading
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            message: "",
            messageName: "",
            messageMail: "",
            messagePass: "",
            isValid: true,
            isLoading: false,
        };
    },
    mounted() {
        this.checkButton();
    },
    methods: {
        register() {
            this.isLoading = true;
            if (this.name.length < 4) {
                this.messageName = "Please enter a name of at least 4 characters!";
                return;
            }
            if (!this.checkEmail()) {
                this.messageMail = "Please enter the correct email format!";
                return;
            }
            if (this.password.length < 4) {
                this.messagePass = "Please enter a password of at least 8 characters!";
                return;
            }

            const formData = new FormData();
            formData.append('user[name]', this.name);
            formData.append('user[email]', this.email);
            formData.append('user[password]', this.password);

            axios.post("users", formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json',
                }
            }).then((response) => {
                console.log(response)
                if (!response) {
                    toast.error("Đăng ký thất bại, Vui lòng sử dụng email khác");
                } else {
                    this.name = ""
                    this.email = "";
                    this.password = "";
                    this.$router.push({name: "Login"});
                    toast.success("Đăng ký thành công");
                }
                this.isLoading = false;
            }).catch((error) => {
                    this.isLoading = false;
                    console.log(error)
            });
        },
        checkEmail() {
            var regix =
                /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (regix.test(this.email)) {
                return true;
            }
            return false;
        },

        checkButton() {
            if (
                this.name.length >= 4 &&
                this.checkEmail() &&
                this.password.length >=8
            ) {
                this.isValid = false;
            } else {
                this.isValid = true;
            }
        },
    },
    watch: {
        name(newValue, oldValue) {
            if (newValue.length < 4) {
                this.messageName = "Please enter a name of at least 4 characters!";
            } else {
                this.messageName = "";
            }
            this.checkButton();
        },
        email(newValue, oldValue) {
            if (!this.checkEmail()) {
                this.messageMail = "Please enter the correct email format!";
            } else {
                this.messageMail = "";
            }
            this.checkButton();
        },
        password(newValue, oldValue) {
            if (newValue.length < 8) {
                this.messagePass = "Please enter a password of at least 8 characters!";
            } else {
                this.messagePass = "";
            }
            this.checkButton();
        },
    },
};
