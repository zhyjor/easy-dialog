import $ from 'jquery'

/**
 * 公用类，提供通用方法
 */
export default class Dialog {
    constructor (){
        let rnd = Math.random().toString().replace('.', '')
        this.id = 'dialog_' + rnd;
        this.settings = {};
        this.settings.closeTpl = $('<span class="ui-dialog-close js-dialog-close">x</span>');
        this.settings.titleTpl = $('<div class="ui-dialog-title"></div>');
        this.timer = null;
        this.showed = false;
        this.mask = $();
    }

    init(settings){
        var _this = this;
        this.settings = $.extend({
            fixed: false //是否固定位置，
        }, this.settings, settings);
        if(this.settings.mask) {
            this.mask = $('<div class="ui-dialog-mask"/>');
            $('body').append(this.mask);
        }
        $('body').append('<div class="ui-dialog" id="' + this.id + '"></div>');
        this.dialogContainer = $('#' + this.id);
        var zIndex = this.settings.zIndex || 10;
        this.dialogContainer.css({
            'zIndex': zIndex
        });
        if(this.settings.className) {
            this.dialogContainer.addClass(this.settings.className);
        }
        ;
        this.mask.css({
            'zIndex': zIndex - 1
        });
        if(this.settings.closeTpl) {
            this.dialogContainer.append(this.settings.closeTpl);
        }
        if(this.settings.title) {
            this.dialogContainer.append(this.settings.titleTpl);
            this.settings.titleTpl.html(this.settings.title);
        }
        this.bindEvent();
        if(this.settings.show) {
            this.show();
        }
    }
    touch(obj, fn){
        var move;
        //在某些浏览器里，如微信旧版本的iphone5s会出现闪一下就消失
        // $(obj).on('click', click);
        //
        // function click(e) {
        //     return fn.call(this, e);
        // }

        $(obj).on('touchmove', function(e) {
            move = true;
            console.log(e)
        }).on('touchend', function(e) {
            e.preventDefault();
            if(!move) {
                var returnvalue = fn.call(this, e, 'touch');
                if(!returnvalue) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
            move = false;
        });
    }

    inputCheck(obj,shownull){
        var pattern = /^[\u4e00-\u9fa5_a-zA-Z0-9_]+$/;
        var flag = true;

        function check(shownull) {
            var inputVal = $(obj).val();
            var inputAlert = $('.ui-prompt-input-alert');

            if(pattern.test(inputVal) || inputVal.length == 0) {
                inputAlert.html('');
                $('.ui-prompt-input-alert').show();
                flag = true;
            } else {
                inputAlert.html('输入了限制字符');
                $('.ui-prompt-input-alert').show();
                flag = false;
                return;
            }

            if(inputVal.length > 10) {
                inputAlert.html('输入长度达到上限');
                $('.ui-prompt-input-alert').show();
                flag = false;
                return;
            } else if(inputVal.length <= 0){
                if(shownull){
                    inputAlert.html('输入不能为空');
                    $('.ui-prompt-input-alert').show();
                    flag = false;
                    return;
                }
            }else {
                inputAlert.html('');
                $('.ui-prompt-input-alert').show();
                flag = true;
            }
        }

        $(obj).on('input', function() {
            check(true);
        });
        check(shownull);
        return flag;
    }

    bindEvent(){
        var _this = this;
        if(this.settings.trigger) {
            $(this.settings.trigger).click(function() {
                _this.show()
            });
            _this.touch($(this.settings.trigger), function() {
                _this.show()
            });
        }
        ;
        $(this.dialogContainer).on('click', '.js-dialog-close', function() {
            _this.hide();
            return false;
        })
        $(window).resize(function() {
            _this.setPosition();
        });
        $(window).scroll(function() {
            _this.setPosition();
        })
        $(document).keydown(function(e) {
            if(e.keyCode === 27 && _this.showed) {
                _this.hide();
            }
        });
        $(this.dialogContainer).on('hide', function() {
            _this.hide();
        })
    }

    dispose(){
        this.dialogContainer.remove();
        this.mask.remove();
        this.timer && clearInterval(this.timer);
    }

    hide(){
        var _this = this;
        if(_this.settings.beforeHide) {
            _this.settings.beforeHide.call(_this, _this.dialogContainer);
        }
        this.showed = false;
        this.mask.hide();
        this.timer && clearInterval(this.timer);
        if(this.settings.animate) {
            this.dialogContainer.removeClass('zoomIn').addClass("zoomOut");
            setTimeout(function() {
                _this.dialogContainer.hide();
                if(typeof _this.settings.target === "object") {
                    $('body').append(_this.dialogContainer.hide());
                }
                if(_this.settings.afterHide) {
                    _this.settings.afterHide.call(_this, _this.dialogContainer);
                }
            }, 500);
        } else {
            this.dialogContainer.hide();
            if(typeof this.settings.target === "object") {
                $('body').append(this.dialogContainer)
            }
            if(this.settings.afterHide) {
                this.settings.afterHide.call(this, this.dialogContainer);
            }
        }
    }

    show(){
        if(typeof this.settings.target === "string") {
            if(/^(\.|\#\w+)/gi.test(this.settings.target)) {
                this.dailogContent = $(this.settings.target);
            } else {
                this.dailogContent = $('<div>' + this.settings.target + '</div>')
            }
        } else {
            this.dailogContent = this.settings.target;
        }
        this.mask.show();
        this.dailogContent.show();
        this.height = this.settings.height || 'auto' //this.dialogContainer.height();
        this.width = this.settings.width || 'auto' //this.dialogContainer.width();
        this.dialogContainer.append(this.dailogContent).show().css({
            height: this.height,
            width: this.width
        });
        if(this.settings.beforeShow) {
            this.settings.beforeShow.call(this, this.dialogContainer);
        }
        this.showed = true;
        $(this.settings.trigger).blur();

        this.setPosition();
        var _this = this;
        // $.alert(this.settings.clientWidth)
        this.timer && clearInterval(this.timer);
        if(this.settings.fixed) {
            this.timer = setInterval(function() {
                _this.setPosition();
            }, 1000);
        }
        if(this.settings.animate) {
            this.dialogContainer.addClass('zoomIn').removeClass('zoomOut').addClass('animated');
        }
    }

    setPosition(){
        if(this.showed) {
            var _this = this;
            this.dialogContainer.show();
            this.height = this.settings.height;
            this.width = this.settings.width;
            if(isNaN(this.height)) {
                this.height = (this.dialogContainer.outerHeight && this.dialogContainer.outerHeight()) || this.dialogContainer.height();
            }
            if(isNaN(this.width)) {
                this.width = (this.dialogContainer.outerWidth && this.dialogContainer.outerWidth()) || this.dialogContainer.width();
            }
            var clientHeight = $(window).height();
            var clientWidth = $(window).width();
            var ml = this.width / 2;
            var mt = this.height / 2;
            var left = clientWidth / 2 - ml;
            var top = clientHeight / 2 - mt;
            left = Math.floor(Math.max(0, left));
            top = Math.floor(Math.max(0, top));
            // console.log("ch:" + clientHeight, "cw:" + clientWidth, "left:" + left, "top:" + top, "w:" + this.width, "h:" + this.height);
            var position = 'absolute';
            if(_this.settings.fixed) {
                position = 'fixed';
            } else {
                top = top + $(window).scrollTop();
            }
            var bottom = "auto";
            if(_this.settings.position == "bottom") {
                top = "auto";
                bottom = 0;
            }
            _this.dialogContainer.css({
                position: position,
                top: top,
                left: left,
                bottom: bottom
            });
        }
    }

}