<template>
  <div>{{test}}</div>
</template>

<script>
    export default {
        name: "MyIndex",
        data(){
            return{
                test: ''
            }
        },
        created() {
            this.test = window.sessionStorage.getItem('token');
        }
    }
</script>

<style scoped>

</style>
