
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from "../../config/axios";

export default {
    name: "home",
    components: {FontAwesomeIcon},

    data() {
        return {
            blogs: {},
            newestBlogs: {},
            page: 1,
            limit: 10,
            totalPages: 5,
            keyword: '',
            visiblePages: 3,
        }
    },

    mounted() {
        this.fetchBlogs();
        this.fetchNewestBlogs();
    },

    computed:{
        startPage() {
            return Math.max(2, this.page - Math.floor(this.visiblePages / 2));
        },
        endPage() {
            return Math.min(this.totalPages - 1, this.page + Math.floor(this.visiblePages / 2));
        },
        middlePages() {
            const pages = [];
            for (let i = this.startPage; i <= this.endPage; i++) {
                pages.push(i);
            }
            return pages;
        },
    },

    methods: {
        fetchBlogs() {
            axios.get('blogs', {
                    params: {
                        page: this.page,
                        offset: this.limit,
                        search: this.keyword
                    },
                })
                .then((response) => {
                    console.log(this.keyword)
                    this.blogs = response.data.data.items;
                    this.totalPages = Math.ceil(response.data.pagination.count / this.limit)
                    console.log(this.blogs)
                })
                .catch((error) => {
                    console.error('Error when get blog:', error);
                });
        },

        searchBlogs() {
            this.page = 1;
            this.fetchBlogs();
        },

        fetchNewestBlogs() {
            axios.get('blogs', {
                params: {
                    page: 1,
                    offset: 10,
                },
            })
                .then((response) => {
                    this.newestBlogs = response.data.data.items;
                })
                .catch((error) => {
                    console.error('Error when get newest blog:', error);
                });
        },

        nextPage() {
            if (this.page < this.totalPages) {
                this.page += 1;
                this.fetchBlogs();
            }
        },
        prevPage() {
            if (this.page > 1) {
                this.page -= 1;
                this.fetchBlogs();
            }
        },
        goToPage(n) {
            this.page = n;
            this.fetchBlogs();
        },
    }

}
