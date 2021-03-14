<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search" @click="request">搜索</el-button>
    {{res}}
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      res: '',
    };
  },
  created() {
    console.log(this.$store);
  },
  methods: {
    request() {
      this.$http({ path: 'cgi/set_userconf.shtml', type: 'post' }, {
        ip: '127.0.0.1',
        userconf: { userName: 'admin', userPwd: '123456' },
      })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>
