const { Wechaty } = require('wechaty');
const { FileBox } = require('file-box');

// 机器人需要扫码登录的时候，会触发这个事件，当手机扫码登录后，机器人就可以登录进去了。
function onScan(qrcode, status) {
     console.log('--------- 扫描二维码登录 ---------')
    // log二维码
    require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console
}

// 登入
function onLogin(user) {
    console.log(`--------- ${user.name()}已登陆 --------- `)
}

// 登出
function onLogout(user) {
    console.log(`--------- ${user.name()}已登出 --------- `)
}

// 新消息时触发
async function onMessage(msg) {
    // await msg.say('dong')
    // const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
    // await msg.say(fileBox)
    const contact = msg.from()
    const text = msg.text()
    const room = msg.room()
    if(room){
        // 获取群聊名称
        const roomTopic = room.payload.topic
        if (roomTopic === '嘘~~') {
            switch (contact.name()){
                case 'go':
                    await room.say('小旭 你闭嘴!')
                    break;
                case '聶':
                    await room.say('删删 你闭嘴!')
                    break;
                default:
                    console.log(contact.name())
            }
        }
    }
}


const bot = new Wechaty()
bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)

bot.start()
    .then(() => console.log('Starter Bot Started.'))

