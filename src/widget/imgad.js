import Dialog from '../dialog'
import $ from 'jquery'

function imgad (content, callback, settings) {
    var options = {};
    var defaults = {
        zIndex: 100,
    };
    if (typeof content == 'object') {
        options = $.extend(defaults, content);
    } else {
        options = $.extend(defaults, {
            content: content,
            callback: callback,
            width: 283,
            mask: true,
            height: 'auto'
        });
    }

    function _initImgad (settings) {
        var dialog = new Dialog();
        var ImgLoad = new Image();
        ImgLoad.src = settings.content;
        ImgLoad.onerror = function () {
            console.log('图片加载失败不会显示');
        }
        ImgLoad.onload = function () {
            var html = '<div class="ui-imgad-title"><img src=' + ImgLoad.src + '></div>';
            var className = 'ui-imgad';

            var action = ' <div class="ui-dialog-action" style="margin-top: 30px;border: none;"><span class="ui-imgad-no" data-type="no">X</span></div>';
            html += action;
            var alertOptions = $.extend({
                target: html,
                animate: true,
                show: true,
                mask: true,
                className: className,
                afterHide: function (c) {
                    this.dispose();
                },
                beforeShow: function (c) {
                    dialog.touch($('.ui-imgad-no', c), function () {
                        settings.callback && settings.callback.call(dialog, 'no', c);
                    });
                }
            }, settings);
            dialog.init(alertOptions);
        }
        //img加载延时，需要回调处理，先延时加载
        // $('.ui-imgad-title img').load(function () {
        //     dialog.setPosition()
        // });
    }

    _initImgad($.extend(options, settings));
}

export default imgad