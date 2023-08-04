/*!
 * lightgallery | 2.0.0-beta.3 | May 4th 2021
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lgThumbnail=e()}(this,(function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */var t=function(){return(t=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var h in e=arguments[i])Object.prototype.hasOwnProperty.call(e,h)&&(t[h]=e[h]);return t}).apply(this,arguments)},e={thumbnail:!0,animateThumb:!0,currentPagerPosition:"middle",alignThumbnails:"middle",thumbWidth:100,thumbHeight:"80px",thumbMargin:5,appendThumbnailsTo:".lg-components",toggleThumb:!1,enableThumbDrag:!0,enableThumbSwipe:!0,swipeThreshold:10,loadYouTubeThumbnail:!0,youTubeThumbSize:1},i="lgContainerResize",s="lgUpdateSlides",h="lgBeforeOpen",n="lgBeforeSlide";return function(){function o(i,s){return this.thumbOuterWidth=0,this.thumbTotalWidth=0,this.translateX=0,this.thumbClickable=!1,this.core=i,this.$LG=s,this.settings=t(t({},e),this.core.settings),this.init(),this}return o.prototype.init=function(){this.thumbOuterWidth=0,this.thumbTotalWidth=this.core.galleryItems.length*(this.settings.thumbWidth+this.settings.thumbMargin),this.translateX=0,this.setAnimateThumbStyles(),this.core.settings.allowMediaOverlap||(this.settings.toggleThumb=!1),this.settings.thumbnail&&this.core.galleryItems.length>1&&(this.build(),this.settings.animateThumb?(this.settings.enableThumbDrag&&this.enableThumbDrag(),this.settings.enableThumbSwipe&&this.enableThumbSwipe(),this.thumbClickable=!1):this.thumbClickable=!0,this.toggleThumbBar(),this.thumbKeyPress())},o.prototype.build=function(){var t=this;this.setThumbMarkup(),this.manageActiveClassOnSlideChange(),this.$lgThumb.first().on("click.lg touchend.lg",(function(e){var i=t.$LG(e.target);i.hasAttribute("data-lg-item-id")&&setTimeout((function(){if(t.thumbClickable&&!t.core.lgBusy){var e=parseInt(i.attr("data-lg-item-id"));t.core.slide(e,!1,!0,!1)}}),50)})),this.core.LGel.on(n+".thumb",(function(e){var i=e.detail.index;t.animateThumb(i)})),this.core.LGel.on(h+".thumb",(function(){t.thumbOuterWidth=t.core.outer.get().offsetWidth})),this.core.LGel.on(s+".thumb",(function(){t.rebuildThumbnails()})),this.core.LGel.on(i+".thumb",(function(){t.core.lgOpened&&setTimeout((function(){t.thumbOuterWidth=t.core.outer.get().offsetWidth,t.animateThumb(t.core.index),t.thumbOuterWidth=t.core.outer.get().offsetWidth}),50)}))},o.prototype.setThumbMarkup=function(){var t="lg-thumb-outer ";this.settings.alignThumbnails&&(t+="lg-thumb-align-"+this.settings.alignThumbnails);var e='<div class="'+t+'">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';this.core.outer.addClass("lg-has-thumb"),".lg-components"===this.settings.appendThumbnailsTo?this.core.$lgComponents.append(e):this.core.outer.append(e),this.$thumbOuter=this.core.outer.find(".lg-thumb-outer").first(),this.$lgThumb=this.core.outer.find(".lg-thumb").first(),this.settings.animateThumb&&this.core.outer.find(".lg-thumb").css("transition-duration",this.core.settings.speed+"ms").css("width",this.thumbTotalWidth+"px").css("position","relative"),this.setThumbItemHtml(this.core.galleryItems)},o.prototype.enableThumbDrag=function(){var t=this,e={cords:{startX:0,endX:0},isMoved:!1,newTranslateX:0,startTime:new Date,endTime:new Date,touchMoveTime:0},i=!1;this.$thumbOuter.addClass("lg-grab"),this.core.outer.find(".lg-thumb").first().on("mousedown.lg.thumb",(function(s){t.thumbTotalWidth>t.thumbOuterWidth&&(s.preventDefault(),e.cords.startX=s.pageX,e.startTime=new Date,t.thumbClickable=!1,i=!0,t.core.outer.get().scrollLeft+=1,t.core.outer.get().scrollLeft-=1,t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))})),this.$LG(window).on("mousemove.lg.thumb.global"+this.core.lgId,(function(s){t.core.lgOpened&&i&&(e.cords.endX=s.pageX,e=t.onThumbTouchMove(e))})),this.$LG(window).on("mouseup.lg.thumb.global"+this.core.lgId,(function(){t.core.lgOpened&&(e.isMoved?e=t.onThumbTouchEnd(e):t.thumbClickable=!0,i&&(i=!1,t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab")))}))},o.prototype.enableThumbSwipe=function(){var t=this,e={cords:{startX:0,endX:0},isMoved:!1,newTranslateX:0,startTime:new Date,endTime:new Date,touchMoveTime:0};this.$lgThumb.on("touchstart.lg",(function(i){t.thumbTotalWidth>t.thumbOuterWidth&&(i.preventDefault(),e.cords.startX=i.targetTouches[0].pageX,t.thumbClickable=!1,e.startTime=new Date)})),this.$lgThumb.on("touchmove.lg",(function(i){t.thumbTotalWidth>t.thumbOuterWidth&&(i.preventDefault(),e.cords.endX=i.targetTouches[0].pageX,e=t.onThumbTouchMove(e))})),this.$lgThumb.on("touchend.lg",(function(){e.isMoved?e=t.onThumbTouchEnd(e):t.thumbClickable=!0}))},o.prototype.rebuildThumbnails=function(){var t=this;this.$thumbOuter.addClass("lg-rebuilding-thumbnails"),setTimeout((function(){t.thumbTotalWidth=t.core.galleryItems.length*(t.settings.thumbWidth+t.settings.thumbMargin),t.$lgThumb.css("width",t.thumbTotalWidth+"px"),t.$lgThumb.empty(),t.setThumbItemHtml(t.core.galleryItems),t.animateThumb(t.core.index)}),50),setTimeout((function(){t.$thumbOuter.removeClass("lg-rebuilding-thumbnails")}),200)},o.prototype.setTranslate=function(t){this.$lgThumb.css("transform","translate3d(-"+t+"px, 0px, 0px)")},o.prototype.getPossibleTransformX=function(t){return t>this.thumbTotalWidth-this.thumbOuterWidth&&(t=this.thumbTotalWidth-this.thumbOuterWidth),t<0&&(t=0),t},o.prototype.animateThumb=function(t){if(this.$lgThumb.css("transition-duration",this.core.settings.speed+"ms"),this.settings.animateThumb){var e=0;switch(this.settings.currentPagerPosition){case"left":e=0;break;case"middle":e=this.thumbOuterWidth/2-this.settings.thumbWidth/2;break;case"right":e=this.thumbOuterWidth-this.settings.thumbWidth}this.translateX=(this.settings.thumbWidth+this.settings.thumbMargin)*t-1-e,this.translateX>this.thumbTotalWidth-this.thumbOuterWidth&&(this.translateX=this.thumbTotalWidth-this.thumbOuterWidth),this.translateX<0&&(this.translateX=0),this.setTranslate(this.translateX)}},o.prototype.onThumbTouchMove=function(t){return t.newTranslateX=this.translateX,t.isMoved=!0,t.touchMoveTime=(new Date).valueOf(),t.newTranslateX-=t.cords.endX-t.cords.startX,t.newTranslateX=this.getPossibleTransformX(t.newTranslateX),this.setTranslate(t.newTranslateX),this.$thumbOuter.addClass("lg-dragging"),t},o.prototype.onThumbTouchEnd=function(t){t.isMoved=!1,t.endTime=new Date,this.$thumbOuter.removeClass("lg-dragging");var e=t.endTime.valueOf()-t.startTime.valueOf(),i=t.cords.endX-t.cords.startX,s=Math.abs(i)/e;return s>.15&&t.endTime.valueOf()-t.touchMoveTime<30?((s+=1)>2&&(s+=1),s+=s*(Math.abs(i)/this.thumbOuterWidth),this.$lgThumb.css("transition-duration",Math.min(s-1,2)+"settings"),i*=s,this.translateX=this.getPossibleTransformX(this.translateX-i),this.setTranslate(this.translateX)):this.translateX=t.newTranslateX,Math.abs(t.cords.endX-t.cords.startX)<this.settings.swipeThreshold&&(this.thumbClickable=!0),t},o.prototype.getThumbHtml=function(t,e){var i,s=this.core.galleryItems[e].__slideVideoInfo||{};return i=s.youtube&&this.settings.loadYouTubeThumbnail?"//img.youtube.com/vi/"+s.youtube[1]+"/"+this.settings.youTubeThumbSize+".jpg":t,'<div data-lg-item-id="'+e+'" class="lg-thumb-item '+(e===this.core.index?" active":"")+'" \n        style="width:'+this.settings.thumbWidth+"px; height: "+this.settings.thumbHeight+";\n            margin-right: "+this.settings.thumbMargin+'px;">\n            <img data-lg-item-id="'+e+'" src="'+i+'" />\n        </div>'},o.prototype.getThumbItemHtml=function(t){for(var e="",i=0;i<t.length;i++)e+=this.getThumbHtml(t[i].thumb,i);return e},o.prototype.setThumbItemHtml=function(t){var e=this.getThumbItemHtml(t);this.$lgThumb.html(e)},o.prototype.setAnimateThumbStyles=function(){this.settings.animateThumb&&this.core.outer.addClass("lg-animate-thumb")},o.prototype.manageActiveClassOnSlideChange=function(){var t=this;this.core.LGel.on(n+".thumb",(function(e){var i=t.core.outer.find(".lg-thumb-item"),s=e.detail.index;i.removeClass("active"),i.eq(s).addClass("active")}))},o.prototype.toggleThumbBar=function(){var t=this;this.settings.toggleThumb&&(this.core.outer.addClass("lg-can-toggle"),this.core.$toolbar.append('<button type="button" aria-label="Toggle thumbnails" class="lg-toggle-thumb lg-icon"></button>'),this.core.outer.find(".lg-toggle-thumb").first().on("click.lg",(function(){t.core.outer.toggleClass("lg-components-open")})))},o.prototype.thumbKeyPress=function(){var t=this;this.$LG(window).on("keydown.lg.thumb.global"+this.core.lgId,(function(e){t.core.lgOpened&&t.settings.toggleThumb&&(38===e.keyCode?(e.preventDefault(),t.core.outer.addClass("lg-components-open")):40===e.keyCode&&(e.preventDefault(),t.core.outer.removeClass("lg-components-open")))}))},o.prototype.destroy=function(){this.settings.thumbnail&&this.core.galleryItems.length>1&&(this.$LG(window).off(".lg.thumb.global"+this.core.lgId),this.core.LGel.off(".lg.thumb"),this.core.LGel.off(".thumb"),this.$thumbOuter.remove(),this.core.outer.removeClass("lg-has-thumb"))},o}()}));