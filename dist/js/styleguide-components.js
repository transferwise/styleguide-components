!function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    var installedModules = {};
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.i = function(value) {
        return value;
    }, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 63);
}([ function(module, exports) {
    module.exports = angular;
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(global, factory) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
            if (!w.document) throw new Error("jQuery requires a window with a document");
            return factory(w);
        } : factory(global);
    }("undefined" != typeof window ? window : this, function(window, noGlobal) {
        "use strict";
        function DOMEval(code, doc) {
            doc = doc || document;
            var script = doc.createElement("script");
            script.text = code, doc.head.appendChild(script).parentNode.removeChild(script);
        }
        function isArrayLike(obj) {
            var length = !!obj && "length" in obj && obj.length, type = jQuery.type(obj);
            return "function" !== type && !jQuery.isWindow(obj) && ("array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
        }
        function nodeName(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        function winnow(elements, qualifier, not) {
            return jQuery.isFunction(qualifier) ? jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            }) : qualifier.nodeType ? jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not;
            }) : "string" != typeof qualifier ? jQuery.grep(elements, function(elem) {
                return indexOf.call(qualifier, elem) > -1 !== not;
            }) : risSimple.test(qualifier) ? jQuery.filter(qualifier, elements, not) : (qualifier = jQuery.filter(qualifier, elements), 
            jQuery.grep(elements, function(elem) {
                return indexOf.call(qualifier, elem) > -1 !== not && 1 === elem.nodeType;
            }));
        }
        function sibling(cur, dir) {
            for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
            return cur;
        }
        function createOptions(options) {
            var object = {};
            return jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
                object[flag] = !0;
            }), object;
        }
        function Identity(v) {
            return v;
        }
        function Thrower(ex) {
            throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
            var method;
            try {
                value && jQuery.isFunction(method = value.promise) ? method.call(value).done(resolve).fail(reject) : value && jQuery.isFunction(method = value.then) ? method.call(value, resolve, reject) : resolve.apply(void 0, [ value ].slice(noValue));
            } catch (value) {
                reject.apply(void 0, [ value ]);
            }
        }
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed), window.removeEventListener("load", completed), 
            jQuery.ready();
        }
        function Data() {
            this.expando = jQuery.expando + Data.uid++;
        }
        function getData(data) {
            return "true" === data || "false" !== data && ("null" === data ? null : data === +data + "" ? +data : rbrace.test(data) ? JSON.parse(data) : data);
        }
        function dataAttr(elem, key, data) {
            var name;
            if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase(), 
            data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = getData(data);
                } catch (e) {}
                dataUser.set(elem, key, data);
            } else data = void 0;
            return data;
        }
        function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function() {
                return tween.cur();
            } : function() {
                return jQuery.css(elem, prop, "");
            }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop));
            if (initialInUnit && initialInUnit[3] !== unit) {
                unit = unit || initialInUnit[3], valueParts = valueParts || [], initialInUnit = +initial || 1;
                do scale = scale || ".5", initialInUnit /= scale, jQuery.style(elem, prop, initialInUnit + unit); while (scale !== (scale = currentValue() / initial) && 1 !== scale && --maxIterations);
            }
            return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], 
            tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), 
            adjusted;
        }
        function getDefaultDisplay(elem) {
            var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
            return display ? display : (temp = doc.body.appendChild(doc.createElement(nodeName)), 
            display = jQuery.css(temp, "display"), temp.parentNode.removeChild(temp), "none" === display && (display = "block"), 
            defaultDisplayMap[nodeName] = display, display);
        }
        function showHide(elements, show) {
            for (var display, elem, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], 
            elem.style && (display = elem.style.display, show ? ("none" === display && (values[index] = dataPriv.get(elem, "display") || null, 
            values[index] || (elem.style.display = "")), "" === elem.style.display && isHiddenWithinTree(elem) && (values[index] = getDefaultDisplay(elem))) : "none" !== display && (values[index] = "none", 
            dataPriv.set(elem, "display", display)));
            for (index = 0; index < length; index++) null != values[index] && (elements[index].style.display = values[index]);
            return elements;
        }
        function getAll(context, tag) {
            var ret;
            return ret = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : [], 
            void 0 === tag || tag && nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
        }
        function setGlobalEval(elems, refElements) {
            for (var i = 0, l = elems.length; i < l; i++) dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
        }
        function buildFragment(elems, context, scripts, selection, ignored) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; i < l; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
            } else nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if (selection && jQuery.inArray(elem, selection) > -1) ignored && ignored.push(elem); else if (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment;
        }
        function returnTrue() {
            return !0;
        }
        function returnFalse() {
            return !1;
        }
        function safeActiveElement() {
            try {
                return document.activeElement;
            } catch (err) {}
        }
        function on(elem, types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) on(elem, type, selector, data, types[type], one);
                return elem;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return elem;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), elem.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        }
        function manipulationTarget(elem, content) {
            return nodeName(elem, "table") && nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? jQuery(">tbody", elem)[0] || elem : elem;
        }
        function disableScript(elem) {
            return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
        }
        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
        }
        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
            if (1 === dest.nodeType) {
                if (dataPriv.hasData(src) && (pdataOld = dataPriv.access(src), pdataCur = dataPriv.set(dest, pdataOld), 
                events = pdataOld.events)) {
                    delete pdataCur.handle, pdataCur.events = {};
                    for (type in events) for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i]);
                }
                dataUser.hasData(src) && (udataOld = dataUser.access(src), udataCur = jQuery.extend({}, udataOld), 
                dataUser.set(dest, udataCur));
            }
        }
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue);
        }
        function domManip(collection, args, callback, ignored) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return collection.each(function(index) {
                var self = collection.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), domManip(self, args, callback, ignored);
            });
            if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first || ignored)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; i < l; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(collection[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; i < hasScripts; i++) node = scripts[i], rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : DOMEval(node.textContent.replace(rcleanScript, ""), doc));
            }
            return collection;
        }
        function remove(elem, selector, keepData) {
            for (var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0; null != (node = nodes[i]); i++) keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)), 
            node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")), 
            node.parentNode.removeChild(node));
            return elem;
        }
        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name], 
            "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
            !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, 
            minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
            ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
            void 0 !== ret ? ret + "" : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function() {
                    return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
                }
            };
        }
        function vendorPropName(name) {
            if (name in emptyStyle) return name;
            for (var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
            name in emptyStyle) return name;
        }
        function finalPropName(name) {
            var ret = jQuery.cssProps[name];
            return ret || (ret = jQuery.cssProps[name] = vendorPropName(name) || name), ret;
        }
        function setPositiveNumber(elem, value, subtract) {
            var matches = rcssNum.exec(value);
            return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
        }
        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            var i, val = 0;
            for (i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0; i < 4; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
            isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
            "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
            "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
            return val;
        }
        function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox, styles = getStyles(elem), val = curCSS(elem, name, styles), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
            return rnumnonpx.test(val) ? val : (valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            "auto" === val && (val = elem["offset" + name[0].toUpperCase() + name.slice(1)]), 
            val = parseFloat(val) || 0, val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px");
        }
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        function schedule() {
            inProgress && (document.hidden === !1 && window.requestAnimationFrame ? window.requestAnimationFrame(schedule) : window.setTimeout(schedule, jQuery.fx.interval), 
            jQuery.fx.tick());
        }
        function createFxNow() {
            return window.setTimeout(function() {
                fxNow = void 0;
            }), fxNow = jQuery.now();
        }
        function genFx(type, includeWidth) {
            var which, i = 0, attrs = {
                height: type
            };
            for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], 
            attrs["margin" + which] = attrs["padding" + which] = type;
            return includeWidth && (attrs.opacity = attrs.width = type), attrs;
        }
        function createTween(value, prop, animation) {
            for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; index < length; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
        }
        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
            opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
            oldfire = hooks.empty.fire, hooks.empty.fire = function() {
                hooks.unqueued || oldfire();
            }), hooks.unqueued++, anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
                });
            }));
            for (prop in props) if (value = props[prop], rfxtypes.test(value)) {
                if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                    if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                    hidden = !0;
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
            if (propTween = !jQuery.isEmptyObject(props), propTween || !jQuery.isEmptyObject(orig)) {
                isBox && 1 === elem.nodeType && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
                restoreDisplay = dataShow && dataShow.display, null == restoreDisplay && (restoreDisplay = dataPriv.get(elem, "display")), 
                display = jQuery.css(elem, "display"), "none" === display && (restoreDisplay ? display = restoreDisplay : (showHide([ elem ], !0), 
                restoreDisplay = elem.style.display || restoreDisplay, display = jQuery.css(elem, "display"), 
                showHide([ elem ]))), ("inline" === display || "inline-block" === display && null != restoreDisplay) && "none" === jQuery.css(elem, "float") && (propTween || (anim.done(function() {
                    style.display = restoreDisplay;
                }), null == restoreDisplay && (display = style.display, restoreDisplay = "none" === display ? "" : display)), 
                style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() {
                    style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
                })), propTween = !1;
                for (prop in orig) propTween || (dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = dataPriv.access(elem, "fxshow", {
                    display: restoreDisplay
                }), toggle && (dataShow.hidden = !hidden), hidden && showHide([ elem ], !0), anim.done(function() {
                    hidden || showHide([ elem ]), dataPriv.remove(elem, "fxshow");
                    for (prop in orig) jQuery.style(elem, prop, orig[prop]);
                })), propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = propTween.start, 
                hidden && (propTween.end = propTween.start, propTween.start = 0));
            }
        }
        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
            value = props[index], Array.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
            index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
            hooks && "expand" in hooks) {
                value = hooks.expand(value), delete props[name];
                for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
            } else specialEasing[name] = easing;
        }
        function Animation(elem, properties, options) {
            var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
                delete tick.elem;
            }), tick = function() {
                if (stopped) return !1;
                for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
                return deferred.notifyWith(elem, [ animation, percent, remaining ]), percent < 1 && length ? remaining : (length || deferred.notifyWith(elem, [ animation, 1, 0 ]), 
                deferred.resolveWith(elem, [ animation ]), !1);
            }, animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(!0, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    return animation.tweens.push(tween), tween;
                },
                stop: function(gotoEnd) {
                    var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) return this;
                    for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                    return gotoEnd ? (deferred.notifyWith(elem, [ animation, 1, 0 ]), deferred.resolveWith(elem, [ animation, gotoEnd ])) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                    this;
                }
            }), props = animation.props;
            for (propFilter(props, animation.opts.specialEasing); index < length; index++) if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return jQuery.isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)), 
            result;
            return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
            animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always), 
            jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })), animation;
        }
        function stripAndCollapse(value) {
            var tokens = value.match(rnothtmlwhite) || [];
            return tokens.join(" ");
        }
        function getClass(elem) {
            return elem.getAttribute && elem.getAttribute("class") || "";
        }
        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (Array.isArray(obj)) jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v && null != v ? i : "") + "]", v, traditional, add);
            }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }
        function addToPrefiltersOrTransports(structure) {
            return function(dataTypeExpression, func) {
                "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
                var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
                if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
                (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
            };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            function inspect(dataType) {
                var selected;
                return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                    inspect(dataTypeOrTransport), !1);
                }), selected;
            }
            var inspected = {}, seekingTransport = structure === transports;
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, src) {
            var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
            return deep && jQuery.extend(!0, target, deep), target;
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
            for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
            void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
            if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break;
            }
            if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break;
                    }
                    firstDataType || (firstDataType = type);
                }
                finalDataType = finalDataType || firstDataType;
            }
            if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
            responses[finalDataType];
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
            if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
            for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
            !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
            prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
                if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
                tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                    conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                    dataTypes.unshift(tmp[1]));
                    break;
                }
                if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                    response = conv(response);
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                }
            }
            return {
                state: "success",
                data: response
            };
        }
        var arr = [], document = window.document, getProto = Object.getPrototypeOf, slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, fnToString = hasOwn.toString, ObjectFunctionString = fnToString.call(Object), support = {}, version = "3.2.1", jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context);
        }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g, fcamelCase = function(all, letter) {
            return letter.toUpperCase();
        };
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            length: 0,
            toArray: function() {
                return slice.call(this);
            },
            get: function(num) {
                return null == num ? slice.call(this) : num < 0 ? this[num + this.length] : this[num];
            },
            pushStack: function(elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                return ret.prevObject = this, ret;
            },
            each: function(callback) {
                return jQuery.each(this, callback);
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments));
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            eq: function(i) {
                var len = this.length, j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
            },
            end: function() {
                return this.prevObject || this.constructor();
            },
            push: push,
            sort: arr.sort,
            splice: arr.splice
        }, jQuery.extend = jQuery.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
            i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
            i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
            copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
            clone = src && Array.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
            target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
            return target;
        }, jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(msg) {
                throw new Error(msg);
            },
            noop: function() {},
            isFunction: function(obj) {
                return "function" === jQuery.type(obj);
            },
            isWindow: function(obj) {
                return null != obj && obj === obj.window;
            },
            isNumeric: function(obj) {
                var type = jQuery.type(obj);
                return ("number" === type || "string" === type) && !isNaN(obj - parseFloat(obj));
            },
            isPlainObject: function(obj) {
                var proto, Ctor;
                return !(!obj || "[object Object]" !== toString.call(obj)) && (!(proto = getProto(obj)) || (Ctor = hasOwn.call(proto, "constructor") && proto.constructor, 
                "function" == typeof Ctor && fnToString.call(Ctor) === ObjectFunctionString));
            },
            isEmptyObject: function(obj) {
                var name;
                for (name in obj) return !1;
                return !0;
            },
            type: function(obj) {
                return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
            },
            globalEval: function(code) {
                DOMEval(code);
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },
            each: function(obj, callback) {
                var length, i = 0;
                if (isArrayLike(obj)) for (length = obj.length; i < length && callback.call(obj[i], i, obj[i]) !== !1; i++) ; else for (i in obj) if (callback.call(obj[i], i, obj[i]) === !1) break;
                return obj;
            },
            trim: function(text) {
                return null == text ? "" : (text + "").replace(rtrim, "");
            },
            makeArray: function(arr, results) {
                var ret = results || [];
                return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
                ret;
            },
            inArray: function(elem, arr, i) {
                return null == arr ? -1 : indexOf.call(arr, elem, i);
            },
            merge: function(first, second) {
                for (var len = +second.length, j = 0, i = first.length; j < len; j++) first[i++] = second[j];
                return first.length = i, first;
            },
            grep: function(elems, callback, invert) {
                for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++) callbackInverse = !callback(elems[i], i), 
                callbackInverse !== callbackExpect && matches.push(elems[i]);
                return matches;
            },
            map: function(elems, callback, arg) {
                var length, value, i = 0, ret = [];
                if (isArrayLike(elems)) for (length = elems.length; i < length; i++) value = callback(elems[i], i, arg), 
                null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
                null != value && ret.push(value);
                return concat.apply([], ret);
            },
            guid: 1,
            proxy: function(fn, context) {
                var tmp, args, proxy;
                if ("string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn)) return args = slice.call(arguments, 2), 
                proxy = function() {
                    return fn.apply(context || this, args.concat(slice.call(arguments)));
                }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy;
            },
            now: Date.now,
            support: support
        }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]), 
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        var Sizzle = function(window) {
            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
                if (results = results || [], "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
                if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
                context = context || document, documentIsHTML)) {
                    if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                        if (9 === nodeType) {
                            if (!(elem = context.getElementById(m))) return results;
                            if (elem.id === m) return results.push(elem), results;
                        } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                        results;
                    } else {
                        if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                        results;
                        if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                        results;
                    }
                    if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        if (1 !== nodeType) newContext = context, newSelector = selector; else if ("object" !== context.nodeName.toLowerCase()) {
                            for ((nid = context.getAttribute("id")) ? nid = nid.replace(rcssescape, fcssescape) : context.setAttribute("id", nid = expando), 
                            groups = tokenize(selector), i = groups.length; i--; ) groups[i] = "#" + nid + " " + toSelector(groups[i]);
                            newSelector = groups.join(","), newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        }
                        if (newSelector) try {
                            return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                        } catch (qsaError) {} finally {
                            nid === expando && context.removeAttribute("id");
                        }
                    }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }
            function createCache() {
                function cache(key, value) {
                    return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
                }
                var keys = [];
                return cache;
            }
            function markFunction(fn) {
                return fn[expando] = !0, fn;
            }
            function assert(fn) {
                var el = document.createElement("fieldset");
                try {
                    return !!fn(el);
                } catch (e) {
                    return !1;
                } finally {
                    el.parentNode && el.parentNode.removeChild(el), el = null;
                }
            }
            function addHandle(attrs, handler) {
                for (var arr = attrs.split("|"), i = arr.length; i--; ) Expr.attrHandle[arr[i]] = handler;
            }
            function siblingCheck(a, b) {
                var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                if (diff) return diff;
                if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
                return a ? 1 : -1;
            }
            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && elem.type === type;
                };
            }
            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return ("input" === name || "button" === name) && elem.type === type;
                };
            }
            function createDisabledPseudo(disabled) {
                return function(elem) {
                    return "form" in elem ? elem.parentNode && elem.disabled === !1 ? "label" in elem ? "label" in elem.parentNode ? elem.parentNode.disabled === disabled : elem.disabled === disabled : elem.isDisabled === disabled || elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled : elem.disabled === disabled : "label" in elem && elem.disabled === disabled;
                };
            }
            function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                    return argument = +argument, markFunction(function(seed, matches) {
                        for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                    });
                });
            }
            function testContext(context) {
                return context && "undefined" != typeof context.getElementsByTagName && context;
            }
            function setFilters() {}
            function toSelector(tokens) {
                for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value;
                return selector;
            }
            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && "parentNode" === key, doneName = done++;
                return combinator.first ? function(elem, context, xml) {
                    for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
                    return !1;
                } : function(elem, context, xml) {
                    var oldCache, uniqueCache, outerCache, newCache = [ dirruns, doneName ];
                    if (xml) {
                        for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                    } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) if (outerCache = elem[expando] || (elem[expando] = {}), 
                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), skip && skip === elem.nodeName.toLowerCase()) elem = elem[dir] || elem; else {
                        if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                        if (uniqueCache[key] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                    }
                    return !1;
                };
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ? function(elem, context, xml) {
                    for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                    return !0;
                } : matchers[0];
            }
            function multipleContexts(selector, contexts, results) {
                for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results);
                return results;
            }
            function condense(unmatched, map, filter, context, xml) {
                for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++) (elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), 
                mapped && map.push(i)));
                return newUnmatched;
            }
            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
                postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
                markFunction(function(seed, results, context, xml) {
                    var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                    if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                    postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                                postFinder(null, matcherOut = [], temp, xml);
                            }
                            for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                        }
                    } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                    postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
                });
            }
            function matcherFromTokens(tokens) {
                for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                    return elem === checkContext;
                }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                    return indexOf(checkContext, elem) > -1;
                }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                    var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                    return checkContext = null, ret;
                } ]; i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                    if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                        for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++) ;
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: " " === tokens[i - 2].type ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
                return elementMatcher(matchers);
            }
            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                    for (outermost && (outermostContext = context === document || context || outermost); i !== len && null != (elem = elems[i]); i++) {
                        if (byElement && elem) {
                            for (j = 0, context || elem.ownerDocument === document || (setDocument(elem), xml = !documentIsHTML); matcher = elementMatchers[j++]; ) if (matcher(elem, context || document, xml)) {
                                results.push(elem);
                                break;
                            }
                            outermost && (dirruns = dirrunsUnique);
                        }
                        bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                    }
                    if (matchedCount += i, bySet && i !== matchedCount) {
                        for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                        if (seed) {
                            if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                    }
                    return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                    unmatched;
                };
                return bySet ? markFunction(superMatcher) : superMatcher;
            }
            var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
                return a === b && (hasDuplicate = !0), 0;
            }, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
                for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
                return -1;
            }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
                ID: new RegExp("^#(" + identifier + ")"),
                CLASS: new RegExp("^\\.(" + identifier + ")"),
                TAG: new RegExp("^(" + identifier + "|[*])"),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + booleans + ")$", "i"),
                needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 65536;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
            }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
                return asCodePoint ? "\0" === ch ? "�" : ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " " : "\\" + ch;
            }, unloadHandler = function() {
                setDocument();
            }, disabledAncestor = addCombinator(function(elem) {
                return elem.disabled === !0 && ("form" in elem || "label" in elem);
            }, {
                dir: "parentNode",
                next: "legend"
            });
            try {
                push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ? function(target, els) {
                        push_native.apply(target, slice.call(els));
                    } : function(target, els) {
                        for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                        target.length = j - 1;
                    }
                };
            }
            support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return !!documentElement && "HTML" !== documentElement.nodeName;
            }, setDocument = Sizzle.setDocument = function(node) {
                var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
                return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
                docElem = document.documentElement, documentIsHTML = !isXML(document), preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow && (subWindow.addEventListener ? subWindow.addEventListener("unload", unloadHandler, !1) : subWindow.attachEvent && subWindow.attachEvent("onunload", unloadHandler)), 
                support.attributes = assert(function(el) {
                    return el.className = "i", !el.getAttribute("className");
                }), support.getElementsByTagName = assert(function(el) {
                    return el.appendChild(document.createComment("")), !el.getElementsByTagName("*").length;
                }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), 
                support.getById = assert(function(el) {
                    return docElem.appendChild(el).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length;
                }), support.getById ? (Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                }, Expr.find.ID = function(id, context) {
                    if ("undefined" != typeof context.getElementById && documentIsHTML) {
                        var elem = context.getElementById(id);
                        return elem ? [ elem ] : [];
                    }
                }) : (Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                }, Expr.find.ID = function(id, context) {
                    if ("undefined" != typeof context.getElementById && documentIsHTML) {
                        var node, i, elems, elem = context.getElementById(id);
                        if (elem) {
                            if (node = elem.getAttributeNode("id"), node && node.value === id) return [ elem ];
                            for (elems = context.getElementsByName(id), i = 0; elem = elems[i++]; ) if (node = elem.getAttributeNode("id"), 
                            node && node.value === id) return [ elem ];
                        }
                        return [];
                    }
                }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                    return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
                } : function(tag, context) {
                    var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                    if ("*" === tag) {
                        for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                        return tmp;
                    }
                    return results;
                }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                    if ("undefined" != typeof context.getElementsByClassName && documentIsHTML) return context.getElementsByClassName(className);
                }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(el) {
                    docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                    el.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                    el.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                    el.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), el.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                    el.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
                }), assert(function(el) {
                    el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden"), el.appendChild(input).setAttribute("name", "D"), 
                    el.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                    2 !== el.querySelectorAll(":enabled").length && rbuggyQSA.push(":enabled", ":disabled"), 
                    docElem.appendChild(el).disabled = !0, 2 !== el.querySelectorAll(":disabled").length && rbuggyQSA.push(":enabled", ":disabled"), 
                    el.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
                })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(el) {
                    support.disconnectedMatch = matches.call(el, "*"), matches.call(el, "[s!='']:x"), 
                    rbuggyMatches.push("!=", pseudos);
                }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
                hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                    var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                    return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
                } : function(a, b) {
                    if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                    return !1;
                }, sortOrder = hasCompare ? function(a, b) {
                    if (a === b) return hasDuplicate = !0, 0;
                    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                    1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
                } : function(a, b) {
                    if (a === b) return hasDuplicate = !0, 0;
                    var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                    if (!aup || !bup) return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                    if (aup === bup) return siblingCheck(a, b);
                    for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                    for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                    for (;ap[i] === bp[i]; ) i++;
                    return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
                }, document) : document;
            }, Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements);
            }, Sizzle.matchesSelector = function(elem, expr) {
                if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
                support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
                } catch (e) {}
                return Sizzle(expr, document, null, [ elem ]).length > 0;
            }, Sizzle.contains = function(context, elem) {
                return (context.ownerDocument || context) !== document && setDocument(context), 
                contains(context, elem);
            }, Sizzle.attr = function(elem, name) {
                (elem.ownerDocument || elem) !== document && setDocument(elem);
                var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
                return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
            }, Sizzle.escape = function(sel) {
                return (sel + "").replace(rcssescape, fcssescape);
            }, Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            }, Sizzle.uniqueSort = function(results) {
                var elem, duplicates = [], j = 0, i = 0;
                if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
                results.sort(sortOrder), hasDuplicate) {
                    for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                    for (;j--; ) results.splice(duplicates[j], 1);
                }
                return sortInput = null, results;
            }, getText = Sizzle.getText = function(elem) {
                var node, ret = "", i = 0, nodeType = elem.nodeType;
                if (nodeType) {
                    if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                        if ("string" == typeof elem.textContent) return elem.textContent;
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                    } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
                } else for (;node = elem[i++]; ) ret += getText(node);
                return ret;
            }, Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(match) {
                        return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                        "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                    },
                    CHILD: function(match) {
                        return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                        match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                        match;
                    },
                    PSEUDO: function(match) {
                        var excess, unquoted = !match[6] && match[2];
                        return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                        match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                    }
                },
                filter: {
                    TAG: function(nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return "*" === nodeNameSelector ? function() {
                            return !0;
                        } : function(elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                        };
                    },
                    CLASS: function(className) {
                        var pattern = classCache[className + " "];
                        return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                            return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                        });
                    },
                    ATTR: function(name, operator, check) {
                        return function(elem) {
                            var result = Sizzle.attr(elem, name);
                            return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-"));
                        };
                    },
                    CHILD: function(type, what, argument, first, last) {
                        var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                        return 1 === first && 0 === last ? function(elem) {
                            return !!elem.parentNode;
                        } : function(elem, context, xml) {
                            var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = !1;
                            if (parent) {
                                if (simple) {
                                    for (;dir; ) {
                                        for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                        start = dir = "only" === type && !start && "nextSibling";
                                    }
                                    return !0;
                                }
                                if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                    for (node = parent, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), 
                                    cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex && cache[2], 
                                    node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                        uniqueCache[type] = [ dirruns, nodeIndex, diff ];
                                        break;
                                    }
                                } else if (useCache && (node = elem, outerCache = node[expando] || (node[expando] = {}), 
                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex), diff === !1) for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}), 
                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), uniqueCache[type] = [ dirruns, diff ]), 
                                node !== elem)); ) ;
                                return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                            }
                        };
                    },
                    PSEUDO: function(pseudo, argument) {
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                        return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                        Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                            seed[idx] = !(matches[idx] = matched[i]);
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        }) : fn;
                    }
                },
                pseudos: {
                    not: markFunction(function(selector) {
                        var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                            for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                        }) : function(elem, context, xml) {
                            return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                        };
                    }),
                    has: markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),
                    contains: markFunction(function(text) {
                        return text = text.replace(runescape, funescape), function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),
                    lang: markFunction(function(lang) {
                        return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                        lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                            var elemLang;
                            do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                            elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                            return !1;
                        };
                    }),
                    target: function(elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },
                    root: function(elem) {
                        return elem === docElem;
                    },
                    focus: function(elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },
                    enabled: createDisabledPseudo(!1),
                    disabled: createDisabledPseudo(!0),
                    checked: function(elem) {
                        var nodeName = elem.nodeName.toLowerCase();
                        return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                    },
                    selected: function(elem) {
                        return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                    },
                    empty: function(elem) {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function(elem) {
                        return !Expr.pseudos.empty(elem);
                    },
                    header: function(elem) {
                        return rheader.test(elem.nodeName);
                    },
                    input: function(elem) {
                        return rinputs.test(elem.nodeName);
                    },
                    button: function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return "input" === name && "button" === elem.type || "button" === name;
                    },
                    text: function(elem) {
                        var attr;
                        return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                    },
                    first: createPositionalPseudo(function() {
                        return [ 0 ];
                    }),
                    last: createPositionalPseudo(function(matchIndexes, length) {
                        return [ length - 1 ];
                    }),
                    eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                        return [ argument < 0 ? argument + length : argument ];
                    }),
                    even: createPositionalPseudo(function(matchIndexes, length) {
                        for (var i = 0; i < length; i += 2) matchIndexes.push(i);
                        return matchIndexes;
                    }),
                    odd: createPositionalPseudo(function(matchIndexes, length) {
                        for (var i = 1; i < length; i += 2) matchIndexes.push(i);
                        return matchIndexes;
                    }),
                    lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        for (var i = argument < 0 ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                        return matchIndexes;
                    }),
                    gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        for (var i = argument < 0 ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                        return matchIndexes;
                    })
                }
            }, Expr.pseudos.nth = Expr.pseudos.eq;
            for (i in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) Expr.pseudos[i] = createInputPseudo(i);
            for (i in {
                submit: !0,
                reset: !0
            }) Expr.pseudos[i] = createButtonPseudo(i);
            return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
            tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) return parseOnly ? 0 : cached.slice(0);
                for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                    matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), 
                    groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    }), soFar = soFar.slice(matched.length));
                    for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                    tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    }), soFar = soFar.slice(matched.length));
                    if (!matched) break;
                }
                return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
            }, compile = Sizzle.compile = function(selector, match) {
                var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
                if (!cached) {
                    for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                    cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                    cached.selector = selector;
                }
                return cached;
            }, select = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
                if (results = results || [], 1 === match.length) {
                    if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                        if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                        !context) return results;
                        compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                    }
                    for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                    !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                        if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                        results;
                        break;
                    }
                }
                return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context), 
                results;
            }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
            support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(el) {
                return 1 & el.compareDocumentPosition(document.createElement("fieldset"));
            }), assert(function(el) {
                return el.innerHTML = "<a href='#'></a>", "#" === el.firstChild.getAttribute("href");
            }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
            }), support.attributes && assert(function(el) {
                return el.innerHTML = "<input/>", el.firstChild.setAttribute("value", ""), "" === el.firstChild.getAttribute("value");
            }) || addHandle("value", function(elem, name, isXML) {
                if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue;
            }), assert(function(el) {
                return null == el.getAttribute("disabled");
            }) || addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) return elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
            }), Sizzle;
        }(window);
        jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
        jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, 
        jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains, jQuery.escapeSelector = Sizzle.escape;
        var dir = function(elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem);
            }
            return matched;
        }, siblings = function(n, elem) {
            for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
            return matched;
        }, rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, risSimple = /^.[^:#\[\.,]*$/;
        jQuery.filter = function(expr, elems, not) {
            var elem = elems[0];
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return 1 === elem.nodeType;
            }));
        }, jQuery.fn.extend({
            find: function(selector) {
                var i, ret, len = this.length, self = this;
                if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) if (jQuery.contains(self[i], this)) return !0;
                }));
                for (ret = this.pushStack([]), i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
                return len > 1 ? jQuery.uniqueSort(ret) : ret;
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], !1));
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector || [], !0));
            },
            is: function(selector) {
                return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
            }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
            var match, elem;
            if (!selector) return this;
            if (root = root || rootjQuery, "string" == typeof selector) {
                if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
                !match || !match[1] && context) return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
                if (match[1]) {
                    if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                    rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                    return this;
                }
                return elem = document.getElementById(match[2]), elem && (this[0] = elem, this.length = 1), 
                this;
            }
            return selector.nodeType ? (this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? void 0 !== root.ready ? root.ready(selector) : selector(jQuery) : jQuery.makeArray(selector, this);
        };
        init.prototype = jQuery.fn, rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        jQuery.fn.extend({
            has: function(target) {
                var targets = jQuery(target, this), l = targets.length;
                return this.filter(function() {
                    for (var i = 0; i < l; i++) if (jQuery.contains(this, targets[i])) return !0;
                });
            },
            closest: function(selectors, context) {
                var cur, i = 0, l = this.length, matched = [], targets = "string" != typeof selectors && jQuery(selectors);
                if (!rneedsContext.test(selectors)) for (;i < l; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                    matched.push(cur);
                    break;
                }
                return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
            },
            index: function(elem) {
                return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function(selector, context) {
                return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
            },
            addBack: function(selector) {
                return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
            }
        }), jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && 11 !== parent.nodeType ? parent : null;
            },
            parents: function(elem) {
                return dir(elem, "parentNode");
            },
            parentsUntil: function(elem, i, until) {
                return dir(elem, "parentNode", until);
            },
            next: function(elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function(elem) {
                return dir(elem, "nextSibling");
            },
            prevAll: function(elem) {
                return dir(elem, "previousSibling");
            },
            nextUntil: function(elem, i, until) {
                return dir(elem, "nextSibling", until);
            },
            prevUntil: function(elem, i, until) {
                return dir(elem, "previousSibling", until);
            },
            siblings: function(elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
            },
            children: function(elem) {
                return siblings(elem.firstChild);
            },
            contents: function(elem) {
                return nodeName(elem, "iframe") ? elem.contentDocument : (nodeName(elem, "template") && (elem = elem.content || elem), 
                jQuery.merge([], elem.childNodes));
            }
        }, function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var matched = jQuery.map(this, fn, until);
                return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
                this.length > 1 && (guaranteedUnique[name] || jQuery.uniqueSort(matched), rparentsprev.test(name) && matched.reverse()), 
                this.pushStack(matched);
            };
        });
        var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
        jQuery.Callbacks = function(options) {
            options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options);
            var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
                for (locked = locked || options.once, fired = firing = !0; queue.length; firingIndex = -1) for (memory = queue.shift(); ++firingIndex < list.length; ) list[firingIndex].apply(memory[0], memory[1]) === !1 && options.stopOnFalse && (firingIndex = list.length, 
                memory = !1);
                options.memory || (memory = !1), firing = !1, locked && (list = memory ? [] : "");
            }, self = {
                add: function() {
                    return list && (memory && !firing && (firingIndex = list.length - 1, queue.push(memory)), 
                    function add(args) {
                        jQuery.each(args, function(_, arg) {
                            jQuery.isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== jQuery.type(arg) && add(arg);
                        });
                    }(arguments), memory && !firing && fire()), this;
                },
                remove: function() {
                    return jQuery.each(arguments, function(_, arg) {
                        for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                        index <= firingIndex && firingIndex--;
                    }), this;
                },
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
                },
                empty: function() {
                    return list && (list = []), this;
                },
                disable: function() {
                    return locked = queue = [], list = memory = "", this;
                },
                disabled: function() {
                    return !list;
                },
                lock: function() {
                    return locked = queue = [], memory || firing || (list = memory = ""), this;
                },
                locked: function() {
                    return !!locked;
                },
                fireWith: function(context, args) {
                    return locked || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                    queue.push(args), firing || fire()), this;
                },
                fire: function() {
                    return self.fireWith(this, arguments), this;
                },
                fired: function() {
                    return !!fired;
                }
            };
            return self;
        }, jQuery.extend({
            Deferred: function(func) {
                var tuples = [ [ "notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2 ], [ "resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected" ] ], state = "pending", promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        return deferred.done(arguments).fail(arguments), this;
                    },
                    "catch": function(fn) {
                        return promise.then(null, fn);
                    },
                    pipe: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    returned && jQuery.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this, fn ? [ returned ] : arguments);
                                });
                            }), fns = null;
                        }).promise();
                    },
                    then: function(onFulfilled, onRejected, onProgress) {
                        function resolve(depth, deferred, handler, special) {
                            return function() {
                                var that = this, args = arguments, mightThrow = function() {
                                    var returned, then;
                                    if (!(depth < maxDepth)) {
                                        if (returned = handler.apply(that, args), returned === deferred.promise()) throw new TypeError("Thenable self-resolution");
                                        then = returned && ("object" == typeof returned || "function" == typeof returned) && returned.then, 
                                        jQuery.isFunction(then) ? special ? then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)) : (maxDepth++, 
                                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith))) : (handler !== Identity && (that = void 0, 
                                        args = [ returned ]), (special || deferred.resolveWith)(that, args));
                                    }
                                }, process = special ? mightThrow : function() {
                                    try {
                                        mightThrow();
                                    } catch (e) {
                                        jQuery.Deferred.exceptionHook && jQuery.Deferred.exceptionHook(e, process.stackTrace), 
                                        depth + 1 >= maxDepth && (handler !== Thrower && (that = void 0, args = [ e ]), 
                                        deferred.rejectWith(that, args));
                                    }
                                };
                                depth ? process() : (jQuery.Deferred.getStackHook && (process.stackTrace = jQuery.Deferred.getStackHook()), 
                                window.setTimeout(process));
                            };
                        }
                        var maxDepth = 0;
                        return jQuery.Deferred(function(newDefer) {
                            tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)), 
                            tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity)), 
                            tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
                        }).promise();
                    },
                    promise: function(obj) {
                        return null != obj ? jQuery.extend(obj, promise) : promise;
                    }
                }, deferred = {};
                return jQuery.each(tuples, function(i, tuple) {
                    var list = tuple[2], stateString = tuple[5];
                    promise[tuple[1]] = list.add, stateString && list.add(function() {
                        state = stateString;
                    }, tuples[3 - i][2].disable, tuples[0][2].lock), list.add(tuple[3].fire), deferred[tuple[0]] = function() {
                        return deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments), 
                        this;
                    }, deferred[tuple[0] + "With"] = list.fireWith;
                }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
            },
            when: function(singleValue) {
                var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), master = jQuery.Deferred(), updateFunc = function(i) {
                    return function(value) {
                        resolveContexts[i] = this, resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                        --remaining || master.resolveWith(resolveContexts, resolveValues);
                    };
                };
                if (remaining <= 1 && (adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining), 
                "pending" === master.state() || jQuery.isFunction(resolveValues[i] && resolveValues[i].then))) return master.then();
                for (;i--; ) adoptValue(resolveValues[i], updateFunc(i), master.reject);
                return master.promise();
            }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function(error, stack) {
            window.console && window.console.warn && error && rerrorNames.test(error.name) && window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }, jQuery.readyException = function(error) {
            window.setTimeout(function() {
                throw error;
            });
        };
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function(fn) {
            return readyList.then(fn)["catch"](function(error) {
                jQuery.readyException(error);
            }), this;
        }, jQuery.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(wait) {
                (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || readyList.resolveWith(document, [ jQuery ]));
            }
        }), jQuery.ready.then = readyList.then, "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed), 
        window.addEventListener("load", completed));
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, len = elems.length, bulk = null == key;
            if ("object" === jQuery.type(key)) {
                chainable = !0;
                for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw);
            } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
            bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                return bulk.call(jQuery(elem), value);
            })), fn)) for (;i < len; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
        }, acceptData = function(owner) {
            return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
        };
        Data.uid = 1, Data.prototype = {
            cache: function(owner) {
                var value = owner[this.expando];
                return value || (value = {}, acceptData(owner) && (owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, {
                    value: value,
                    configurable: !0
                }))), value;
            },
            set: function(owner, data, value) {
                var prop, cache = this.cache(owner);
                if ("string" == typeof data) cache[jQuery.camelCase(data)] = value; else for (prop in data) cache[jQuery.camelCase(prop)] = data[prop];
                return cache;
            },
            get: function(owner, key) {
                return void 0 === key ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
            },
            access: function(owner, key, value) {
                return void 0 === key || key && "string" == typeof key && void 0 === value ? this.get(owner, key) : (this.set(owner, key, value), 
                void 0 !== value ? value : key);
            },
            remove: function(owner, key) {
                var i, cache = owner[this.expando];
                if (void 0 !== cache) {
                    if (void 0 !== key) {
                        Array.isArray(key) ? key = key.map(jQuery.camelCase) : (key = jQuery.camelCase(key), 
                        key = key in cache ? [ key ] : key.match(rnothtmlwhite) || []), i = key.length;
                        for (;i--; ) delete cache[key[i]];
                    }
                    (void 0 === key || jQuery.isEmptyObject(cache)) && (owner.nodeType ? owner[this.expando] = void 0 : delete owner[this.expando]);
                }
            },
            hasData: function(owner) {
                var cache = owner[this.expando];
                return void 0 !== cache && !jQuery.isEmptyObject(cache);
            }
        };
        var dataPriv = new Data(), dataUser = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        jQuery.extend({
            hasData: function(elem) {
                return dataUser.hasData(elem) || dataPriv.hasData(elem);
            },
            data: function(elem, name, data) {
                return dataUser.access(elem, name, data);
            },
            removeData: function(elem, name) {
                dataUser.remove(elem, name);
            },
            _data: function(elem, name, data) {
                return dataPriv.access(elem, name, data);
            },
            _removeData: function(elem, name) {
                dataPriv.remove(elem, name);
            }
        }), jQuery.fn.extend({
            data: function(key, value) {
                var i, name, data, elem = this[0], attrs = elem && elem.attributes;
                if (void 0 === key) {
                    if (this.length && (data = dataUser.get(elem), 1 === elem.nodeType && !dataPriv.get(elem, "hasDataAttrs"))) {
                        for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                        dataAttr(elem, name, data[name])));
                        dataPriv.set(elem, "hasDataAttrs", !0);
                    }
                    return data;
                }
                return "object" == typeof key ? this.each(function() {
                    dataUser.set(this, key);
                }) : access(this, function(value) {
                    var data;
                    if (elem && void 0 === value) {
                        if (data = dataUser.get(elem, key), void 0 !== data) return data;
                        if (data = dataAttr(elem, key), void 0 !== data) return data;
                    } else this.each(function() {
                        dataUser.set(this, key, value);
                    });
                }, null, value, arguments.length > 1, null, !0);
            },
            removeData: function(key) {
                return this.each(function() {
                    dataUser.remove(this, key);
                });
            }
        }), jQuery.extend({
            queue: function(elem, type, data) {
                var queue;
                if (elem) return type = (type || "fx") + "queue", queue = dataPriv.get(elem, type), 
                data && (!queue || Array.isArray(data) ? queue = dataPriv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
                queue || [];
            },
            dequeue: function(elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                    jQuery.dequeue(elem, type);
                };
                "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
                delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        dataPriv.remove(elem, [ type + "queue", key ]);
                    })
                });
            }
        }), jQuery.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
                });
            },
            dequeue: function(type) {
                return this.each(function() {
                    jQuery.dequeue(this, type);
                });
            },
            clearQueue: function(type) {
                return this.queue(type || "fx", []);
            },
            promise: function(type, obj) {
                var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                    --count || defer.resolveWith(elements, [ elements ]);
                };
                for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = dataPriv.get(elements[i], type + "queueHooks"), 
                tmp && tmp.empty && (count++, tmp.empty.add(resolve));
                return resolve(), defer.promise(obj);
            }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHiddenWithinTree = function(elem, el) {
            return elem = el || elem, "none" === elem.style.display || "" === elem.style.display && jQuery.contains(elem.ownerDocument, elem) && "none" === jQuery.css(elem, "display");
        }, swap = function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret;
        }, defaultDisplayMap = {};
        jQuery.fn.extend({
            show: function() {
                return showHide(this, !0);
            },
            hide: function() {
                return showHide(this);
            },
            toggle: function(state) {
                return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                    isHiddenWithinTree(this) ? jQuery(this).show() : jQuery(this).hide();
                });
            }
        });
        var rcheckableType = /^(?:checkbox|radio)$/i, rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, rscriptType = /^$|\/(?:java|ecma)script/i, wrapMap = {
            option: [ 1, "<select multiple='multiple'>", "</select>" ],
            thead: [ 1, "<table>", "</table>" ],
            col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
            _default: [ 0, "", "" ]
        };
        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
        wrapMap.th = wrapMap.td;
        var rhtml = /<|&#?\w+;/;
        !function() {
            var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
            input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), 
            div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
            div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
        }();
        var documentElement = document.documentElement, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        jQuery.event = {
            global: {},
            add: function(elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
                selector = handleObjIn.selector), selector && jQuery.find.matchesSelector(documentElement, selector), 
                handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return "undefined" != typeof jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
                }), types = (types || "").match(rnothtmlwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
                type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle)), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                jQuery.event.global[type] = !0);
            },
            remove: function(elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                if (elemData && (events = elemData.events)) {
                    for (types = (types || "").match(rnothtmlwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                    type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                        for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                        handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                        origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                        handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                        origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                        delete events[type]);
                    } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                    jQuery.isEmptyObject(events) && dataPriv.remove(elem, "handle events");
                }
            },
            dispatch: function(nativeEvent) {
                var i, j, ret, matched, handleObj, handlerQueue, event = jQuery.event.fix(nativeEvent), args = new Array(arguments.length), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
                for (args[0] = event, i = 1; i < arguments.length; i++) args[i] = arguments[i];
                if (event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                    for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                    j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) event.rnamespace && !event.rnamespace.test(handleObj.namespace) || (event.handleObj = handleObj, 
                    event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                    void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                    return special.postDispatch && special.postDispatch.call(this, event), event.result;
                }
            },
            handlers: function(event, handlers) {
                var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
                if (delegateCount && cur.nodeType && !("click" === event.type && event.button >= 1)) for (;cur !== this; cur = cur.parentNode || this) if (1 === cur.nodeType && ("click" !== event.type || cur.disabled !== !0)) {
                    for (matchedHandlers = [], matchedSelectors = {}, i = 0; i < delegateCount; i++) handleObj = handlers[i], 
                    sel = handleObj.selector + " ", void 0 === matchedSelectors[sel] && (matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [ cur ]).length), 
                    matchedSelectors[sel] && matchedHandlers.push(handleObj);
                    matchedHandlers.length && handlerQueue.push({
                        elem: cur,
                        handlers: matchedHandlers
                    });
                }
                return cur = this, delegateCount < handlers.length && handlerQueue.push({
                    elem: cur,
                    handlers: handlers.slice(delegateCount)
                }), handlerQueue;
            },
            addProp: function(name, hook) {
                Object.defineProperty(jQuery.Event.prototype, name, {
                    enumerable: !0,
                    configurable: !0,
                    get: jQuery.isFunction(hook) ? function() {
                        if (this.originalEvent) return hook(this.originalEvent);
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[name];
                    },
                    set: function(value) {
                        Object.defineProperty(this, name, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: value
                        });
                    }
                });
            },
            fix: function(originalEvent) {
                return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== safeActiveElement() && this.focus) return this.focus(), !1;
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === safeActiveElement() && this.blur) return this.blur(), !1;
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && nodeName(this, "input")) return this.click(), 
                        !1;
                    },
                    _default: function(event) {
                        return nodeName(event.target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function(event) {
                        void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                    }
                }
            }
        }, jQuery.removeEvent = function(elem, type, handle) {
            elem.removeEventListener && elem.removeEventListener(type, handle);
        }, jQuery.Event = function(src, props) {
            return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
            this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse, 
            this.target = src.target && 3 === src.target.nodeType ? src.target.parentNode : src.target, 
            this.currentTarget = src.currentTarget, this.relatedTarget = src.relatedTarget) : this.type = src, 
            props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
            void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
        }, jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue, e && !this.isSimulated && e.preventDefault();
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue, e && !this.isSimulated && e.stopPropagation();
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue, e && !this.isSimulated && e.stopImmediatePropagation(), 
                this.stopPropagation();
            }
        }, jQuery.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(event) {
                var button = event.button;
                return null == event.which && rkeyEvent.test(event.type) ? null != event.charCode ? event.charCode : event.keyCode : !event.which && void 0 !== button && rmouseEvent.test(event.type) ? 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0 : event.which;
            }
        }, jQuery.event.addProp), jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                    var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                    return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, 
                    ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
                }
            };
        }), jQuery.fn.extend({
            on: function(types, selector, data, fn) {
                return on(this, types, selector, data, fn);
            },
            one: function(types, selector, data, fn) {
                return on(this, types, selector, data, fn, 1);
            },
            off: function(types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
                this;
                if ("object" == typeof types) {
                    for (type in types) this.off(type, selector, types[type]);
                    return this;
                }
                return selector !== !1 && "function" != typeof selector || (fn = selector, selector = void 0), 
                fn === !1 && (fn = returnFalse), this.each(function() {
                    jQuery.event.remove(this, types, fn, selector);
                });
            }
        });
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        jQuery.extend({
            htmlPrefilter: function(html) {
                return html.replace(rxhtmlTag, "<$1></$2>");
            },
            clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
                if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
                srcElements = getAll(elem), i = 0, l = srcElements.length; i < l; i++) fixInput(srcElements[i], destElements[i]);
                if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
                destElements = destElements || getAll(clone), i = 0, l = srcElements.length; i < l; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
                return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
                clone;
            },
            cleanData: function(elems) {
                for (var data, elem, type, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) if (acceptData(elem)) {
                    if (data = elem[dataPriv.expando]) {
                        if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                        elem[dataPriv.expando] = void 0;
                    }
                    elem[dataUser.expando] && (elem[dataUser.expando] = void 0);
                }
            }
        }), jQuery.fn.extend({
            detach: function(selector) {
                return remove(this, selector, !0);
            },
            remove: function(selector) {
                return remove(this, selector);
            },
            text: function(value) {
                return access(this, function(value) {
                    return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = value);
                    });
                }, null, value, arguments.length);
            },
            append: function() {
                return domManip(this, arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem);
                    }
                });
            },
            prepend: function() {
                return domManip(this, arguments, function(elem) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild);
                    }
                });
            },
            before: function() {
                return domManip(this, arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this);
                });
            },
            after: function() {
                return domManip(this, arguments, function(elem) {
                    this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
                });
            },
            empty: function() {
                for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                elem.textContent = "");
                return this;
            },
            clone: function(dataAndEvents, deepDataAndEvents) {
                return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
                this.map(function() {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                });
            },
            html: function(value) {
                return access(this, function(value) {
                    var elem = this[0] || {}, i = 0, l = this.length;
                    if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                    if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                        value = jQuery.htmlPrefilter(value);
                        try {
                            for (;i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                            elem.innerHTML = value);
                            elem = 0;
                        } catch (e) {}
                    }
                    elem && this.empty().append(value);
                }, null, value, arguments.length);
            },
            replaceWith: function() {
                var ignored = [];
                return domManip(this, arguments, function(elem) {
                    var parent = this.parentNode;
                    jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)), parent && parent.replaceChild(elem, this));
                }, ignored);
            }
        }), jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, original) {
            jQuery.fn[name] = function(selector) {
                for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; i <= last; i++) elems = i === last ? this : this.clone(!0), 
                jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
                return this.pushStack(ret);
            };
        });
        var rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
            var view = elem.ownerDocument.defaultView;
            return view && view.opener || (view = window), view.getComputedStyle(elem);
        };
        !function() {
            function computeStyleTests() {
                if (div) {
                    div.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
                    div.innerHTML = "", documentElement.appendChild(container);
                    var divStyle = window.getComputedStyle(div);
                    pixelPositionVal = "1%" !== divStyle.top, reliableMarginLeftVal = "2px" === divStyle.marginLeft, 
                    boxSizingReliableVal = "4px" === divStyle.width, div.style.marginRight = "50%", 
                    pixelMarginRightVal = "4px" === divStyle.marginRight, documentElement.removeChild(container), 
                    div = null;
                }
            }
            var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
            div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
            support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
            container.appendChild(div), jQuery.extend(support, {
                pixelPosition: function() {
                    return computeStyleTests(), pixelPositionVal;
                },
                boxSizingReliable: function() {
                    return computeStyleTests(), boxSizingReliableVal;
                },
                pixelMarginRight: function() {
                    return computeStyleTests(), pixelMarginRightVal;
                },
                reliableMarginLeft: function() {
                    return computeStyleTests(), reliableMarginLeftVal;
                }
            }));
        }();
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        }, cssPrefixes = [ "Webkit", "Moz", "ms" ], emptyStyle = document.createElement("div").style;
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return "" === ret ? "1" : ret;
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(elem, name, value, extra) {
                if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                    var ret, type, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
                    return isCustomProp || (name = finalPropName(origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], 
                    void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, 
                    "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret), 
                    type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")), 
                    support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                    hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (isCustomProp ? style.setProperty(name, value) : style[name] = value)), 
                    void 0);
                }
            },
            css: function(elem, name, extra, styles) {
                var val, num, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name);
                return isCustomProp || (name = finalPropName(origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], 
                hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), 
                "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
                "" === extra || extra ? (num = parseFloat(val), extra === !0 || isFinite(num) ? num || 0 : val) : val;
            }
        }), jQuery.each([ "height", "width" ], function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    if (computed) return !rdisplayswap.test(jQuery.css(elem, "display")) || elem.getClientRects().length && elem.getBoundingClientRect().width ? getWidthOrHeight(elem, name, extra) : swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    });
                },
                set: function(elem, value, extra) {
                    var matches, styles = extra && getStyles(elem), subtract = extra && augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles);
                    return subtract && (matches = rcssNum.exec(value)) && "px" !== (matches[3] || "px") && (elem.style[name] = value, 
                    value = jQuery.css(elem, name)), setPositiveNumber(elem, value, subtract);
                }
            };
        }), jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
            if (computed) return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                marginLeft: 0
            }, function() {
                return elem.getBoundingClientRect().left;
            })) + "px";
        }), jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                    return expanded;
                }
            }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
        }), jQuery.fn.extend({
            css: function(name, value) {
                return access(this, function(elem, name, value) {
                    var styles, len, map = {}, i = 0;
                    if (Array.isArray(name)) {
                        for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                        return map;
                    }
                    return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
                }, name, value, arguments.length > 1);
            }
        }), jQuery.Tween = Tween, Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem, this.prop = prop, this.easing = easing || jQuery.easing._default, 
                this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
            },
            run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
                this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
                hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
            }
        }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""), 
                    result && "auto" !== result ? result : 0);
                },
                set: function(tween) {
                    jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                }
            }
        }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
            }
        }, jQuery.easing = {
            linear: function(p) {
                return p;
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2;
            },
            _default: "swing"
        }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
                "*": [ function(prop, value) {
                    var tween = this.createTween(prop, value);
                    return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween), tween;
                } ]
            },
            tweener: function(props, callback) {
                jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.match(rnothtmlwhite);
                for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], 
                Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback);
            },
            prefilters: [ defaultPrefilter ],
            prefilter: function(callback, prepend) {
                prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback);
            }
        }), jQuery.speed = function(speed, easing, fn) {
            var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            return jQuery.fx.off ? opt.duration = 0 : "number" != typeof opt.duration && (opt.duration in jQuery.fx.speeds ? opt.duration = jQuery.fx.speeds[opt.duration] : opt.duration = jQuery.fx.speeds._default), 
            null != opt.queue && opt.queue !== !0 || (opt.queue = "fx"), opt.old = opt.complete, 
            opt.complete = function() {
                jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
            }, opt;
        }, jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback);
            },
            animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    (empty || dataPriv.get(this, "finish")) && anim.stop(!0);
                };
                return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop, stop(gotoEnd);
                };
                return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
                clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                    var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                    if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                    for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                    dequeue = !1, timers.splice(index, 1));
                    !dequeue && gotoEnd || jQuery.dequeue(this, type);
                });
            },
            finish: function(type) {
                return type !== !1 && (type = type || "fx"), this.each(function() {
                    var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                    for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                    index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                    timers.splice(index, 1));
                    for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                    delete data.finish;
                });
            }
        }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
            };
        }), jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
            };
        }), jQuery.timers = [], jQuery.fx.tick = function() {
            var timer, i = 0, timers = jQuery.timers;
            for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
            timers.length || jQuery.fx.stop(), fxNow = void 0;
        }, jQuery.fx.timer = function(timer) {
            jQuery.timers.push(timer), jQuery.fx.start();
        }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
            inProgress || (inProgress = !0, schedule());
        }, jQuery.fx.stop = function() {
            inProgress = null;
        }, jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, jQuery.fn.delay = function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
            this.queue(type, function(next, hooks) {
                var timeout = window.setTimeout(next, time);
                hooks.stop = function() {
                    window.clearTimeout(timeout);
                };
            });
        }, function() {
            var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
            input = document.createElement("input"), input.value = "t", input.type = "radio", 
            support.radioValue = "t" === input.value;
        }();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function(name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1);
            },
            removeAttr: function(name) {
                return this.each(function() {
                    jQuery.removeAttr(this, name);
                });
            }
        }), jQuery.extend({
            attr: function(elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                if (3 !== nType && 8 !== nType && 2 !== nType) return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), 
                void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
                value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
                null == ret ? void 0 : ret));
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!support.radioValue && "radio" === value && nodeName(elem, "input")) {
                            var val = elem.value;
                            return elem.setAttribute("type", value), val && (elem.value = val), value;
                        }
                    }
                }
            },
            removeAttr: function(elem, value) {
                var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
                if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) elem.removeAttribute(name);
            }
        }), boolHook = {
            set: function(elem, value, name) {
                return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
                name;
            }
        }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function(elem, name, isXML) {
                var ret, handle, lowercaseName = name.toLowerCase();
                return isXML || (handle = attrHandle[lowercaseName], attrHandle[lowercaseName] = ret, 
                ret = null != getter(elem, name, isXML) ? lowercaseName : null, attrHandle[lowercaseName] = handle), 
                ret;
            };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
            prop: function(name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1);
            },
            removeProp: function(name) {
                return this.each(function() {
                    delete this[jQuery.propFix[name] || name];
                });
            }
        }), jQuery.extend({
            prop: function(elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                if (3 !== nType && 8 !== nType && 2 !== nType) return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, 
                hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), support.optSelected || (jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
            },
            set: function(elem) {
                var parent = elem.parentNode;
                parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex);
            }
        }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
            jQuery.propFix[this.toLowerCase()] = this;
        }), jQuery.fn.extend({
            addClass: function(value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
                if ("string" == typeof value && value) for (classes = value.match(rnothtmlwhite) || []; elem = this[i++]; ) if (curValue = getClass(elem), 
                cur = 1 === elem.nodeType && " " + stripAndCollapse(curValue) + " ") {
                    for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                    finalValue = stripAndCollapse(cur), curValue !== finalValue && elem.setAttribute("class", finalValue);
                }
                return this;
            },
            removeClass: function(value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof value && value) for (classes = value.match(rnothtmlwhite) || []; elem = this[i++]; ) if (curValue = getClass(elem), 
                cur = 1 === elem.nodeType && " " + stripAndCollapse(curValue) + " ") {
                    for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") > -1; ) cur = cur.replace(" " + clazz + " ", " ");
                    finalValue = stripAndCollapse(cur), curValue !== finalValue && elem.setAttribute("class", finalValue);
                }
                return this;
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value;
                return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                }) : this.each(function() {
                    var className, i, self, classNames;
                    if ("string" === type) for (i = 0, self = jQuery(this), classNames = value.match(rnothtmlwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else void 0 !== value && "boolean" !== type || (className = getClass(this), 
                    className && dataPriv.set(this, "__className__", className), this.setAttribute && this.setAttribute("class", className || value === !1 ? "" : dataPriv.get(this, "__className__") || ""));
                });
            },
            hasClass: function(selector) {
                var className, elem, i = 0;
                for (className = " " + selector + " "; elem = this[i++]; ) if (1 === elem.nodeType && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) return !0;
                return !1;
            }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
            val: function(value) {
                var hooks, ret, isFunction, elem = this[0];
                {
                    if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                        var val;
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                        null == val ? val = "" : "number" == typeof val ? val += "" : Array.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null == value ? "" : value + "";
                        })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                        hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                    });
                    if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                    hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                    "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
                }
            }
        }), jQuery.extend({
            valHooks: {
                option: {
                    get: function(elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return null != val ? val : stripAndCollapse(jQuery.text(elem));
                    }
                },
                select: {
                    get: function(elem) {
                        var value, option, i, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type, values = one ? null : [], max = one ? index + 1 : options.length;
                        for (i = index < 0 ? max : one ? index : 0; i < max; i++) if (option = options[i], 
                        (option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                            if (value = jQuery(option).val(), one) return value;
                            values.push(value);
                        }
                        return values;
                    },
                    set: function(elem, value) {
                        for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                        (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) && (optionSet = !0);
                        return optionSet || (elem.selectedIndex = -1), values;
                    }
                }
            }
        }), jQuery.each([ "radio", "checkbox" ], function() {
            jQuery.valHooks[this] = {
                set: function(elem, value) {
                    if (Array.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
                }
            }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
                return null === elem.getAttribute("value") ? "on" : elem.value;
            });
        });
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
        jQuery.extend(jQuery.event, {
            trigger: function(event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."), 
                type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
                event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
                event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
                event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
                special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                    if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                        for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                        tmp = cur;
                        tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                    }
                    for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                    handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle"), 
                    handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data), 
                    event.result === !1 && event.preventDefault());
                    return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], 
                    tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, 
                    tmp && (elem[ontype] = tmp)), event.result;
                }
            },
            simulate: function(type, elem, event) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: !0
                });
                jQuery.event.trigger(e, null, elem);
            }
        }), jQuery.fn.extend({
            trigger: function(type, data) {
                return this.each(function() {
                    jQuery.event.trigger(type, data, this);
                });
            },
            triggerHandler: function(type, data) {
                var elem = this[0];
                if (elem) return jQuery.event.trigger(type, data, elem, !0);
            }
        }), jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
            };
        }), jQuery.fn.extend({
            hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            }
        }), support.focusin = "onfocusin" in window, support.focusin || jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                    attaches || doc.addEventListener(orig, handler, !0), dataPriv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                    attaches ? dataPriv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                    dataPriv.remove(doc, fix));
                }
            };
        });
        var location = window.location, nonce = jQuery.now(), rquery = /\?/;
        jQuery.parseXML = function(data) {
            var xml;
            if (!data || "string" != typeof data) return null;
            try {
                xml = new window.DOMParser().parseFromString(data, "text/xml");
            } catch (e) {
                xml = void 0;
            }
            return xml && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
            xml;
        };
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        jQuery.param = function(a, traditional) {
            var prefix, s = [], add = function(key, valueOrFunction) {
                var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(null == value ? "" : value);
            };
            if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
                add(this.name, this.value);
            }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
            return s.join("&");
        }, jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray());
            },
            serializeArray: function() {
                return this.map(function() {
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                }).filter(function() {
                    var type = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
                }).map(function(i, elem) {
                    var val = jQuery(this).val();
                    return null == val ? null : Array.isArray(val) ? jQuery.map(val, function(val) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                    }) : {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }).get();
            }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document.createElement("a");
        originAnchor.href = location.href, jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: location.href,
                type: "GET",
                isLocal: rlocalProtocol.test(location.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function(url, options) {
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    completed || (completed = !0, timeoutTimer && window.clearTimeout(timeoutTimer), 
                    transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, 
                    isSuccess = status >= 200 && status < 300 || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), 
                    response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                    modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                    modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                    success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                    !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, 
                    jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                    jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                    completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                    --jQuery.active || jQuery.event.trigger("ajaxStop")));
                }
                "object" == typeof url && (options = url, url = void 0), options = options || {};
                var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                        var match;
                        if (completed) {
                            if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return null == match ? null : match;
                    },
                    getAllResponseHeaders: function() {
                        return completed ? responseHeadersString : null;
                    },
                    setRequestHeader: function(name, value) {
                        return null == completed && (name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name, 
                        requestHeaders[name] = value), this;
                    },
                    overrideMimeType: function(type) {
                        return null == completed && (s.mimeType = type), this;
                    },
                    statusCode: function(map) {
                        var code;
                        if (map) if (completed) jqXHR.always(map[jqXHR.status]); else for (code in map) statusCode[code] = [ statusCode[code], map[code] ];
                        return this;
                    },
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        return transport && transport.abort(finalText), done(0, finalText), this;
                    }
                };
                if (deferred.promise(jqXHR), s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"), 
                s.type = options.method || options.type || s.method || s.type, s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [ "" ], 
                null == s.crossDomain) {
                    urlAnchor = document.createElement("a");
                    try {
                        urlAnchor.href = s.url, urlAnchor.href = urlAnchor.href, s.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host;
                    } catch (e) {
                        s.crossDomain = !0;
                    }
                }
                if (s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), completed) return jqXHR;
                fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
                s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url.replace(rhash, ""), 
                s.hasContent ? s.data && s.processData && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && (s.data = s.data.replace(r20, "+")) : (uncached = s.url.slice(cacheURL.length), 
                s.data && (cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), 
                s.cache === !1 && (cacheURL = cacheURL.replace(rantiCache, "$1"), uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached), 
                s.url = cacheURL + uncached), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
                jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
                (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || completed)) return jqXHR.abort();
                if (strAbort = "abort", completeDeferred.add(s.complete), jqXHR.done(s.success), 
                jqXHR.fail(s.error), transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                    if (jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                    completed) return jqXHR;
                    s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout));
                    try {
                        completed = !1, transport.send(requestHeaders, done);
                    } catch (e) {
                        if (completed) throw e;
                        done(-1, e);
                    }
                } else done(-1, "No Transport");
                return jqXHR;
            },
            getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json");
            },
            getScript: function(url, callback) {
                return jQuery.get(url, void 0, callback, "script");
            }
        }), jQuery.each([ "get", "post" ], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
                jQuery.ajax(jQuery.extend({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                }, jQuery.isPlainObject(url) && url));
            };
        }), jQuery._evalUrl = function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            });
        }, jQuery.fn.extend({
            wrapAll: function(html) {
                var wrap;
                return this[0] && (jQuery.isFunction(html) && (html = html.call(this[0])), wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), 
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                    return elem;
                }).append(this)), this;
            },
            wrapInner: function(html) {
                return jQuery.isFunction(html) ? this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                }) : this.each(function() {
                    var self = jQuery(this), contents = self.contents();
                    contents.length ? contents.wrapAll(html) : self.append(html);
                });
            },
            wrap: function(html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function(i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
                });
            },
            unwrap: function(selector) {
                return this.parent(selector).not("body").each(function() {
                    jQuery(this).replaceWith(this.childNodes);
                }), this;
            }
        }), jQuery.expr.pseudos.hidden = function(elem) {
            return !jQuery.expr.pseudos.visible(elem);
        }, jQuery.expr.pseudos.visible = function(elem) {
            return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        }, jQuery.ajaxSettings.xhr = function() {
            try {
                return new window.XMLHttpRequest();
            } catch (e) {}
        };
        var xhrSuccessStatus = {
            0: 200,
            1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
        jQuery.ajaxTransport(function(options) {
            var callback, errorCallback;
            if (support.cors || xhrSupported && !options.crossDomain) return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr();
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                    options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                    options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) xhr.setRequestHeader(i, headers[i]);
                    callback = function(type) {
                        return function() {
                            callback && (callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null, 
                            "abort" === type ? xhr.abort() : "error" === type ? "number" != typeof xhr.status ? complete(0, "error") : complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? {
                                binary: xhr.response
                            } : {
                                text: xhr.responseText
                            }, xhr.getAllResponseHeaders()));
                        };
                    }, xhr.onload = callback(), errorCallback = xhr.onerror = callback("error"), void 0 !== xhr.onabort ? xhr.onabort = errorCallback : xhr.onreadystatechange = function() {
                        4 === xhr.readyState && window.setTimeout(function() {
                            callback && errorCallback();
                        });
                    }, callback = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {
                        if (callback) throw e;
                    }
                },
                abort: function() {
                    callback && callback();
                }
            };
        }), jQuery.ajaxPrefilter(function(s) {
            s.crossDomain && (s.contents.script = !1);
        }), jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(text) {
                    return jQuery.globalEval(text), text;
                }
            }
        }), jQuery.ajaxPrefilter("script", function(s) {
            void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
        }), jQuery.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script, callback;
                return {
                    send: function(_, complete) {
                        script = jQuery("<script>").prop({
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function(evt) {
                            script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                        }), document.head.appendChild(script[0]);
                    },
                    abort: function() {
                        callback && callback();
                    }
                };
            }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
                return this[callback] = !0, callback;
            }
        }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            if (jsonProp || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
            jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
            s.converters["script json"] = function() {
                return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
            }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
                responseContainer = arguments;
            }, jqXHR.always(function() {
                void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten, 
                s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), 
                responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
                responseContainer = overwritten = void 0;
            }), "script";
        }), support.createHTMLDocument = function() {
            var body = document.implementation.createHTMLDocument("").body;
            return body.innerHTML = "<form></form><form></form>", 2 === body.childNodes.length;
        }(), jQuery.parseHTML = function(data, context, keepScripts) {
            if ("string" != typeof data) return [];
            "boolean" == typeof context && (keepScripts = context, context = !1);
            var base, parsed, scripts;
            return context || (support.createHTMLDocument ? (context = document.implementation.createHTMLDocument(""), 
            base = context.createElement("base"), base.href = document.location.href, context.head.appendChild(base)) : context = document), 
            parsed = rsingleTag.exec(data), scripts = !keepScripts && [], parsed ? [ context.createElement(parsed[1]) ] : (parsed = buildFragment([ data ], context, scripts), 
            scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
        }, jQuery.fn.load = function(url, params, callback) {
            var selector, type, response, self = this, off = url.indexOf(" ");
            return off > -1 && (selector = stripAndCollapse(url.slice(off)), url = url.slice(0, off)), 
            jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
            self.length > 0 && jQuery.ajax({
                url: url,
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).always(callback && function(jqXHR, status) {
                self.each(function() {
                    callback.apply(this, response || [ jqXHR.responseText, status, jqXHR ]);
                });
            }), this;
        }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
            jQuery.fn[type] = function(fn) {
                return this.on(type, fn);
            };
        }), jQuery.expr.pseudos.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem;
            }).length;
        }, jQuery.offset = {
            setOffset: function(elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
                "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
                curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
                calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
                curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
                jQuery.isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))), 
                null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), 
                "using" in options ? options.using.call(elem, props) : curElem.css(props);
            }
        }, jQuery.fn.extend({
            offset: function(options) {
                if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
                var doc, docElem, rect, win, elem = this[0];
                if (elem) return elem.getClientRects().length ? (rect = elem.getBoundingClientRect(), 
                doc = elem.ownerDocument, docElem = doc.documentElement, win = doc.defaultView, 
                {
                    top: rect.top + win.pageYOffset - docElem.clientTop,
                    left: rect.left + win.pageXOffset - docElem.clientLeft
                }) : {
                    top: 0,
                    left: 0
                };
            },
            position: function() {
                if (this[0]) {
                    var offsetParent, offset, elem = this[0], parentOffset = {
                        top: 0,
                        left: 0
                    };
                    return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                    offset = this.offset(), nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                    parentOffset = {
                        top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", !0),
                        left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", !0)
                    }), {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                    };
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var offsetParent = this.offsetParent; offsetParent && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                    return offsetParent || documentElement;
                });
            }
        }), jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function(val) {
                return access(this, function(elem, method, val) {
                    var win;
                    return jQuery.isWindow(elem) ? win = elem : 9 === elem.nodeType && (win = elem.defaultView), 
                    void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset) : elem[method] = val);
                }, method, val, arguments.length);
            };
        }), jQuery.each([ "top", "left" ], function(i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            });
        }), jQuery.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                    return access(this, function(elem, type, value) {
                        var doc;
                        return jQuery.isWindow(elem) ? 0 === funcName.indexOf("outer") ? elem["inner" + name] : elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                        Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : void 0, chainable);
                };
            });
        }), jQuery.fn.extend({
            bind: function(types, data, fn) {
                return this.on(types, null, data, fn);
            },
            unbind: function(types, fn) {
                return this.off(types, null, fn);
            },
            delegate: function(selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function(selector, types, fn) {
                return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
            }
        }), jQuery.holdReady = function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        }, jQuery.isArray = Array.isArray, jQuery.parseJSON = JSON.parse, jQuery.nodeName = nodeName, 
        __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return jQuery;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        var _jQuery = window.jQuery, _$ = window.$;
        return jQuery.noConflict = function(deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
            jQuery;
        }, noGlobal || (window.jQuery = window.$ = jQuery), jQuery;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _selectComponent = __webpack_require__(51), _selectComponent2 = _interopRequireDefault(_selectComponent);
    exports["default"] = angular.module("tw.styleguide.forms.select", []).component("twSelect", _selectComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _currencyService = __webpack_require__(77), _currencyService2 = _interopRequireDefault(_currencyService);
    exports["default"] = angular.module("tw.styleguide.services.currency", []).service("TwCurrencyService", _currencyService2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dateService = __webpack_require__(78), _dateService2 = _interopRequireDefault(_dateService);
    exports["default"] = angular.module("tw.styleguide.services.date", []).service("TwDateService", _dateService2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwTextFormatService() {
        function positionIsSeparator(pattern, position) {
            return pattern[position] && "*" !== pattern[position];
        }
        var _this = this;
        this.formatUsingPattern = function(value, pattern) {
            if (value || (value = ""), "string" != typeof pattern) return value;
            for (var newValue = "", separators = 0, charactersToAllocate = value.length, position = 0; charactersToAllocate; ) positionIsSeparator(pattern, position) ? (newValue += pattern[position], 
            separators++) : (newValue += value[position - separators], charactersToAllocate--), 
            position++;
            var separatorsAfterCursor = _this.countSeparatorsAfterCursor(pattern, position);
            return separatorsAfterCursor && (newValue += pattern.substr(position, separatorsAfterCursor)), 
            newValue;
        }, this.unformatUsingPattern = function(value, pattern) {
            if (!value) return "";
            if ("string" != typeof pattern) return value;
            for (var i = 0; i < pattern.length; i++) if (positionIsSeparator(pattern, i)) for (;value.indexOf(pattern[i]) >= 0; ) value = value.replace(pattern[i], "");
            return value;
        }, this.reformatUsingPattern = function(value, newPattern, oldPattern) {
            return "undefined" == typeof oldPattern && (oldPattern = newPattern), _this.formatUsingPattern(_this.unformatUsingPattern(value, oldPattern), newPattern);
        }, this.countSeparatorsBeforeCursor = function(pattern, position) {
            for (var separators = 0; positionIsSeparator(pattern, position - separators - 1); ) separators++;
            return separators;
        }, this.countSeparatorsAfterCursor = function(pattern, position) {
            for (var separators = 0; positionIsSeparator(pattern, position + separators); ) separators++;
            return separators;
        }, this.countSeparatorsInAppendedValue = function(pattern, position, value) {
            for (var separators = 0, i = 0, toAllocate = value.length; toAllocate; ) positionIsSeparator(pattern, position + i) ? separators++ : toAllocate--, 
            i++;
            return separators;
        }, this.countSeparatorsInPattern = function(pattern) {
            for (var separators = 0, i = 0; i < pattern.length; i++) positionIsSeparator(pattern, i) && separators++;
            return separators;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwTextFormatService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _checkboxComponent = __webpack_require__(30), _checkboxComponent2 = _interopRequireDefault(_checkboxComponent);
    exports["default"] = angular.module("tw.styleguide.forms.checkbox", []).component("twCheckbox", _checkboxComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dateComponent = __webpack_require__(38), _dateComponent2 = _interopRequireDefault(_dateComponent);
    exports["default"] = angular.module("tw.styleguide.forms.date", []).component("twDate", _dateComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _select = __webpack_require__(2), _radio = (_interopRequireDefault(_select), 
    __webpack_require__(10)), _checkbox = (_interopRequireDefault(_radio), __webpack_require__(6)), _date = (_interopRequireDefault(_checkbox), 
    __webpack_require__(7)), _upload = (_interopRequireDefault(_date), __webpack_require__(12)), _formControlComponent = (_interopRequireDefault(_upload), 
    __webpack_require__(40)), _formControlComponent2 = _interopRequireDefault(_formControlComponent);
    exports["default"] = angular.module("tw.styleguide.forms.form-control", []).component("twDynamicFormControl", _formControlComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dynamicFormControl = __webpack_require__(8), _fieldsetComponent = (_interopRequireDefault(_dynamicFormControl), 
    __webpack_require__(42)), _fieldsetComponent2 = _interopRequireDefault(_fieldsetComponent);
    exports["default"] = angular.module("tw.styleguide.forms.fieldset", []).component("twFieldset", _fieldsetComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _radioComponent = __webpack_require__(46), _radioComponent2 = _interopRequireDefault(_radioComponent);
    exports["default"] = angular.module("tw.styleguide.forms.radio", []).component("twRadio", _radioComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function RequirementsService() {
        function getFieldNamesFromRequirement(modelRequirement) {
            if (!modelRequirement.fields) return [];
            var names = modelRequirement.fields.map(function(fieldGroup) {
                return fieldGroup.group.map(function(field) {
                    return field.key;
                });
            });
            return Array.prototype.concat.apply([], names);
        }
        function prepType(type) {
            type.label || (type.label = getTabName(type.type));
        }
        function getTabName(tabType) {
            if (tabType && tabType.length > 0) {
                var tabNameWithSpaces = tabType.toLowerCase().split("_").join(" ");
                return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
            }
            return "";
        }
        var _this = this;
        this.cleanRequirementsModel = function(model, oldRequirements, newRequirements) {
            var oldFieldNames = getFieldNamesFromRequirement(oldRequirements), newFieldNames = getFieldNamesFromRequirement(newRequirements), obsoleteFieldNames = oldFieldNames.filter(function(fieldName) {
                return newFieldNames.indexOf(fieldName) < 0;
            });
            obsoleteFieldNames.forEach(function(fieldName) {
                delete model[fieldName];
            });
        }, this.cleanModel = function(model, oldRequirements, oldType, newRequirements, newType) {
            var oldRequirementType = _this.findRequirementByType(oldType, oldRequirements), newRequirementType = _this.findRequirementByType(newType, newRequirements);
            _this.cleanRequirementsModel(model, oldRequirementType, newRequirementType);
        }, this.findRequirementByType = function(type, requirements) {
            if (!requirements) return !1;
            for (var i = 0; i < requirements.length; i++) {
                var modelType = requirements[i];
                if (modelType.type === type) return modelType;
            }
            return !1;
        }, this.prepRequirements = function(types) {
            types.forEach(function(type) {
                prepType(type);
            });
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = RequirementsService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _uploadComponent = __webpack_require__(57), _uploadComponent2 = _interopRequireDefault(_uploadComponent), _fileInputDirective = __webpack_require__(56), _fileInputDirective2 = _interopRequireDefault(_fileInputDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload", []).directive("twFileInput", _fileInputDirective2["default"]).component("twUpload", _uploadComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwCardsService() {
        var expandedIndex = -1, cards = [];
        this.toggle = function(index) {
            expandedIndex !== -1 && expandedIndex !== index && (cards[expandedIndex].open = !1, 
            expandedIndex = -1), cards[index].open ? cards[index].open = !1 : (expandedIndex = index, 
            cards[index].open = !0);
        }, this.addCard = function(scope) {
            cards.push(scope);
        }, this.getExpandedIndex = function() {
            return expandedIndex;
        }, this.updateExpandedIndex = function(newExpandedIndex) {
            expandedIndex = newExpandedIndex;
        }, this.getCard = function(index) {
            return cards[index];
        }, this.getLength = function() {
            return cards.length;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwCardsService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _tabsComponent = __webpack_require__(75), _tabsComponent2 = _interopRequireDefault(_tabsComponent);
    exports["default"] = angular.module("tw.styleguide.navigation.tabs", []).component("twTabs", _tabsComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _textFormatDirective = __webpack_require__(24), _textFormatDirective2 = _interopRequireDefault(_textFormatDirective), _textFormatFilter = __webpack_require__(25), _textFormatFilter2 = _interopRequireDefault(_textFormatFilter);
    exports["default"] = _angular2["default"].module("tw.styleguide.formatting", [ _textFormatDirective2["default"], _textFormatFilter2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _checkbox = __webpack_require__(6), _checkbox2 = _interopRequireDefault(_checkbox), _radio = __webpack_require__(10), _radio2 = _interopRequireDefault(_radio), _select = __webpack_require__(2), _select2 = _interopRequireDefault(_select), _upload = __webpack_require__(12), _upload2 = _interopRequireDefault(_upload), _date = __webpack_require__(7), _date2 = _interopRequireDefault(_date), _dateLookup = __webpack_require__(37), _dateLookup2 = _interopRequireDefault(_dateLookup), _currencyInput = __webpack_require__(34), _currencyInput2 = _interopRequireDefault(_currencyInput), _amountCurrencySelect = __webpack_require__(29), _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect), _dynamicFormControl = __webpack_require__(8), _dynamicFormControl2 = _interopRequireDefault(_dynamicFormControl), _fieldset = __webpack_require__(9), _fieldset2 = _interopRequireDefault(_fieldset), _requirementsForm = __webpack_require__(48), _requirementsForm2 = _interopRequireDefault(_requirementsForm), _focusable = __webpack_require__(45), _focusable2 = _interopRequireDefault(_focusable), _uploadDroppable = __webpack_require__(54), _uploadDroppable2 = _interopRequireDefault(_uploadDroppable);
    exports["default"] = _angular2["default"].module("tw.styleguide.forms", [ _checkbox2["default"], _radio2["default"], _select2["default"], _upload2["default"], _date2["default"], _dateLookup2["default"], _currencyInput2["default"], _amountCurrencySelect2["default"], _dynamicFormControl2["default"], _fieldset2["default"], _requirementsForm2["default"], _focusable2["default"], _uploadDroppable2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _popOver = __webpack_require__(59), _popOver2 = _interopRequireDefault(_popOver), _toolTip = __webpack_require__(61), _toolTip2 = _interopRequireDefault(_toolTip);
    exports["default"] = _angular2["default"].module("tw.styleguide.help", [ _popOver2["default"], _toolTip2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _affix = __webpack_require__(65), _affix2 = _interopRequireDefault(_affix), _cards = __webpack_require__(69), _cards2 = _interopRequireDefault(_cards);
    exports["default"] = _angular2["default"].module("tw.styleguide.layout", [ _affix2["default"], _cards2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _loader = __webpack_require__(70), _loader2 = _interopRequireDefault(_loader), _process = __webpack_require__(72), _process2 = _interopRequireDefault(_process);
    exports["default"] = _angular2["default"].module("tw.styleguide.loading", [ _loader2["default"], _process2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _tabs = __webpack_require__(14), _tabs2 = _interopRequireDefault(_tabs);
    exports["default"] = _angular2["default"].module("tw.styleguide.navigation", [ _tabs2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _date = __webpack_require__(4), _date2 = _interopRequireDefault(_date), _currency = __webpack_require__(3), _currency2 = _interopRequireDefault(_currency);
    exports["default"] = _angular2["default"].module("tw.styleguide.services", [ _date2["default"], _currency2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _formValidation = __webpack_require__(84), _formValidation2 = _interopRequireDefault(_formValidation), _controlValidation = __webpack_require__(82), _controlValidation2 = _interopRequireDefault(_controlValidation), _asyncValidation = __webpack_require__(80), _asyncValidation2 = _interopRequireDefault(_asyncValidation);
    exports["default"] = _angular2["default"].module("tw.styleguide.validation", [ _formValidation2["default"], _controlValidation2["default"], _asyncValidation2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function removeCharacters(value, first, last) {
        return value.substring(0, first - 1) + value.substring(last - 1, value.length);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), TextFormatController = function() {
        function TextFormatController($element, $timeout, $scope, TwTextFormatService, TwUndoStackFactory) {
            var _this = this;
            _classCallCheck(this, TextFormatController), this.keydownCount = 0, this.pattern = "", 
            this.undoStack = TwUndoStackFactory["new"](), this.$ngModel = $element.controller("ngModel"), 
            this.$timeout = $timeout, this.TextFormatService = TwTextFormatService, this.element = $element[0], 
            this.$ngModel.$formatters.push(function(value) {
                return _this.TextFormatService.formatUsingPattern(value, _this.pattern);
            }), this.$ngModel.$parsers.push(function(value) {
                return _this.TextFormatService.unformatUsingPattern(value, _this.pattern);
            }), this.element.addEventListener("change", function(event) {
                _this.onChange(event);
            }), this.element.addEventListener("keydown", function(event) {
                _this.onKeydown(event);
            }), this.element.addEventListener("paste", function(event) {
                _this.onPaste(event);
            }), this.element.addEventListener("cut", function(event) {
                _this.onCut(event);
            }), this.element.addEventListener("copy", function(event) {
                _this.onCopy(event);
            }), this.replaceLengthValidators(this.$ngModel, this.TextFormatService, this.$timeout), 
            $scope.$watch("$ctrl.twTextFormat", function(newValue) {
                _this.onPatternChange(newValue);
            }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                _this.onModelChange(newValue, oldValue);
            }), this.undoStack.reset(this.element.value);
        }
        return _createClass(TextFormatController, [ {
            key: "onModelChange",
            value: function(newModel, oldModel) {
                if (newModel !== oldModel) {
                    var selectionStart = this.element.selectionStart, selectionEnd = this.element.selectionEnd;
                    this.reformatControl(this.element, newModel), this.setSelection(selectionStart, selectionEnd);
                }
            }
        }, {
            key: "onPatternChange",
            value: function(newPattern, oldPattern) {
                if (newPattern === oldPattern) return void (this.pattern = newPattern);
                newPattern && newPattern.indexOf("||") > 0 ? this.pattern = newPattern.substring(0, newPattern.indexOf("||")) : this.pattern = newPattern;
                var viewValue = this.element.value;
                oldPattern && (viewValue = this.TextFormatService.unformatUsingPattern(viewValue, oldPattern)), 
                newPattern && (viewValue = this.TextFormatService.formatUsingPattern(viewValue, this.pattern)), 
                this.undoStack.reset(viewValue), this.element.value = viewValue;
            }
        }, {
            key: "reformatControl",
            value: function(element, originalValue) {
                originalValue || (originalValue = element.value);
                var newValue = this.TextFormatService.reformatUsingPattern(originalValue, this.pattern);
                newValue !== originalValue && (element.value = newValue);
            }
        }, {
            key: "onChange",
            value: function() {
                this.reformatControl(this.element), this.undoStack.add(this.element.value);
            }
        }, {
            key: "onPaste",
            value: function(event) {
                var _this2 = this, selectionStart = this.element.selectionStart, clipboardData = event.clipboardData || window.clipboardData, pastedData = clipboardData.getData("Text"), separatorsInPaste = this.TextFormatService.countSeparatorsInAppendedValue(this.pattern, selectionStart, pastedData);
                this.$timeout(function() {
                    var newPosition = selectionStart + pastedData.length + separatorsInPaste;
                    _this2.reformatControl(_this2.element), _this2.undoStack.add(_this2.element.value), 
                    _this2.setSelection(newPosition, newPosition);
                });
            }
        }, {
            key: "onKeydown",
            value: function(event) {
                var _this3 = this;
                this.keydownCount++;
                var currentKeydownCount = this.keydownCount, key = event.keyCode || event.which, selectionStart = event.target.selectionStart, selectionEnd = event.target.selectionEnd;
                return reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey ? (key === keys.z && (event.metaKey || event.ctrlKey) && (event.preventDefault(), 
                event.stopPropagation(), this.element.value = this.undoStack.undo()), void (key === keys.y && (event.metaKey || event.ctrlKey) && (event.preventDefault(), 
                event.stopPropagation(), this.element.value = this.undoStack.redo()))) : void this.$timeout(function() {
                    _this3.afterKeydown(key, currentKeydownCount, _this3.element, _this3.pattern, selectionStart, selectionEnd);
                });
            }
        }, {
            key: "afterKeydown",
            value: function(key, currentKeydownCount, element, pattern, selectionStart, selectionEnd) {
                var newVal = void 0;
                key === keys.backspace ? (newVal = this.doBackspace(element, pattern, selectionStart, selectionEnd), 
                this.$ngModel.$setViewValue(newVal)) : key === keys["delete"] ? (newVal = this.doDelete(element, pattern, selectionStart, selectionEnd), 
                this.$ngModel.$setViewValue(newVal)) : this.keydownCount === currentKeydownCount && this.doKeypress(element, pattern, selectionStart, selectionEnd);
            }
        }, {
            key: "doBackspace",
            value: function(element, pattern, selectionStart, selectionEnd) {
                element.value = this.getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd), 
                this.undoStack.add(element.value);
                var newPosition = this.getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd);
                return this.setSelection(newPosition, newPosition), element.value;
            }
        }, {
            key: "getFormattedValueAfterBackspace",
            value: function(element, pattern, selectionStart, selectionEnd) {
                var removeStart = void 0, removeEnd = void 0, newVal = element.value, separatorsBeforeCursor = this.TextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart);
                if (separatorsBeforeCursor) {
                    var adjust = separatorsBeforeCursor > 1 ? 1 : 0;
                    selectionStart !== selectionEnd ? (removeStart = selectionStart - (separatorsBeforeCursor + 1), 
                    removeEnd = selectionStart - adjust) : (removeStart = selectionStart - separatorsBeforeCursor, 
                    removeEnd = selectionStart - adjust), newVal = removeCharacters(element.value, removeStart, removeEnd);
                }
                return this.TextFormatService.reformatUsingPattern(newVal, pattern);
            }
        }, {
            key: "doDelete",
            value: function(element, pattern, selectionStart, selectionEnd) {
                return element.value = this.getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd), 
                this.undoStack.add(element.value), this.setSelection(selectionStart, selectionStart), 
                element.value;
            }
        }, {
            key: "setSelection",
            value: function(start, end) {
                this.element.setSelectionRange(start, end);
            }
        }, {
            key: "getFormattedValueAfterDelete",
            value: function(element, pattern, selectionStart, selectionEnd) {
                var removeStart = void 0, removeEnd = void 0, newVal = element.value, separatorsAfterCursor = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart);
                if (separatorsAfterCursor) {
                    var adjust = separatorsAfterCursor > 1 ? 0 : 1;
                    selectionStart !== selectionEnd ? (removeStart = selectionStart + adjust, removeEnd = selectionStart + separatorsAfterCursor + adjust) : (removeStart = selectionStart + separatorsAfterCursor, 
                    removeEnd = selectionStart + separatorsAfterCursor + 1), newVal = removeCharacters(element.value, removeStart, removeEnd);
                }
                return this.TextFormatService.reformatUsingPattern(newVal, pattern);
            }
        }, {
            key: "doKeypress",
            value: function(element, pattern, selectionStart, selectionEnd) {
                this.reformatControl(element), this.undoStack.add(element.value);
                var newPosition = this.getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd);
                this.setSelection(newPosition, newPosition);
            }
        }, {
            key: "getPositionAfterBackspace",
            value: function(pattern, element, selectionStart, selectionEnd) {
                var separatorsBefore = this.TextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart), isRange = selectionStart !== selectionEnd, proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
                return proposedPosition + this.TextFormatService.countSeparatorsAfterCursor(pattern, proposedPosition);
            }
        }, {
            key: "getPositionAfterKeypress",
            value: function(pattern, element, selectionStart, selectionEnd) {
                var separatorsAfter = void 0;
                return selectionStart !== selectionEnd ? separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart) : (separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart), 
                0 === separatorsAfter && (separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart + 1))), 
                selectionStart + 1 + separatorsAfter;
            }
        }, {
            key: "onCut",
            value: function() {
                var _this4 = this, selectionStart = this.element.selectionStart;
                this.$timeout(function() {
                    _this4.reformatControl(_this4.element), _this4.undoStack.add(_this4.element.value);
                    var newPosition = selectionStart + _this4.TextFormatService.countSeparatorsAfterCursor(_this4.pattern, selectionStart);
                    _this4.setSelection(newPosition, newPosition);
                });
            }
        }, {
            key: "onCopy",
            value: function() {
                var _this5 = this, selectionStart = this.element.selectionStart, selectionEnd = this.element.selectionEnd;
                this.$timeout(function() {
                    _this5.setSelection(selectionStart, selectionEnd);
                });
            }
        }, {
            key: "replaceLengthValidators",
            value: function($ngModel, TextFormatService, $timeout) {
                var _this6 = this;
                $timeout(function() {
                    var originalMinLength = $ngModel.$validators.minlength, originalMaxLength = $ngModel.$validators.maxlength;
                    originalMinLength && ($ngModel.$validators.minlength = function(modelValue, viewValue) {
                        return originalMinLength(modelValue, TextFormatService.unformatUsingPattern(viewValue, _this6.pattern));
                    }), originalMaxLength && ($ngModel.$validators.maxlength = function(modelValue, viewValue) {
                        return originalMaxLength(modelValue, TextFormatService.unformatUsingPattern(viewValue, _this6.pattern));
                    });
                });
            }
        } ]), TextFormatController;
    }(), keys = {
        cmd: 224,
        cmdLeft: 91,
        cmdRight: 93,
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        ctrl: 17,
        alt: 18,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        "delete": 46,
        y: 89,
        z: 90
    }, reservedKeys = [ keys.cmd, keys.cmdLeft, keys.cmdRight, keys.enter, keys.shift, keys.ctrl, keys.alt, keys.left, keys.up, keys.right, keys.down ];
    TextFormatController.$inject = [ "$element", "$timeout", "$scope", "TwTextFormatService", "TwUndoStackFactory" ], 
    exports["default"] = TextFormatController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TextFormat() {
        return {
            restrict: "A",
            require: "ngModel",
            bindToController: !0,
            controllerAs: "$ctrl",
            scope: {
                ngModel: "<",
                twTextFormat: "@"
            },
            controller: _textFormatController2["default"]
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _textFormatController = __webpack_require__(23), _textFormatController2 = _interopRequireDefault(_textFormatController), _undoStackService = __webpack_require__(26), _undoStackService2 = _interopRequireDefault(_undoStackService), _textFormatService = __webpack_require__(5), _textFormatService2 = _interopRequireDefault(_textFormatService);
    exports["default"] = _angular2["default"].module("tw.styleguide.formatting.text-format", []).service("TwUndoStackFactory", _undoStackService2["default"]).service("TwTextFormatService", _textFormatService2["default"]).directive("twTextFormat", TextFormat).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TextFormatFilter(TwTextFormatService) {
        return function(input, pattern) {
            return input = input || "", pattern ? TwTextFormatService.formatUsingPattern(input, pattern) : input;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _textFormatService = __webpack_require__(5);
    _interopRequireDefault(_textFormatService);
    TextFormatFilter.$inject = [ "TwTextFormatService" ], exports["default"] = angular.module("tw.styleguide.formatting.text-format").filter("twTextFormat", TextFormatFilter).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwUndoStackFactory() {
        this["new"] = function() {
            return new UndoStack();
        };
    }
    function UndoStack() {
        var pointer = 0, stack = [];
        this.reset = function(value) {
            stack = [ value ], pointer = 0;
        }, this.add = function(value) {
            stack.length - 1 > pointer && (stack = stack.slice(0, pointer + 1)), stack[pointer] !== value && (stack.push(value), 
            pointer++);
        }, this.undo = function() {
            return pointer >= 0 && "undefined" != typeof stack[pointer - 1] && pointer--, stack[pointer];
        }, this.redo = function() {
            return pointer < stack.length && "undefined" != typeof stack[pointer + 1] && pointer++, 
            stack[pointer];
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwUndoStackFactory;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _amountCurrencySelectController = __webpack_require__(28), _amountCurrencySelectController2 = _interopRequireDefault(_amountCurrencySelectController), _amountCurrencySelect = __webpack_require__(85), _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect), AmountCurrencySelect = {
        controller: _amountCurrencySelectController2["default"],
        template: _amountCurrencySelect2["default"],
        require: {
            $ngModel: "ngModel"
        },
        transclude: {
            addon: "?addon"
        },
        bindings: {
            ngModel: "=",
            ngMin: "<",
            ngMax: "<",
            ngRequired: "<",
            ngDisabled: "<",
            ngChange: "&",
            amountReadOnly: "<",
            onAmountChange: "&",
            currency: "=",
            currencies: "<",
            onCurrencyChange: "&",
            currencyFilterPlaceholder: "@",
            customActionLabel: "<",
            onCustomAction: "&",
            placeholder: "@",
            size: "@",
            locale: "@"
        }
    };
    exports["default"] = AmountCurrencySelect;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function isNumber(value) {
        return !isNaN(parseFloat(value));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _currency = __webpack_require__(3), _currency2 = _interopRequireDefault(_currency), AmountCurrencySelectController = function() {
        function AmountCurrencySelectController($element, $scope, $timeout, TwCurrencyService) {
            var _this = this;
            _classCallCheck(this, AmountCurrencySelectController);
            var $ngModel = $element.controller("ngModel");
            this.$timeout = $timeout, this.showDecimals = !0, this.CurrencyService = TwCurrencyService, 
            $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && $ngModel.$setDirty();
            }), $scope.$watch("$ctrl.currency", function(newValue, oldValue) {
                newValue && newValue !== oldValue && (_this.showDecimals = _this.CurrencyService.getDecimals(newValue) > 0);
            }), $element.find("input").on("blur", function() {
                $ngModel.$setTouched(), $element.triggerHandler("blur");
            }), $ngModel.$validators.min = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMin || null === _this.ngMin || !isNumber(viewValue) || viewValue >= _this.ngMin;
            }, $ngModel.$validators.max = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMax || null === _this.ngMax || !isNumber(viewValue) || viewValue <= _this.ngMax;
            }, $element[0].getAttribute("on-amount-change") && console && console.log && console.log("onAmountChange is deprecated in twAmountCurrencySelect, please use ngChange.");
        }
        return _createClass(AmountCurrencySelectController, [ {
            key: "changedAmount",
            value: function() {
                this.ngChange && this.$timeout(this.ngChange), this.onAmountChange && this.$timeout(this.onAmountChange);
            }
        }, {
            key: "changedCurrency",
            value: function() {
                this.onCurrencyChange && this.$timeout(this.onCurrencyChange);
            }
        }, {
            key: "customAction",
            value: function() {
                this.onCustomAction && this.onCustomAction();
            }
        } ]), AmountCurrencySelectController;
    }();
    AmountCurrencySelectController.$inject = [ "$element", "$scope", "$timeout", _currency2["default"] ], 
    exports["default"] = AmountCurrencySelectController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _select = __webpack_require__(2), _amountCurrencySelectComponent = (_interopRequireDefault(_select), 
    __webpack_require__(27)), _amountCurrencySelectComponent2 = _interopRequireDefault(_amountCurrencySelectComponent);
    exports["default"] = angular.module("tw.styleguide.forms.amount-currency-select", []).component("twAmountCurrencySelect", _amountCurrencySelectComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _checkboxController = __webpack_require__(31), _checkboxController2 = _interopRequireDefault(_checkboxController), _checkbox = __webpack_require__(86), _checkbox2 = _interopRequireDefault(_checkbox), Checkbox = {
        controller: _checkboxController2["default"],
        template: _checkbox2["default"],
        require: {
            $ngModel: "ngModel"
        },
        bindings: {
            name: "@",
            ngModel: "=",
            ngTrueValue: "<",
            ngFalseValue: "<",
            ngRequired: "<",
            ngDisabled: "<"
        }
    };
    exports["default"] = Checkbox;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function validateCheckbox(isChecked, $element, $ngModel, isRequired) {
        $ngModel.$touched && (!isChecked && isRequired ? ($ngModel.$setValidity("required", !1), 
        $element.find(".tw-checkbox-button").addClass("has-error"), $element.closest(".checkbox").addClass("has-error"), 
        $element.closest(".form-group").addClass("has-error")) : ($ngModel.$setValidity("required", !0), 
        $element.find(".tw-checkbox-button").removeClass("has-error"), $element.closest(".checkbox").removeClass("has-error"), 
        $element.closest(".form-group").removeClass("has-error")));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), CheckboxController = function() {
        function CheckboxController($scope, $element) {
            _classCallCheck(this, CheckboxController);
            var $ngModel = $element.controller("ngModel");
            this.$element = $element, this.checked = this.isChecked(), this.addLabelHandler(), 
            this.addWatchers($scope, $element, $ngModel);
        }
        return _createClass(CheckboxController, [ {
            key: "isChecked",
            value: function() {
                return this.ngTrueValue && this.ngTrueValue === this.ngModel || !this.ngTrueValue && this.ngModel || !1;
            }
        }, {
            key: "buttonClick",
            value: function($event) {
                this.checked ? (this.checked = !1, this.$ngModel.$setViewValue(this.ngFalseValue || !1)) : (this.checked = !0, 
                this.$ngModel.$setViewValue(this.ngTrueValue || !0)), this.$ngModel.$setTouched(), 
                $event && $event.stopPropagation(), validateCheckbox(this.checked, this.$element, this.$ngModel, this.ngRequired);
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.closest(".checkbox").find("label").addClass("focus"), this.$element.triggerHandler("focus");
            }
        }, {
            key: "buttonBlur",
            value: function() {
                this.$element.closest(".checkbox").find("label").removeClass("focus"), this.$element.triggerHandler("blur"), 
                this.$ngModel.$setTouched(), validateCheckbox(this.checked, this.$element, this.$ngModel, this.ngRequired);
            }
        }, {
            key: "hiddenClick",
            value: function($event) {
                $event.stopPropagation();
            }
        }, {
            key: "addLabelHandler",
            value: function() {
                var _this = this;
                this.$element.closest("label").on("click", function(event) {
                    _this.$element.find("button").trigger("click"), event.preventDefault(), event.stopPropagation();
                });
            }
        }, {
            key: "addWatchers",
            value: function($scope, $element, $ngModel) {
                var _this2 = this;
                $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                    newValue !== oldValue && ($ngModel.$setDirty(), validateCheckbox(_this2.checked, $element, $ngModel, _this2.ngRequired), 
                    _this2.checked = _this2.isChecked());
                }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                    newValue && !oldValue ? $element.closest(".checkbox").addClass("disabled").attr("disabled", !0) : !newValue && oldValue && $element.closest(".checkbox").removeClass("disabled").removeAttr("disabled");
                }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                    newValue !== oldValue && validateCheckbox(_this2.checked, $element, $ngModel, _this2.ngRequired);
                });
            }
        } ]), CheckboxController;
    }();
    CheckboxController.$inject = [ "$scope", "$element" ], exports["default"] = CheckboxController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _currencyInputController = __webpack_require__(33), _currencyInputController2 = _interopRequireDefault(_currencyInputController), _currencyInput = __webpack_require__(87), _currencyInput2 = _interopRequireDefault(_currencyInput), CurrencyInput = {
        controller: _currencyInputController2["default"],
        template: _currencyInput2["default"],
        require: {
            $ngModel: "ngModel"
        },
        transclude: {
            addon: "?addon"
        },
        bindings: {
            ngModel: "=",
            ngChange: "&",
            ngMin: "<",
            ngMax: "<",
            ngRequired: "<",
            ngDisabled: "<",
            currency: "=",
            currencyCode: "@",
            placeholder: "@",
            size: "@",
            locale: "@"
        }
    };
    exports["default"] = CurrencyInput;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function isNumber(value) {
        return !isNaN(parseFloat(value));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _currency = __webpack_require__(3), _currency2 = _interopRequireDefault(_currency), CurrencyInputController = function() {
        function CurrencyInputController($element, $scope, $timeout, TwCurrencyService) {
            var _this = this;
            _classCallCheck(this, CurrencyInputController);
            var $ngModel = $element.controller("ngModel");
            this.CurrencyService = TwCurrencyService, this.$timeout = $timeout, this.showDecimals = !0, 
            $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && $ngModel.$setDirty();
            }), $scope.$watch("$ctrl.currency", function(newValue, oldValue) {
                newValue !== oldValue && (_this.showDecimals = _this.CurrencyService.getDecimals(newValue) > 0);
            }), $element.find("input").on("blur", function() {
                $ngModel.$setTouched(), $element.triggerHandler("blur");
            }), $element[0].getAttribute("currency-code") && console && console.log && console.log("currency code is deprecated in twCurrencyInput, please use currency."), 
            $ngModel.$validators.min = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMin || null === _this.ngMin || !isNumber(viewValue) || viewValue >= _this.ngMin;
            }, $ngModel.$validators.max = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMax || null === _this.ngMax || !isNumber(viewValue) || viewValue <= _this.ngMax;
            };
        }
        return _createClass(CurrencyInputController, [ {
            key: "changedInputValue",
            value: function() {
                this.ngChange && this.$timeout(this.ngChange);
            }
        } ]), CurrencyInputController;
    }();
    CurrencyInputController.$inject = [ "$element", "$scope", "$timeout", _currency2["default"] ], 
    exports["default"] = CurrencyInputController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _currencyInputComponent = __webpack_require__(32), _currencyInputComponent2 = _interopRequireDefault(_currencyInputComponent);
    exports["default"] = angular.module("tw.styleguide.forms.currency-input", []).component("twCurrencyInput", _currencyInputComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dateLookupController = __webpack_require__(36), _dateLookupController2 = _interopRequireDefault(_dateLookupController), _dateLookup = __webpack_require__(88), _dateLookup2 = _interopRequireDefault(_dateLookup), DateLookup = {
        controller: _dateLookupController2["default"],
        template: _dateLookup2["default"],
        require: {
            $ngModel: "ngModel"
        },
        bindings: {
            ngModel: "=",
            ngChange: "&",
            ngMin: "=",
            ngMax: "=",
            ngRequired: "=",
            ngDisabled: "=",
            placeholder: "@",
            size: "@",
            locale: "@",
            label: "@",
            shortDate: "<"
        }
    };
    exports["default"] = DateLookup;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function resetFocus($element) {
        $element.find("button").focus();
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _jquery = __webpack_require__(1), _jquery2 = _interopRequireDefault(_jquery), _date = __webpack_require__(4), _date2 = _interopRequireDefault(_date), DateLookupController = function() {
        function DateLookupController($element, $scope, $timeout, TwDateService) {
            var _this = this;
            _classCallCheck(this, DateLookupController);
            var $ngModel = $element.controller("ngModel");
            this.DateService = TwDateService, this.$element = $element, this.$timeout = $timeout, 
            this.yearOffset = 0, this.addValidators($ngModel, $element), this.addWatchers($scope, $ngModel), 
            $ngModel.$formatters.push(function(newDate) {
                return _this.updateCalendarView(newDate), newDate;
            }), $element.find(".btn, .dropdown-menu").on("focusout", function() {
                $timeout(function() {
                    0 !== $element.find(".btn:focus").length || $element.find(".btn-group").hasClass("open") || ($element.parents(".form-group").removeClass("focus"), 
                    $element.triggerHandler("blur"));
                }, 150);
            }), this.setLocale(this.locale), this.updateMinDateView(this.ngMin), this.updateMaxDateView(this.ngMax);
        }
        return _createClass(DateLookupController, [ {
            key: "openLookup",
            value: function() {
                var _this2 = this;
                this.$ngModel.$setTouched(), this.mode = "day";
                var viewDate = this.ngModel;
                this.ngMin && this.ngModel < this.ngMin && (viewDate = this.ngMin), this.ngMax && this.ngModel > this.ngMax && (viewDate = this.ngMax), 
                this.updateCalendarView(viewDate), this.$timeout(function() {
                    _this2.$element.find(".tw-date-lookup-month-label").focus();
                });
            }
        }, {
            key: "selectDay",
            value: function($event, day, month, year) {
                return this.isDayDisabled(day, month, year) ? void $event.stopPropagation() : (this.day = day, 
                this.setModel(this.DateService.getUTCDateFromParts(year, month, day)), resetFocus(this.$element), 
                void this.updateCalendarDatePresentation());
            }
        }, {
            key: "selectMonth",
            value: function($event, month, year) {
                $event.stopPropagation(), this.isMonthDisabled(month, year) || (this.month = month, 
                this.weeks = this.getTableStructure(), this.mode = "day", this.updateCalendarDatePresentation());
            }
        }, {
            key: "selectYear",
            value: function($event, year) {
                $event.stopPropagation(), this.isYearDisabled(year) || (this.year = year, this.mode = "month", 
                this.updateCalendarDatePresentation());
            }
        }, {
            key: "monthBefore",
            value: function($event) {
                $event.stopPropagation(), 0 === this.month ? (this.year--, this.month = 11) : this.month--, 
                this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "yearBefore",
            value: function($event) {
                $event.stopPropagation(), this.year--, this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "monthAfter",
            value: function($event) {
                $event.stopPropagation(), 11 === this.month ? (this.year++, this.month = 0) : this.month++, 
                this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "yearAfter",
            value: function($event) {
                $event.stopPropagation(), this.year++, this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "isCurrentlySelected",
            value: function(day, month, year) {
                return day === this.selectedDate && month === this.selectedMonth && year === this.selectedYear;
            }
        }, {
            key: "isDayDisabled",
            value: function(day, month, year) {
                return this.isYearDisabled(year) || this.isMonthDisabled(month, year) || year === this.minYear && month === this.minMonth && day < this.minDay || year === this.maxYear && month === this.maxMonth && day > this.maxDay;
            }
        }, {
            key: "isMonthDisabled",
            value: function(month, year) {
                return this.isYearDisabled(year) || year === this.minYear && month < this.minMonth || year === this.maxYear && month > this.maxMonth;
            }
        }, {
            key: "isYearDisabled",
            value: function(year) {
                return this.minYear && year < this.minYear || this.maxYear && year > this.maxYear;
            }
        }, {
            key: "switchToMonths",
            value: function($event) {
                resetFocus((0, _jquery2["default"])($event.target)), this.findActiveLink(), $event.stopPropagation(), 
                this.mode = "month";
            }
        }, {
            key: "switchToYears",
            value: function($event) {
                resetFocus((0, _jquery2["default"])($event.target)), this.findActiveLink(), $event.stopPropagation(), 
                this.mode = "year";
            }
        }, {
            key: "setYearOffset",
            value: function($event, addtionalOffset) {
                $event.stopPropagation(), this.yearOffset += addtionalOffset;
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.parents(".form-group").addClass("focus"), this.$element.triggerHandler("focus");
            }
        }, {
            key: "blur",
            value: function() {
                this.$element.triggerHandler("focus");
            }
        }, {
            key: "addValidators",
            value: function($ngModel, $element) {
                var _this3 = this;
                $ngModel.$validators.min = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return !(value && value < _this3.ngMin) || ($element.parents(".form-group").addClass("has-error"), 
                    !1);
                }, $ngModel.$validators.max = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return !(value && value > _this3.ngMax) || ($element.parents(".form-group").addClass("has-error"), 
                    !1);
                };
            }
        }, {
            key: "addWatchers",
            value: function($scope, $ngModel) {
                var _this4 = this;
                $scope.$watch("$ctrl.locale", function(newValue, oldValue) {
                    newValue && newValue !== oldValue && _this4.setLocale(newValue);
                }), $scope.$watch("$ctrl.ngRequired", function() {
                    $ngModel.$validate();
                }), $scope.$watch("$ctrl.ngMin", function(newValue, oldValue) {
                    newValue !== oldValue && (_this4.updateMinDateView(_this4.ngMin), $ngModel.$validate());
                }), $scope.$watch("$ctrl.shortDate", function() {
                    _this4.updateSelectedDatePresentation();
                }), $scope.$watch("$ctrl.ngMax", function(newValue, oldValue) {
                    newValue !== oldValue && (_this4.updateMaxDateView(_this4.ngMax), $ngModel.$validate());
                }), $scope.$watch("$ctrl.ngModel", function(newValue) {
                    newValue && (_this4.selectedDate = _this4.DateService.getUTCDate(newValue), _this4.selectedMonth = _this4.DateService.getUTCMonth(newValue), 
                    _this4.selectedYear = _this4.DateService.getUTCFullYear(newValue), _this4.updateSelectedDatePresentation());
                });
            }
        }, {
            key: "updateCalendarView",
            value: function(viewDate) {
                viewDate && viewDate.getUTCDate || (viewDate = this.DateService.getLocaleToday()), 
                this.day = this.DateService.getUTCDate(viewDate), this.month = this.DateService.getUTCMonth(viewDate), 
                this.year = this.DateService.getUTCFullYear(viewDate), this.weeks = this.getTableStructure(), 
                this.updateCalendarDatePresentation();
            }
        }, {
            key: "getTableStructure",
            value: function() {
                var firstDayOfMonth = this.DateService.getWeekday(this.year, this.month, 1);
                0 === firstDayOfMonth && (firstDayOfMonth = 7);
                var daysInMonth = this.DateService.getLastDayOfMonth(this.year, this.month), week = [], weeks = [], i = void 0;
                for (i = 1; i < firstDayOfMonth; i++) week.push(!1);
                for (i = 1; i <= daysInMonth; i++) week.push(i), (firstDayOfMonth + i - 1) % 7 === 0 && (weeks.push(week), 
                week = []);
                if (week.length) {
                    for (i = week.length; i < 7; i++) week.push(!1);
                    weeks.push(week);
                }
                return weeks;
            }
        }, {
            key: "setLocale",
            value: function(locale) {
                locale || (this.locale = "en-GB"), this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale), 
                this.monthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, "long"), 
                this.shortMonthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, "short"), 
                this.daysOfWeek = this.DateService.getDayNamesForLocale(this.locale, "short"), this.shortDaysOfWeek = this.DateService.getDayNamesForLocale(this.locale, "narrow"), 
                this.updateSelectedDatePresentation();
            }
        }, {
            key: "updateSelectedDatePresentation",
            value: function() {
                var monthsOfYear = this.shortDate ? this.shortMonthsOfYear : this.monthsOfYear;
                this.selectedDateFormatted = this.DateService.getYearMonthDatePresentation(this.selectedYear, monthsOfYear[this.selectedMonth], this.selectedDate, this.locale);
            }
        }, {
            key: "updateCalendarDatePresentation",
            value: function() {
                this.yearMonthFormatted = this.DateService.getYearAndMonthPresentation(this.year, this.monthsOfYear[this.month], this.locale);
            }
        }, {
            key: "moveDateToWithinRange",
            value: function(date, min, max) {
                return date || (date = this.DateService.getLocaleToday()), min && min > date ? min : max && max < date ? max : date;
            }
        }, {
            key: "setModel",
            value: function(modelDate) {
                modelDate = this.moveDateToWithinRange(modelDate, this.ngMin, this.ngMax), this.$ngModel.$setViewValue(modelDate), 
                this.$ngModel.$setDirty(), this.updateCalendarView(modelDate);
            }
        }, {
            key: "updateMinDateView",
            value: function(minDate) {
                minDate && minDate.getUTCDate ? (this.minDay = this.DateService.getUTCDate(minDate), 
                this.minMonth = this.DateService.getUTCMonth(minDate), this.minYear = this.DateService.getUTCFullYear(minDate)) : (this.minDay = null, 
                this.minMonth = null, this.minYear = null);
            }
        }, {
            key: "updateMaxDateView",
            value: function(maxDate) {
                maxDate && maxDate.getUTCDate ? (this.maxDay = this.DateService.getUTCDate(maxDate), 
                this.maxMonth = this.DateService.getUTCMonth(maxDate), this.maxYear = this.DateService.getUTCFullYear(maxDate)) : (this.maxDay = null, 
                this.maxMonth = null, this.maxYear = null);
            }
        }, {
            key: "keyHandler",
            value: function(event) {
                if (!this.ngModel) {
                    var newDate = this.DateService.getUTCDateFromParts(this.year, this.month, this.day);
                    return void this.setModel(newDate);
                }
                var characterCode = event.which || event.charCode || event.keyCode;
                37 === characterCode ? this.adjustDate(this.mode, this.ngModel, -1, -1, -1) : 38 === characterCode ? (event.preventDefault(), 
                this.adjustDate(this.mode, this.ngModel, -7, -4, -4)) : 39 === characterCode ? this.adjustDate(this.mode, this.ngModel, 1, 1, 1) : 40 === characterCode && (event.preventDefault(), 
                this.adjustDate(this.mode, this.ngModel, 7, 4, 4)), this.findActiveLink();
            }
        }, {
            key: "findActiveLink",
            value: function() {
                var _this5 = this;
                this.$timeout(function() {
                    _this5.$element.find("a.active").focus();
                });
            }
        }, {
            key: "adjustDate",
            value: function(mode, date, days, months, years) {
                var newDate = date;
                "day" === mode && (newDate = this.DateService.addDays(date, days)), "month" === mode && (newDate = this.DateService.addMonths(date, months)), 
                "year" === mode && (newDate = this.DateService.addYears(date, years)), this.setModel(newDate);
            }
        } ]), DateLookupController;
    }();
    DateLookupController.$inject = [ "$element", "$scope", "$timeout", _date2["default"] ], 
    exports["default"] = DateLookupController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dateLookupComponent = __webpack_require__(35), _dateLookupComponent2 = _interopRequireDefault(_dateLookupComponent);
    exports["default"] = angular.module("tw.styleguide.forms.date-lookup", []).component("twDateLookup", _dateLookupComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dateController = __webpack_require__(39), _dateController2 = _interopRequireDefault(_dateController), _date = __webpack_require__(89), _date2 = _interopRequireDefault(_date), DateControl = {
        controller: _dateController2["default"],
        template: _date2["default"],
        require: {
            $ngModel: "ngModel"
        },
        bindings: {
            ngModel: "=",
            required: "@",
            ngRequired: "<",
            disabled: "@",
            ngDisabled: "<",
            locale: "@",
            twLocale: "<",
            min: "@",
            ngMin: "<",
            max: "@",
            ngMax: "<",
            modelType: "@"
        }
    };
    exports["default"] = DateControl;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function isNumber(value) {
        return "number" == typeof value;
    }
    function isNumericString(value) {
        return "string" == typeof value && !isNaN(Number(value));
    }
    function isExplodedDatePatternCorrect(year, month, day) {
        return isNumber(year) && isNumber(day) && (isNumber(month) || isNumericString(month));
    }
    function validDate(date) {
        return validDateObject(date) || validDateString(date);
    }
    function validDateObject(dateObj) {
        return "[object Date]" === Object.prototype.toString.call(dateObj) && !isNaN(dateObj.getTime());
    }
    function validDateString(dateString) {
        return "string" == typeof dateString && validDateObject(new Date(dateString));
    }
    function prepDateLimitForComparison(ngLimit, attrLimit) {
        var limit = ngLimit ? ngLimit : attrLimit;
        return !!limit && (limit = "string" == typeof limit ? new Date(limit) : limit, !!validDateObject(limit) && limit);
    }
    function prepDateValueForComparison(dateValue) {
        return "string" == typeof dateValue ? new Date(dateValue) : dateValue;
    }
    function extendMonthsWithIds(monthNames) {
        return monthNames.map(function(monthName, index) {
            return {
                value: index,
                label: monthName
            };
        });
    }
    function addBlurHandlers($element, $ngModel) {
        var dayTouched = void 0, yearTouched = void 0;
        $element.find("input[name=day]").on("blur", function() {
            dayTouched = !0, dayTouched && yearTouched && ($ngModel.$setTouched(), $element.triggerHandler("blur"));
        }), $element.find("input[name=year]").on("blur", function() {
            yearTouched = !0, $ngModel.$setTouched(), $element.triggerHandler("blur");
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _date = __webpack_require__(4), _date2 = _interopRequireDefault(_date), DateController = function() {
        function DateController($element, $log, $scope, TwDateService) {
            _classCallCheck(this, DateController);
            var $ngModel = $element.controller("ngModel");
            if (this.DateService = TwDateService, this.initialisedWithDate = !1, this.ngModel) this.applyDateModelIfValidOrThrowError(), 
            this.initialisedWithDate = !0; else {
                if (this.modelType) {
                    if (this.modelType !== STRING_TYPE && this.modelType !== OBJECT_TYPE) throw new Error("Invalid modelType, should be " + STRING_TYPE + " or " + OBJECT_TYPE);
                    this.dateModelType = this.modelType;
                } else this.dateModelType = OBJECT_TYPE;
                this.day = null, this.month = 0, this.year = null;
            }
            this.setDateRequired(), this.setDateDisabled(), this.setDateLocale(), this.setMonths(), 
            this.addValidators($ngModel), this.addWatchers($scope, $ngModel), addBlurHandlers($element, $ngModel);
        }
        return _createClass(DateController, [ {
            key: "applyDateModelIfValidOrThrowError",
            value: function() {
                if (!validDate(this.ngModel)) throw new Error("date model passed should either be instance of Date or valid ISO8601 string");
                this.dateModelType = "string" == typeof this.ngModel ? STRING_TYPE : OBJECT_TYPE, 
                this.explodeDateModel(this.ngModel);
            }
        }, {
            key: "setMonths",
            value: function() {
                this.dateMonths = this.getMonthsBasedOnIntlSupportForLocale();
            }
        }, {
            key: "setDateRequired",
            value: function() {
                this.dateRequired = void 0 !== this.ngRequired ? this.ngRequired : void 0 !== this.required;
            }
        }, {
            key: "setDateDisabled",
            value: function() {
                this.dateDisabled = void 0 !== this.ngDisabled ? this.ngDisabled : void 0 !== this.disabled;
            }
        }, {
            key: "setDateLocale",
            value: function() {
                this.locale || (this.locale = DEFAULT_LOCALE_EN), this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale);
            }
        }, {
            key: "explodeDateModel",
            value: function(date) {
                var dateObj = "string" == typeof date ? new Date(date) : date;
                this.day = dateObj.getUTCDate(), this.month = dateObj.getUTCMonth(), this.year = dateObj.getUTCFullYear();
            }
        }, {
            key: "addValidators",
            value: function($ngModel) {
                var _this = this;
                $ngModel.$validators.min = function(value) {
                    var limit = prepDateLimitForComparison(_this.ngMin, _this.min), dateValue = prepDateValueForComparison(value);
                    return !limit || !dateValue || dateValue >= limit;
                }, $ngModel.$validators.max = function(value) {
                    var limit = prepDateLimitForComparison(_this.ngMax, _this.max), dateValue = prepDateValueForComparison(value);
                    return !limit || !dateValue || dateValue <= limit;
                };
            }
        }, {
            key: "addWatchers",
            value: function($scope, $ngModel) {
                var _this2 = this;
                $scope.$watch("$ctrl.day", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.initialisedWithDate && $ngModel.$setDirty();
                }), $scope.$watch("$ctrl.month", function(newValue, oldValue) {
                    newValue !== oldValue && (_this2.adjustLastDay(), $ngModel.$setTouched(), _this2.initialisedWithDate && $ngModel.$setDirty());
                }), $scope.$watch("$ctrl.year", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.initialisedWithDate && $ngModel.$setDirty();
                }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                    newValue !== oldValue && validDate(_this2.ngModel) && ($ngModel.$setDirty(), _this2.explodeDateModel(_this2.ngModel));
                }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.setDateRequired();
                }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.setDateDisabled();
                }), $scope.$watch("$ctrl.locale", function(newValue, oldValue) {
                    newValue !== oldValue && (_this2.setDateLocale(), _this2.setMonths());
                });
            }
        }, {
            key: "getMonthsBasedOnIntlSupportForLocale",
            value: function() {
                var monthNames = this.DateService.getMonthNamesForLocale(this.locale);
                return extendMonthsWithIds(monthNames);
            }
        }, {
            key: "combineDate",
            value: function() {
                return this.DateService.getUTCDateFromParts(Number(this.year), Number(this.month), Number(this.day));
            }
        }, {
            key: "updateDateModelAndValidationClasses",
            value: function() {
                if (this.adjustLastDay(), !isExplodedDatePatternCorrect(this.year, this.month, this.day)) return void this.$ngModel.$setViewValue(null);
                var dateObj = this.combineDate();
                if (this.dateModelType === STRING_TYPE) {
                    var isoString = dateObj.toISOString(), dateString = isoString.substring(0, isoString.indexOf("T"));
                    this.$ngModel.$setViewValue(dateString);
                } else this.$ngModel.$setViewValue(dateObj);
            }
        }, {
            key: "adjustLastDay",
            value: function() {
                var day = Number(this.day), month = Number(this.month), year = Number(this.year), lastUTCDayForMonthAndYear = this.DateService.getLastDayOfMonth(year, month);
                day > lastUTCDayForMonthAndYear && (this.day = parseInt(lastUTCDayForMonthAndYear, 10));
            }
        } ]), DateController;
    }(), DEFAULT_LOCALE_EN = "en", STRING_TYPE = "string", OBJECT_TYPE = "object";
    DateController.$inject = [ "$element", "$log", "$scope", _date2["default"] ], exports["default"] = DateController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _formControlController = __webpack_require__(41), _formControlController2 = _interopRequireDefault(_formControlController), _formControl = __webpack_require__(90), _formControl2 = _interopRequireDefault(_formControl), FormControl = {
        controller: _formControlController2["default"],
        template: _formControl2["default"],
        require: {
            $ngModel: "ngModel"
        },
        transclude: !0,
        bindings: {
            type: "@",
            name: "@",
            id: "@",
            label: "@",
            placeholder: "@",
            helpText: "@",
            step: "@",
            locale: "@",
            uploadAccept: "@",
            uploadIcon: "@",
            uploadTooLargeMessage: "@",
            options: "<",
            ngModel: "=",
            ngChange: "&",
            ngRequired: "<",
            ngDisabled: "<",
            ngMinlength: "<twMinlength",
            ngMaxlength: "<twMaxlength",
            ngMin: "<",
            ngMax: "<",
            ngPattern: "<",
            uploadOptions: "<",
            textFormat: "<"
        }
    };
    exports["default"] = FormControl;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), FormControlController = function() {
        function FormControlController($element) {
            var _this = this;
            _classCallCheck(this, FormControlController);
            var $ngModel = $element.controller("ngModel");
            this.$element = $element, $ngModel.$validators.minlength = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "text" !== _this.type || !_this.ngMinlength || (!value || value.length >= _this.ngMinlength);
            }, $ngModel.$validators.maxlength = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "text" !== _this.type || !_this.ngMaxlength || (!value || value.length <= _this.ngMaxlength);
            }, $ngModel.$validators.min = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "undefined" == typeof _this.ngMin || !("number" == typeof value && "number" == typeof _this.ngMin && value < _this.ngMin) && !(value && value.getUTCDate && _this.ngMin.getUTCDate && value < _this.ngMin);
            }, $ngModel.$validators.max = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "undefined" == typeof _this.ngMax || !("number" == typeof value && "number" == typeof _this.ngMax && value > _this.ngMax) && !(value && viewValue.getUTCDate && _this.ngMax.getUTCDate && value > _this.ngMax);
            };
        }
        return _createClass(FormControlController, [ {
            key: "change",
            value: function() {
                this.$ngModel.$setDirty(), this.ngChange && this.ngChange();
            }
        }, {
            key: "focus",
            value: function() {
                this.$element.triggerHandler("focus");
            }
        }, {
            key: "blur",
            value: function() {
                this.$ngModel.$setTouched(), this.$element.triggerHandler("blur");
            }
        } ]), FormControlController;
    }();
    FormControlController.$inject = [ "$element" ], exports["default"] = FormControlController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _fieldsetController = __webpack_require__(43), _fieldsetController2 = _interopRequireDefault(_fieldsetController), _fieldset = __webpack_require__(91), _fieldset2 = _interopRequireDefault(_fieldset), Fieldset = {
        controller: _fieldsetController2["default"],
        template: _fieldset2["default"],
        bindings: {
            legend: "@",
            model: "=",
            fields: "<",
            uploadOptions: "<",
            locale: "@",
            onRefreshRequirements: "&",
            validationMessages: "<",
            errorMessages: "<",
            isValid: "=?"
        }
    };
    exports["default"] = Fieldset;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function prepFields(fields, model) {
        fields.forEach(function(fieldGroup) {
            fieldGroup.group.length && (fieldGroup.key = fieldGroup.group[0].key), fieldGroup.group.forEach(function(field) {
                "upload" === field.type && (fieldGroup.type = "upload"), prepRegExp(field), prepValuesAsync(field, model), 
                prepValuesAllowed(field);
            });
        });
    }
    function prepRegExp(field) {
        if (field.validationRegexp) try {
            field.validationRegexp = new RegExp(field.validationRegexp);
        } catch (ex) {
            console.log("API regexp is invalid"), field.validationRegexp = !1;
        } else field.validationRegexp = !1;
    }
    function prepValuesAsync(field, model) {
        if (field.valuesAsync) {
            var postData = {};
            field.valuesAsync.params && field.valuesAsync.params.length && (postData = getParamValuesFromModel(model, field.valuesAsync.params)), 
            this.$http.post(field.valuesAsync.url, postData).then(function(response) {
                field.valuesAllowed = response.data, prepValuesAllowed(field);
            })["catch"](function() {});
        }
    }
    function prepValuesAllowed(field) {
        _angular2["default"].isArray(field.valuesAllowed) && field.valuesAllowed.forEach(function(valueAllowed) {
            valueAllowed.value = valueAllowed.key, valueAllowed.label = valueAllowed.name;
        });
    }
    function getParamValuesFromModel(model, params) {
        var data = {};
        return params.forEach(function(param) {
            model[param.key] ? data[param.parameterName] = model[param.key] : param.required;
        }), data;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), FieldsetController = function() {
        function FieldsetController($scope, $http) {
            var _this = this;
            _classCallCheck(this, FieldsetController), this.$http = $http, this.model || (this.model = {}), 
            this.fields && prepFields(this.fields, this.model), $scope.$watch("$ctrl.fields", function(newValue, oldValue) {
                _angular2["default"].equals(newValue, oldValue) || prepFields(_this.fields, _this.model);
            }), $scope.$watch("twFieldset.$valid", function(validity) {
                _this.isValid = validity;
            }), this.validationMessages || (this.validationMessages = {
                required: "Required",
                pattern: "Incorrect format",
                min: "The value is too low",
                max: "The value is too high",
                minlength: "The value is too short",
                maxlength: "The value is too long"
            });
        }
        return _createClass(FieldsetController, [ {
            key: "onBlur",
            value: function(field) {
                this.removeFieldError(field.key), !field.refreshRequirementsOnChange;
            }
        }, {
            key: "onChange",
            value: function(field) {
                this.removeFieldError(field.key);
            }
        }, {
            key: "removeFieldError",
            value: function(fieldKey) {
                this.errorMessages && delete this.errorMessages[fieldKey];
            }
        } ]), FieldsetController;
    }();
    FieldsetController.$inject = [ "$scope", "$http" ], exports["default"] = FieldsetController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function FormControlStyling() {
        return {
            restrict: "C",
            link: FocusableLink
        };
    }
    function Focusable() {
        return {
            restrict: "A",
            link: FocusableLink
        };
    }
    function FocusableLink(scope, element) {
        var formGroup = (0, _jquery2["default"])(element).closest(".form-group");
        (0, _jquery2["default"])(element).on("focus", function() {
            formGroup.addClass("focus");
        }).on("blur", function() {
            formGroup.removeClass("focus");
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _jquery = __webpack_require__(1), _jquery2 = _interopRequireDefault(_jquery);
    _angular2["default"].module("tw.styleguide.styling.default-focus", []).directive("formControl", FormControlStyling), 
    exports["default"] = Focusable;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _focusableDirective = __webpack_require__(44), _focusableDirective2 = _interopRequireDefault(_focusableDirective);
    exports["default"] = angular.module("tw.styleguide.forms.focusable", []).directive("twFocusable", _focusableDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _radioController = __webpack_require__(47), _radioController2 = _interopRequireDefault(_radioController), _radio = __webpack_require__(92), _radio2 = _interopRequireDefault(_radio), Radio = {
        controller: _radioController2["default"],
        template: _radio2["default"],
        require: {
            $ngModel: "ngModel"
        },
        bindings: {
            name: "@",
            value: "@",
            ngModel: "=",
            ngValue: "<",
            ngRequired: "<",
            ngDisabled: "<",
            ngChange: "&"
        }
    };
    exports["default"] = Radio;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), RadioController = function() {
        function RadioController($scope, $element) {
            _classCallCheck(this, RadioController);
            var $ngModel = $element.controller("ngModel");
            this.$element = $element, this.checked = this.isChecked(), $element.on("blur", function() {
                $ngModel.$setTouched();
            }), this.addWatchers($scope, $element);
        }
        return _createClass(RadioController, [ {
            key: "isChecked",
            value: function() {
                return this.ngValue && this.ngModel === this.ngValue || this.value === this.ngModel;
            }
        }, {
            key: "buttonClick",
            value: function() {
                this.ngDisabled || (this.checked = !0, this.$ngModel.$setViewValue(this.ngValue || this.value));
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.closest("label").addClass("focus"), this.$element.triggerHandler("focus");
            }
        }, {
            key: "buttonBlur",
            value: function() {
                this.$element.closest("label").removeClass("focus"), this.$element.triggerHandler("blur");
            }
        }, {
            key: "hiddenInputChange",
            value: function() {
                this.ngChange && this.ngChange();
            }
        }, {
            key: "addWatchers",
            value: function($scope, $element) {
                var _this = this;
                $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                    newValue !== oldValue && _this.$ngModel.$setDirty(), _this.checked = _this.isChecked();
                }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                    newValue && !oldValue ? $element.closest(".radio").addClass("disabled").attr("disabled", !0) : !newValue && oldValue && $element.closest(".radio").removeClass("disabled").removeAttr("disabled");
                });
            }
        } ]), RadioController;
    }();
    RadioController.$inject = [ "$scope", "$element" ], exports["default"] = RadioController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _requirementsService = __webpack_require__(11), _requirementsService2 = _interopRequireDefault(_requirementsService), _requirementsFormComponent = __webpack_require__(49), _requirementsFormComponent2 = _interopRequireDefault(_requirementsFormComponent), _tabs = __webpack_require__(14), _fieldset = (_interopRequireDefault(_tabs), 
    __webpack_require__(9));
    _interopRequireDefault(_fieldset);
    exports["default"] = angular.module("tw.styleguide.forms.requirements-form", []).service("TwRequirementsService", _requirementsService2["default"]).component("twRequirementsForm", _requirementsFormComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _requirementsFormController = __webpack_require__(50), _requirementsFormController2 = _interopRequireDefault(_requirementsFormController), _requirementsForm = __webpack_require__(93), _requirementsForm2 = _interopRequireDefault(_requirementsForm), RequirementsForm = {
        controller: _requirementsFormController2["default"],
        template: _requirementsForm2["default"],
        bindings: {
            model: "=",
            requirements: "<",
            uploadOptions: "<",
            locale: "@",
            onRefreshRequirements: "&",
            validationMessages: "<",
            errorMessages: "<",
            isValid: "=?"
        }
    };
    exports["default"] = RequirementsForm;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _requirementsService = __webpack_require__(11), RequirementsFormController = (_interopRequireDefault(_requirementsService), 
    function() {
        function RequirementsFormController($scope, TwRequirementsService) {
            var _this = this;
            _classCallCheck(this, RequirementsFormController), this.RequirementsService = TwRequirementsService, 
            this.model || (this.model = {}), this.requirements && this.RequirementsService.prepRequirements(this.requirements), 
            $scope.$watch("$ctrl.requirements", function(newRequirements, oldRequirements) {
                if (!_angular2["default"].equals(newRequirements, oldRequirements)) {
                    _this.RequirementsService.prepRequirements(_this.requirements);
                    var oldType = _this.model.type, newType = _this.requirements.length ? _this.requirements[0].type : null;
                    _this.model.type = newType, oldRequirements && newRequirements && _this.RequirementsService.cleanModel(_this.model, oldRequirements, oldType, newRequirements, newType);
                }
            }), $scope.$watch("$ctrl.model.type", function(newType, oldType) {
                _this.switchTab(newType, oldType);
            }), $scope.$watch("twForm.$valid", function(validity) {
                _this.isValid = validity;
            });
        }
        return _createClass(RequirementsFormController, [ {
            key: "onBlur",
            value: function(field) {
                !field.refreshRequirementsOnChange;
            }
        }, {
            key: "switchTab",
            value: function(newType, oldType) {
                var oldRequirementType = this.RequirementsService.findRequirementByType(oldType, this.requirements), newRequirementType = this.RequirementsService.findRequirementByType(newType, this.requirements);
                oldRequirementType && newRequirementType || (this.model || (this.model = {}), this.model.type = newType), 
                this.RequirementsService.cleanRequirementsModel(this.model, oldRequirementType, newRequirementType);
            }
        } ]), RequirementsFormController;
    }());
    RequirementsFormController.$inject = [ "$scope", "TwRequirementsService" ], exports["default"] = RequirementsFormController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _selectController = __webpack_require__(52), _selectController2 = _interopRequireDefault(_selectController), _select = __webpack_require__(94), _select2 = _interopRequireDefault(_select), Select = {
        controller: _selectController2["default"],
        template: _select2["default"],
        require: "ngModel",
        transclude: !0,
        bindings: {
            ngModel: "=",
            ngRequired: "=",
            ngDisabled: "=",
            options: "=",
            name: "@",
            placeholder: "@",
            filter: "@",
            size: "@",
            dropdownRight: "@",
            dropdownUp: "@",
            dropdownWidth: "@",
            inverse: "=",
            hideNote: "@",
            hideSecondary: "@",
            hideIcon: "@",
            hideCurrency: "@",
            hideCircle: "@",
            hideLabel: "@"
        }
    };
    exports["default"] = Select;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function labelMatches(option, search) {
        return option.label && option.label.toLowerCase().search(search) >= 0;
    }
    function noteMatches(option, search) {
        return option.note && option.note.toLowerCase().search(search) >= 0;
    }
    function secondaryMatches(option, search) {
        return option.secondary && option.secondary.toLowerCase().search(search) >= 0;
    }
    function searchableMatches(option, search) {
        return option.searchable && option.searchable.toLowerCase().search(search) >= 0;
    }
    function addWatchers($ctrl, $scope, $ngModel, $element) {
        $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            (newValue || oldValue) && newValue !== oldValue && $ngModel.$setDirty(), modelChange(newValue, oldValue, $ctrl);
        }), $scope.$watch("$ctrl.options", function(newValue, oldValue) {
            newValue !== oldValue && (preSelectModelValue($ngModel, $ctrl), setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl), 
            $ctrl.filteredOptions = $ctrl.getFilteredOptions());
        });
    }
    function addEventHandlers($ctrl, $element, $ngModel, options, $timeout) {
        $element.find(".btn, .dropdown-menu").on("focusout", function() {
            $timeout(function() {
                0 !== $element.find(".btn:focus").length || $element.find(".btn-group").hasClass("open") || $element.trigger("blur");
            }, 150);
        }), $element.on("blur", function() {
            $ngModel.$setTouched();
        }), $element.find(".btn").on("keypress", function(event) {
            $ctrl.optionKeypress(event);
        }), $element.find(".btn").on("click", function() {
            $timeout(function() {
                $element.attr("filter") ? $element.find(".tw-select-filter").focus() : $element.find(".active a").focus();
            });
        }), $element.find("ul").on("keypress", "a", function(event) {
            $ctrl.optionKeypress(event);
        });
    }
    function checkForTranscludedContent($transclude, $ctrl) {
        $transclude(function(clone) {
            (clone.length > 1 || "" !== clone.text().trim()) && ($ctrl.hasTranscluded = !0);
        });
    }
    function getCharacterCodeFromKeypress(event) {
        return event.which || event.charCode || event.keyCode;
    }
    function getCharacterFromKeypress(event) {
        return String.fromCharCode(getCharacterCodeFromKeypress(event));
    }
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    function preSelectModelValue($ngModel, $ctrl) {
        if (isValidModel($ctrl.ngModel)) {
            var option = findOptionFromValue($ctrl.options, $ctrl.ngModel);
            selectOption($ngModel, $ctrl, option);
        }
    }
    function modelChange(newVal, oldVal, $ctrl) {
        if (newVal !== oldVal) {
            var option = findOptionFromValue($ctrl.options, newVal);
            option ? $ctrl.selected = option : $ctrl.selected = null;
        }
    }
    function findOptionFromValue(options, value) {
        var optionMatch = !1;
        return options.forEach(function(option) {
            _angular2["default"].equals(option.value, value) && (optionMatch = option);
        }), optionMatch;
    }
    function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
        if (($ctrl.ngRequired || $attrs.required) && !isValidModel($ctrl.ngModel) && !$ctrl.placeholder) for (var i = 0; i < $ctrl.options.length; i++) if (isValidModel($ctrl.options[i].value)) {
            selectOption($ngModel, $ctrl, $ctrl.options[i]);
            break;
        }
    }
    function selectOption($ngModel, $ctrl, option) {
        option.disabled || ($ngModel.$setViewValue(option.value), $ngModel.$commitViewValue(), 
        $ctrl.selected = option);
    }
    function findSelected(options, selected) {
        var selectedOption = void 0;
        return options.forEach(function(option) {
            selected && _angular2["default"].equals(selected.value, option.value) && (selectedOption = selected);
        }), selectedOption;
    }
    function resetOption($ngModel, $ctrl) {
        $ngModel.$setViewValue(null), $ngModel.$commitViewValue(), $ctrl.selected = !1;
    }
    function continueSearchAndSelectMatch($ngModel, $ctrl, options, letter) {
        var found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
        return found ? $ctrl.search += letter : ($ctrl.search = letter, found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search)), 
        found;
    }
    function searchAndSelect($ngModel, $ctrl, options, term) {
        var found = !1, searchTerm = term.toLowerCase();
        return options.forEach(function(option) {
            !found && option.label && (containsSearch(options.label, searchTerm) || containsSearch(options.note, searchTerm) || containsSearch(options.secondary, searchTerm) || containsSearch(options.searchable, searchTerm)) && (selectOption($ngModel, $ctrl, option), 
            found = !0);
        }), found;
    }
    function containsSearch(term, search) {
        return term && 0 === term.toLowerCase().indexOf(search);
    }
    function isValidModel(value) {
        return value || 0 === value || value === !1;
    }
    function responsiveClasses(value) {
        var classes = "", breakpoints = [], validBreakpoints = {
            xs: !0,
            sm: !0,
            md: !0,
            lg: !0,
            xl: !0
        };
        return "boolean" == typeof value && value ? "hidden" : value && value.toLowerCase && "true" === value.toLowerCase() ? "hidden" : (value && (breakpoints = value.split(",")), 
        breakpoints.forEach(function(breakpoint) {
            validBreakpoints[breakpoint] && (classes += "hidden-" + breakpoint + " ");
        }), classes);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _jquery = __webpack_require__(1), _jquery2 = _interopRequireDefault(_jquery), SelectController = function() {
        function SelectController($element, $scope, $transclude, $timeout, $attrs) {
            _classCallCheck(this, SelectController), this.$ngModel = $element.controller("ngModel"), 
            this.$element = $element, this.search = "", preSelectModelValue(this.$ngModel, this), 
            setDefaultIfRequired(this.$ngModel, this, $element, $attrs), addWatchers(this, $scope, this.$ngModel, $element), 
            addEventHandlers(this, $element, this.$ngModel, this.options, $timeout), checkForTranscludedContent($transclude, this), 
            this.responsiveClasses = responsiveClasses, this.filterString = "", this.filteredOptions = this.getFilteredOptions();
        }
        return _createClass(SelectController, [ {
            key: "circleClasses",
            value: function(responsiveOption) {
                var classes = responsiveClasses(responsiveOption), secondaryClasses = responsiveClasses(this.hideSecondary);
                return classes += this.selected.secondary && 0 === secondaryClasses.length ? " circle-sm" : " circle-xs";
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.triggerHandler("focus");
            }
        }, {
            key: "optionClick",
            value: function(option, $event) {
                return option.disabled ? void $event.stopPropagation() : (selectOption(this.$ngModel, this, option), 
                void this.$element.find(".btn").focus());
            }
        }, {
            key: "optionFocus",
            value: function(option) {
                selectOption(this.$ngModel, this, option);
            }
        }, {
            key: "optionKeypress",
            value: function(event) {
                if (!(0, _jquery2["default"])(event.target).hasClass("tw-select-filter")) {
                    var characterCode = getCharacterCodeFromKeypress(event);
                    if (8 === characterCode) return void event.preventDefault();
                    var character = getCharacterFromKeypress(event);
                    continueSearchAndSelectMatch(this.$ngModel, this, this.options, character), this.$element.find(".active a").focus();
                }
            }
        }, {
            key: "placeholderClick",
            value: function() {
                resetOption(this.$ngModel, this), this.$element.find(".btn").focus();
            }
        }, {
            key: "placeholderFocus",
            value: function() {
                resetOption(this.$ngModel, this);
            }
        }, {
            key: "getFilteredOptions",
            value: function() {
                var _this = this;
                if (!this.options || !this.options.filter) return [];
                var filteredLabels = [];
                return this.options.filter(function(option) {
                    var filterStringLower = _this.filterString && escapeRegExp(_this.filterString.toLowerCase());
                    if (!filterStringLower) return !0;
                    var duplicate = !1;
                    filteredLabels.indexOf(option.label) > -1 && (duplicate = !0);
                    var addOption = (labelMatches(option, filterStringLower) || noteMatches(option, filterStringLower) || secondaryMatches(option, filterStringLower) || searchableMatches(option, filterStringLower)) && !duplicate;
                    return addOption && filteredLabels.push(option.label), addOption;
                });
            }
        }, {
            key: "filterFocus",
            value: function() {
                this.$element.find(".tw-select-filter").focus();
            }
        }, {
            key: "filterChange",
            value: function() {
                this.filteredOptions = this.getFilteredOptions();
                var selectedOption = findSelected(this.filteredOptions, this.selected);
                !selectedOption && this.filteredOptions.length && selectOption(this.$ngModel, this, this.filteredOptions[0]);
            }
        }, {
            key: "filterKeydown",
            value: function(event) {
                var characterCode = event.which || event.charCode || event.keyCode, activeOption = this.$element.find(".active"), activeLink = activeOption.find("a"), optionLinks = this.$element.find(".tw-select-option-link");
                return 40 === characterCode ? (this.moveDownOneOption(activeOption, activeLink, optionLinks), 
                event.preventDefault()) : 38 === characterCode ? (this.moveUpOneOption(activeOption, activeLink, optionLinks), 
                event.preventDefault()) : 13 === characterCode && (activeOption.click(), this.$element.find(".btn").focus(), 
                event.preventDefault()), !0;
            }
        }, {
            key: "selectOptionUsingLink",
            value: function(link) {
                var option = this.filteredOptions[link.attr("index")];
                selectOption(this.$ngModel, this, option);
            }
        }, {
            key: "moveUpOneOption",
            value: function(activeOption, activeLink, optionLinks) {
                if (!activeOption.length && optionLinks.length) return void this.selectOptionUsingLink((0, 
                _jquery2["default"])(optionLinks[optionLinks.length - 1]));
                if (activeLink[0] !== optionLinks[0]) {
                    var previousOptions = activeOption.prevAll(".tw-select-option");
                    this.selectOptionUsingLink((0, _jquery2["default"])(previousOptions[0]).find("a"));
                }
            }
        }, {
            key: "moveDownOneOption",
            value: function(activeOption, activeLink, optionLinks) {
                if (!activeOption.length && optionLinks.length) return void this.selectOptionUsingLink((0, 
                _jquery2["default"])(optionLinks[0]));
                if (activeLink[0] !== optionLinks[optionLinks.length - 1]) {
                    var nextOptions = activeOption.nextAll(".tw-select-option");
                    return void this.selectOptionUsingLink((0, _jquery2["default"])(nextOptions[0]).find("a"));
                }
                var transcludedOption = (0, _jquery2["default"])(".tw-select-transcluded");
                transcludedOption.length && transcludedOption.find("a").focus();
            }
        } ]), SelectController;
    }();
    SelectController.$inject = [ "$element", "$scope", "$transclude", "$timeout", "$attrs" ], 
    exports["default"] = SelectController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function FileSelectDirective() {
        return {
            restrict: "A",
            scope: {
                onUserInput: "="
            },
            link: FileSelectLink
        };
    }
    function FileSelectLink(scope, element) {
        element.on("change", function(event) {
            scope.$ctrl.onUserInput && "function" == typeof scope.$ctrl.onUserInput && scope.$ctrl.onUserInput(event);
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = FileSelectDirective;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _uploadDroppableDirective = __webpack_require__(55), _uploadDroppableDirective2 = _interopRequireDefault(_uploadDroppableDirective), _fileSelectDirective = __webpack_require__(53), _fileSelectDirective2 = _interopRequireDefault(_fileSelectDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload-droppable", []).directive("twFileSelect", _fileSelectDirective2["default"]).component("twUploadDroppable", _uploadDroppableDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwUploadDroppableDirective() {
        return {
            bindToController: !0,
            controller: TwUploadDroppableController,
            controllerAs: "$ctrl",
            replace: !1,
            transclude: !0,
            restrict: "E",
            scope: {
                title: "@",
                cta: "@",
                onUpload: "=",
                accept: "="
            },
            link: TwUploadDroppableLink,
            template: _uploadDroppable2["default"]
        };
    }
    function TwUploadDroppableController() {
        var $ctrl = this;
        $ctrl.dragCounter = 0, $ctrl.isActive = !1, $ctrl.onManualUpload = function(event) {
            $ctrl.onUpload && "function" == typeof $ctrl.onUpload && $ctrl.onUpload(_angular2["default"].element(document.querySelector("#file-upload"))[0].files[0], event);
        }, $ctrl.onDrop = function(file, event) {
            $ctrl.onUpload && "function" == typeof $ctrl.onUpload && $ctrl.onUpload(file, event), 
            $ctrl.isActive = !1, $ctrl.dropCounter = 0;
        }, $ctrl.onDragChange = function(enter) {
            enter ? ($ctrl.dragCounter++, 1 === $ctrl.dragCounter && ($ctrl.isActive = !0)) : ($ctrl.dragCounter--, 
            0 === $ctrl.dragCounter && ($ctrl.isActive = !1));
        };
    }
    function TwUploadDroppableLink(scope, element) {
        element[0].addEventListener("dragenter", function(event) {
            event.preventDefault(), scope.$ctrl.onDragChange(!0), scope.$apply();
        }, !1), element[0].addEventListener("dragover", function(event) {
            event.preventDefault();
        }, !1), element[0].addEventListener("dragleave", function(event) {
            event.preventDefault(), scope.$ctrl.onDragChange(!1), scope.$apply();
        }, !1), element[0].addEventListener("drop", function(event) {
            event.preventDefault(), scope.$ctrl.onDrop(event.dataTransfer.files[0]), scope.$apply();
        }, !1);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _uploadDroppable = __webpack_require__(95), _uploadDroppable2 = _interopRequireDefault(_uploadDroppable);
    exports["default"] = TwUploadDroppableDirective;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function FileInputDirective() {
        return {
            restrict: "A",
            controller: FileInputController,
            controllerAs: "$ctrl",
            bindToController: !0,
            require: {
                UploadController: "^twUpload"
            },
            scope: {
                onUserInput: "&"
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var FileInputController = function FileInputController($element) {
        var _this = this;
        _classCallCheck(this, FileInputController), $element.on("change", function() {
            _this.onUserInput && "function" == typeof _this.onUserInput && _this.onUserInput();
        });
    };
    FileInputController.$inject = [ "$element" ], exports["default"] = FileInputDirective;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _uploadController = __webpack_require__(58), _uploadController2 = _interopRequireDefault(_uploadController), _upload = __webpack_require__(96), _upload2 = _interopRequireDefault(_upload), Upload = {
        controller: _uploadController2["default"],
        template: _upload2["default"],
        transclude: !0,
        bindings: {
            ngModel: "=",
            name: "@",
            icon: "@",
            label: "@",
            placeholder: "@",
            description: "@",
            instructions: "@",
            buttonText: "@",
            cancelText: "@",
            processingText: "@",
            successText: "@",
            errorMessage: "@",
            tooLargeMessage: "@",
            size: "@",
            accept: "@",
            httpOptions: "<",
            onStart: "=",
            onSuccess: "=",
            onFailure: "=",
            onCancel: "=",
            maxSize: "<"
        }
    };
    exports["default"] = Upload;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function triggerHandler(method, argument) {
        method && "function" == typeof method && method(argument);
    }
    function prepareHttpOptions($httpOptions) {
        if (!$httpOptions.url) throw new Error("You must supply a URL to post image data asynchronously");
        return $httpOptions.headers || ($httpOptions.headers = {}), $httpOptions.method && delete $httpOptions.method, 
        $httpOptions.headers["Content-Type"] = void 0, $httpOptions.transformRequest = _angular2["default"].identity, 
        $httpOptions;
    }
    function isSizeValid(file, maxSize) {
        return !(_angular2["default"].isNumber(maxSize) && file.size > maxSize);
    }
    function isTypeValid(file, accept) {
        return !0;
    }
    function showDataImage(dataUrl, $ctrl) {
        $ctrl.setNgModel(dataUrl), $ctrl.isImage = $ctrl.isImage_instant, $ctrl.isImage && ($ctrl.image = dataUrl);
    }
    function asyncSuccess(response, $ctrl) {
        return $ctrl.processingState = 1, $ctrl.$timeout(function() {
            $ctrl.isProcessing = !1, $ctrl.isSuccess = !0;
        }, 3e3), $ctrl.$timeout(function() {
            triggerHandler($ctrl.onSuccess, response), $ctrl.isDone = !0;
        }, 3800), response;
    }
    function asyncFailure(error, $ctrl) {
        return $ctrl.processingState = -1, $ctrl.$timeout(function() {
            $ctrl.isProcessing = !1, $ctrl.isError = !0;
        }, 3e3), $ctrl.$timeout(function() {
            triggerHandler($ctrl.onFailure, error), $ctrl.isDone = !0;
        }, 4100), error;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), UploadController = function() {
        function UploadController($timeout, $element, $http, $scope, $transclude, $q, $attrs) {
            var _this = this;
            if (_classCallCheck(this, UploadController), this.$timeout = $timeout, this.$element = $element, 
            this.$http = $http, this.$attrs = $attrs, this.$q = $q, this.isImage = !1, this.isImage_instant = !1, 
            this.dragCounter = 0, this.isProcessing = !1, this.processingState = null, this.checkForTranscludedContent($transclude), 
            $scope.$watch("$ctrl.icon", function() {
                _this.viewIcon = _this.icon ? _this.icon : "upload";
            }), (this.processingText || this.successText || this.failureText) && (!this.processingText || !this.successText || !this.failureText)) throw new Error("Supply all of processing, success, and failure text, or supply none.");
            this.addDragHandlers($scope, $element);
        }
        return _createClass(UploadController, [ {
            key: "onManualUpload",
            value: function() {
                var element = this.$element[0], uploadInput = element.querySelector(".tw-droppable-input"), file = uploadInput.files[0];
                if (!file) throw new Error("Could not retrieve file");
                this.fileDropped(file);
            }
        }, {
            key: "fileDropped",
            value: function(file) {
                var _this2 = this;
                return this.reset(), this.isImage_instant = file.type && file.type.indexOf("image") > -1, 
                this.fileName = file.name, this.isProcessing = !0, this.processingState = null, 
                triggerHandler(this.onStart, file), isSizeValid(file, this.maxSize) ? isTypeValid(file, this.accept) ? void (this.httpOptions ? this.$q.all([ this.asyncPost(file), this.asyncFileRead(file) ]).then(function(response) {
                    return asyncSuccess(response[0], _this2), response;
                }).then(function(response) {
                    return showDataImage(response[1], _this2), response;
                })["catch"](function(error) {
                    return asyncFailure(error, _this2);
                }) : this.asyncFileRead(file).then(function(response) {
                    return asyncSuccess(response, _this2);
                }).then(function(response) {
                    return showDataImage(response, _this2);
                })["catch"](function(error) {
                    return asyncFailure(error, _this2);
                })) : (this.isWrongType = !0, void this.asyncFailure({
                    status: 415,
                    statusText: "Unsupported Media Type"
                })) : (this.isTooLarge = !0, void this.asyncFailure({
                    status: 413,
                    statusText: "Request Entity Too Large"
                }));
            }
        }, {
            key: "onDragEnter",
            value: function() {
                this.dragCounter++, this.dragCounter >= 1 && (this.isDroppable = !0);
            }
        }, {
            key: "onDragLeave",
            value: function() {
                this.dragCounter--, this.dragCounter <= 0 && (this.isDroppable = !1);
            }
        }, {
            key: "clear",
            value: function() {
                this.reset(), triggerHandler(this.onCancel);
            }
        }, {
            key: "reset",
            value: function() {
                this.isDroppable = !1, this.isProcessing = !1, this.isSuccess = !1, this.isError = !1, 
                this.dragCounter = 0, this.isDone = !1, this.isTooLarge = !1, this.isWrongType = !1, 
                this.$element[0].querySelector("input").value = null, this.setNgModel(null);
            }
        }, {
            key: "setNgModel",
            value: function(value) {
                if ("undefined" != typeof this.$attrs.ngModel) {
                    var $ngModel = this.$element.controller("ngModel");
                    if (!$ngModel.$setViewValue) return;
                    $ngModel.$setViewValue(value);
                }
            }
        }, {
            key: "asyncPost",
            value: function(file) {
                var formData = new FormData();
                formData.append(this.name, file);
                var $httpOptions = prepareHttpOptions(_angular2["default"].copy(this.httpOptions));
                return this.$http.post($httpOptions.url, formData, $httpOptions);
            }
        }, {
            key: "asyncFileRead",
            value: function(file) {
                var reader = new FileReader(), deferred = this.$q.defer();
                return reader.onload = function(event) {
                    deferred.resolve(event.target.result);
                }, reader.onerror = function(event) {
                    deferred.reject(event);
                }, reader.readAsDataURL(file), deferred.promise;
            }
        }, {
            key: "addDragHandlers",
            value: function($scope, $element) {
                var _this3 = this;
                $element[0].addEventListener("dragenter", function(event) {
                    event.preventDefault(), _this3.onDragEnter(), $scope.$apply();
                }, !1), $element[0].addEventListener("dragover", function(event) {
                    event.preventDefault();
                }, !1), $element[0].addEventListener("dragleave", function(event) {
                    event.preventDefault(), _this3.onDragLeave(), $scope.$apply();
                }, !1), $element[0].addEventListener("drop", function(event) {
                    event.preventDefault(), _this3.fileDropped(event.dataTransfer.files[0]), $scope.$apply();
                }, !1);
            }
        }, {
            key: "checkForTranscludedContent",
            value: function($transclude) {
                var _this4 = this;
                $transclude(function(clone) {
                    clone.length > 1 || "" !== clone.text().trim() ? _this4.hasTranscluded = !0 : _this4.hasTranscluded = !1;
                });
            }
        } ]), UploadController;
    }();
    UploadController.$inject = [ "$timeout", "$element", "$http", "$scope", "$transclude", "$q", "$attrs" ], 
    exports["default"] = UploadController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _popOverDirective = __webpack_require__(60), _popOverDirective2 = _interopRequireDefault(_popOverDirective);
    exports["default"] = angular.module("tw.styleguide.help.popover", []).directive("twPopOver", _popOverDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function PopOver() {
        return {
            restrict: "A",
            link: PopOverLink
        };
    }
    function PopOverLink(scope, element) {
        if (!element.popover) return void console.log("twPopOver requires tooltip from bootstrap.js");
        var options = {}, tag = element[0];
        tag.getAttribute("data-trigger") ? "hover" === tag.getAttribute("data-trigger") && (options.trigger = "hover focus") : options.trigger = "focus", 
        tag.getAttribute("data-placement") || (options.placement = "top"), tag.getAttribute("data-content-html") && (options.html = !0), 
        element.popover(options), tag.setAttribute("tabindex", "0"), tag.setAttribute("role", "button"), 
        tag.setAttribute("data-toggle", "popover");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = PopOver;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _toolTipDirective = __webpack_require__(62), _toolTipDirective2 = _interopRequireDefault(_toolTipDirective);
    exports["default"] = angular.module("tw.styleguide.help.tooltip", []).directive("twToolTip", _toolTipDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function ToolTip() {
        return {
            restrict: "A",
            link: ToolTipLink
        };
    }
    function ToolTipLink(scope, element) {
        if (!element.tooltip) return void console.log("twToolTip requires bootstrap.js");
        var tag = element[0], options = {};
        tag.getAttribute("data-placement") || (options.placement = "top"), element.tooltip(options), 
        tag.setAttribute("tabindex", "0"), tag.setAttribute("data-toggle", "tooltip");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = ToolTip;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _forms = __webpack_require__(16), _forms2 = _interopRequireDefault(_forms), _validation = __webpack_require__(22), _validation2 = _interopRequireDefault(_validation), _formatting = __webpack_require__(15), _formatting2 = _interopRequireDefault(_formatting), _services = __webpack_require__(21), _services2 = _interopRequireDefault(_services), _help = __webpack_require__(17), _help2 = _interopRequireDefault(_help), _layout = __webpack_require__(18), _layout2 = _interopRequireDefault(_layout), _loading = __webpack_require__(19), _loading2 = _interopRequireDefault(_loading), _navigation = __webpack_require__(20), _navigation2 = _interopRequireDefault(_navigation);
    exports["default"] = _angular2["default"].module("tw.styleguide-components", [ _forms2["default"], _validation2["default"], _formatting2["default"], _services2["default"], _help2["default"], _layout2["default"], _loading2["default"], _navigation2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwAffix() {
        return {
            restrict: "A",
            link: AffixLink
        };
    }
    function AffixLink(scope, element) {
        if (!element.affix) return void console.log("twAffix requires bootstrap.js");
        var tag = element[0], options = {};
        (tag.getAttribute("data-offset-top") || tag.getAttribute("data-offset-bottom")) && (options.offset = {}), 
        tag.getAttribute("data-offset-top") && Number(tag.getAttribute("data-offset-top")) && (options.offset.top = Number(tag.getAttribute("data-offset-top"))), 
        tag.getAttribute("data-offset-bottom") && Number(tag.getAttribute("data-offset-bottom")) && (options.offset.bottom = Number(tag.getAttribute("data-offset-bottom"))), 
        element.affix(options);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwAffix;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _affixDirective = __webpack_require__(64), _affixDirective2 = _interopRequireDefault(_affixDirective);
    exports["default"] = angular.module("tw.styleguide.styling.affix", []).directive("twAffix", _affixDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _cardsService = __webpack_require__(13), CardController = (_interopRequireDefault(_cardsService), 
    function CardController($transclude, TwCardsService) {
        _classCallCheck(this, CardController), this.hasForm = $transclude.isSlotFilled("cardForm"), 
        this.toggle = TwCardsService.toggle, this.addCard = TwCardsService.addCard, this.getExpandedIndex = TwCardsService.getExpandedIndex, 
        this.updateExpandedIndex = TwCardsService.updateExpandedIndex, this.getCard = TwCardsService.getCard, 
        this.getLength = TwCardsService.getLength;
    });
    CardController.$inject = [ "$transclude", "TwCardsService" ], exports["default"] = CardController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function Card() {
        return {
            controller: _cardController2["default"],
            template: _card2["default"],
            require: {
                cardContainerController: "^twCards"
            },
            controllerAs: "$ctrl",
            bindToController: !0,
            replace: !0,
            scope: {
                state: "@",
                index: "<",
                open: "<?",
                disabled: "=?",
                inactive: "<"
            },
            transclude: {
                collapsedCard: "collapsed",
                expandedCard: "expanded",
                cardForm: "?cardForm",
                cardIcon: "cardIcon"
            },
            link: CardLink
        };
    }
    function CardLink($scope, $element, $attrs, $ctrl) {
        var cardController = $scope.$ctrl;
        cardController.addCard(cardController), cardController.index = cardController.getLength() - 1, 
        cardController.inactive = $ctrl.cardContainerController.inactive, cardController.open === !0 && cardController.getExpandedIndex() === -1 ? cardController.updateExpandedIndex(cardController.index) : cardController.open = !1, 
        null == cardController.disabled && (cardController.disabled = !1);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _cardController = __webpack_require__(66), _cardController2 = _interopRequireDefault(_cardController), _card = __webpack_require__(97), _card2 = _interopRequireDefault(_card);
    exports["default"] = Card;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _cards = __webpack_require__(98), _cards2 = _interopRequireDefault(_cards), TwCards = {
        template: _cards2["default"],
        bindings: {
            inactive: "=?"
        },
        transclude: !0
    };
    exports["default"] = TwCards;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _cardsService = __webpack_require__(13), _cardsService2 = _interopRequireDefault(_cardsService), _cardDirective = __webpack_require__(67), _cardDirective2 = _interopRequireDefault(_cardDirective), _cardsComponent = __webpack_require__(68), _cardsComponent2 = _interopRequireDefault(_cardsComponent);
    exports["default"] = angular.module("tw.styleguide.layout.cards", []).service("TwCardsService", _cardsService2["default"]).component("twCards", _cardsComponent2["default"]).directive("twCard", _cardDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _loaderComponent = __webpack_require__(71), _loaderComponent2 = _interopRequireDefault(_loaderComponent);
    exports["default"] = angular.module("tw.styleguide.loading.loader", []).component("twLoader", _loaderComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _loader = __webpack_require__(99), _loader2 = _interopRequireDefault(_loader), TwLoader = {
        template: _loader2["default"]
    };
    exports["default"] = TwLoader;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _processComponent = __webpack_require__(73), _processComponent2 = _interopRequireDefault(_processComponent);
    exports["default"] = angular.module("tw.styleguide.loading.process", []).component("twProcess", _processComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _processController = __webpack_require__(74), _processController2 = _interopRequireDefault(_processController), _process = __webpack_require__(100), _process2 = _interopRequireDefault(_process), Process = {
        controller: _processController2["default"],
        template: _process2["default"],
        bindings: {
            state: "<",
            size: "@",
            onStop: "&",
            promise: "<"
        }
    };
    exports["default"] = Process;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function isStopped(state) {
        return state === -1 || 0 === state || 1 === state;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), ProcessController = function() {
        function ProcessController($scope, $interval, $timeout) {
            var _this = this;
            _classCallCheck(this, ProcessController), this.$interval = $interval, this.$timeout = $timeout, 
            this.interval = null, this.processing = this.state, $scope.$watch("$ctrl.state", function() {
                isStopped(_this.processing) && (_this.processing = null, _this.startProcess());
            }), $scope.$watch("$ctrl.size", function() {
                switch ($interval.cancel(_this.interval), _this.startProcess(), _this.size || (_this.size = "sm"), 
                _this.size) {
                  case "xs":
                    _this.radius = "11";
                    break;

                  case "sm":
                    _this.radius = "22";
                    break;

                  case "xl":
                    _this.radius = "61";
                    break;

                  default:
                    _this.radius = "46%";
                }
            }), this.startProcess();
        }
        return _createClass(ProcessController, [ {
            key: "startProcess",
            value: function() {
                var _this2 = this;
                this.interval = this.$interval(function() {
                    _this2.processing = _this2.state, isStopped(_this2.state) && _this2.stopProcess();
                }, 1500);
            }
        }, {
            key: "stopProcess",
            value: function() {
                this.interval && this.$interval.cancel(this.interval), this.onStop && (0 === this.state ? this.onStop() : this.$timeout(this.onStop, 1800));
            }
        } ]), ProcessController;
    }();
    ProcessController.$inject = [ "$scope", "$interval", "$timeout" ], exports["default"] = ProcessController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _tabsController = __webpack_require__(76), _tabsController2 = _interopRequireDefault(_tabsController), _tabs = __webpack_require__(101), _tabs2 = _interopRequireDefault(_tabs), Tabs = {
        controller: _tabsController2["default"],
        template: _tabs2["default"],
        bindings: {
            tabs: "<",
            active: "=",
            onChange: "&"
        }
    };
    exports["default"] = Tabs;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), TabsController = function() {
        function TabsController() {
            _classCallCheck(this, TabsController), !this.active && this.tabs.length && (this.active = this.tabs[0].type);
        }
        return _createClass(TabsController, [ {
            key: "switchTab",
            value: function(tab) {
                this.active = tab, this.onChange && this.onChange(tab);
            }
        } ]), TabsController;
    }();
    exports["default"] = TabsController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwCurrencyService() {
        var currencyDecimals = {
            BIF: 0,
            BYR: 0,
            CLP: 0,
            DJF: 0,
            GNF: 0,
            JPY: 0,
            KMF: 0,
            KRW: 0,
            MGA: 0,
            PYG: 0,
            RWF: 0,
            VND: 0,
            VUV: 0,
            XAF: 0,
            XOF: 0,
            XPF: 0,
            HUF: 0,
            BHD: 3,
            JOD: 3,
            KWD: 3,
            OMR: 3,
            TND: 3
        };
        this.getDecimals = function(currency) {
            return currency.toUpperCase && "undefined" != typeof currencyDecimals[currency.toUpperCase()] ? currencyDecimals[currency.toUpperCase()] : 2;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwCurrencyService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwDateService() {
        function getLocalisedDateName(date, locale, formattingObject) {
            var name = date.toLocaleDateString(locale, formattingObject);
            return isLocaleTranslationRequiresStripping(locale) && (name = name.replace(/[0-9]|\s|,/g, "")), 
            name[0].toUpperCase() + name.substring(1);
        }
        function getValidDateFormat(format) {
            var validFormats = [ "narrow", "short", "long" ];
            return !format || validFormats.indexOf(format) < 0 ? "long" : format;
        }
        function getValidLocale(locale) {
            return isIntlSupportedForLocale(locale) ? locale : "en-GB";
        }
        function isIntlSupportedForLocale(locale) {
            try {
                var supportedLocales = window.Intl.DateTimeFormat.supportedLocalesOf([ locale ]);
                return supportedLocales.length > 0;
            } catch (error) {
                return !1;
            }
        }
        function isLocaleTranslationRequiresStripping(locale) {
            if (!locale) return !0;
            var lang = getLanguageFromLocale(locale);
            return "ja" !== lang;
        }
        function getLanguageFromLocale(locale) {
            return locale ? locale.substring(0, 2) : null;
        }
        var _this = this;
        this.getLocaleDate = function(date) {
            return date || (date = new Date()), date.getDate();
        }, this.getLocaleMonth = function(date) {
            return date || (date = new Date()), date.getMonth();
        }, this.getLocaleFullYear = function(date) {
            return date || (date = new Date()), date.getFullYear();
        }, this.getLocaleToday = function() {
            var now = new Date();
            return _this.getUTCDateFromParts(_this.getLocaleFullYear(now), _this.getLocaleMonth(now), _this.getLocaleDate(now));
        }, this.getUTCDate = function(date) {
            return date || (date = new Date()), date.getUTCDate();
        }, this.getUTCMonth = function(date) {
            return date || (date = new Date()), date.getUTCMonth();
        }, this.getUTCFullYear = function(date) {
            return date || (date = new Date()), date.getUTCFullYear();
        }, this.getUTCToday = function() {
            var now = new Date();
            return _this.getUTCDateFromParts(_this.getUTCFullYear(now), _this.getUTCMonth(now), _this.getUTCDate(now));
        }, this.getLastDayOfMonth = function(year, month) {
            var lastDay = _this.getUTCDateFromParts(year, month + 1, 0);
            return lastDay.getUTCDate();
        }, this.getUTCDateFromParts = function(year, month, day) {
            var date = new Date();
            return date.setUTCFullYear(year, month, day), date.setUTCHours(0), date.setUTCMinutes(0), 
            date.setUTCSeconds(0), date.setUTCMilliseconds(0), date;
        }, this.getDayNamesForLocale = function(locale, format) {
            var date = void 0, days = [], language = getLanguageFromLocale(locale);
            if (DEFAULT_DAY_NAMES_BY_LANGUAGE[language]) return DEFAULT_DAY_NAMES_BY_LANGUAGE[language];
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var i = 1; i <= 7; i++) date = _this.getUTCDateFromParts(2001, 0, i), days.push(getLocalisedDateName(date, locale, {
                weekday: format
            }));
            return days;
        }, this.getMonthNamesForLocale = function(locale, format) {
            var date = void 0, month = void 0, months = [], language = getLanguageFromLocale(locale);
            if (DEFAULT_MONTH_NAMES_BY_LANGUAGE[language] && ("long" === format || "ja" === language)) return DEFAULT_MONTH_NAMES_BY_LANGUAGE[language];
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var i = 0; i < 12; i++) date = _this.getUTCDateFromParts(2e3, i, 15), "short" === format ? (month = getLocalisedDateName(date, locale, {
                month: "long"
            }), month = month.length > 4 ? month.slice(0, 3) : month, months.push(month)) : months.push(getLocalisedDateName(date, locale, {
                month: format
            }));
            return months;
        }, this.getWeekday = function(year, month, day) {
            var utcDate = _this.getUTCDateFromParts(year, month, day);
            return utcDate.getUTCDay();
        }, this.isMonthBeforeDay = function(locale) {
            return locale.indexOf("US", locale.length - 2) !== -1 || "ja" === getLanguageFromLocale(locale);
        }, this.addYears = function(date, years) {
            return _this.addToDate(date, years, 0, 0);
        }, this.addMonths = function(date, months) {
            return _this.addToDate(date, 0, months, 0);
        }, this.addDays = function(date, days) {
            return _this.addToDate(date, 0, 0, days);
        }, this.addToDate = function(date, years, months, days) {
            return _this.getUTCDateFromParts(date.getUTCFullYear() + years, date.getUTCMonth() + months, date.getUTCDate() + days);
        }, this.getYearAndMonthPresentation = function(year, monthName, locale) {
            var lang = getLanguageFromLocale(locale);
            return "ja" === lang ? year + "年" + monthName : monthName + " " + year;
        }, this.getYearMonthDatePresentation = function(year, monthName, date, locale) {
            var lang = getLanguageFromLocale(locale);
            return "ja" === lang ? year + "年" + monthName + date + "日" : locale.indexOf("US", locale.length - 2) !== -1 ? monthName + " " + date + ", " + year : date + " " + monthName + " " + year;
        };
        var DEFAULT_MONTH_NAMES_BY_LANGUAGE = {
            en: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            ja: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ]
        }, DEFAULT_DAY_NAMES_BY_LANGUAGE = {
            en: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
            ja: [ "月", "火", "水", "木", "金", "土", "日" ]
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwDateService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function AsyncValidation($log, $q, $http) {
        function AsyncValidationLink(scope, element, attrs, ngModel) {
            attrs["tw-dynamic-async-validator"];
        }
        return {
            link: AsyncValidationLink,
            restrict: "A",
            controller: AsyncValidatorController,
            contollerAs: "ctrl",
            bindToController: {
                twDynamicAsyncValidator: "="
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var AsyncValidatorController = function AsyncValidatorController() {
        _classCallCheck(this, AsyncValidatorController);
    };
    AsyncValidation.$inject = [ "$log", "$q", "$http" ], exports["default"] = AsyncValidation;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _asyncValidationDirective = __webpack_require__(79), _asyncValidationDirective2 = _interopRequireDefault(_asyncValidationDirective);
    exports["default"] = angular.module("tw.styleguide.validation.async", []).directive("twAsyncValidation", _asyncValidationDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwValidation() {
        return {
            restrict: "AC",
            require: "ngModel",
            link: validationLink
        };
    }
    function validationLink(scope, element, attrs, ngModel) {
        var formGroup = element.closest(".form-group");
        element.on("invalid", function(event) {
            event.preventDefault();
        }), ngModel.$validators.validation = function() {
            return scope.$evalAsync(function() {
                checkModelAndUpdate(ngModel, formGroup, element);
            }), !0;
        }, element.on("blur", function() {
            scope.$evalAsync(function() {
                checkModelAndUpdate(ngModel, formGroup, element);
            });
        });
    }
    function checkModelAndUpdate(ngModel, formGroup, element) {
        return ngModel.$valid ? (formGroup.removeClass("has-error"), void element.removeAttr("aria-invalid")) : void (ngModel.$touched && ngModel.$dirty && (formGroup.addClass("has-error"), 
        element.attr("aria-invalid", !0)));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwValidation;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _controlValidationDirective = __webpack_require__(81), _controlValidationDirective2 = _interopRequireDefault(_controlValidationDirective);
    exports["default"] = angular.module("tw.stylguide.validation.control", []).directive("twValidation", _controlValidationDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function FormValidation() {
        return {
            restrict: "E",
            link: FormValidationLink
        };
    }
    function FormValidationLink(scope, element) {
        (0, _jquery2["default"])(element).on("submit", function() {
            var elements = (0, _jquery2["default"])(element).find("[tw-validation].ng-invalid");
            return elements.closest(".form-group").addClass("has-error"), elements.closest(".checkbox, .radio").addClass("has-error"), 
            !0;
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _jquery = __webpack_require__(1), _jquery2 = _interopRequireDefault(_jquery);
    exports["default"] = FormValidation;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _formValidationDirective = __webpack_require__(83), _formValidationDirective2 = _interopRequireDefault(_formValidationDirective);
    exports["default"] = angular.module("tw.styleguide.validation.form", []).directive("form", _formValidationDirective2["default"]).name;
}, function(module, exports) {
    module.exports = '<div class="input-group" ng-class="{\n  \'input-group-sm\': $ctrl.size === \'sm\',\n  \'input-group-lg\': $ctrl.size === \'lg\',\n  \'disabled\': $ctrl.ngDisabled\n}">\n  <input\n    type="tel"\n    autocomplete="off"\n    name="amount"\n    step="any"\n    class="form-control"\n    placeholder="{{ $ctrl.placeholder }}"\n    tw-focusable\n    show-decimals="$ctrl.showDecimals"\n    tw-number-input-formatter\n    ng-change="$ctrl.changedAmount()"\n    ng-model="$ctrl.ngModel"\n    ng-disabled="$ctrl.ngDisabled" />\n  <span class="input-group-addon"\n    ng-class="{\'input-lg\': $ctrl.size ===\'lg\'}" ng-transclude="addon"></span>\n  <span class="input-group-btn">\n    <tw-select\n      ng-model="$ctrl.currency"\n      ng-required="true"\n      size="{{ $ctrl.size }}"\n      inverse="true"\n      dropdown-right="xs"\n      dropdown-width="lg"\n      hide-currency="xs"\n      hide-note="true"\n      hide-secondary="true"\n      options="$ctrl.currencies"\n      filter="{{ $ctrl.currencyFilterPlaceholder }}"\n      ng-change="$ctrl.changedCurrency()">\n        <a href="" ng-if="!!$ctrl.customActionLabel" ng-click="$ctrl.onCustomAction()">\n          {{ $ctrl.customActionLabel }}\n        </a>\n    </tw-select>\n  </span>\n</div>\n';
}, function(module, exports) {
    module.exports = '<input type="hidden" class="sr-only"\n  name="{{$ctrl.name}}"\n  ng-model="$ctrl.ngModel"\n  ng-click="$ctrl.hiddenClick($event)"\n  ng-disabled="$ctrl.ngDisabled"/>\n<button type="button" class="tw-checkbox-button" tw-focusable\n  ng-click="$ctrl.buttonClick($event)"\n  ng-focus="$ctrl.buttonFocus()"\n  ng-blur="$ctrl.buttonBlur()"\n  ng-disabled="$ctrl.ngDisabled"\n  ng-class="{\'checked\': $ctrl.checked}"\n  aria-pressed="{{$ctrl.checked}}">\n  <span class="tw-checkbox-check glyphicon glyphicon-ok"></span>\n</button>\n';
}, function(module, exports) {
    module.exports = '<div class="input-group" ng-class="{\n  \'input-group-sm\': $ctrl.size === \'sm\',\n  \'input-group-lg\': $ctrl.size === \'lg\',\n  \'disabled\': $ctrl.ngDisabled\n}">\n  <input\n    type="tel"\n    autocomplete="off"\n    name="amount"\n    step="any"\n    class="form-control p-r-0"\n    placeholder="{{$ctrl.placeholder}}"\n    show-decimals="$ctrl.showDecimals"\n    tw-focusable\n    tw-number-input-formatter\n    ng-change="$ctrl.changedInputValue()"\n    ng-model="$ctrl.ngModel"\n    ng-disabled="$ctrl.ngDisabled" />\n  <span class="hello-world input-group-addon tw-currency-input-code p-l-1">\n    <span ng-transclude="addon"></span>\n    {{ $ctrl.currency || $ctrl.currencyCode }}\n  </span>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div class="btn-group btn-block dropdown"\n  ng-keydown="$ctrl.keyHandler($event)">\n\n  <button\n    class="btn btn-input dropdown-toggle tw-date-lookup-button"\n    data-toggle="dropdown"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-click="$ctrl.openLookup()"\n    ng-focus="$ctrl.buttonFocus()"\n    ng-class="{\n      \'btn-sm\': $ctrl.size ===\'sm\',\n      \'btn-lg\': $ctrl.size ===\'lg\'\n    }">\n\n    <span ng-if="!$ctrl.ngModel"\n      class="form-control-placeholder tw-date-lookup-placeholder">\n      {{$ctrl.placeholder}}\n    </span\n    ><span ng-if="$ctrl.label && $ctrl.ngModel"\n      class="control-label small m-r-1">{{$ctrl.label}}</span\n    ><span ng-if="$ctrl.ngModel" class="tw-date-lookup-selected">\n      {{$ctrl.selectedDateFormatted}}\n    </span>\n    <span class="caret"></span>\n\n  </button>\n\n  <div class="dropdown-menu">\n\n    <div ng-if="$ctrl.mode ===\'year\'" class="tw-date-lookup-years">\n      <div class="text-xs-center p-t-1 p-b-2">\n        <div class="pull-xs-left p-b-2">\n          <a href="" ng-click="$ctrl.setYearOffset($event, -20)"\n            class="text-no-decoration tw-date-lookup-previous-years">\n            <span class="icon icon-left icon-lg"></span>\n          </a>\n        </div>\n        <div class="pull-xs-right p-b-2">\n          <a href="" ng-click="$ctrl.setYearOffset($event, 20)"\n            class="text-no-decoration tw-date-lookup-next-years">\n            <span class="icon icon-right icon-lg"></span>\n          </a>\n        </div>\n      </div>\n      <table class="table table-condensed table-bordered table-calendar m-b-0">\n        <tbody>\n          <tr ng-repeat="row in [0,4,8,12,16]">\n            <td ng-repeat="col in [0,1,2,3]">\n              <a href=""\n                ng-click="$ctrl.selectYear($event, $ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)"\n                ng-disabled="$ctrl.isYearDisabled($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)"\n                ng-class="{\'active\': $ctrl.selectedYear === ($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)}"\n                class="tw-date-lookup-year-option">\n                {{$ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div ng-if="$ctrl.mode ===\'month\'" class="tw-date-lookup-months">\n      <div class="text-xs-center p-t-1 p-b-2">\n        <div class="pull-xs-left">\n          <a href="" ng-click="$ctrl.yearBefore($event)" class="text-no-decoration">\n            <span class="icon icon-left icon-lg"></span>\n          </a>\n        </div>\n        <a href="" ng-click="$ctrl.switchToYears($event)"\n          class="tw-date-lookup-year-label">\n          {{$ctrl.year}}\n        </a>\n        <div class="pull-xs-right">\n          <a href="" ng-click="$ctrl.yearAfter($event)" class="text-no-decoration">\n            <span class="icon icon-right icon-lg"></span>\n          </a>\n        </div>\n      </div>\n      <table class="table table-condensed table-bordered table-calendar m-b-0">\n        <tbody>\n          <tr ng-repeat="row in [0,4,8]">\n            <td ng-repeat="col in [0,1,2,3]">\n              <a href=""\n                ng-click="$ctrl.selectMonth($event, row+col, $ctrl.year)"\n                ng-disabled="$ctrl.isMonthDisabled(row + col, $ctrl.year)"\n                ng-class="{\n                  \'active\': $ctrl.selectedMonth === (row + col) && $ctrl.selectedYear === $ctrl.year\n                }"\n                class="tw-date-lookup-month-option">\n                {{$ctrl.shortMonthsOfYear[row+col] | limitTo:5}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div ng-if="$ctrl.mode ===\'day\'" class="tw-date-lookup-days">\n      <div class="text-xs-center p-t-1 p-b-2">\n        <div class="pull-xs-left">\n          <a href="" ng-click="$ctrl.monthBefore($event)"\n            class="text-no-decoration tw-date-lookup-previous-month">\n            <span class="icon icon-left icon-lg"></span>\n          </a>\n        </div>\n        <a href="" ng-click="$ctrl.switchToYears($event)"\n          class="tw-date-lookup-month-label">\n          {{$ctrl.yearMonthFormatted}}\n        </a>\n        <div class="pull-xs-right">\n          <a href="" ng-click="$ctrl.monthAfter($event)"\n            class="text-no-decoration tw-date-lookup-next-month">\n            <span class="icon icon-right icon-lg"></span>\n          </a>\n        </div>\n      </div>\n      <table class="table table-condensed table-bordered table-calendar m-b-0">\n        <thead>\n          <tr>\n            <th ng-repeat="day in $ctrl.daysOfWeek track by $index">\n              <span class="hidden-xs">{{day | limitTo : 3}}</span>\n              <span class="visible-xs-inline-block">{{$ctrl.shortDaysOfWeek[$index] | limitTo : 2}}</span>\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr ng-repeat="week in $ctrl.weeks">\n            <td ng-repeat="day in week track by $index"\n              ng-class="{\n                \'default\': $index > 4\n              }">\n              <a href="" title="{{day}} {{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}}"\n                ng-if="day"\n                ng-click="$ctrl.selectDay($event, day, $ctrl.month, $ctrl.year)"\n                ng-disabled="$ctrl.isDayDisabled(day, $ctrl.month, $ctrl.year)"\n                ng-class="{\n                  \'active\': $ctrl.isCurrentlySelected(day, $ctrl.month, $ctrl.year)\n                }"\n                class="tw-date-lookup-day-option" tabindex="0">\n                {{day}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div class="row">\n\n  <div class="col-sm-5 tw-date-month-column" ng-if="$ctrl.monthBeforeDay">\n    <label class="sr-only">Month</label>\n    <tw-select\n      name="month"\n      class="tw-date-month"\n      ng-model="$ctrl.month"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      ng-required="$ctrl.dateRequired"\n      ng-disabled="$ctrl.dateDisabled"\n      options="$ctrl.dateMonths">\n    </tw-select>\n  </div>\n\n  <div class="col-sm-3 tw-date-day-column">\n    <label class="sr-only">Day</label>\n    <input type="number"\n      name="day"\n      class="form-control tw-date-day"\n      ng-model="$ctrl.day"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      placeholder="DD"\n      min="1"\n      ng-min="1"\n      ng-disabled="$ctrl.dateDisabled"\n      ng-required="$ctrl.dateRequired"\n      tw-focusable />\n  </div>\n\n  <div class="col-sm-5 tw-date-month-column" ng-if="!$ctrl.monthBeforeDay">\n    <label class="sr-only">Month</label>\n    <tw-select\n      name="month"\n      class="tw-date-month"\n      ng-model="$ctrl.month"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      ng-required="$ctrl.dateRequired"\n      ng-disabled="$ctrl.dateDisabled"\n      options="$ctrl.dateMonths">\n    </tw-select>\n  </div>\n\n  <div class="col-sm-4 tw-date-year-column">\n    <label class="sr-only">Year</label>\n    <input type="number"\n      name="year"\n      class="form-control tw-date-year"\n      placeholder="YYYY"\n      ng-model="$ctrl.year"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      ng-min="$ctrl.min.getFullYear()"\n      ng-max="$ctrl.max.getFullYear()"\n      maxlength="4"\n      ng-maxlength="4"\n      ng-disabled="$ctrl.dateDisabled"\n      ng-required="$ctrl.dateRequired"\n      tw-focusable />\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div ng-switch="$ctrl.type">\n  <input ng-switch-when="text"\n    name="{{$ctrl.name}}"\n    type="text"\n    class="form-control"\n    placeholder="{{$ctrl.placeholder}}"\n    ng-model="$ctrl.ngModel"\n    ng-model-options="{ allowInvalid: true }"\n    ng-required="$ctrl.ngRequired"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-pattern="$ctrl.ngPattern"\n    ng-change="$ctrl.change()"\n    ng-focus="$ctrl.focus()"\n    ng-blur="$ctrl.blur()"\n    ng-minlength="$ctrl.ngMinlength"\n    ng-maxlength="$ctrl.ngMaxlength"\n    tw-text-format="{{$ctrl.textFormat}}" />\n  <input ng-switch-when="password"\n    name="{{$ctrl.name}}"\n    type="password"\n    class="form-control"\n    placeholder="{{$ctrl.placeholder}}"\n    ng-model="$ctrl.ngModel"\n    ng-model-options="{ allowInvalid: true }"\n    ng-required="$ctrl.ngRequired"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-change="$ctrl.change()"\n    ng-focus="$ctrl.focus()"\n    ng-blur="$ctrl.blur()"\n    ng-minlength="$ctrl.ngMinlength"\n    ng-maxlength="$ctrl.ngMaxlength" />\n  <input ng-switch-when="number"\n    name="{{$ctrl.name}}"\n    type="number"\n    step="{{$ctrl.step}}"\n    class="form-control"\n    placeholder="{{$ctrl.placeholder}}"\n    ng-model="$ctrl.ngModel"\n    ng-model-options="{ allowInvalid: true }"\n    ng-required="$ctrl.ngRequired"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-change="$ctrl.change()"\n    ng-focus="$ctrl.focus()"\n    ng-blur="$ctrl.blur()"\n    ng-min="$ctrl.ngMin"\n    ng-max="$ctrl.ngMax" />\n  <div ng-switch-when="radio"\n    class="radio"\n    ng-class="{disabled: $ctrl.ngDisabled}"\n    ng-repeat="option in $ctrl.options">\n    <label>\n      <tw-radio\n        name="{{$ctrl.name}}"\n        ng-value="option.value"\n        ng-model="$ctrl.ngModel"\n        ng-required="$ctrl.ngRequired"\n        ng-disabled="$ctrl.ngDisabled"\n        ng-change="$ctrl.change()"\n        ng-click="$ctrl.change()"\n        ng-focus="$ctrl.focus()"\n        ng-blur="$ctrl.blur()" />\n      {{option.label}}\n    </label>\n  </div>\n  <div ng-switch-when="checkbox"\n    class="checkbox"\n    ng-class="{disabled: $ctrl.ngDisabled}">\n    <label>\n      <tw-checkbox\n        name="{{$ctrl.name}}"\n        ng-model="$ctrl.ngModel"\n        ng-required="$ctrl.ngRequired"\n        ng-disabled="$ctrl.ngDisabled"\n        ng-change="$ctrl.change()"\n        ng-click="$ctrl.change()"\n        ng-focus="$ctrl.focus()"\n        ng-blur="$ctrl.blur()" />\n      {{$ctrl.placeholder}}\n    </label>\n  </div>\n  <div ng-switch-when="select">\n    <tw-select\n      name="{{$ctrl.name}}"\n      options="$ctrl.options"\n      placeholder="{{$ctrl.placeholder}}"\n      ng-model="$ctrl.ngModel"\n      ng-required="$ctrl.ngRequired"\n      ng-disabled="$ctrl.ngDisabled"\n      ng-change="$ctrl.change()"\n      ng-focus="$ctrl.focus()"\n      ng-blur="$ctrl.blur()" />\n  </div>\n  <div ng-switch-when="upload">\n    <tw-upload\n      name="{{$ctrl.name}}"\n      label="{{$ctrl.label}}"\n      icon="{{$ctrl.uploadIcon}}"\n      placeholder="{{$ctrl.placeholder}}"\n      accept="{{$ctrl.uploadAccept}}"\n      complete-text="{{$ctrl.label}}"\n      button-text="{{$ctrl.uploadOptions.buttonText}}"\n      cancel-text="{{$ctrl.uploadOptions.cancelText}}"\n      too-large-message="{{$ctrl.uploadTooLargeMessage}}"\n      max-size="$ctrl.ngMax"\n      ng-model="$ctrl.ngModel"\n      ng-required="$ctrl.ngRequired"\n      ng-disabled="$ctrl.ngDisabled"\n      ng-change="$ctrl.change()"\n      ng-focus="$ctrl.focus()"\n      ng-blur="$ctrl.blur()" />\n  </div>\n  <div ng-switch-when="date">\n    <tw-date\n      name="{{$ctrl.name}}"\n      locale="{{$ctrl.locale}}"\n      ng-min="$ctrl.ngMin"\n      ng-max="$ctrl.ngMax"\n      ng-model="$ctrl.ngModel"\n      ng-required="$ctrl.ngRequired"\n      ng-disabled="$ctrl.ngDisabled"\n      ng-change="$ctrl.change()"\n      ng-focus="$ctrl.focus()"\n      ng-blur="$ctrl.blur()" />\n  </div>\n  <ng-transclude class="error-messages"></ng-transclude>\n</div>\n';
}, function(module, exports) {
    module.exports = '<fieldset ng-form="twFieldset">\n  <legend ng-if="$ctrl.legend">{{$ctrl.legend}}</legend>\n  <div class="row row-equal-height">\n    <div ng-repeat="fieldGroup in $ctrl.fields" class="col-xs-12"\n      ng-class="{\n        \'col-sm-4\': fieldGroup.width === \'sm\',\n        \'col-sm-6\': fieldGroup.width === \'md\' || fieldGroup.maxlength && fieldGroup.maxlength <= 10,\n        \'col-sm-12\': fieldGroup.width === \'lg\' || !fieldGroup.maxlength || fieldGroup.maxlength > 10\n      }">\n      <div class="form-group tw-form-group-{{fieldGroup.key}}"\n        ng-class="{\n          \'has-error\': $ctrl.errorMessages[fieldGroup.key]\n        }">\n        <label class="control-label"\n          ng-if="fieldGroup.type !== \'upload\'">\n          {{fieldGroup.name}}\n        </label>\n        <div class="row">\n          <div class="col-xs-{{field.columns}}"\n            ng-repeat="field in fieldGroup.group">\n            <tw-dynamic-form-control\n              name="{{field.key}}"\n              label="{{fieldGroup.name}}"\n              type="{{field.type | lowercase}}"\n              placeholder="{{field.placeholder || field.example}}"\n              help-text="{{field.helpText}}"\n              locale="{{$ctrl.locale}}"\n              upload-accept="{{field.accept}}"\n              upload-icon="{{field.icon}}"\n              upload-too-large-message="{{field.tooLargeMessage}}"\n              options="field.valuesAllowed"\n              upload-options="$ctrl.uploadOptions"\n              ng-model="$ctrl.model[field.key]"\n              ng-blur="$ctrl.onBlur(field)"\n              ng-change="$ctrl.onChange(field)"\n              ng-required="field.required"\n              ng-disabled="field.disabled"\n              tw-minlength="field.minLength"\n              tw-maxlength="field.maxLength"\n              ng-min="field.min"\n              ng-max="field.max"\n              ng-pattern="field.validationRegexp"\n              text-format="field.displayFormat"\n              tw-validation>\n              <!-- tw-dynamic-async-validator="field.validationAsync" -->\n            </tw-dynamic-form-control>\n            <div class="error-messages">\n              <div ng-repeat="(validationType, validationMessage) in $ctrl.validationMessages"\n                class="error-{{validationType}}">\n                {{validationMessage}}\n              </div>\n              <div class="error-provided" ng-if="$ctrl.errorMessages[field.key]">\n                {{ $ctrl.errorMessages[field.key] }}\n              </div>\n            </div>\n            <div ng-if="field.tooltip"\n              class="help-block">\n              {{field.tooltip}}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</fieldset>\n';
}, function(module, exports) {
    module.exports = '<input type="radio" class="sr-only"\n  name="{{$ctrl.name}}"\n  ng-value="$ctrl.ngValue || $ctrl.value"\n  ng-model="$ctrl.ngModel"\n  ng-disabled="$ctrl.ngDisabled"\n  ng-change="$ctrl.hiddenInputChange()"\n  tabindex="-1" />\n<button type="button" class="tw-radio-button" tw-focusable\n  ng-click="$ctrl.buttonClick($event)"\n  ng-focus="$ctrl.buttonFocus()"\n  ng-blur="$ctrl.buttonBlur()"\n  ng-disabled="$ctrl.ngDisabled"\n  ng-class="{checked: $ctrl.checked}"\n  aria-pressed="{{$ctrl.checked}}">\n  <span class="tw-radio-check"></span>\n</button>\n';
}, function(module, exports) {
    module.exports = '<tw-tabs\n  ng-if="$ctrl.requirements.length > 1"\n  tabs="$ctrl.requirements"\n  active="$ctrl.model.type">\n</tw-tabs>\n<div class="tab-content" ng-form="twForm">\n  <div ng-repeat="requirementType in $ctrl.requirements"\n    ng-if="$ctrl.model.type == requirementType.type"\n    class="tab-pane active"\n    id="{{requirementType.type}}">\n    <p>{{requirementType.description}}</p>\n    <tw-fieldset\n      fields="requirementType.fields"\n      model="$ctrl.model"\n      upload-options="$ctrl.uploadOptions"\n      locale="{{$ctrl.locale}}"\n      onRefreshRequirements="$ctrl.onRefreshRequirements()"\n      validation-messages="$ctrl.validationMessages"\n      error-messages="$ctrl.errorMessages">\n    </tw-fieldset>\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div class="btn-group btn-block tw-select"\n  ng-class="{\n    dropdown: !$ctrl.dropdownUp,\n    dropup: $ctrl.dropdownUp\n  }" aria-hidden="false">\n\n  <button type="button" class="btn btn-input dropdown-toggle"\n    ng-class="{\n      \'btn-input-inverse\': $ctrl.inverse,\n      \'btn-addon\': $ctrl.inverse,\n      \'btn-sm\': $ctrl.size === \'sm\',\n      \'btn-lg\': $ctrl.size === \'lg\'\n    }"\n    data-toggle="dropdown" aria-expanded="false"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-focus="$ctrl.buttonFocus()"\n    tw-focusable>\n\n    <span class="tw-select-selected" ng-if="$ctrl.selected">\n      <span class="circle circle-inverse pull-xs-left circle-sm"\n        ng-if="$ctrl.selected && $ctrl.selected.icon && $ctrl.selected.secondary">\n        <span class="icon {{$ctrl.selected.icon}}"></span>\n      </span>\n\n      <span class="circle circle-inverse pull-xs-left"\n        ng-class="$ctrl.circleClasses($ctrl.hideCircle)"\n        ng-if="($ctrl.selected.circleText || $ctrl.selected.circleImage || $ctrl.selected.circleIcon)">\n        <span ng-if="$ctrl.selected.circleText">{{$ctrl.selected.circleText}}</span>\n        <img alt="{{$ctrl.selected.label}}"\n          ng-if="$ctrl.selected.circleImage"\n          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n          ng-src="{{$ctrl.selected.circleImage}}" />\n        <span ng-if="$ctrl.selected.circleIcon" class="icon {{$ctrl.selected.circleIcon}}"></span>\n      </span>\n\n      <span class="text-ellipsis">\n        <span class="currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}"\n          ng-if="$ctrl.selected && $ctrl.selected.currency"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideCurrency)"\n        ></span>\n        <span class="icon {{$ctrl.selected.icon}}"\n          ng-if="$ctrl.selected && $ctrl.selected.icon && !$ctrl.selected.secondary"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideIcon)"\n        ></span>\n        <span class="tw-select-label"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideLabel)">\n          {{$ctrl.selected.label}}\n        </span>\n        <span\n          ng-if="$ctrl.selected.note"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideNote)"\n          class="tw-select-note small m-l-1">\n          {{$ctrl.selected.note}}\n        </span>\n\n        <span\n          ng-if="$ctrl.selected.secondary"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideSecondary)"\n          class="tw-select-secondary small secondary text-ellipsis">\n          {{$ctrl.selected.secondary}}\n        </span>\n      </span>\n    </span>\n\n    <span class="form-control-placeholder" ng-if="!$ctrl.selected">{{$ctrl.placeholder}}</span>\n    <span class="caret"></span>\n  </button>\n  <ul class="dropdown-menu" role="menu" ng-class="{\n      \'dropdown-menu-xs-right\': $ctrl.dropdownRight === \'xs\',\n      \'dropdown-menu-sm-right\': $ctrl.dropdownRight === \'sm\',\n      \'dropdown-menu-md-right\': $ctrl.dropdownRight === \'md\',\n      \'dropdown-menu-lg-right\': $ctrl.dropdownRight === \'lg\',\n      \'dropdown-menu-xl-right\': $ctrl.dropdownRight === \'xl\',\n      \'dropdown-menu-sm\': $ctrl.dropdownWidth === \'sm\',\n      \'dropdown-menu-md\': $ctrl.dropdownWidth === \'md\',\n      \'dropdown-menu-lg\': $ctrl.dropdownWidth === \'lg\'\n    }">\n\n    <li ng-if="$ctrl.filter">\n      <a href="" class="tw-select-filter-link p-a-0" tabindex="-1"\n        ng-focus="$ctrl.filterFocus()">\n        <div class="input-group">\n          <span class="input-group-addon"><span class="icon icon-search"></span> </span>\n          <input type="text"\n            class="form-control tw-select-filter"\n            placeholder="{{$ctrl.filter}}"\n            ng-model="$ctrl.filterString"\n            ng-change="$ctrl.filterChange()"\n            ng-keydown="$ctrl.filterKeydown($event)" />\n        </div>\n      </a>\n    </li>\n\n    <li ng-class="{active: !$ctrl.selected}"\n      ng-if="$ctrl.placeholder && !$ctrl.ngRequired && !$ctrl.filter">\n      <a href="" tabindex="-1"\n        ng-click="$ctrl.placeholderClick()"\n        ng-focus="$ctrl.placeholderFocus()"\n        class="tw-select-placeholder" tw-focusable>\n        {{$ctrl.placeholder}}\n      </a>\n    </li>\n\n    <li ng-if="($ctrl.placeholder && !$ctrl.ngRequired) || $ctrl.filter" class="divider"></li>\n\n    <li\n      ng-repeat="option in $ctrl.filteredOptions"\n      ng-class="{\n        \'active\': $ctrl.ngModel === option.value,\n        \'disabled\': option.disabled,\n        \'dropdown-header\': option.header,\n        \'tw-select-option\': !option.header && !option.disabled\n      }">\n      <span ng-if="option.header" class="text-ellipsis">{{option.header}}</span>\n      <a href=""\n        ng-if="!option.header"\n        ng-click="$ctrl.optionClick(option, $event)"\n        ng-focus="$ctrl.optionFocus(option)"\n        ng-class="{\'tw-select-option-link\': !option.disabled}"\n        index="{{$index}}"\n        tabindex="-1"\n        tw-focusable >\n        <div ng-if="option.icon && option.secondary"\n          class="circle circle-inverse pull-xs-left circle-sm">\n          <span class="icon {{option.icon}}"></span>\n        </div>\n        <span ng-if="option.icon && !option.secondary"\n          class="icon {{option.icon}} pull-xs-left" >\n        </span> <span ng-if="option.currency"\n          class="currency-flag currency-flag-{{option.currency | lowercase}} pull-xs-left" >\n        </span> <span class="circle circle-inverse pull-xs-left"\n          ng-class="{\n            \'circle-sm\': option.secondary,\n            \'circle-xs\': !option.secondary\n          }"\n          ng-if="option.circleText || option.circleImage || option.circleIcon">\n          <span class="tw-select-circle-text"\n            ng-if="option.circleText">{{option.circleText}}</span>\n          <img alt="{{option.label}}"\n            ng-if="option.circleImage"\n            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n            ng-src="{{option.circleImage}}" />\n          <span ng-if="option.circleIcon" class="icon {{option.circleIcon}}"></span>\n        </span>{{option.label}}<span\n          ng-if="option.note" class="tw-select-note small m-l-1">{{option.note}}</span><span\n          ng-if="option.secondary"\n          class="tw-select-secondary small text-ellipsis">{{option.secondary}}</span>\n      </a>\n    </li>\n\n    <li ng-if="$ctrl.hasTranscluded" class="divider"></li>\n\n    <li ng-transclude ng-if="$ctrl.hasTranscluded" class="tw-select-transcluded"></li>\n  </ul>\n</div>\n<input type="hidden" class="tw-select-hidden"\n  name="{{$ctrl.name}}"\n  value="{{$ctrl.ngModel}}"\n  ng-disabled="$ctrl.ngDisabled" />\n';
}, function(module, exports) {
    module.exports = '<div class="text-center tw-upload-droppable-box"\n  ng-class="{\'active\': $ctrl.isActive}">\n  <span class="icon icon-upload tw-upload-droppable-icon"></span>\n  <h4 class="m-t-2" ng-if="$ctrl.title">{{$ctrl.title}}</h4>\n  <div class="row">\n    <div class="col-xs-12 col-sm-6 col-sm-offset-3 m-t-1">\n    <ng-transclude></ng-transclude>\n    <label class="link" for="file-upload">{{$ctrl.cta}}</label>\n    <input tw-file-select id="file-upload"\n      type="file"\n      accept="{{$ctrl.accept}}"\n      class="hidden"\n      on-user-input="$ctrl.onManualUpload"/>\n    </div>\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div class="droppable" ng-class="{\n  \'droppable-sm\': $ctrl.size ===\'sm\',\n  \'droppable-md\': $ctrl.size ===\'md\' || !$ctrl.size,\n  \'droppable-lg\': $ctrl.size ===\'lg\',\n  \'droppable-dropping\': $ctrl.isDroppable,\n  \'droppable-processing\': !$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError),\n  \'droppable-complete\': $ctrl.isDone\n}">\n  <div class="droppable-default-card" aria-hidden="{{$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <div class="m-b-2">\n        <span class="icon icon-{{$ctrl.viewIcon}} icon-xxl"></span>\n      </div>\n      <h4 class="m-b-1" ng-if="$ctrl.label || $ctrl.description">\n        {{$ctrl.label || $ctrl.description}}\n      </h4>\n      <p class="m-b-2">{{$ctrl.placeholder || $ctrl.instructions}}</p>\n      <label class="btn btn-primary">{{$ctrl.buttonText}}\n        <input tw-file-input\n          type="file"\n          accept="{{$ctrl.accept}}"\n          class="tw-droppable-input hidden"\n\n          name="file-upload"\n          on-user-input="$ctrl.onManualUpload()"\n          ng-model="$ctrl.inputFile" />\n        <!-- ng-change="$ctrl.onManualUpload()" -->\n      </label>\n    </div>\n  </div>\n  <div class="droppable-processing-card droppable-card"\n    aria-hidden="{{$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <h4 class="m-b-2">\n        <span ng-if="$ctrl.isProcessing && $ctrl.processingText">{{$ctrl.processingText}}</span>\n        <span ng-if="$ctrl.isSuccess && $ctrl.successText">{{$ctrl.successText}}</span>\n        <span ng-if="$ctrl.isError && $ctrl.failureText">{{$ctrl.failureText}}</span>\n      </h4>\n      <tw-process size="sm" state="$ctrl.processingState"\n        ng-if="($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"></tw-process>\n    </div>\n  </div>\n  <div class="droppable-complete-card droppable-card"\n    aria-hidden="{{!$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError">\n        <h4 class="m-b-2" ng-if="$ctrl.label">\n          {{$ctrl.label}}\n        </h4>\n        <img\n          ng-if="$ctrl.isImage"\n          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n          ng-src="{{$ctrl.image}}"\n          alt="OK"\n          class="thumbnail m-b-3" />\n        <span class="icon icon-pdf icon-xxl" ng-if="!$ctrl.isImage"></span>\n        <p class="text-ellipsis m-b-2">{{$ctrl.fileName}}</p>\n      </div>\n      <div ng-if="!$ctrl.hasTranscluded && $ctrl.isError">\n        <h4 class="m-b-2" ng-if="$ctrl.isTooLarge">{{$ctrl.tooLargeMessage}}</h4>\n        <h4 class="m-b-2" ng-if="$ctrl.isWrongType">{{$ctrl.wrongTypeText}}</h4>\n        <h4 class="m-b-2" ng-if="!$ctrl.isTooLarge && $ctrl.errorMessage">{{$ctrl.errorMessage}}</h4>\n        <span class="icon icon-alert icon-xxl text-danger m-b-1"></span>\n      </div>\n      <div ng-if="$ctrl.hasTranscluded" ng-transclude></div>\n      <p ng-if="$ctrl.cancelText" class="m-t-2 m-b-0">\n        <a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a>\n      </p>\n    </div>\n  </div>\n  <div class="droppable-dropping-card droppable-card">\n    <div class="droppable-card-content">\n      <h4 class="m-b-2">Drop file to start upload</h4>\n      <div class="circle circle-sm">\n        <span class="icon icon-add"></span>\n      </div>\n      <p class="m-t-2 m-b-0"></p>\n    </div>\n  </div>\n</div>\'\n';
}, function(module, exports) {
    module.exports = '<li class="list-group-item p-a-0 list-group-item-{{$ctrl.state}}"\n  ng-class="{\n    \'active\': $ctrl.open,\n    \'disabled\': $ctrl.disabled\n  }">\n\n  <div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)">\n    <div class="media">\n      <div class="media-left">\n        <div class="circle circle-sm circle-responsive"\n          ng-class="{\'circle-inverse\': !$ctrl.inactive }">\n          <div ng-transclude="cardIcon"></div>\n        </div>\n      </div>\n      <div class="media-body" ng-transclude="collapsedCard"></div>\n    </div>\n  </div>\n\n  <div class="collapse"\n    ng-attr-aria-expanded="{{ $ctrl.open }}"\n    ng-class="{\'in\': $ctrl.open }"\n    ng-if="$ctrl.open" >\n\n    <div class="p-l-panel p-r-panel p-b-panel">\n      <div class="media">\n        <div class="media-left">\n          <div class="circle circle-sm circle-inverse circle-responsive invisible"></div>\n        </div>\n        <div class="media-body">\n          <hr class="m-t-0 hidden-xs hidden-sm" />\n          <a href="" ng-click="$ctrl.toggle($ctrl.index)"\n            class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1 tw-card-back">\n            <span class="icon icon-left-arrow icon-xxl"></span>\n          </a>\n          <div ng-transclude="expandedCard"></div>\n        </div>\n      </div>\n    </div>\n\n    <div class="well p-l-panel p-r-panel" ng-if="$ctrl.hasForm">\n      <div class="media">\n        <div class="media-left">\n          <div class="circle circle-sm circle-responsive invisible"></div>\n        </div>\n        <div class="media-body" ng-transclude="cardForm"></div>\n      </div>\n    </div>\n\n  </div>\n</li>\n';
}, function(module, exports) {
    module.exports = '<ul ng-transclude\n  class="list-group panel-list-group list-group-slide-out"\n  ng-class="{\'list-group-inactive\': $ctrl.inactive}">\n</ul>\n';
}, function(module, exports) {
    module.exports = '<div class="loader">\n  <div class="loader-spinner"></div>\n  <div class="loader-flag">\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      class="loader-flag-outline"\n      viewBox="-2 -2 56 56">\n      <polygon\n        class="loader-flag-stroke"\n        stroke="#00B9FF"\n        stroke-width="2"\n        stroke-linejoin="miter"\n        stroke-linecap="round"\n        stroke-miterlimit="10"\n        stroke-dasharray="300"\n        stroke-dashoffset="300"\n        fill="none"\n        points="24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8" />\n    </svg>\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      class="loader-flag-fill"\n      viewBox="0 2 52 48">\n      <polygon\n        fill="#00B9FF"\n        points="6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 "/>\n    </svg>\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = "<span class=\"process\"\n  ng-class=\"{\n    'process-success': $ctrl.processing === 1,\n    'process-danger': $ctrl.processing === -1,\n    'process-stopped': $ctrl.processing === 0,\n    'process-xs': $ctrl.size === 'xs',\n    'process-sm': $ctrl.size === 'sm',\n    'process-md': $ctrl.size === 'md',\n    'process-lg': $ctrl.size === 'lg',\n    'process-xl': $ctrl.size === 'xl'\n  }\">\n  <span class=\"process-icon-container\">\n    <span class=\"process-icon-horizontal\"></span>\n    <span class=\"process-icon-vertical\"></span>\n  </span>\n  <svg version=\"1.1\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    xml:space=\"preserve\">\n    <circle class=\"process-circle\" \n      cx=\"50%\"\n      cy=\"50%\"\n      ng-attr-r=\"{{$ctrl.radius}}\"\n      fill-opacity=\"0.0\" />\n  </svg>\n</span>\n";
}, function(module, exports) {
    module.exports = '<ul ng-if="$ctrl.tabs.length > 0"\n  class="nav nav-tabs m-b-3">\n  <li\n    ng-repeat="tab in $ctrl.tabs track by $index"\n    ng-class="{\n      \'active\': $ctrl.active === tab.type\n    }">\n    <a href="" ng-click="$ctrl.switchTab(tab.type)">\n      {{tab.label}}\n    </a>\n  </li>\n</ul>\n';
} ]);