<template>
    <div :class="filterName + ' filter-item'"  :style="{ backgroundImage: `url(${image})` }" @click="fire(filterName)">
        <div class="filter-name" ><slot></slot>
        </div>
    </div>
</template>
<script>

export default {
    name : 'filterBox',
    methods : {
        fire(param){
            this.emitter.emit('filterApply', param);
        }
    },
    props: {
        image: String,
        filterName : String
    }
}
</script>
<style scoped>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
    background-position: center;
}
.filter-name{
    color:black;
}
</style>