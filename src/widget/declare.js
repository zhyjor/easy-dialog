import Dialog from '../dialog'
import $ from 'jquery'

/**
 * 一些使用帮助或者使用许可的显示
 *
 * @param content 提醒的内容
 * @param buttons
 * @param callback
 * @param settings
 */
function declare (content, buttons, callback, settings) {
    var options = {};
    var defaults = {
        zIndex: 100,
    };

    options = $.extend(defaults, content, {
        buttons: buttons,
        width: 283,
        callback: callback
    });

    function _initDeclare (settings) {
        var dialog = new Dialog();
        var html = ' <div class="ui-declare-head">' + settings.bar + '</div><div class="ui-declare-title">' + settings.content + '</div>';
        var action = '';
        if (!settings.buttons) {
            settings.buttons = [{
                'yes': '同意'
            }, {
                'no': '取消'
            }];
        }
        ;
        var btnstr = '';
        for (var i = 0, l = settings.buttons.length; i < l; i++) {
            var item = settings.buttons[i];
            if (item.yes) {
                btnstr += '<td><button class="ui-declare-submit " data-type="yes">' + item.yes + '</button></td>';
            }
            if (item.no) {
                btnstr += '<td><button class="ui-declare-no" data-type="no">' + item.no + '</button></td>';
            }
            if (item.close) {
                btnstr += '<td><button class="ui-declare-close js-dialog-close" data-type="close">' + item.close + '</button></td>';
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
                dialog.touch($('.ui-declare-submit', c), function () {
                    settings.callback && settings.callback.call(dialog, 'yes', c);
                });
                dialog.touch($('.ui-declare-no', c), function () {
                    settings.callback && settings.callback.call(dialog, 'no', c);
                });
                dialog.touch($('.ui-declare-close', c), function () {
                    settings.callback && settings.callback.call(dialog, 'close', c);
                });
            }
        }, settings);
        dialog.init(options);
    }

    _initDeclare($.extend(options, settings));
}

export default declare