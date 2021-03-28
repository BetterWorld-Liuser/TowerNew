import app from "../../newRequest/main"

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
    //获取砖石数据-第一次获取
    async getBrick(_id) {
        let {
            data
        } = await app.get('/brickpage/getBrick', {
            params: {
                _id
            }
        });
        this.brickData = data.res;
    }

    //调整砖石标题
    async changeBrickTitle(title) {
        let {
            data
        } = await app.post('/brickpage/changeBrickTitle', {
            _id: this.brickData._id,
            title
        })
        alert(data.message)
        this.brickData.title = title;

    }

    //交换砖石菜单的结构
    async switchIndex(menuIndex) {
        await app.post('/brickpage/changeModuleList', {
            _id: this.brickData._id,
            swap1: menuIndex.oldIndex,
            swap2: menuIndex.newIndex
        })
    }

    //添加关注人数
    async watchAdd(email) {
        await app.post('/brickpage/addWatch', {
            _id: this.brickData._id,
            email
        })
        this.brickData.watchingUser.push(email);
    }
    //去除关注的人
    async watchRemove(email) {
        await app.post('/brickpage/removeWatch', {
            _id: this.brickData._id,
            email
        })
        this.brickData.watchingUser = this.brickData.watchingUser.filter((el) => {
            if (el == email) {
                return false;
            }
            return true;
        });
    }

    //点赞砖石
    async likeBrick() {
        await app.post('/brickpage/likeBrick', {
            _id: this.brickData._id
        })
        this.brickData.like++
    }

    //新建模块
    async createModule(level, i, email) {
        let {
            data
        } = await app.post('/brickpage/createModule', {
            _id: this.brickData._id,
            level,
            i,
            email
        })
        alert(data.message)
        this.getBrick(this.brickData._id)
    }

    //修改模块名称
    async changeModuleName(id,newName) {
        await app.post('/brickpage/changeModuleName', {
            _id: this.brickData._id,
            id,
            newName
        })
    }

    //修改模块等级
    async changeModuleLevel(id,level) {
        await app.post('/brickpage/changeModuleLevel', {
            _id: this.brickData._id,
            id,
            level
        })
    }

    //删除一块砖石
    async deleBrick() {
        await app.post('/brickpage/deleBrick', {
            _id: this.brickData._id,
        })
    }

    //删除模块
    async deleModule(id) {
        await app.post('/brickpage/deleModule', {
            _id: this.brickData._id,
            id
        })
    }


}