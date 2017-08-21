/*
 * Mapplic - Custom Interactive Map Plugin by @sekler
 * Version 4.0
 * http://www.mapplic.com/
 */

;
(function ($) {
    "use strict";

    var Mapplic = function (element) {

        var self = this;

        self.o = {
            source: 'locations.json',
            selector: '[id^=landmark] > *',
            landmark: false,
            mapfill: false,
            height: 420,
            markers: true,
            minimap: true,
            sidebar: true,
            search: true,
            deeplinking: true,
            clearbutton: true,
            zoombuttons: true,
            action: 'tooltip',
            lightbox: false,
            hovertip: {
                desc: false
            },
            tooltip: {
                thumb: true,
                desc: true,
                link: true
            },
            smartip: true,
            coordtip: false,
            fillcolor: '#4d5e6d',
            fullscreen: true,
            developer: false,
            mousewheel: true,
            maxscale: 4,
            skin: '',
            zoom: true
        };
        self.el = element;


        /*配置初始化*/
        self.init = function (options) {
            // Merging options with defaults
            self.o = $.extend(self.o, options);

            self.x = 0;
            self.y = 0;
            self.scale = 1;

            self.el.addClass('mapplic-element mapplic-loading').addClass(self.o.skin).height(self.o.height);

            // Disable modules when landmark mode is active
            if (self.o.landmark) {
                self.o.sidebar = false;
                self.o.zoombuttons = false;
                self.o.deeplinking = false;
            }

            if (typeof self.o.source === 'string') {
                // Loading .json file with AJAX
                $.getJSON(self.o.source, function (data) { // Success
                    //处理Json数据
                    processData(data);
                    self.el.removeClass('mapplic-loading');
                }).fail(function () { // Failure: couldn't load JSON file or it is invalid.
                    console.error('Couldn\'t load map data. (Make sure to run the script through a web server and not just open the html file in a browser directly)');
                    self.el.removeClass('mapplic-loading').addClass('mapplic-error');
                    alert('Data file missing or invalid!\nMake sure to run the script through web server.');
                });
            } else {
                // Inline json object
                processData(self.o.source);
                self.el.removeClass('mapplic-loading');
            }

            return self;
        };

        // Tooltip
        function Tooltip() {
            this.el = null;
            this.pin = null;
            this.shift = 6;
            this.drop = 0;
            this.location = null;

            this.init = function () {
                var s = this;

                // Construct
                this.el = $('<div></div>').addClass('mapplic-tooltip');
                this.close = $('<a></a>').addClass('mapplic-tooltip-close').attr('href', '#').appendTo(this.el);
                this.close.on('click touchend', function (e) {
                    e.preventDefault();
                    self.hideLocation();
                    if (!self.o.zoom) self.moveTo(0.5, 0.5, 1, 600, 'easeInOutCubic');
                });
                if (self.o.tooltip.thumb) this.thumbnail = $('<img>').addClass('mapplic-tooltip-thumbnail').hide().appendTo(this.el);
                this.content = $('<div></div>').addClass('mapplic-tooltip-content').appendTo(this.el);
                this.title = $('<h4></h4>').addClass('mapplic-tooltip-title').appendTo(this.content);
                if (self.o.tooltip.desc) this.desc = $('<div></div>').addClass('mapplic-tooltip-description').appendTo(this.content);
                if (self.o.tooltip.link) this.link = $('<a>更多</a>').addClass('mapplic-popup-link').attr('href', '#').hide().appendTo(this.el);
                this.triangle = $('<div></div>').addClass('mapplic-tooltip-triangle').prependTo(this.el);

                // Append
                self.map.append(this.el);
            };

            this.show = function (location) {
                if (location) {
                    var s = this;

                    this.location = location;
                    if (self.hovertip) self.hovertip.hide();

                    if (self.o.tooltip.thumb) {
                        if (location.thumbnail) this.thumbnail.attr('src', location.thumbnail).show();
                        else this.thumbnail.hide();
                    }

                    if (self.o.tooltip.link) {
                        if (location.link) this.link.attr('href', location.link).show();
                        else this.link.hide();
                    }
                    this.title.text(location.title);
                    if (self.o.tooltip.desc) this.desc.html(location.description);
                    this.content[0].scrollTop = 0;

                    // Shift
                    this.pin = $('.mapplic-pin[data-location="' + location.id + '"]');
                    if (this.pin.length == 0) {
                        this.shift = 20;
                    } else this.shift = Math.abs(parseFloat(this.pin.css('margin-top'))) + 20;

                    // Loading & positioning
                    $('img', this.el).off('load').load(function () {
                        s.position();
                        s.zoom(location);
                    });
                    this.position();

                    // Making it visible
                    this.el.stop().show();
                    this.zoom(location);
                }
            };

            this.position = function () {
                if (this.location) {
                    var cx = self.map.offset().left + self.map.width() * this.location.x - self.container.offset().left,
                        cy = self.map.offset().top + self.map.height() * this.location.y - self.container.offset().top;
                    //	console.log("cx is : " + cx + " , cy is " + cy );
                    //	console.log(" offset left is " + self.map.offset().left + ", map width: " + self.map.width() + "， container left: " + self.container.offset().left);
                    //	console.log(" offset top is " + self.map.offset().top + " , map height: " + self.map.height() + ", container top: " + self.container.offset().top);

                    var x = this.location.x * 100,
                        y = this.location.y * 100,
                        mt = -this.el.outerHeight() - this.shift,
                        ml = -this.el.outerWidth() / 2;

                    if (self.o.smartip) {
                        var verticalPos = 0.5;

                        // Top check
                        if (Math.abs(mt) > cy) {
                            mt = 8 + 2;
                            if (this.pin && this.pin.length) mt = this.pin.height() + parseFloat(this.pin.css('margin-top')) + 20;
                            this.el.addClass('mapplic-bottom');
                        } else this.el.removeClass('mapplic-bottom');

                        // Left-right check
                        if (this.el.outerWidth() / 2 > cx)
                            verticalPos = 0.5 - (this.el.outerWidth() / 2 - cx) / this.el.outerWidth();
                        else if ((self.container.width() - cx - this.el.outerWidth() / 2) < 0)
                            verticalPos = 0.5 + (cx + this.el.outerWidth() / 2 - self.container.width()) / this.el.outerWidth();

                        verticalPos = Math.max(0, Math.min(1, verticalPos));
                        ml = -this.el.outerWidth() * verticalPos;
                        this.triangle.css('left', Math.max(5, Math.min(95, verticalPos * 100)) + '%');
                    }

                    this.el.css({
                        left: x + '%',
                        top: y + '%',
                        marginTop: mt,
                        marginLeft: ml
                    });
                    this.drop = this.el.outerHeight() + this.shift;
                }
            };

            this.zoom = function (location) {
                var ry = 0.5,
                    zoom = location.zoom ? parseFloat(location.zoom) : self.o.maxscale;

                ry = ((self.container.height() - this.drop) / 2 + this.drop) / self.container.height();
                self.moveTo(location.x, location.y, zoom, 600, 'easeInOutCubic', ry);
            };

            this.hide = function () {
                var s = this;

                this.location = null;

                this.el.stop().fadeOut(300, function () {
                    if (s.desc) s.desc.empty();
                });
            }
        }

        // Lightbox
        function Lightbox() {
            this.el = null;

            this.init = function () {
                // Construct
                this.el = $('<div></div>').addClass('mapplic-lightbox mfp-hide');
                this.title = $('<h2></h2>').addClass('mapplic-lightbox-title').appendTo(this.el);
                this.desc = $('<div></div>').addClass('mapplic-lightbox-description').appendTo(this.el);
                this.link = $('<a>More</a>').addClass('mapplic-popup-link').attr('href', '#').hide().appendTo(this.el);

                // Popup Image
                $('body').magnificPopup({
                    delegate: '.mapplic-popup-image',
                    type: 'image',
                    removalDelay: 300,
                    mainClass: 'mfp-fade'
                });

                // Append
                self.el.append(this.el);
            };

            this.show = function (location) {
                this.location = location;

                this.title.text(location.title);
                this.desc.html(location.description);

                if (location.link) this.link.attr('href', location.link).show();
                else this.link.hide();

                var s = this;

                $.magnificPopup.open({
                    items: {
                        src: this.el
                    },
                    type: 'inline',
                    removalDelay: 300,
                    mainClass: 'mfp-fade',
                    callbacks: {
                        beforeClose: function () {
                            s.hide();
                        }
                    }
                });

                // Zoom
                var zoom = location.zoom ? location.zoom : self.o.maxscale;
                self.moveTo(location.x, location.y, zoom, 600, 'easeInOutCubic');

                // Hide tooltip
                if (self.tooltip) self.tooltip.hide();
            };

            this.hide = function () {
                //$.magnificPopup.close();
                this.location = null;
                self.hideLocation();
            }
        }

        // HoverTooltip
        function HoverTooltip() {
            this.el = null;
            this.pin = null;
            this.shift = 6;

            this.init = function () {
                var s = this;

                // Construct
                this.el = $('<div></div>').addClass('mapplic-tooltip mapplic-hovertip');
                this.title = $('<h4></h4>').addClass('mapplic-tooltip-title').appendTo(this.el);
                if (self.o.hovertip.desc) this.desc = $('<div></div>').addClass('mapplic-tooltip-description').appendTo(this.el);
                this.triangle = $('<div></div>').addClass('mapplic-tooltip-triangle').appendTo(this.el);

                // Events 
                // pins + old svg
                $(self.map).on('mouseover', '.mapplic-layer a', function () {
                    var id = '';
                    if ($(this).hasClass('mapplic-pin')) {
                        id = $(this).data('location');
                        s.pin = $('.mapplic-pin[data-location="' + id + '"]');
                        s.shift = Math.abs(parseFloat(s.pin.css('margin-top'))) + 20;
                    } else {
                        id = $(this).attr('xlink:href').slice(1);
                        s.shift = 20;
                    }

                    var location = self.getLocationData(id);
                    if (location) s.show(location);
                }).on('mouseout', function () {
                    s.hide();
                });

                // new svg
                if (self.o.selector) {
                    $(self.map).on('mouseover', self.o.selector, function () {
                        var location = self.getLocationData($(this).attr('id'));
                        s.shift = 20;
                        if (location) s.show(location);
                    }).on('mouseout', function () {
                        s.hide();
                    });
                }

                self.map.append(this.el);
            };

            this.show = function (location) {
                if (self.tooltip.location != location) {
                    this.title.text(location.title);

                    if (self.o.hovertip.desc) this.desc.html(location.description);

                    this.position(location);

                    this.el.stop().fadeIn(100);
                }
            };

            this.position = function (location) {
                var cx = self.map.offset().left + self.map.width() * location.x - self.container.offset().left,
                    cy = self.map.offset().top + self.map.height() * location.y - self.container.offset().top;

                var x = location.x * 100,
                    y = location.y * 100,
                    mt = -this.el.outerHeight() - this.shift,
                    ml = 0;

                var verticalPos = 0.5;

                // Top check
                if (Math.abs(mt) > cy) {
                    mt = 8 + 2;
                    if (this.pin && this.pin.length) mt = this.pin.height() + parseFloat(this.pin.css('margin-top')) + 20;
                    this.el.addClass('mapplic-bottom');
                } else this.el.removeClass('mapplic-bottom');

                // Left-right check
                if (this.el.outerWidth() / 2 > cx)
                    verticalPos = 0.5 - (this.el.outerWidth() / 2 - cx) / this.el.outerWidth();
                else if ((self.container.width() - cx - this.el.outerWidth() / 2) < 0)
                    verticalPos = 0.5 + (cx + this.el.outerWidth() / 2 - self.container.width()) / this.el.outerWidth();

                ml = -this.el.outerWidth() * verticalPos;
                this.triangle.css('left', Math.max(10, Math.min(90, verticalPos * 100)) + '%');
                this.el.css({
                    left: x + '%',
                    top: y + '%',
                    marginTop: mt,
                    marginLeft: ml
                });
            };

            this.hide = function () {
                this.el.stop().fadeOut(200);
            };
        }

        // Deeplinking
        function Deeplinking() {
            this.param = 'location';

            this.init = function () {
                var s = this;
                this.check(0);

                window.onpopstate = function (e) {
                    if (e.state) {
                        s.check(600);
                    }
                    return false;
                }
            };

            this.check = function (easing) {
                var id = this.getUrlParam(this.param);
                self.showLocation(id, easing, true);
            };

            this.getUrlParam = function (name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            };

            this.update = function (id) {
                var url = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + this.param + '=' + id;
                window.history.pushState({
                    path: url
                }, '', url);
            };

            // Clear
            this.clear = function () {
                history.pushState('', document.title, window.location.pathname);
            };
        }

        // Old hash deeplinking method for old browsers
        function DeeplinkingHash() {
            this.param = 'location';

            this.init = function () {
                var s = this;
                this.check(0);

                $(window).on('hashchange', function () {
                    s.check(600);
                });
            };

            this.check = function (easing) {
                var id = location.hash.slice(this.param.length + 2);
                self.showLocation(id, easing, true);
            };

            this.update = function (id) {
                window.location.hash = this.param + '-' + id;
            };

            this.clear = function () {
                window.location.hash = this.param;
            }
        }

        // Minimap
        function Minimap() {
            this.el = null;
            this.opacity = null;

            this.init = function () {
                this.el = $('<div></div>').addClass('mapplic-minimap').appendTo(self.container);
                this.el.click(function (e) {
                    e.preventDefault();

                    var x = (e.pageX - $(this).offset().left) / $(this).width(),
                        y = (e.pageY - $(this).offset().top) / $(this).height();
                    //console.log("miniMap: pageX: " + e.pageX + " offset().left: " + $(this).offset().left + " , $(this).width: " + $(this).width());
                    //console.log("miniMap: pageY: " + e.pageY + " offset().top: " + $(this).offset().top + " , $(this).height(): " + $(this).height());
                    //	console.log("miniMap: X is " + x + ", Y is " + y);
                    //   console.log("miniMap function[459] scale is " + self.scale + " , fitscale is " + self.fitscale);
                    self.moveTo(x, y, self.scale / self.fitscale, 100);
                });
            };

            this.addLayer = function (data) {
                var layer = $('<div></div>').addClass('mapplic-minimap-layer').addClass(data.id).appendTo(this.el),
                    s = this;

                $('<img>').attr('src', data.minimap).addClass('mapplic-minimap-background').appendTo(layer);
                $('<div></div>').addClass('mapplic-minimap-overlay').appendTo(layer);
                $('<img>').attr('src', data.minimap).addClass('mapplic-minimap-active').load(function () {
                    s.update();
                    $(this).addClass('mapplic-clip-transition');
                }).appendTo(layer);
            };

            this.show = function (target) {
                $('.mapplic-minimap-layer', this.el).hide();
                $('.mapplic-minimap-layer.' + target, this.el).show();
            };

            this.update = function (x, y) {
                var active = $('.mapplic-minimap-active', this.el);

                if (x === undefined) x = self.x;
                if (y === undefined) y = self.y;

                var width = Math.round(self.container.width() / self.contentWidth / self.scale * this.el.width()),
                    height = Math.round(self.container.height() / self.contentHeight / self.scale * this.el.height()),
                    top = Math.round(-y / self.contentHeight / self.scale * this.el.height()),
                    left = Math.round(-x / self.contentWidth / self.scale * this.el.width()),
                    right = left + width,
                    bottom = top + height;

                active.each(function () {
                    $(this)[0].style.clip = 'rect(' + top + 'px, ' + right + 'px, ' + bottom + 'px, ' + left + 'px)';
                });

                // Fade out effect
                var s = this;
                this.el.show();
                this.el.css('opacity', 1.0);
                clearTimeout(this.opacity);
                this.opacity = setTimeout(function () {
                    s.el.css('opacity', 0);
                    setTimeout(function () {
                        s.el.hide();
                    }, 600);
                }, 2000);
            }
        }

        // Sidebar
        function Sidebar() {
            this.el = null;
            this.list = null;
            this.friendList = null;
            this.checkedFriends = [];

            this.init = function () {
                var s = this;

                this.el = $('<div></div>').addClass('mapplic-sidebar').appendTo(self.el);

                if (self.o.search) {
                    var form = $('<form></form>').addClass('mapplic-search-form').submit(function () {
                        return false;
                    }).appendTo(this.el);
                    self.clear = $('<button></button>').attr('type', 'button').addClass('mapplic-search-clear').click(function () {
                        input.val('');
                        input.keyup();
                    }).appendTo(form);
                    var input = $('<input>').attr({
                        'type': 'text',
                        'spellcheck': 'false',
                        'placeholder': '搜索...'
                    }).addClass('mapplic-search-input').keyup(function () {
                        var keyword = $(this).val();
                        s.search(keyword);
                    }).prependTo(form);
                }

                var tabs = $('<div class="mapplic-tab-container"></div>').appendTo(this.el);
                this.menubox = $('ul', $('<div class="mapplic-menu-box"><ul></ul></div>').appendTo(tabs));
                this.contentbox = $('<div class="mapplic-content-box"></div>').appendTo(tabs);
                this.notfound = $('<p></p>').addClass('mapplic-not-found').text('什么也没有找到~~请换一个搜索对象试试……').appendTo(tabs);
                this.list = $('<ol></ol>').addClass('mapplic-list').appendTo(this.contentbox);
                this.friendList = $('<ol></ol>').addClass('mapplic-list').appendTo(this.contentbox).hide();
                var list = this.list;
                var friendList = this.friendList;
                $('<li class="mapplic-menu">地点</li>').appendTo(this.menubox).mouseover(function () {
                    list.show();
                    friendList.hide();
                });
                $('<li class="mapplic-menu">朋友</li>').appendTo(this.menubox).mouseover(function () {
                    list.hide();
                    friendList.show();
                })
            };

            this.addCategories = function (categories) {
                var list = this.list;
                if (categories) {
                    $.each(categories, function (index, category) {
                        var item = $('<li></li>').addClass('mapplic-list-category').attr('data-category', category.id);
                        var ol = $('<ol></ol>').css('border-color', category.color).appendTo(item);
                        if (category.show == 'false') ol.hide();
                        else item.addClass('mapplic-opened');
                        var link = $('<a></a>').attr('href', '#').attr('title', category.title).css('background-color', category.color).text(category.title).prependTo(item);
                        link.on('click', function (e) {
                            e.preventDefault();
                            item.toggleClass('mapplic-opened');
                            ol.slideToggle(200);
                        });
                        if (category.icon) $('<img>').attr('src', category.icon).addClass('mapplic-list-thumbnail').prependTo(link);
                        $('<span></span>').text('0').addClass('mapplic-list-count').prependTo(link);
                        list.append(item);
                    });
                }
            };

            this.addFriends = function (friends) {
                var friendList = this.friendList;
                $.each(friends, function (index, friend) {
                    var item = $('<li></li>').addClass('mapplic-list-location').addClass('mapplic-list-shown'); //.attr('data-location', data.id);
                    var link = $('<a></a>').attr({"herf": '#', "name": friend.id}).appendTo(item).click(function (e) {
                        var input = $('input', this)[0];
                        self.el.trigger('friendchanged', {id: this.name, statu: !input.checked});
                        e.target != input && (input.checked = !input.checked);
                    });
                    $('<img>').attr('src', friend.photo || 'img/gate.jpg').addClass('mapplic-list-thumbnail').prependTo(link);
                    $('<input type="checkbox">').prependTo(link);
                    $('<h4></h4>').text(friend.nickname || friend.name).appendTo(link);
                    item.appendTo(friendList);
                });
            };

            this.addLocation = function (data) {
                var item = $('<li></li>').addClass('mapplic-list-location').addClass('mapplic-list-shown').attr('data-location', data.id);
                var link = $('<a></a>').attr('href', '#').click(function (e) {
                    e.preventDefault();
                    self.showLocation(data.id, 600);

                    // Scroll back to map on mobile
                    if ($(window).width() < 668) {
                        $('html, body').animate({
                            scrollTop: self.container.offset().top
                        }, 400);
                    }
                }).appendTo(item);

                if (data.thumbnail) $('<img>').attr('src', data.thumbnail).addClass('mapplic-list-thumbnail').appendTo(link);
                $('<h4></h4>').text(data.title).appendTo(link);
                $('<span></span>').html(data.about).appendTo(link);
                var category = $('.mapplic-list-category[data-category="' + data.category + '"]');

                if (category.length) $('ol', category).append(item);
                else this.list.append(item);

                // Count
                $('.mapplic-list-count', category).text($('.mapplic-list-shown', category).length);
            };

            this.search = function (keyword) {
                if (keyword) self.clear.fadeIn(100);
                else self.clear.fadeOut(100);

                $('.mapplic-list li', self.el).each(function () {
                    if ($(this).text().search(new RegExp(keyword, "i")) < 0) {
                        $(this).removeClass('mapplic-list-shown');
                        $(this).slideUp(200);
                    } else {
                        $(this).addClass('mapplic-list-shown');
                        $(this).show();
                    }
                });

                $('.mapplic-list > li', self.el).each(function () {
                    var count = $('.mapplic-list-shown', this).length;
                    $('.mapplic-list-count', this).text(count);
                });

                // Show not-found text
                if ($('.mapplic-list > li.mapplic-list-shown').length > 0) this.notfound.fadeOut(200);
                else this.notfound.fadeIn(200);
            }
        }

        // Developer tools
        function DevTools() {
            this.el = null;

            this.init = function () {
                this.el = $('<div></div>').addClass('mapplic-coordinates').appendTo(self.container);
                this.el.append('x: ');
                $('<code></code>').addClass('mapplic-coordinates-x').appendTo(this.el);
                this.el.append(' y: ');
                $('<code></code>').addClass('mapplic-coordinates-y').appendTo(this.el);

                $('.mapplic-layer', self.map).on('mousemove', function (e) {
                    var x = (e.pageX - self.map.offset().left) / self.map.width(),
                        y = (e.pageY - self.map.offset().top) / self.map.height();
                    $('.mapplic-coordinates-x').text(parseFloat(x).toFixed(4));
                    $('.mapplic-coordinates-y').text(parseFloat(y).toFixed(4));
                });
            }
        }

        // Clear Button
        function ClearButton() {
            this.el = null;

            this.init = function () {
                this.el = $('<a></a>').attr('href', '#').addClass('mapplic-clear-button').appendTo(self.container);

                this.el.on('click touchstart', function (e) {
                    e.preventDefault();
                    self.hideLocation();
                    self.moveTo(0.5, 0.5, 1, 400, 'easeInOutCubic');
                });
            }
        }

        // Zoom Buttons
        function ZoomButtons() {
            this.el = null;

            this.init = function () {
                this.el = $('<div></div>').addClass('mapplic-zoom-buttons').appendTo(self.container);

                // Zoom in button
                this.zoomin = $('<a></ha>').attr('href', '#').addClass('mapplic-zoomin-button').appendTo(this.el);
                this.zoomin.on('click touchstart', function (e) {
                    e.preventDefault();

                    var scale = self.scale;
                    self.scale = normalizeScale(scale + scale * 0.8);

                    self.x = normalizeX(self.x - (self.container.width() / 2 - self.x) * (self.scale / scale - 1));
                    self.y = normalizeY(self.y - (self.container.height() / 2 - self.y) * (self.scale / scale - 1));

                    zoomTo(self.x, self.y, self.scale, 400, 'easeInOutCubic');
                });

                // Zoom out button
                this.zoomout = $('<a></ha>').attr('href', '#').addClass('mapplic-zoomout-button').appendTo(this.el);
                this.zoomout.on('click touchstart', function (e) {
                    e.preventDefault();

                    var scale = self.scale;
                    self.scale = normalizeScale(scale - scale * 0.4);

                    self.x = normalizeX(self.x - (self.container.width() / 2 - self.x) * (self.scale / scale - 1));
                    self.y = normalizeY(self.y - (self.container.height() / 2 - self.y) * (self.scale / scale - 1));

                    zoomTo(self.x, self.y, self.scale, 400, 'easeInOutCubic');
                });
            };

            this.update = function (scale) {
                this.zoomin.removeClass('mapplic-disabled');
                this.zoomout.removeClass('mapplic-disabled');
                if (scale == self.fitscale) this.zoomout.addClass('mapplic-disabled');
                else if (scale == self.o.maxscale) this.zoomin.addClass('mapplic-disabled');
            }
        }

        // Full Screen
        function FullScreen() {
            this.el = null;

            this.init = function () {
                var s = this;
                this.element = self.el[0];

                $('<a></a>').attr('href', '#').attr('href', '#').addClass('mapplic-fullscreen-button').click(function (e) {
                    e.preventDefault();

                    if (s.isFull()) s.exitFull();
                    else s.goFull();

                }).appendTo(self.container);
            };

            this.goFull = function () {
                if (this.element.requestFullscreen) this.element.requestFullscreen();
                else if (this.element.mozRequestFullScreen) this.element.mozRequestFullScreen();
                else if (this.element.webkitRequestFullscreen) this.element.webkitRequestFullscreen();
                else if (this.element.msRequestFullscreen) this.element.msRequestFullscreen();
            };

            this.exitFull = function () {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            };

            this.isFull = function () {
                if (window.innerHeight == screen.height) return true;
                else return false;
            }
        }

        var Degree = (function (config, path, style, container) {
            function Degree(config) {
                //该等级的名称
                this.name = config.name;
                //图像尺寸与真实尺寸的比例尺
                this.ratio = config.ratio;
                //图片文件的路径
                this.path = this.mainpath + this.name + '/';
                //该等级下总体图像的x边界（单位：px）
                this.xRim = self.contentWidth * this.ratio;
                //该等级下总体图像的y边界（单位：px）
                this.yRim = self.contentHeight * this.ratio;
                //该等级的图片名称的前缀
                this.prefix = config.prefix;
                //该等级下图片的边长
                this.picSide = config.picSide;
                //横向图片数
                this.xPics = Math.ceil(this.xRim / this.picSide);
                //纵向图片数
                this.yPics = Math.ceil(this.yRim / this.picSide);

                this._indexLength = (this.xPics * this.yPics).toString().length;
            }

            //获取图片路径
            Degree.prototype.getSrc = function (i, j) {
                var n = this._indexLength;
                return this.path + this.prefix + (new Array(n).join(0) + (j * this.xPics + i + 1)).slice(-n) + '.' + this.style;
            };
            //绘制图片
            Degree.prototype.drawImg = function (i, j) {
                var img = new Image;
                $.extend(img, {i: i, j: j, side: this.picSide, ctx: this.ctx});
                img.onload = function () {
                    // console.log(this.i + ' ' + this.j);
                    // console.log(this.src);
                    var l = this.side;
                    this.ctx.drawImage(this, this.i * l, this.j * l);
                };
                img.src = this.getSrc(i, j);
            };
            //以指定右上角为目标绘制区域
            Degree.prototype.drawArea = function (x, y) {
                x = -x / self.scale * this.ratio;
                y = -y / self.scale * this.ratio;
                var xWin = self.container.width() / self.scale * this.ratio;
                var yWin = self.container.height() / self.scale * this.ratio;
                var picStartX = Math.floor(x / this.picSide);
                var picStartY = Math.floor(y / this.picSide);
                var picEndX = Math.floor((x + xWin - 1) / this.picSide);
                var picEndY = Math.floor((y + yWin - 1) / this.picSide);
                for (var i = picStartX; i <= picEndX; i++) {
                    for (var j = picStartY; j <= picEndY; j++) {
                        this.drawImg(i, j);
                    }
                }
            };
            //以目标为中心切换右上角坐标//从目标点位求屏幕左上角点位的位置（使目标点位尽量居中）
            Degree.prototype.centerToAngle = function (x, y) {
                var xWin = self.container.width() / self.scale * this.ratio;
                var yWin = self.container.height() / self.scale * this.ratio;
                var xOffset = (x + (xWin - 1) / 2) >= this.xRim ? (this.xRim - xWin) : (x - (xWin - 1) / 2);
                var yOffset = (y + (yWin - 1) / 2) >= this.xRim ? (this.yRim - yWin) : (y - (yWin - 1) / 2);
                xOffset < 0 && (xOffset = 0);
                yOffset < 0 && (yOffset = 0);
                return {x: xOffset, y: yOffset};
            };
            //执行
            Degree.prototype.onZoomTo = function (x, y, scale) {
                if (scale) {
                    if (this.next && scale > this.ratio)
                        self.currentDegree = this.next;
                    else if (this.previous && scale < this.previous.ratio)
                        self.currentDegree = this.previous;
                }
                if (this.canvas.attr('width') != self.currentDegree.xRim)
                    this.canvas.attr('width', self.currentDegree.xRim).attr('height', self.currentDegree.yRim);
                self.currentDegree.drawArea(x, y);
            };
            //return Degree;
            //初始化
            Degree.prototype.mainpath = path;
            Degree.prototype.style = style || 'jpg';
            Degree.prototype.canvas = $('<canvas id="mapimg"></canvas>').addClass('mapplic-map-image').appendTo(container);
            Degree.prototype.ctx = Degree.prototype.canvas[0].getContext('2d');
            //初始化
            return function init() {
                //对config按ratio由小到大进行排序
                config = config.sort(function (left, right) {
                    var a = left.ratio,
                        b = right.ratio;
                    a === b && alert("degree配置文件错误,不能有相同ratio的配置。");
                    return a < b ? -1 : 1;
                });
                //产生链表
                var head = {},
                    p = head;
                $.each(config, function (i, v) {
                    p.next = new Degree(v);
                    p.next.previous = p;
                    p = p.next;
                });
                head = head.next;
                head.canvas.attr('width', head.xRim).attr('height', head.yRim);
                return head;
            }(config);
        });

        // Functions
        // 数据Json处理！！
        var processData = function (data) {
            self.data = data;
            var shownLevel = null;
            self.layers = [];

            self.container = $('<div></div>').addClass('mapplic-container').appendTo(self.el);
            self.map = $('<div></div>').addClass('mapplic-map').appendTo(self.container);
            if (self.o.zoom) self.map.addClass('mapplic-zoomable');

            self.levelselect = $('<select></select>').addClass('mapplic-levels-select');

            self.contentWidth = parseFloat(data.mapwidth);
            self.contentHeight = parseFloat(data.mapheight);

            // Create minimap
            if (self.o.minimap) {
                self.minimap = new Minimap();
                self.minimap.init();
            }

            // Create sidebar
            if (self.o.sidebar) {
                self.sidebar = new Sidebar();
                self.sidebar.init();
                self.sidebar.addCategories(data.categories);
                //self.sidebar.addFriends(["186", "286", "386", "486"]);
                self.sidebar.addFriends([{"id": "0000000023", "name": "186"},
                    {"id": "0000000024", "name": "286"},
                    {"id": "0000000025", "name": "386"},
                    {"id": "0000000026", "name": "486"}
                ]);
            } else self.container.css('width', '100%');

            // Iterate through levels
            var nrlevels = 0;

            if (data.levels) {
                $.each(data.levels, function (index, level) {
                    var source = level.map,
                        extension = source.substr((source.lastIndexOf('.') + 1)).toLowerCase();

                    // Create new map layer
                    var layer = $('<div></div>').addClass('mapplic-layer').attr('data-floor', level.id).hide().appendTo(self.map);
                    var degreeConfig = level.degree;
                    var style = level.style;
                    self.layers[level.id] = Degree(degreeConfig, source, style, layer);

                    // Create new minimap layer
                    if (self.minimap) self.minimap.addLayer(level);

                    // Build layer control
                    self.levelselect.prepend($('<option></option>').attr('value', level.id).text(level.title));

                    // Shown level
                    if (!shownLevel || level.show) shownLevel = level.id;
                    self.currentDegree = self.layers[shownLevel];

                    // Iterate through locations
                    $.each(level.locations, function (index, location) {
                        // Geolocation
                        if (location.lat && location.lng) {
                            var pos = latlngToPos(location.lat, location.lng);
                            location.x = pos.x;
                            location.y = pos.y;
                        }

                        var top = location.y * 100,
                            left = location.x * 100;

                        if (!location.pin) location.pin = 'default';
                        if (location.pin.indexOf('hidden') == -1) {
                            if (self.o.markers) {
                                var pin = $('<a></a>').attr('href', '#').addClass('mapplic-pin').css({
                                    'top': top + '%',
                                    'left': left + '%'
                                }).appendTo(layer);
                                pin.on('click touchend', function (e) {
                                    e.preventDefault();
                                    self.showLocation(location.id, 600);
                                });
                                if (location.label) pin.html(location.label);
                                if (location.fill) pin.css('background-color', location.fill);
                                pin.attr('data-location', location.id);
                                pin.addClass(location.pin);
                                location.el = pin;
                            }
                        }

                        if (self.sidebar) self.sidebar.addLocation(location);
                    });

                    nrlevels++;
                });
            }

            // COMPONENTS

            // Tooltip (default)
            self.tooltip = new Tooltip();
            self.tooltip.init();

            // Lightbox
            if (self.o.lightbox) {
                self.lightbox = new Lightbox();
                self.lightbox.init();
            }

            // Hover Tooltip
            if (self.o.hovertip) {
                self.hovertip = new HoverTooltip();
                self.hovertip.init();
            }

            // Developer tools
            if (self.o.developer) self.devtools = new DevTools().init();

            //CoordTip
            if (self.o.coordtip) {
                self.coordtip = new CoordTip();
                self.coordtip.init();
            }

            // Clear button
            if (self.o.clearbutton) self.clearbutton = new ClearButton().init();

            // Zoom buttons
            if (self.o.zoombuttons) {
                self.zoombuttons = new ZoomButtons();
                self.zoombuttons.init();
                if (!self.o.clearbutton) self.zoombuttons.el.css('bottom', '0');
            }

            // Fullscreen
            if (self.o.fullscreen) self.fullscreen = new FullScreen().init();


            // Level switcher
            if (nrlevels > 1) {
                self.levels = $('<div></div>').addClass('mapplic-levels');
                var up = $('<a href="#"></a>').addClass('mapplic-levels-up').appendTo(self.levels);
                self.levelselect.appendTo(self.levels);
                var down = $('<a href="#"></a>').addClass('mapplic-levels-down').appendTo(self.levels);
                self.container.append(self.levels);

                self.levelselect.change(function () {
                    var value = $(this).val();
                    self.switchLevel(value);
                });

                up.click(function (e) {
                    e.preventDefault();
                    if (!$(this).hasClass('mapplic-disabled')) self.switchLevel('+');
                });

                down.click(function (e) {
                    e.preventDefault();
                    if (!$(this).hasClass('mapplic-disabled')) self.switchLevel('-');
                });
            }
            self.switchLevel(shownLevel);

            // Browser resize
            $(window).resize(function () {
                // Mobile
                if ($(window).width() < 668) {
                    var height = Math.min(Math.max(self.container.width() * self.contentHeight / self.contentWidth, $(window).height() * 2 / 3), $(window).height() - 66);
                    self.container.height(height);
                } else self.container.height('100%');

                var wr = self.container.width() / self.contentWidth,
                    hr = self.container.height() / self.contentHeight;

                if (self.o.mapfill) {
                    if (wr < hr) self.fitscale = wr;
                    else self.fitscale = hr;
                } else {
                    if (wr > hr) self.fitscale = wr;
                    else self.fitscale = hr;
                }

                self.scale = normalizeScale(self.scale);
                self.x = normalizeX(self.x);
                self.y = normalizeY(self.y);

                zoomTo(self.x, self.y, self.scale, 100);

            }).resize();

            // Landmark mode
            if (self.o.landmark) {
                self.showLocation(self.o.landmark, 0);
            } else {
                self.moveTo(0.5, 0.5, 1, 0);
            }

            // Deeplinking
            if (self.o.deeplinking) {
                if (history.pushState) self.deeplinking = new Deeplinking();
                else self.deeplinking = new DeeplinkingHash();

                self.deeplinking.init();
            }

            // Trigger event
            self.el.trigger('mapready', self);

            // Controls
            if (self.o.zoom) addControls();
        };

        var addControls = function () {
            var map = self.map,
                mapbody = $('.mapplic-map-image', self.map);

            document.ondragstart = function () {
                return false;
            }; // IE drag fix

            // Drag & drop
            mapbody.on('mousedown', function (e) {
                self.dragging = false;
                map.stop();

                map.data('mouseX', e.pageX);
                map.data('mouseY', e.pageY);
                map.data('lastX', self.x);
                map.data('lastY', self.y);

                map.addClass('mapplic-dragging');

                self.map.on('mousemove', function (e) {
                    self.dragging = true;

                    var x = e.pageX - map.data('mouseX') + self.x,
                        y = e.pageY - map.data('mouseY') + self.y;

                    x = normalizeX(x);
                    y = normalizeY(y);

                    zoomTo(x, y);
                    map.data('lastX', x);
                    map.data('lastY', y);
                });

                $(document).on('mouseup', function () {
                    self.x = map.data('lastX');
                    self.y = map.data('lastY');

                    self.map.off('mousemove');
                    $(document).off('mouseup');

                    map.removeClass('mapplic-dragging');
                });
            });

            // Double click
            self.el.on('dblclick', '.mapplic-map-image', function (e) {
                e.preventDefault();

                var scale = self.scale;
                self.scale = normalizeScale(scale * 2);

                self.x = normalizeX(self.x - (e.pageX - self.container.offset().left - self.x) * (self.scale / scale - 1));
                self.y = normalizeY(self.y - (e.pageY - self.container.offset().top - self.y) * (self.scale / scale - 1));

                zoomTo(self.x, self.y, self.scale, 400, 'easeInOutCubic');
            });

            // Mousewheel
            if (self.o.mousewheel) {
                $('.mapplic-layer', self.el).bind('mousewheel DOMMouseScroll', function (e, delta) {
                    var scale = self.scale;

                    self.scale = normalizeScale(scale + scale * delta / 5);

                    // Disable page scroll when zoom is applicable
                    //if (scale != self.scale)
                    e.preventDefault();

                    self.x = normalizeX(self.x - (e.pageX - self.container.offset().left - self.x) * (self.scale / scale - 1));
                    self.y = normalizeY(self.y - (e.pageY - self.container.offset().top - self.y) * (self.scale / scale - 1));

                    zoomTo(self.x, self.y, self.scale, 200, 'easeOutCubic');
                });
            }

            // Touch support
            if (!('ontouchstart' in window || 'onmsgesturechange' in window)) return true;
            mapbody.on('touchstart', function (e) {
                self.dragging = false;

                var orig = e.originalEvent,
                    pos = map.position();

                map.data('touchY', orig.changedTouches[0].pageY - pos.top);
                map.data('touchX', orig.changedTouches[0].pageX - pos.left);

                mapbody.on('touchmove', function (e) {
                    e.preventDefault();
                    self.dragging = true;

                    var orig = e.originalEvent;
                    var touches = orig.touches.length;

                    if (touches == 1) {
                        self.x = normalizeX(orig.changedTouches[0].pageX - map.data('touchX'));
                        self.y = normalizeY(orig.changedTouches[0].pageY - map.data('touchY'));

                        zoomTo(self.x, self.y, self.scale, 50);
                    } else {
                        mapbody.off('touchmove');
                    }
                });

                mapbody.on('touchend', function (e) {
                    mapbody.off('touchmove touchend');
                });
            });

            // Pinch zoom
            var hammer = new Hammer(self.map[0], {
                transform_always_block: true,
                drag_block_horizontal: true,
                drag_block_vertical: true
            });
            hammer.get('pinch').set({
                enable: true
            });

            var scale = 1,
                last_scale;
            hammer.on('pinchstart', function (e) {
                self.dragging = false;

                scale = self.scale / self.fitscale;
                last_scale = scale;
            });

            hammer.on('pinch', function (e) {
                self.dragging = true;

                if (e.scale != 1) scale = Math.max(1, Math.min(last_scale * e.scale, 100));

                var oldscale = self.scale;
                self.scale = normalizeScale(scale * self.fitscale);

                self.x = normalizeX(self.x - (e.center.x - self.container.offset().left - self.x) * (self.scale / oldscale - 1));
                self.y = normalizeY(self.y - (e.center.y - self.y) * (self.scale / oldscale - 1)); // - self.container.offset().top

                zoomTo(self.x, self.y, self.scale, 100);
            });
        };

        /* PRIVATE METHODS */

        // Web Mercator (EPSG:3857) lat/lng projection
        var latlngToPos = function (lat, lng) {
            var deltaLng = self.data.rightLng - self.data.leftLng,
                bottomLatDegree = self.data.bottomLat * Math.PI / 180,
                mapWidth = ((self.data.mapwidth / deltaLng) * 360) / (2 * Math.PI),
                mapOffsetY = (mapWidth / 2 * Math.log((1 + Math.sin(bottomLatDegree)) / (1 - Math.sin(bottomLatDegree))));

            lat = lat * Math.PI / 180;

            return {
                x: ((lng - self.data.leftLng) * (self.data.mapwidth / deltaLng)) / self.data.mapwidth,
                y: (self.data.mapheight - ((mapWidth / 2 * Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat)))) - mapOffsetY)) / self.data.mapheight
            };
        };

        // jQuery bug add/remove class workaround (will be fixed in jQuery 3)
        var addClass = function (element, c) {
            var classes = element.attr('class');
            if (classes.indexOf(c) == -1) element.attr('class', classes + ' ' + c);
        };

        var removeClass = function (element, c) {
            var classes = element.attr('class');
            if (classes) element.attr('class', classes.replace(c, '').trim());
        };

        var hasClass = function (element, c) {
            var classes = element.attr('class');
            return (classes.indexOf(c) > -1);
        };

        // Normalizing x, y and scale
        var normalizeX = function (x) {
            var minX = self.container.width() - self.contentWidth * self.scale;

            if (minX < 0) {
                if (x > 0) x = 0;
                else if (x < minX) x = minX;
            } else x = minX / 2;

            return x;
        };

        var normalizeY = function (y) {
            var minY = self.container.height() - self.contentHeight * self.scale;

            if (minY < 0) {
                if (y >= 0) y = 0;
                else if (y < minY) y = minY;
            } else y = minY / 2;

            return y;
        };

        var normalizeScale = function (scale) {
            if (scale < self.fitscale) scale = self.fitscale;
            else if (scale > self.o.maxscale) scale = self.o.maxscale;

            if (self.zoombuttons) self.zoombuttons.update(scale);

            return scale;
        };

        var zoomTo = function (x, y, scale, d, easing) {
            if (scale !== undefined) {
                self.map.stop().animate({
                    'left': x,
                    'top': y,
                    'width': self.contentWidth * scale,
                    'height': self.contentHeight * scale
                }, d, easing, function () {
                    if (self.tooltip) self.tooltip.position();
                });
            } else {
                self.map.css({
                    'left': x,
                    'top': y
                });
            }
            if (self.tooltip) self.tooltip.position();
            if (self.minimap) self.minimap.update(x, y);

            self.currentDegree.onZoomTo(x, y, scale);
            // Trigger event
            self.el.trigger('positionchanged', self);
        };

        /* PUBLIC METHODS */
        self.switchLevel = function (target) {
            switch (target) {
                case '+':
                    target = $('option:selected', self.levelselect).removeAttr('selected').prev().prop('selected', 'selected').val();
                    break;
                case '-':
                    target = $('option:selected', self.levelselect).removeAttr('selected').next().prop('selected', 'selected').val();
                    break;
                default:
                    $('option[value="' + target + '"]', self.levelselect).prop('selected', 'selected');
            }

            self.currentDegree = self.layers[target];
            self.currentDegree.onZoomTo(self.x, self.y, self.scale);

            // No such layer
            if (!target) return;

            var layer = $('.mapplic-layer[data-floor="' + target + '"]', self.el);

            // Target layer is already active
            if (layer.is(':visible')) return;

            // Hide Tooltip
            if (self.tooltip) self.tooltip.hide();

            // Show target layer
            $('.mapplic-layer:visible', self.map).hide();
            layer.show();

            // Show target minimap layer
            if (self.minimap) self.minimap.show(target);

            // Update control
            var index = self.levelselect.get(0).selectedIndex,
                up = $('.mapplic-levels-up', self.el),
                down = $('.mapplic-levels-down', self.el);

            up.removeClass('mapplic-disabled');
            down.removeClass('mapplic-disabled');
            if (index == 0) up.addClass('mapplic-disabled');
            else if (index == self.levelselect.get(0).length - 1) down.addClass('mapplic-disabled');

            // Trigger event
            self.el.trigger('levelswitched', target);
        };

        self.moveTo = function (x, y, s, duration, easing, ry) {
            duration = typeof duration !== 'undefined' ? duration : 400;
            ry = typeof ry !== 'undefined' ? ry : 0.5;
            s = typeof s !== 'undefined' ? s : self.scale / self.fitscale;

            self.scale = normalizeScale(self.fitscale * s);

            self.x = normalizeX(self.container.width() * 0.5 - self.scale * self.contentWidth * x);
            self.y = normalizeY(self.container.height() * ry - self.scale * self.contentHeight * y);

            zoomTo(self.x, self.y, self.scale, duration, easing);
        };

        self.getLocationData = function (id) {
            var data = null;
            $.each(self.data.levels, function (index, level) {
                $.each(level.locations, function (index, location) {
                    if (location.id == id) {
                        data = location;
                    }
                });
            });
            return data;
        };

        self.showLocation = function (id, duration, check) {
            $.each(self.data.levels, function (index, level) {
                if (level.id == id) {
                    self.switchLevel(level.id);
                    return false;
                }
                $.each(level.locations, function (index, location) {
                    if (location.id == id) {
                        var action = (location.action && location.action != 'default') ? location.action : self.o.action;
                        switch (action) {
                            case 'open-link':
                                window.location.href = location.link;
                                return false;
                            case 'open-link-new-tab':
                                window.open(location.link);
                                return false;
                            case 'select':
                                if (location.el) {
                                    if (hasClass(location.el, 'mapplic-active')) removeClass(location.el, 'mapplic-active');
                                    else addClass(location.el, 'mapplic-active');
                                }
                                return false;
                            case 'none':
                                var zoom = location.zoom ? location.zoom : self.o.maxscale;
                                self.moveTo(location.x, location.y, zoom, 600, 'easeInOutCubic');
                                break;
                            case 'lightbox':
                                self.switchLevel(level.id);
                                self.lightbox.show(location);
                                break;
                            default:
                                self.switchLevel(level.id);
                                self.tooltip.show(location);
                        }

                        // Active state
                        removeClass($('.mapplic-active', self.el), 'mapplic-active');
                        if (location.el) addClass(location.el, 'mapplic-active');

                        // Deeplinking
                        if ((self.o.deeplinking) && (!check)) self.deeplinking.update(id);

                        // Trigger event
                        self.el.trigger('locationopened', location);
                    }
                });
            });
        };

        self.hideLocation = function () {
            removeClass($('.mapplic-active', self.el), 'mapplic-active');
            if (self.deeplinking) self.deeplinking.clear();
            if (self.tooltip) self.tooltip.hide();

            // Trigger event
            self.el.trigger('locationclosed');
        };

        self.updateLocation = function (id) {
            var location = self.getLocationData(id);

            if ((location.id == id) && (location.el.is('a'))) {
                // Geolocation
                if (location.lat && location.lng) {
                    var pos = latlngToPos(location.lat, location.lng);
                    location.x = pos.x;
                    location.y = pos.y;
                }

                var top = location.y * 100,
                    left = location.x * 100;

                location.el.css({
                    'top': top + '%',
                    'left': left + '%'
                });
            }
        };

        // var Point = function () {
        //     var firstX = null;
        //     var firstY = null;
        //     var centerX = null;
        //     var centerY = null;
        //     var pixel = 100;
        //
        //     Point.prototype.getPoint = function (x, y) {
        //         if (!!centerY) {
        //             if (Math.abs(x - centerX) < pixel && Math.abs(y - centerY) < pixel)
        //                 return { x: centerX, y: centerY };
        //             else {
        //                 firstX = x;
        //                 firstY = y;
        //                 centerX = null;
        //                 centerY = null;
        //                 return null;
        //             }
        //         }
        //         else if (!!firstY) {
        //             if (Math.abs(x - firstX) < 2 * pixel && Math.abs(y - firstY) < 2 * pixel) {
        //                 centerX = (x + firstX) / 2;
        //                 centerY = (y + firstY) / 2;
        //                 return { x: centerX, y: centerY };
        //             }
        //             else {
        //                 firstX = x;
        //                 firstY = y;
        //                 return null;
        //             }
        //         }
        //         else {
        //             firstX = x;
        //             firstY = y;
        //             return null;
        //         }
        //     }
        // };
        //
        // var Point2 = function () {
        //     var centerX = null;
        //     var centerY = null;
        //     var outlierX = null;
        //     var outlierY = null;
        //     var count = 0;
        //     var pixel = 100;
        //
        //     Point2.prototype.getPoint = function (x, y) {
        //         if (!!centerY) {
        //             if (Math.abs(x - centerX) < pixel && Math.abs(y - centerY) < pixel) {
        //                 if (!!outlierY) {
        //                     outlierX = null;
        //                     outlierY = null;
        //                 }
        //                 ++count;
        //                 centerX = ((count - 1) * centerX + x) / count;
        //                 centerY = ((count - 1) * centerY + y) / count;
        //             }
        //             else if (!!outlierY) {
        //                 count = 2;
        //                 centerX = ((count - 1) * outlierX + x) / count;
        //                 centerY = ((count - 1) * outlierY + y) / count;
        //                 outlierX = null;
        //                 outlierY = null;
        //             }
        //             else {
        //                 outlierX = x;
        //                 outlierY = y;
        //             }
        //         }
        //         else {
        //             ++count;
        //             centerX = x;
        //             centerY = y;
        //         }
        //         return { x: centerX, y: centerY };
        //     }
        // };
        var Point = function () {
            function Point(model) {
                this.deviceID = model.deviceID;
                this.change(model)
            }

            Point.prototype.change = function (model) {
                this.transform(model.x, model.y);
                // this.x = x;
                // this.y = y;
                if (!this.$el) this.$el = this.createPoint;
                if (this.l != model.l) {
                    this.$ctnr = this.getContainer(model.l);
                    this.$el.remove;
                    this.$el.appendTo(this.$ctnr);
                    this.l = model.l;
                    this.$ctnr.is(":visible") ? this.$el.show() : this.$el.hide();
                }
                this.$el.css({
                    'left': this.x / self.contentWidth + "%",
                    'top': this.y / self.contentHeight + "%"
                });
                return this;
            }
            Point.prototype.transform = function (x, y) {

            }
            Point.prototype.createPoint = function () {
                return $('<div></div>').addClass('mapplic-layer');
            }
            Point.prototype.getContainer = function () {
                var levelid = $("option", self.levelselect).eq(index).val();
                return $("div[data-floor=" + levelid + "]", self.levelselect.get(0).selectedIndex);
            }
            return Point;
        }


        /*
         * coordTip on the map
         */
        function CoordTip() {
            this.el = null;
            this.x = 0;
            this.y = 0;

            this.findel = function (index) {
                var levelid = $("option", self.levelselect).eq(index).val();
                return $("div[data-floor=" + levelid + "]", self.map);
            };


            this.init = function () {
                var s = this;
                this.level = self.levelselect.get(0).selectedIndex;
                this.el = $('<div></div>').attr("id", "coords").appendTo(self.map);
                //this.el = $('<div></div>').addClass('mapplic-layer').appendTo(self.map).show();
                // this.canvas = $('<canvas id="pointMap"></canvas>').addClass('mapplic-map-image').appendTo(this.el);
            };

            this.locate = function (rid, x, y, l) {
                var selector = "div[id=" + rid + "]";
                var e = this.findel(l).find(selector);
                if (e.length == 0) {
                    //元素不存在
                    e = $("<div></div>").addClass("mapplic-round").attr("id", rid).appendTo(this.findel(l));
                }
                var x1 = (x / self.contentWidth) * 100 + "%";
                var y1 = (y / self.contentHeight) * 100 + "%";

                //console.log("scale:" + self.scale +"x1: "+ x1 + " y1: " + y1 + "; this.x: " + this.x + " this.y: " + this.y);
                //console.log("xq = " + ((Math.abs(x1 - this.x) / self.scale) / self.contentWidth));
                //console.log("yq = " + ((Math.abs(y1 - this.y) / self.scale) / self.contentHeight));
                //判断是否需移动地图
                /*if( ((Math.abs(x1 - this.x) / self.scale) / self.contentWidth > 0.2) ||
                 ((Math.abs(y1 - this.y) / self.scale) / self.contentHeight > 0.2) ){
                 //移动
                 self.moveTo(x1, y1);

                 this.x = x1;
                 this.y = y1;
                 }*/
                e.css({
                    'left': x1,
                    'top': y1
                });
            };

            this.draw = function (rid, x, y) {
                var selector = "div[id=" + rid + "]";
                var e = this.el.find(selector);
                if (e.length == 0) {
                    e = $("<div></div>").addClass("mapplic-round").attr("id", rid).appendTo(this.el);
                }
                e.length == 0 && (e = $("<div></div>").addClass("mapplic-round").attr("id", rid).appendTo(this.el));
                var x1 = x * self.scale;
                var y1 = y * self.scale;

                //console.log("scale:" + self.scale +"x1: "+ x1 + " y1: " + y1 + "; this.x: " + this.x + " this.y: " + this.y);
                //console.log("xq = " + ((Math.abs(x1 - this.x) / self.scale) / self.contentWidth));
                //console.log("yq = " + ((Math.abs(y1 - this.y) / self.scale) / self.contentHeight));
                //判断是否需移动地图
                /*if( ((Math.abs(x1 - this.x) / self.scale) / self.contentWidth > 0.2) ||
                 ((Math.abs(y1 - this.y) / self.scale) / self.contentHeight > 0.2) ){
                 //移动
                 self.moveTo(x1, y1);

                 this.x = x1;
                 this.y = y1;
                 }*/
                e.css({
                    'left': x1,
                    'top': y1
                });
            };

            /*
             * 刷新coords 删除下面的子元素
             */
            this.refresh = function () {

                //console.log("refresh coords...");
                this.el.children("div").remove();
            }
        }


    };

    // Easing functions used by default
    // For the full list of easing functions use jQuery Easing Plugin
    $.extend($.easing, {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    });

    // jQuery Plugin
    $.fn.mapplic2 = function (options) {

        return this.each(function () {

            var element = $(this);
            if (element.data('mapplic')) return;

            var instance = (new Mapplic(element)).init(options);

            // Store plugin object in element's data
            element.data('mapplic', instance);
        });
    };


})(jQuery);