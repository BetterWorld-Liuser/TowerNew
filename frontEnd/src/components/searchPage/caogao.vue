 <div class="searchBar">
      <div class="searchContent">
        <input
          type="text"
          v-model="query"
          id="search"
          placeholder="搜索砖石"
        >
        <button
          class="searchButton"
          @click="search"
        >
          搜索
        </button>
      </div>
    </div>
    <div
      v-if="searchRes.length!=0"
      class="contentContainer"
    >
      <div
        v-for="item in searchRes"
        :key="item._id"
        class="itemContainer"
        @click="jumpTo(item)"
      >
        <div class="title">
          {{ item.title }}
        </div>
        <div class="description">
          {{ item.description }}
        </div>
        <div class="info">
          <div class="like">
            关注<span class="num">{{ item.watching }}</span>
          </div>
          <div class="comment">
            模块数<span class="num">{{ item.modules==undefined?0:item.modules.length }}</span>
          </div>
          <div class="share">
            观看历史<span class="num">{{ item.seeTimes }}</span>
          </div>
        </div>
      </div>
    </div>