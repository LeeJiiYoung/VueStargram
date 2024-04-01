import axios from "axios";
import { createStore } from "vuex";
import data from './data';
const store = createStore({
  state() {
    return {
      name: "kim",
      age: 20,
      likes: [30, 30, 30],
      more: {},
      viewData : data
    };
  },
  mutations: {
    이름변경(state) {
      state.name = "park";
    },
    증가(state, payload) {
      state.age += payload;
    },
    좋아요증가(state, i) {
      state.viewData[i].likes++;
    },
    클릭(state, i) {
      if (state.viewData[i].liked == false) {
        state.viewData[i].likes++;
      } else {
        state.viewData[i].likes--;
      }
      state.viewData[i].liked = !state.viewData[i].liked;
    },
    setMore(state, data) {
      state.more = data;
    },
  },
  actions: {
    getData(context) {
      axios.get("https://codingapple1.github.io/vue/more0.json").then((a) => {
        console.log(a.data);
        context.commit("setMore", a.data);
      });
    },
  },
});

export default store;
