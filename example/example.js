import easyDialog from '../lib'

var txt = ' 任何用户在使用搜狗网站（www.sogou.com）搜索引擎服务之前，均应仔细阅读本声明，用户可选择不使用搜狗网站搜索引擎服务，一旦使用，即被视为对本声明全部内容的认可和接受。\n' +
    '            <br>　　\n' +
    '            1、任何通过搜狗网站搜索引擎技术和服务所得的搜索结果链接的网页，以及网页中之所有内容，均系该网页所属第三方网站的所有者制作和提供（以下简称"第三方网页"）。该等搜索结果和第三方网页均系搜索引擎技术自动搜录所得，并不是也不反映搜狗公司之任何意见和主张，也不表示搜狗公司同意或支持该等第三方网页上的任何内容、主张或立场。搜狗公司对第三方网页中内容之合法性、准确性、真实性、适用性、安全性等概不负责，也无法负责。\n' +
    '<br>\n' +
    '            　　2、任何单位或个人如需要第三方网页中内容（包括资讯、资料、消息、产品或服务介绍、报价等），并欲据此进行交易或其他行为前，应慎重辨别这些内容的合法性、准确性、真实性、实用性和安全性（包括下载第三方网页中内容是否会感染电脑病毒），并采取谨慎的预防措施。如您不确定这些内容是否合法、准确、真实、实用和安全，搜狗公司建议您先咨询专业人士。\n' +
    '            <br>\n' +
    '            　　3、任何单位或者个人因相信、使用第三方网页中信息、服务、产品等内容，或据此进行交易等行为，而引致的人身伤亡、财产毁损（包括因下载而感染电脑病毒）、名誉或商誉诽谤、版权或知识产权等权利的侵犯等事件，及因该等事件所造成的损害后果，搜狗公司概不负责，亦不会也不能承担任何法律责任，而应由第三方网页的所有者承担。无论何种原因，搜狗公司不对任何非与搜狗公司直接发生的交易和行为承担任何直接、间接、附带或衍生的损失和责任。\n' +
    '            <br>\n' +
    '            　　4、任何第三方网站如不想被搜狗公司的搜索引擎技术收录，须及时向搜狗公司反映，或在其网站的页面中根据拒绝蜘蛛协议（Robots Exclusion Protocol）加注拒绝收录的标记，否则，搜狗公司的搜索引擎技术将视其为可收录网站。\n' +
    '            <br>\n' +
    '            　　5、任何单位或个人如认为通过搜狗网站搜索引擎服务所得的第三方网页中内容可能涉嫌侵害其合法著作权，应按照《信息网络传播权保护条例》的规定，以书面的形式及时向搜狗公司反应，并提供相应身份证明、权属证明及详细的侵权情况证明，搜狗公司在收到上述文件后，会尽快断开搜索结果中至被控侵权的第三方网页的链接。如果该等被断开链接的第三方网站所有者认为被提出权利主张的搜狗搜索结果并未侵害他人合法著作权的，亦有权按照《信息网络传播权保护条例》的规定，向搜狗公司发出关于被断开链接不违反《信息网络传播权保护条例》的反通知。搜狗公司提醒您注意：如您的主张侵权或主张不侵权的陈述失实，您将按照《信息网络传播权保护条例》的规定，承担相关法律责任。\n' +
    '        ';

var items = document.getElementsByClassName('item')
items[0].addEventListener(
    'click', function() {
        easyDialog.declare({ bar: "使用许可", content: txt }, [{ 'yes': '确认' }], function(type, input, c) {
            if (type == 'yes') {
                easyDialog.toast('完成', 3000, function() {
                    console.log(c)
                })
                this.hide();
            }
        })
    }
)
items[1].addEventListener(
    'click', function() {
        easyDialog.imgad('http://oankigr4l.bkt.clouddn.com/201804301921_288.png', function() {
            this.hide();
        })
    }
)
items[2].addEventListener(
    'click', function() {
        easyDialog.prompt({ bar: "请输入小组名", content: '深圳分组' }, null, function(type, input, c) {
            if (type == 'yes') {
                easyDialog.toast(input, 3000, function() {
                    console.log(c)
                })
                this.hide();
            } else {
                easyDialog.toast(input, 3000, function() {
                    console.log(c)
                })
                this.hide();
            }
        })
    }
)
items[3].addEventListener(
    'click', function() {
        easyDialog.toast('我是不好看的弹窗', 3000, function() {
            console.log('toast隐藏')
        })
    }
)
items[4].addEventListener(
    'click', function() {
        easyDialog.alert('你确定？', true, function() {
            console.log('确定了')
        })
    }
)
items[5].addEventListener(
    'click', function() {
        easyDialog.confirm('你可以不确定的！', null, function(type) {
                easyDialog.toast('您点击了' + type, 2000);
                this.hide();
            }
        )
    }
)

items[6].addEventListener(
    'click', function() {
        easyDialog.pwinput({ bar: "请输入机器编号", inputLength: 10, isPwd: false }, null, function(type, input, c) {
            if (type == 'yes') {
                easyDialog.toast(input, 3000, function() {
                    console.log(c)
                })
                this.hide();
            } else {
                easyDialog.toast(input, 3000, function() {
                    console.log(c)
                })
                this.hide();
            }

        })
    }
)