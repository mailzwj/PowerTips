/**
 * @fileoverview 请修改组件描述
 * @author Letao<mailzwj@126.com>
 * @module powerTips
 **/
KISSY.add(function (S, Node, Base) {
    var EMPTY = '';
    var $ = Node.all, D = S.DOM, E = S.Event;

    // 标签样式
    var POS = {
        "top": {
            "left": "topleft",
            "center": "topcenter",
            "right": "topright"
        },
        "right": {
            "top": "righttop",
            "middle": "rightmiddle",
            "bottom": "rightbottom"
        },
        "bottom": {
            "left": "bottomleft",
            "center": "bottomcenter",
            "right": "bottomright"
        },
        "left": {
            "top": "lefttop",
            "middle": "leftmiddle",
            "bottom": "leftbottom"
        }
    };

    var THEME = {
        "red": "ks-PowerTips_red",
        "blue": "ks-PowerTips_blue",
        "orange": "ks-PowerTips_orange",
        "purple": "ks-PowerTips_purple"
    }

    /**
     * 请修改组件描述
     * @class PowerTips
     * @constructor
     * @extends Base
     */
    function PowerTips(cfg) {
        var self = this;
        self.triggers = $(cfg.triggers);
        if(!cfg.location){
            cfg.location = [];
        }
        cfg.location[0] = cfg.location[0] ? cfg.location[0] : "right";
        cfg.location[1] = cfg.location[1] ? cfg.location[1] : "middle";
        self.location = cfg.location;
        self.textAttr = cfg.textAttr || "title";
        self.theme = cfg.theme;
        self.spacing = self.spacing || 3;
        self.tipId = S.guid("J_PT");
        self.tip = self.createTip(self.tipId);
        self.tc = S.one(self.tip).one(".ks-ptcontent");
        // 调用父类构造函数
        // PowerTips.superclass.constructor.call(self, cfg);
        self.init();
    }
    S.extend(PowerTips, Base, /** @lends PowerTips.prototype*/{
        init: function(){
            var self = this;
            self.bindEvent();
        },
        bindEvent: function(){
            var self = this;
            self.triggers.on("mouseover", function(e){
                this.locStart = self.location[0];
                this.locEnd = self.location[1];
                if(S.one(this).attr(self.textAttr) && S.one(this).attr(self.textAttr) !== ""){
                    self.setContent(this);
                    self.setLocation(this);
                    self.show();
                }else{
                    return;
                }
            }).on("mouseout", function(e){
                self.hide();
            });
        },
        setLocation: function(node){
            var self = this;
            var np = S.one(node).offset();
            var nsize = {width: S.one(node).width(), height: S.one(node).height()};
            var tsize = {};
            var delta = 25;
            var cls_reg = /ks\-pt\w+(\s+|$)/g;
            self.tip.css("display", "block");
            tsize.width = self.tip.outerWidth();
            tsize.height = self.tip.outerHeight();
            self.tip.css("display", "none");

            //边界溢出判断
            if(node.locStart === "left"){
                var left = np.left - tsize.width - self.spacing;
                var mtop = np.top + (nsize.height - tsize.height) / 2;
                var ttop = np.top - (tsize.height - delta);
                var btop = np.top + nsize.height - delta;
                if(left < 0){
                    node.locStart = "right";
                }
                if(btop + tsize.height > $(window).height()){
                    if(mtop + tsize.height > $(window).height()){
                        node.locEnd = "top";
                    }else{
                        node.locEnd = "middle";
                    }
                }
                if(ttop < 0){
                    if(mtop < 0){
                        node.locEnd = "bottom";
                    }else{
                        node.locEnd = "middle";
                    }
                }
            }else if(node.locStart === "right"){
                var right = np.left + nsize.width + self.spacing;
                var ttop = np.top - (tsize.height - delta);
                var mtop = np.top + (nsize.height - tsize.height) / 2;
                var btop = np.top + nsize.height - delta;
                if(right + tsize.width > $(window).width()){
                    node.locStart = "left";
                }
                if(btop + tsize.height > $(window).height()){
                    if(mtop + tsize.height > $(window).height()){
                        node.locEnd = "top";
                    }else{
                        node.locEnd = "middle";
                    }
                }
                if(ttop < 0){
                    if(mtop < 0){
                        node.locEnd = "bottom";
                    }else{
                        node.locEnd = "middle";
                    }
                }
            }else if(node.locStart === "top"){
                var top = np.top - tsize.height - self.spacing;
                var tleft = np.left - (tsize.width - delta);
                var mleft = np.left + (nsize.width - tsize.width) / 2;
                var bleft = np.left + nsize.width - delta;
                if(top < 0){
                    node.locStart = "bottom";
                }
                if(bleft + tsize.width > $(window).width()){
                    if(mleft + tsize.width > $(window).width()){
                        node.locEnd = "left";
                    }else{
                        node.locEnd = "center";
                    }
                }
                if(tleft < 0){
                    if(mleft < 0){
                        node.locEnd = "right";
                    }else{
                        node.locEnd = "center";
                    }
                }
            }else if(node.locStart === "bottom"){
                var bottom = np.top + nsize.height + self.spacing;
                var tleft = np.left - (tsize.width - delta);
                var mleft = np.left + (nsize.width - tsize.width) / 2;
                var bleft = np.left + nsize.width - delta;
                if(bottom + tsize.height > $(window).height()){
                    node.locStart = "top";
                }
                if(bleft + tsize.width > $(window).width()){
                    if(mleft + tsize.width > $(window).width()){
                        node.locEnd = "left";
                    }else{
                        node.locEnd = "center";
                    }
                }
                if(tleft < 0){
                    if(mleft < 0){
                        node.locEnd = "right";
                    }else{
                        node.locEnd = "center";
                    }
                }
            }
            // D.addClass(self.tip, "ks-pt" + POS[node.locStart][node.locEnd]);
            if(cls_reg.test(self.tip.one(".J_Arrow").attr("class"))){
                self.tip.one(".J_Arrow").attr("class", self.tip.one(".J_Arrow").attr("class").replace(cls_reg, "ks-pt" + POS[node.locStart][node.locEnd]));
            }else{
                self.tip.one(".J_Arrow").addClass("ks-pt" + POS[node.locStart][node.locEnd]);
            }

            switch(POS[node.locStart][node.locEnd]){
                case "leftmiddle": {
                    self.writeStyle(np.left - tsize.width - self.spacing, np.top + (nsize.height - tsize.height) / 2);
                    break;
                }
                case "leftbottom": {
                    self.writeStyle(np.left - tsize.width - self.spacing, np.top + nsize.height - delta);
                    break;
                }
                case "lefttop": {
                    self.writeStyle(np.left - tsize.width - self.spacing, np.top - tsize.height + delta);
                    break;
                }
                case "righttop": {
                    self.writeStyle(np.left + nsize.width + self.spacing, np.top - tsize.height + delta);
                    break;
                }
                case "rightbottom": {
                    self.writeStyle(np.left + nsize.width + self.spacing, np.top + nsize.height - delta);
                    break;
                }
                case "topleft": {
                    self.writeStyle(np.left - tsize.width + delta, np.top - tsize.height - self.spacing);
                    break;
                }
                case "topcenter": {
                    self.writeStyle(np.left + (nsize.width - tsize.width) / 2, np.top - tsize.height - self.spacing);
                    break;
                }
                case "topright": {
                    self.writeStyle(np.left + nsize.width - delta, np.top - tsize.height - self.spacing);
                    break;
                }
                case "bottomleft": {
                    self.writeStyle(np.left - tsize.width + delta, np.top + nsize.height + self.spacing);
                    break;
                }
                case "bottomcenter": {
                    self.writeStyle(np.left + (nsize.width - tsize.width) / 2, np.top + nsize.height + self.spacing);
                    break;
                }
                case "bottomright": {
                    self.writeStyle(np.left + nsize.width - delta, np.top + nsize.height + self.spacing);
                    break;
                }
                default: {
                    // self.tip.css({
                    //     "left": np.left + nsize.width + self.spacing,
                    //     "top": np.top + (nsize.height - tsize.height) / 2
                    // });
                    self.writeStyle(np.left + nsize.width + self.spacing, np.top + (nsize.height - tsize.height) / 2);
                    break;
                }
            }
            // console.log(tsize);
        },
        writeStyle: function(left, top){
            var self = this;
            self.tip.css({"left": left, "top": top});
        },
        createTip: function(id){
            var self = this,
                tDiv = D.create("<div>");
            D.attr(tDiv, "id", id);
            D.html(tDiv, "<i class=\"J_Arrow ks-arrow\"></i><div class=\"ks-ptcontent\"></div>");
            D.addClass(tDiv, "ks-PowerTips_overlay");
            if(THEME[self.theme]){
                D.addClass(tDiv, THEME[self.theme]);
            }
            S.one("body").append(tDiv);
            return S.one(tDiv);
        },
        setContent: function(node){
            var self = this;
            // console.log(node);
            self.tc.html(S.one(node).attr(self.textAttr));
        },
        show: function(){
            var self = this;
            S.one(self.tip).css({"display": "block"});
        },
        hide: function(){
            var self = this;
            S.all(self.tip).css("display", "none");
        }
    }, {ATTRS : /** @lends PowerTips*/{
        // tips: "test"
    }});
    return PowerTips;
}, {requires:['node', 'base']});



