import axios from "../../config/axios";

import {useToast} from 'vue-toastification';
const toast = useToast();

import Loading from 'vue-loading-overlay';

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            messageEmail: "",
            isValid: "",
            isLoading: false,
            messagePass: ""
        };
    },
    components: {
        Loading
    },
    mounted() {
        if (this.isLogin()) {
            this.$router.push({name: "Home"});
        }
        this.checkButton();
    },
    methods: {
        login() {
            this.isLoading = true;
            if (!this.checkEmail()) {
                this.messageEmail = "Please enter the correct email format!";
                return;
            }
            if (this.password < 8) {
                this.message = "Vui lòng nhập mật khẩu ít nhất 8 kí tự";
                return;
            }
            axios
                .post("login", {
                    email: this.email,
                    password: this.password,

                })
                .then(async (response) => {
                    if (!response) {
                        this.isLoading = false;
                        toast.error("Wrong email or password");
                    } else {
                        console.log(response)
                        this.email = "";
                        this.password = "";

                        const token = response.data.data.token
                        localStorage.setItem("token", token);
                        await this.getMyProfile(token);
                        this.$emit('login-success');
                        this.$router.push({name: "Home"});
                        toast.success("Login Successfully")
                    }
                    this.isLoading = false;
                })
                .catch((error) => {
                    toast.error("Error")
                });

        },
        async getMyProfile(data) {
            await axios.get("me", {
                headers: {
                    'Authorization': `Bearer ${data}`,
                    'accept': 'application/json',
                },
            }).then((response) => {
                console.log(response)
                localStorage.setItem(
                    "current-account",
                    JSON.stringify({
                        email: response.data.data.email,
                        name: response.data.data.name,
                        avatar: response.data.data.avatar.url
                    })
                );
            }).catch((err) => {
                toast.error(err)
            })
        },

        isLogin() {
            return localStorage.getItem("token") != null;
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
            if (this.email.length >= 2 && this.password.length >= 8) {
                this.isValid = false;
            } else {
                this.isValid = true;
            }
        },
    },
    watch: {
        email(newValue, oldValue) {
            if (!this.checkEmail()) {
                this.messageEmail = "Please enter the correct email format!";
            } else {
                this.messageEmail = "";
            }
            this.checkButton();
        },
        password(newValue, oldValue) {
            if (newValue.length < 8) {
                this.messagePass = "Vui lòng nhập mật khẩu ít nhất 8 kí tự";
            } else {
                this.messagePass = "";
            }
            this.checkButton();
        },
    },
};
