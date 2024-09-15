import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from "../../config/axios";


export default {
    name: "blog-detail",
    components: {
        FontAwesomeIcon,
    },

    props: ["id"],

    data() {
        return {
            blog: {},
            newestBlogs: [],
        }
    },

    created() {
        if (this.id) {
            this.getBlogById(this.id);
        }
        this.fetchNewestBlogs();
    },

    watch: {
        id() {
            this.blog = null;
            this.getBlogById(this.id);
        },
    },

    methods: {
        getBlogById(id) {
            axios.get(`blogs/${id}`)
                .then((response) => {
                    console.log(response)
                    this.blog = response.data.data;
                })
                .catch((error) => {
                    console.error('Error when get blog:', error);
                });
        },
        fetchNewestBlogs() {
            axios.get('blogs', {
                params: {
                    page: 1,
                    offset: 5,
                },
            })
                .then((response) => {
                    this.newestBlogs = response.data.data.items;
                })
                .catch((error) => {
                    console.error('Error when get newest blog:', error);
                });
        },
    },
}
