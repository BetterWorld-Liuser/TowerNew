const nodemailer = require("nodemailer");
const config = require("../../config.js")

class mailer {
    //发送邮件
    async sendMail(email,subject,information) {
        let transporter = this.createConnect()
        let info = await transporter.sendMail({
            from: '735083049@qq.com', // sender address
            to: email, // list of receivers
            subject:'😃'+ subject, // Subject line
            html: information
        });
        console.log("邮件已发送: %s", info.messageId);
    }
    //连接邮件服务器
    createConnect() {
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: config.mailUser, // generated ethereal user
                pass: config.mailPass, // generated ethereal password
            },
        });
        return transporter
    }

/*     //砖石重大更新邮件发送
    async brickNewMail(email,url){
        await this.sendMail(email,"你关注的砖石发布了重要更新","<a target="+url+">点击链接即可查看页面</a>")
    } */
}

module.exports = new mailer()