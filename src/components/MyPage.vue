<template>
    <div style="padding : 10px">
        <h4>팔로워</h4>
        <input placeholder="🍓" @input="doThis" />
        <div class="post-header" v-for="f in copy" :key="f">
            <div class="profile" :style="{ backgroundImage: `url(${f.image})` }"></div>
            <span class="profile-name">{{ f.name }}</span>
        </div>
        <div class="post-header">

        </div>
    </div>
</template>
<script>
import { onMounted, reactive, ref, toRefs, watch, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
export default {
    name: 'MyPage',
    setup(props) {
        let follower = ref([]); //object, array 아닌 자료형 넣을때 사용
        let copy = ref([]);
        let test = reactive({ name: 'kim' }); //object, array 를 넣음
        test;
        function doThis(e) {
            var val = e.target.value;
            copy.value = follower.value.filter((element) => element.name.includes(val));
        }
        let { one } = toRefs(props);
        console.log(one.value);

        watch(one, () => {

        })

        let 결과 = computed(() => {
            return follower.value.length;
        })
        console.log(결과.value);


        let store = useStore();
        console.log(store.state.name);

        onMounted(() => {
            axios.get('/follower.json').then((a) => {
                follower.value = a.data;
                copy.value = a.data;
            })
        })
        return { follower, copy, doThis }
    },
    data() {
        return {

        }
    },
    props: {
        one: Number
    },
}
</script>
<style scoped>

</style>