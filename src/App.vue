<template>
  <div id="app">
    <router-view />
    <button
      style="position:absolute;left:100px;bottom:20px;z-index:999999"
      @click="del"
    >删除后台除User数据</button>
  </div>
</template>
<script>
import HttpClient from '@/app/lib/http/HttpClient';
export default {
  methods: {
    del () {
      HttpClient.get('/resetJsonExUser')
    }
  }
}
</script>
<style>
</style>
