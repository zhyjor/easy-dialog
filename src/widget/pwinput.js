import Dialog from '../dialog'
import $ from 'jquery'

/**
 * 一个弹窗输入框输入框，可以按表格输入内容
 *
 * @param content 这里的content是一个对象，包含bar,content.bar是title,content是传入值
 * @param buttons
 * @param callback
 * @param settings
 */
function pwinput (content, buttons, callback, settings) {

    var options = {};
    var defaults = {
        zIndex: 100,
        type: 'pwinput'
    };
    if (content) {
        if (!content.bar) {
            content.bar = '标题';
        }
    } else {
        throw new Error('You need to set the param "content"')
    }

    options = $.extend(defaults, content, {
        buttons: buttons,
        width: 283,
        callback: callback
    });


    function _initPWInput (settings) {
        var dialog = new Dialog();
        var inputHtml =
            '<div class="security-code-wrap">' +
            '<label for="code"><ul id="ulCode" class="line-container security-code-container"></ul></label>' +
            '<input ref="input" class="input-code" id="code" type="tel" maxlength="' + settings.inputLength + '" autocorrect="off" autocomplete="off" autocapitalize="off">' +
            '</div>'
        var html = ' <div class="ui-pwinput-head">' + settings.bar + '</div>' +
            '<div class="ui-pwinput-title">' +
            inputHtml + '</div>';
        var action = '';
        if (!settings.buttons) {
            settings.buttons = [{
                'yes': '确定'
            }, {
                'no': '取消'
            }];
        }
        ;
        var btnstr = '';
        for (var i = 0, l = settings.buttons.length; i < l; i++) {
            var item = settings.buttons[i];
            if (item.yes) {
                btnstr += '<td><button class="ui-pwinput-submit " data-type="yes">' + item.yes + '</button></td>';
            }
            if (item.no) {
                btnstr += '<td><button class="ui-pwinput-no" data-type="no">' + item.no + '</button></td>';
            }
            if (item.close) {
                btnstr += '<td><button class="ui-pwinput-close js-dialog-close" data-type="close">' + item.close + '</button></td>';
            }
        }
        action = '<table class="ui-dialog-action"><tr>' + btnstr + '</tr></table>';
        if (settings.position == "bottom") {
            html = action + html;
        } else {
            html += action;
        }
        var options = $.extend({
            target: html,
            animate: true,
            show: true,
            fixed: true,
            mask: true,
            className: "ui-alert",
            afterHide: function(c) {
                this.dispose();
            },
            beforeShow: function(c) {
                dialog.initPWInput(settings.inputLength);
                // dialog.inputCheck($('.ui-prompt-input'), false);
                dialog.touch($('.ui-pwinput-submit', c), function() {
                    if (dialog.checkPWInput($('#code'), settings.inputLength)) {
                        settings.callback && settings.callback.call(dialog, 'yes', $('#code').val(), c);
                    }

                });
                dialog.touch($('.ui-pwinput-no', c), function() {
                    settings.callback && settings.callback.call(dialog, 'no', $('#code').val(), c);
                });
                dialog.touch($('.ui-pwinput-close', c), function() {
                    settings.callback && settings.callback.call(dialog, 'close', $('#code').val(), c);
                });

            }
        }, settings);
        dialog.init(options);
    }

    _initPWInput($.extend(options, settings));
}

export default pwinput