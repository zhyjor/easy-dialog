import Dialog from '../dialog'
import $ from 'jquery'

/**
 * 用户确认
 *
 * @param content 提醒的内容
 * @param buttons 可以传入空，是按钮的文字
 * @param callback
 * @param settings
 */
function confirm (content, buttons, callback, settings) {
    var options = {};
    var defaults = {
        zIndex: 100,
    };
    if (typeof content == 'object') {
        options = $.extend(defaults, content);
    } else {
        options = $.extend(defaults, {
            content: content,
            buttons: buttons,
            width: 283,
            callback: callback
        });
    }

    function _initConfirm (settings) {
        var dialog = new Dialog();
        var html = '<div class="ui-confirm-title">' + settings.content + '</div>';
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
                btnstr += '<td><button class="ui-confirm-submit " data-type="yes">' + item.yes + '</button></td>';
            }
            if (item.no) {
                btnstr += '<td><button class="ui-confirm-no" data-type="no">' + item.no + '</button></td>';
            }
            if (item.close) {
                btnstr += '<td><button class="ui-confirm-close js-dialog-close" data-type="close">' + item.close + '</button></td>';
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
                dialog.touch($('.ui-confirm-submit', c), function () {
                    settings.callback && settings.callback.call(dialog, 'yes', c);
                });
                dialog.touch($('.ui-confirm-no', c), function () {
                    settings.callback && settings.callback.call(dialog, 'no', c);
                });
                dialog.touch($('.ui-confirm-close', c), function () {
                    settings.callback && settings.callback.call(dialog, 'close', c);
                });
            }
        }, settings);
        dialog.init(options);
    }

    _initConfirm($.extend(options, settings));
}

export default confirm
