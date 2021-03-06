<template>
  <div class="search">
    <el-autocomplete
      class="inline-input searchbox"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="搜索"
      @select="handleSelect"
    />
    
    <!-- <el-button class="searchbutton"><i class="el-icon-search"></i></el-button> -->
  </div>
</template>

<script>
export default {
  props:{
    state:String
  },
  data(){
    return{
      state1:"",
      arr:[]
    }
  },
  methods:{
    querySearch(queryString, cb) {
      let S = this.arr
        
      let results = queryString ? S.filter(this.createFilter(queryString)) : S;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    createFilter(queryString) {
        return (i) => {
          return (i.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    handleSelect(item) {
       let hand = this.state
      if(hand =="bricks"){
        this.$store.commit('changeBrickState',item.value)
        this.$router.push({path:"brickDetails"}) 
      }else{
        this.$store.commit('changeTowerState',item.value)
        this.$router.push({path:"towerDetail"}) 
      }
       
      },
    loadAll(){
      if(this.state=='tower'){
        let arr =this.towers.map(item=>{
        return {value:item.name}
      })
      return arr
      }else{
        let arr =this.bricks.map(item=>{
        return {value:item.name}
      })
      return arr
      }
    }

  },
  mounted(){
    this.arr = this.loadAll()
  },

  computed:{
    towers(){
      return this.$store.state.towers
    },
    bricks(){
      return this.$store.state.bricks
    }
  }
};
</script>

<style scoped>
.search .searchbutton {
  background-color: rgba(250, 140, 22, 100);
  height: 40px;
  color: white;
  position: relative;
  font-size: 20px;
  padding: 0 10px 0 10px;
}
.search .searchbox {
  width: 200px;
  margin-right: 20px;
  vertical-align: bottom;
}
.search {
  position: absolute;
  right: 10%;
  width: 400px;
  height: 40px;
  top: 20px;
}
</style>
