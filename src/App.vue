<template>
  <div>
    <div class="header">
      <ul class="header-button-left">
        <li>Cancel</li>
      </ul>
      <ul class="header-button-right">
        <li v-if="step == 1" @click="step++">Next</li>
        <li v-if="step == 2" @click="publish">발행</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>
    <!-- <h4>안녕 {{ $store.state.name }}</h4>
    <h4>안녕 {{ $store.state.age }}</h4>
    <button @click="$store.commit('이름변경')">버튼</button>
    <button @click="$store.commit('증가', 1)">증가버튼</button> -->
    <!-- <p>{{ $store.state.more }}</p>
    <button @click="$store.dispatch('getData')">더보기버튼</button> -->
    <Container :viewData="viewData" :step="step" :uploadImage="uploadImage"  @write="content=$event" :tempFilter="filter"/>

    <button @click="clickCount++ ; more()">더보기</button>
    <div class="footer">
      <ul class="footer-button-plus">
        <input @change="upload" multiple type="file" id="file" class="inputfile" />
        <label for="file" class="input-plus">+</label>
      </ul>
    </div>
  </div>

</template>

<script>
import ContainerVue from './components/ContainerVue.vue';
// import ViewData from './data';
import axios from 'axios'
import {mapMutations, mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    Container: ContainerVue
  },
  data() {
    return {
      // viewData: ViewData,
      clickCount: -1,
      step: 3,
      uploadImage: '',
      content : '',
      filter : '',
      카운터 : 0
    }
  },
  methods: {
    //store.js 에 있는 함수 가져다 쓰려면 ...mapMutations
    //그러면 위에서 store.commit('증가') 이렇게 안쓰고 @click=증가() 이렇게 쓰면됨
    ...mapMutations(['이름변경', '좋아요', '증가']),
    more() {
      axios.get('https://codingapple1.github.io/vue/more' + this.clickCount + '.json')
        .then((결과) => {
          console.log(결과.data);
          this.viewData.push(결과.data);
        })
    },
    upload(e) {
      let 파일 = e.target.files;
      console.log(파일);
      let url = URL.createObjectURL(파일[0]);
      console.log(url);
      this.uploadImage = url;
      this.step = 1;
    },
    publish() {
      var 내게시물 = {
        name: "Lee Ji Young",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.uploadImage,
        likes: 1004,
        date: "Sep 12",
        liked: false,
        content : this.content,
        filter: this.filter
      };
      this.viewData.unshift(내게시물);
      this.step = 0;
    },
    filterApply(param){
      this.filter = param;
    },
    now(){
      return new Date();
    }
  },
  mounted(){
    this.emitter.on('filterApply', (a) => {
      console.log(a);
      this.filterApply(a);
    })
  },
  //computed : 페이지 로딩시 한 번만 실행 (연산 결과 저장 해 놓음)
  //state 가져다 쓸때 유용함
  computed : {
    now2(){
      return new Date();
    },
    name(){
      return this.$sotre.state.name;
    },
    //vuex state 한번에 꺼내쓰려면 mapState 를 쓰자
    ...mapState(['viewData'])
  }
}
</script>

<style>
body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
