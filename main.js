let datas = [
    `天人我一二三四五上下
    口耳目手日月水火山石田禾
    云雨风花鸟虫六七八九十爸妈马土不子
    文学国红点出己自又几牙生崔宜
    小雪儿刀早书尘心木林森中工琳然
    白草了叶大飞个头里星可东西鱼女开正多少牛只果`,


    `地你他她足站坐对画打棋鸡字词语句
    桌纸数音乐妹奶桥台家是车路灯走
    秋气树片会的船两在看见闪
    江南采莲北尖说春青蛙夏弯皮地就冬
    男关反远有色近听无声去还来
    黄猫边鸭苹杏桃包尺作业本笔课校
    明力从众双条顶峰赵新爱
    升旗歌起么美丽立午晚昨今年
    影前后黑狗左右它好朋友
    比尾巴谁长短把伞兔最公
    写诗要过给当串们以成
    数彩半空问到方没更绿长睡那海真老师吗同什才亮
    时候觉得很穿衣服快
    蓝笑着向和贝娃挂活金
    哥姐弟叔爷群竹用步为参加洞着
    乌鸦处找办旁许法放进高
    住孩玩吧发芽爬呀久回全变厂医院`
];
const dicts = [];
const request = require('request');
var fs = require('fs')

datas = datas.map(d => d.split(/\s*/g));
console.log(`认识${datas[0].length}个`, datas[0]);
console.log(`不认识${datas[1].length}个`, datas[1]);
datas.forEach((arr, level) => {
    return arr.forEach((dict) => {
        if (dict) {
            dicts.push({
                text: dict,
                level: level + 1,
            })
        }
    })
});
let index = 0;
const setPinyin = () => {
    if (index >= dicts.length) {
        fs.writeFile('cn.json', JSON.stringify(dicts, '\t', 2), function (error) {
            if (error) {
                console.log('写入失败')
            } else {
                console.log('写入成功了')
            }
        })
        return;
    };
    const dict = dicts[index];
    const url = `https://www.zdic.net/hans/${encodeURI(dict.text)}`;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const pinyin = body.match(/<span class="z_d song">(\S+?)<span class="ptr">/);
            if (pinyin && pinyin[1]) {
                dict.tag = pinyin[1];
                console.log(dict);
            } else {
                console.log(`没有找到${dict.text}的拼音`);
            }
        } else {
            console.log(error, `${dict.text}请求报错`);
        }
        index++;
        setPinyin();
    });
}

setPinyin();