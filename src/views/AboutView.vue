<template>
  <p>About View</p>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 刷新页面
    refresh() {
      console.log('刷新页面');
      window.location.reload();
    },
  },
  mounted() {
    // this.refresh();
  },
};
</script>