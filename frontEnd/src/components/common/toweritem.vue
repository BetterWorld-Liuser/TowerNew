<template>
  <div class="itembox">
    <div class="title">
      {{ towerItem.name }}
    </div>
    <div class="introduce">
      {{ towerItem.introduce }}
    </div>
    <div class="time">
      {{ towerItem.updateTime }}
    </div>
    <div class="see">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="svg-icon svg-md-visibility"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        style="fill: rgb(255, 77, 79);"
      >
        <path
          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
        /></svg>{{ towerItem.see }}
    </div>
  </div>
</template>

<script>
export default {
props:{
    towerItem:Object
}
}
</script>

<style>
.itembox {
  width: 250px;
  height: 150px;
  border-radius: 7px;
  background-color: white;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
  position: relative;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
}
.itembox .title {
  position: absolute;
  left: 23px;
  top: 15px;
  font-size: 20px;
  font-weight: bold;
}

.itembox .introduce {
  position: absolute;
  font-size: 12px;
  top: 55px;
  left: 23px;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  width: 190px;
  height: 70px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: wrap;
}

.time {
  position: absolute;
  left: 23px;
  font-size: 13px;
  bottom: 10px;
  color: rgba(0, 0, 0, 0.5);
}

.see {
  position: absolute;
  right: 15px;
  bottom: 10px;
  font-size: 13px;
  color: rgba(255, 77, 79, 100);
}

.svg-icon {
  position: relative;
  top: 5px;
  margin-right: 7px;
  font-size: 16px;
  color: rgba(255, 77, 79, 100);
}
</style>