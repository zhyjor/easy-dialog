import Dialog from '../dialog'
import $ from 'jquery'

/**
 * 用户提醒
 *
 * @param content 提醒的内容
 * @param button 可以传入空，是按钮的文字
 * @param callback 回调
 * @param timer 可以自动隐藏，可以不传入
 * @param settings 可以不传入
 */
function alert (content, button, callback, timer, settings) {
    var options = {};
    var defaults = {
        zIndex: 100,
    };
    if (typeof content == 'object') {
        options = $.extend(defaults, content);
    } else {
        options = $.extend(defaults, {
            content: content,
            button: button,
            timer: timer,
            callback: callback,
            width: 283,
            height: 'auto'
        });
    }

    function _initAlert (settings) {
        var alert = new Dialog();
        var html = '<div class="ui-alert-title">' + settings.content + '</div>';
        var action = '';
        var className = 'ui-alert';
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

    _initAlert($.extend(options, settings))
}

export default alert
