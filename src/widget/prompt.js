import Dialog from '../dialog'
import $ from 'jquery'

/**
 * 一个弹窗输入框
 *
 * @param content 这里的content是一个对象，包含bar,content.bar是title,content是传入值
 * @param buttons
 * @param callback
 * @param settings
 */
function prompt (content, buttons, callback, settings) {

    var options = {};
    var defaults = {
        zIndex: 100,
    };
    if (content) {
        if (!content.bar) {
            content.bar = '标题';
        }
        if (!content.content) {
            content.content = '';
        }
    }

    options = $.extend(defaults, content, {
        buttons: buttons,
        width: 283,
        callback: callback
    });


    function _initPrompt (settings) {
        var dialog = new Dialog();
        var html = ' <div class="ui-prompt-head">' + settings.bar + '</div>' +
            '<div class="ui-prompt-title">' +
            '<input type="text" class="ui-prompt-input" placeholder="请输入价格分组名称" value=' + settings.content + '>' +
            '<span class="ui-prompt-input-alert"></span></div>';
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
                btnstr += '<td><button class="ui-prompt-submit " data-type="yes">' + item.yes + '</button></td>';
            }
            if (item.no) {
                btnstr += '<td><button class="ui-prompt-no" data-type="no">' + item.no + '</button></td>';
            }
            if (item.close) {
                btnstr += '<td><button class="ui-prompt-close js-dialog-close" data-type="close">' + item.close + '</button></td>';
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
            afterHide: function (c) {
                this.dispose();
            },
            beforeShow: function (c) {
                dialog.inputCheck($('.ui-prompt-input'), false);
                dialog.touch($('.ui-prompt-submit', c), function () {
                    if (dialog.inputCheck($('.ui-prompt-input'), true)) {
                        settings.callback && settings.callback.call(dialog, 'yes', $('.ui-prompt-input').val(), c);
                    }

                });
                dialog.touch($('.ui-prompt-no', c), function () {
                    settings.callback && settings.callback.call(dialog, 'no', $('.ui-prompt-input').val(), c);
                });
                dialog.touch($('.ui-prompt-close', c), function () {
                    settings.callback && settings.callback.call(dialog, 'close', $('.ui-prompt-input').val(), c);
                });

            }
        }, settings);
        dialog.init(options);
    }

    _initPrompt($.extend(options, settings));
}

export default prompt