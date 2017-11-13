export default {
    name: "apptable",

    props: {
        headers: Array,
        datas: Array,
        defaultSortKey: String,
        defaultPageSize: Number
    },

    data() {
        return {
            sortKey: "",
            sortOrder: 1,
            pageSize: 20,
            pageSizeText: "20",
            pageNumber: 1,
            maxPage: 0,
            filteredLength: 0,
            filterKey: ""
        };
    },

    created() {
        this.sortKey = this.defaultSortKey || "";
        this.pageSize = this.defaultPageSize || 20;
        this.pageSizeText = this.pageSize;
    },

    computed: {
        filteredData() {
            console.log("filtering and sorting...");
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var sortKey = this.sortKey;
            var sortOrder = this.sortOrder;
            var data = this.datas;
            if (filterKey && filterKey.trim() != "") {
                data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return (
                            String(row[key])
                            .toLowerCase()
                            .indexOf(filterKey) > -1
                        );
                    });
                });
            }
            if (sortKey) {
                data = data.sort(function (o1, o2) {
                    let a = o1[sortKey];
                    let b = o2[sortKey];
                    if (!isNaN(a) && !isNaN(b)) {
                        return (a - b) * sortOrder;
                    }
                    return (a === b ? 0 : a > b ? 1 : -1) * sortOrder;
                });
            }
            this.filteredLength = data.length;
            this.maxPage = Math.ceil(this.filteredLength / this.pageSize);
            if (this.maxPage < 1) {
                this.maxPage = 1;
            }
            var from = this.pageSize * (this.pageNumber - 1);
            return data.slice(from, from + this.pageSize);
        }
    },

    methods: {
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder * -1;
            }
            this.sortKey = key;
        },
        prev() {
            if (this.maxPage !== 1) {
                this.pageNumber = this.pageNumber - 1;
                if (this.pageNumber < 1) {
                    this.pageNumber = 1;
                }
            }
        },
        next() {
            if (this.maxPage !== 1) {
                this.pageNumber = this.pageNumber + 1;
                if (this.pageNumber > this.maxPage) {
                    this.pageNumber = this.maxPage;
                }
            }
        },
        first() {
            this.pageNumber = 1;
        },
        last() {
            this.pageNumber = this.maxPage;
        }
    },

    watch: {
        filterKey() {
            this.pageNumber = 1;
        },
        pageSizeText() {
            this.pageNumber = 1;
            if (this.pageSizeText === "All") {
                this.pageSize = this.filteredLength;
            } else {
                this.pageSize = Number(this.pageSizeText);
            }
        }
    }
};