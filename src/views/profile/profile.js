import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from "../../config/axios";
import {useToast} from 'vue-toastification';
const toast = useToast();
import {Modal} from 'usemodal-vue3';

export default {
    name: "profile",
    components: {
        FontAwesomeIcon,Modal,
    },
    data() {
        return {
            profile: {},
            imageUrl: '',
            defaultImageUrl: 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
            profileUpdate: {
                name: '',
                email: '',
                avatar: {
                    url:''
                }
            },
            modalStatus: false,
            checkButton: false
        }
    },
    created() {
        this.fetchProfile();
    },
    methods: {
        fetchProfile() {
            this.profile = JSON.parse(localStorage.getItem('current-account'));
            this.imageUrl = this.profile.avatar
        },
        setDefaultImage(event) {
            event.target.src = this.defaultImageUrl;
        },
        updateProfile() {
            axios.put('me', this.profileUpdate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(async response => {

                    localStorage.setItem(
                        "current-account",
                        JSON.stringify({
                            email: this.profileUpdate.email,
                            name: this.profileUpdate.name,
                            avatar: this.profileUpdate.avatar
                        })
                    );
                    await this.fetchProfile();
                    toast.success("Update successfully")
                    this.isHide()
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Update fail")
                })
        },
        isShow(){
            this.modalStatus = true;
        },
        isHide(){
            this.modalStatus = false
        },

        isUpdateButtonDisabled() {
            return this.profileUpdate.name < 4 || this.profileUpdate.email < 8
        }
    }
}