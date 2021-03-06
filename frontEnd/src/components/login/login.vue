<template>
  <div class="loginPanel">
    <form
      id="form"
      class="form"
    >
      <h2>登录</h2>
      <h4 style="text-align:center">
        若无账号则会自动创建账号
      </h4>
      <div class="form-control">
        <label for="email">邮箱</label>
        <input
          type="text"
          id="email"
          placeholder="请输入邮箱"
          v-model="email"
        >
        <small>错误提示</small>
      </div>
      <div class="form-control">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          placeholder="请输入密码"
          v-model="password"
        >
        <small>错误提示</small>
      </div>
      <button @click="login">
        登录/注册
      </button>
    </form>
  </div>
</template>

<script>
//import navbar from "../component_common/selfnavbar";
import reqLogin from '../../request/reqLogin';

export default {
  data(){
    return{
      email:"",
      password:""
    }
  },
  mounted() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let form = document.getElementById("form");

    // show input error message
    function showError(input, message) {
      const formControl = input.parentElement;
      formControl.className = "form-control error";
      const small = formControl.querySelector("small");
      small.innerText = message;
    }

    // show success
    function showSuccess(input) {
      const formControl = input.parentElement;
      formControl.className = "form-control success";
    }

    // check email is valid
    function checkEmail(input) {
      const re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
      if (re.test(input.value.trim())) {
        showSuccess(input);
      } else {
        showError(input, "邮箱格式错误");
      }
    }

    //checkLength
    function checkLength(input, min, max) {
      if (input.value.length < min) {
        showError(input, `${getKeyWords(input)}至少${min}个字符`);
      } else if (input.value.length > max) {
        showError(input, `${getKeyWords(input)}少于${max}个字符`);
      } else {
        showSuccess(input);
      }
    }
    function getKeyWords(input) {
      return input.placeholder.slice(3);
    }

    // checkRequired input
    function checkRequired(inputArr) {
      inputArr.forEach(function(input) {
        if (input.value.trim() === "") {
          showError(input, `${getKeyWords(input)}为必填项`);
        } else {
          showSuccess(input);
        }
      });
    }

    form.addEventListener("submit",async function(e) {
      e.preventDefault();
      checkRequired([email, password]);
      checkLength(password, 6, 12);
      checkEmail(email);
    });
  },
  methods:{
    async login(){
      let data =await reqLogin.getToken(this.email,this.password)
      console.log(data)
      if(data.token){
        let loseToken = new Date()
        alert(data.message);
        localStorage.setItem('userEmail', this.email);
        localStorage.setItem('loginState', true);
        
        localStorage.setItem('loseToken',loseToken)
        if(data.token){
          this.$store.commit('Login')
          localStorage.setItem('token',data.token);}
          this.$router.go(-1)
      }else{
        alert(data.message);
      }
      }
    
  }
};
</script>

<style scoped>
.loginPanel {
  width: 40%;
  height:520px;
  margin:2rem auto;
  background-color:white;
  border-radius: 5px;
}

h2 {
  text-align: center;
  margin: 0 0 20px;
}

.form {
  padding: 30px 40px;
}

.form-control {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.form-control label {
  color: #777;
  display: block;
  margin-bottom: 5px;
  float: left;
}

.form-control input {
  width: 100%;
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  padding: 10px;
  font-size: 14px;
}

.form-control input:focus {
  border-color: #777;
  outline: 0;
}

.form-control.success input {
  border-color: var(--success-color);
}

.form-control.error input {
  border-color: var(--error-color);
}

.form-control small {
  color: var(--error-color);
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
}

.form button {
  cursor: pointer;
  background-color: #69c0ff;
  border-radius: 4px;
  border:none;
  color: white;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 70%;
  margin:10px auto;
}

@media screen and (max-width: 1024px) {
  .loginPanel {
    width: 90%;
  }
}
</style>
