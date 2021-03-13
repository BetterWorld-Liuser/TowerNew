import reqBrick from "../../request/reqBrick"

export default class brickObject {
    brickData = {
        _id: "",
        title: "加载中",
        watchingUser: [],
        introduce: "暂无介绍",
        like: 0,
        author: "陌生人",
        modules: [],
        lock: false,
        description: "暂无介绍",
        seeTimes: 0,
        editHistory: []
    };

    //添加关注人数
    async watchAdd(email) {
        reqBrick.watchingAdd(this.brickData._id);
        this.brickData.watchingUser.push(email);
    }
    //去除关注的人
    async watchRemove(email) {
        reqBrick.watchingRemove(this.brickData._id);
        this.brickData.watchingUser.push(email);
        this.brickData.watchingUser = this.brickData.watchingUser.filter((el) => {
            if (el == email) {
                return false;
            }
            return true;
        });
    }
    //标记喜欢这个砖石
    async likeBrick() {
        await reqBrick.likeBrick(this.brickData._id);
        this.brickData.like++;
    }
    //获取砖石数据
    async getBrick(_id) {
        let {
            res
        } = await reqBrick.getBrick(_id);
        this.brickData = res;   
    }
    //交换砖石菜单的结构
    async switchIndex(menuIndex) {
        await reqBrick.sortModule(this.brickData._id, menuIndex.oldIndex, menuIndex.newIndex);
    } 
}