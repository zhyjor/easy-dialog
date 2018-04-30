import Dialog from '../dialog'
import $ from 'jquery'

/**
 * 最普通的toast
 *
 * @param content 提醒内容
 * @param timer 倒计时，使用ms
 * @param callback
 * @param settings
 */
function toast (content, timer, callback, settings) {
    var options = {};
    var defaults = {
        zIndex: 100,
    };
    if (typeof content == 'object') {
        options = $.extend(defaults, content);
    } else {
        var charLength = content.length;
        var wid = Number(charLength) * 14 + 28;
        options = $.extend(defaults, {
            content: content,

            timer: timer,
            callback: callback,
            width: wid || 283,
            mask: false,
            height: 'auto'
        });
    }

    function _initToast (settings) {
        var alert = new Dialog();
        var html = '<div class="ui-toast-title">' + settings.content + '</div>';
        var action = '';
        var className = 'ui-toast';
        if (settings.button) {
            if (typeof settings.button == 'boolean') {
                settings.button = '确定';
            }
            ;
            action = '<p class="ui-dialog-action"><button class="ui-alert-submit  js-dialog-close">' + settings.button + '</button></p>';
        } else if (!settings.timer) {
            // settings.timer = 3000;
            className += ' ui-alert-tip';
        }
        html += action;
        var alertOptions = $.extend({
            target: html,
            animate: true,
            show: true,
            mask: true,
            className: className,
            afterHide: function (c) {
                this.dispose();
                settings.callback && settings.callback();
            }
        }, settings);
        alert.init(alertOptions);
        if (settings.timer) {
            setTimeout(function () {
                alert.dispose();
                settings.callback && settings.callback();
            }, settings.timer);
        }
        alert.touch(alert.mask, function () {
            alert.hide();
            settings.callback && settings.callback();
        });
    }

    _initToast($.extend(options, settings));
}

export default toast