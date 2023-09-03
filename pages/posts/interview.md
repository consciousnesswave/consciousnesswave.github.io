---
title: Interview
date: 2023/08/10
description: About my interview.
tag: work
author: consciousnesswave
---

# Interview

## Basic

### HTML

-   HTML 语义化

    -   可读性

    -   SEO(TDK)

### CSS

#### CSS 盒模型

-   box-sizing：content-box（默认模式），offsetWidth = content + padding + border，border-box（常用）, offsetWidth = width

    -   clientWidth = content + padding

    -   offsetTop、offsetLeft 元素相对于父元素的位置

    -   scroll

        -   scrollTop、scrollLeft 卷起距离

        -   scrollWidth = 子元素实际内容宽度 + padding

-   BFC（块级格式化上下文）

    -   float

    -   position: absolute

    -   overflow: hidden

    -   display: inline-block、flex/grid(子元素)

    -   案例

        -   margin 纵向重叠

        -   清除浮动

-   margin 负值

    -   左上方向 margin 负值，元素向左上方移动

    -   右下方向 margin 负值，元素塌陷

#### 布局

-   float 布局

    -   圣杯布局，双飞翼布局 优先渲染

    -   margin 负值，padding（圣杯）margin（双飞翼）

    -   flex 布局, order 控制次序

-   居中

    -   margin: 0 auto

    -   position: absolute + transform: translate(-50%, -50%)

    -   flex

    -   absolute 0 + margin: auto

-   响应式布局

    -   `fontSize：clientWidth/375` rem

    -   `(100/375) * 设计宽度` vw

-   css 变量

    ```css
    :root {
        --main-bg-color: brown;
    }
    element {
        background-color: var(--main-bg-color);
    }
    @color: #f93d66; // less
    ```

-   getBoundingClientRect 获取元素相对于视口的位置

-   IntersectionObserver 监听元素是否进入视口 `io.observe(document.getElementById('example'))`

### JS

-   typeof

    -   值类型 函数类型

    -   Object.prototype.toString.call().slice(8, -1)

-   for...in 和 for...of

    -   for...in 遍历可枚举数据 key 对象、数组、字符串

    -   for...of 遍历可迭代数据 value 数组、字符串、Map、Set 异步遍历（awiat）

#### 原型链

-   prototype

    -   foo

        -   `foo ---__proto__ ---> Foo.prototype ---constructor--> Foo`

        -   `Foo ---__proto__ ---> Function.prototype`

        -   `Foo.prototype ---__proto__ ---> Object.prototype`

    -   obj

        -   `obj ---__proto__ ---> Object.prototype ---constructor--> Object`

        -   `Object.prototype ---__proto__ ---> null`

        -   `Object ---__proto__ ---> Function.prototype`

    -   function

        -   `Function.prototype ---constructor--> Function`

        -   `Function.prototype ---__proto__ ---> Object.prototype`

-   extends 依靠 `__proper__` 实现

-   jQuery Class

    -   plugin jQuery.prototype.dialig = () => {}

    -   拓展 extends

#### 作用域

-   闭包

    -   函数作为返回值

    -   函数作为参数

    -   闭包缓存变量，不受外界影响 e.g. react hook 闭包陷阱

-   this

    -   () => {} 父级函数作用域

    -   new

    -   call、apply、bind

    -   运行时

#### 异步

-   event loop

    -   同步执行，异步记录 ---> event loop

    -   注意 await 行后面的代码为异步回调

-   宏任务，微任务

    -   宏 setTimeout、setInterval、Ajax、DOM event

    -   微 Promise async/await MutationObserver(监听 DOM 变化)

    -   同步代码---微任务---DOM 渲染---宏任务

    -   多个 promise 多个 then

        -   then 交替执行

        -   return promise 慢两拍

#### BOM

-   navigator.userAgent 识别端

-   location search href pathname protocol host hash

-   history window.onpopstate+history.pushState（MPA 中的 SPA 实现）

-   hash window.onhashchange+location.hash

##### network

-   XMLHttpRequest readyState-->status

-   restful API

    -   url 为资源标识 method 操作类型

-   header

    -   res: connection（keep-alive）、cookie、UA、referer（防盗链）

    -   req: Content-type、Cache-Control（no-cache or max-age 强制缓存）、Last-Modified Etag（304 协商缓存）、HttpOnly（禁止修改 cookie）

-   渲染

    -   url---dns---tcp(3+4)---http---response

    -   dom tree、cssom---render tree---paint

    -   document.addEventListener("DOMContentLoaded", () => {// dom}) --- window.addEventListener("load", () => {// all})

#### 性能

-   节流防抖

-   代码压缩，分割命中 304 缓存

-   CDN

-   SSR

-   懒加载 可视区域 + data-src

-   缓存查询 dom，合并修改，display:none 或者 createDocumentFragment

-   DOMContentLoaded 执行 js

-   requetAnimationFrame 帧优化 每次渲染完都会执行，高优（宏任务）

-   requestIdleCallback filber 空闲时间执行，低优（宏任务）

-   减少重绘重排

    -   CSS3 的 GPU 渲染

    -   BFC

#### 手写

-   防抖（结果）

    ```javascript
    function debounce(fn, delay) {
        let timer = null;
        return function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                timer = null;
            }, delay);
        };
    }
    ```

-   节流（过程）

    ```javascript
    function throttle(fn, delay) {
        let timer = null;
        return function () {
            if (timer) {
                return;
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                timer = null;
            }, delay);
        };
    }
    ```

-   createCache 函数定义的作用域查找变量

    ```javascript
    function createCache() {
        const data = {};
        return {
            set(key, value) {
                data[key] = value;
            },
            get(key) {
                return data[key];
            },
        };
    }

    const cache = createCache();
    cache.set("a", 100);
    cache.get("a");
    ```

-   deepClone

    ```javascript
    function deepClone(obj) {
        if (typeof obj !== "object" || obj == null) {
            return obj;
        }
        let result;
        if (obj instanceof Array) {
            result = [];
        } else {
            result = {};
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepClone(obj[key]);
            }
        }
    }
    ```

-   aplly

    ```javascript
    Function.prototype.myApply = function (context = gobalThis, args) {
        const fnName = Symbol();
        context.fnName = this; // this 指向调用 myApply 的函数
        const result = context.fnName(...args);
        delete context.fnName;
        return result;
    };

    function test(a, b) {
        console.log(this.name);
        console.log(a + b);
    }

    const obj = {
        name: "obj",
    };

    test.myApply(obj, [1, 2]);
    ```

-   bind

    ```javascript
    Function.prototype.myBind = function (context, ...args1) {
        const fn = this;
        return function (...args2) {
            return fn.apply(context, args2.concat(...args1));
        };
    };

    function test(a, b) {
        console.log(this.name);
        console.log(a + b);
    }

    const obj = {
        name: "obj",
    };

    const fn = test.myBind(obj, 1);
    fn(2);
    ```

-   获取地址

    ```javascript
    function query(name) {
        const search = location.search;
        const params = new URLSearchParams(search);
        return params.get(name);
    }
    ```

-   flat

    ```javascript
    function flat(arr) {
        return arr.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
        }, []);
    }

    const arr = [1, [2, [3, [4, 5]]], 6];
    console.log(flat(arr));
    ```

-   new

    ```javascript
    function newFn(fn, ...args) {
        // obj.__proto__ = fn.prototype
        const obj = Object.create(fn.prototype);
        fn.apply(obj, args);
        return obj;
    }

    function Person(name) {
        this.name = name;
    }

    const person = newFn(Person, "name");
    ```

-   深度和广度优先遍历

    ```javascript
    // 深度优先遍历
    function dfs(tree) {
        console.log(tree.value);
        tree.children.forEach((item) => {
            dfs(item);
        });
    }

    // 广度优先遍历
    function bfs(tree) {
        const queue = [tree];
        while (queue.length) {
            const node = queue.shift();
            console.log(node.value);
            node.children.forEach((item) => {
                queue.push(item);
            });
        }
    }
    ```

-   lazyMan

    ```javascript
    class LazyMan {
        constructor(name) {
            this.name = name;
            this.queue = [];
            setTimeout(() => {
                this.next();
            }, 0);
        }
        next() {
            const fn = this.queue.shift();
            fn && fn();
        }
        sleep(time) {
            this.queue.push(() => {
                setTimeout(() => {
                    console.log(`Wake up after ${time}`);
                    this.next();
                }, time * 1000);
            });
            return this;
        }
        eat(food) {
            this.queue.push(() => {
                console.log(`Eat ${food}`);
                this.next();
            });
            return this;
        }
    }

    const lazyMan = new LazyMan("tom");
    lazyMan.sleep(3).eat("dinner");
    ```

-   函数科里化

    ```javascript
    function curry(fn) {
        const fnLength = fn.length;
        let args = [];

        return function calc(...newArgs) {
            args = [...args, ...newArgs];
            if (args.length < fnLength) {
                return calc;
            } else {
                return fn.apply(this, args.slice(0, fnArgsLength));
            }
        };
    }

    function add(a, b, c) {
        return a + b + c;
    }

    const curryAdd = curry(add);
    curryAdd(1)(2)(3);
    ```

-   instanceOf

    ```javascript
    function instanceOf(left, right) {
        let proto = left.__proto__;
        while (true) {
            if (proto === null) {
                return false;
            }
            if (proto === right.prototype) {
                return true;
            }
            proto = proto.__proto__;
        }
    }
    ```

    -   EventBus

    ```javascript
    class EventBus {
        constructor() {
            this.events = {};
            this.onceEvents = {};
        }
        on(type, fn) {
            const events = this.events;
            if (!events[type]) {
                events[type] = [];
            }
            events[type].push(fn);
        }
        once(type, fn) {
            const events = this.onceEvents;
            if (!events[type]) {
                events[type] = [];
            }
            events[type].push(fn);
        }
        off(type, fn) {
            const fnList = this.events[type];
            const onceFnList = this.onceEvents[type];
            if (fnList) {
                this.events[type] = fnList.filter((item) => item !== fn);
            }
            if (onceFnList) {
                this.onceEvents[type] = onceFnList.filter((item) => item !== fn);
            }
        }
        emit(type, ...args) {
            const fnList = this.events[type];
            const onceFnList = this.onceEvents[type];
            if (fnList) {
                fnList.forEach((fn) => {
                    fn(...args);
                });
            }
            if (onceFnList) {
                onceFnList.forEach((fn) => {
                    fn(...args);
                });
                delete this.onceEvents[type];
            }
        }
    }

    const eventBus = new EventBus();
    eventBus.on("click", () => {
        console.log("click");
    });
    eventBus.once("click", () => {
        console.log("click once");
    });
    eventBus.emit("click");
    eventBus.emit("click");
    ```

#### 拓展

-   安全

    -   XSS script 标签

    -   CSRF 伪造请求

    -   点击劫持

    -   DDOS

    -   SQL 注入

-   垃圾回收

    -   引用计数（循环引用）

    -   标记清除（遍历根节点）

    -   全局变量、定时器、事件监听、自定义事件

    -   weakMap、weakSet 弱引用

-   进程-->线程

    -   js 单线程

    -   web worker 进程

-   jsBridge

    -   初始化 webview 时，注入 call 方法

    -   execute 返回 promise， promise window 绑定回调函数后调用 call

    -   路由是带协议参数的 jsBridge 方法

## vue

### Base

-   监听

    -   computed

        -   v-model 使用需要值设置 get set

        -   多对一 创建新数据

    -   watch

        -   引用类型 无法获取 oldValue

        -   一对多 异步监听

-   v-for 优先级高于 v-if

-   通信

    -   props $emit

    -   event $emit $on $off (Vue instance || event-emitter)

    -   $attrs($listeners) 父组件传递的非 prop 属性

    -   $parent $children ref

    -   provide inject

        ```javascript
        provide() {
            return {
                injectData: computed(() => this.data),
                obj: this.obj,// 对象响应式
            };
        },
        inject: ["injectData"],
        ```

-   生命周期

    -   beforeCreate 空白 Vue 实例

    -   beforeMount 编译模板，调用 render 生成 vdom

    -   mounted

        -   同步子组件（除异步组件、`<Suspense>`）

        -   $nextTick 完全渲染

        -   ajax 时机 逻辑清晰

-   实现 v-model

    ```vue
    <template>
        <input :value="value" @input="$emit('change', $event.target.value)" />
    </template>
    <script>
    export default {
        model: {
            prop: "value",
            event: "change",
        },
        props: {
            value: {
                type: String,
                default: "",
            },
        },
    };
    </script>

    <template>
        <Input v-model="value" />
    </template>
    ```

-   slot（modal 封装）

    ```vue
    <Demo>
        <template v-slot="slotProps" slot="slotDemo">
            {{slotProps.slotData.title}}
        </template>
    </Demo>
    <template>
        <slot :slotData="sonData" name="slotDemo">
            {{ "default" }}
        </slot>
    </template>
    ```

    -   suspense v3 异步组件

        ```vue
        <Suspense>
            <template>
                <Test /> // 异步组件
            </template>
            <template v-slot:fallback>
                <div>loading...</div>
            </template>
        </Suspense>
        ```

-   动态组件

    ```vue
    <!-- 活动根据地址显示不同组件 -->
    <component :is="currentTabComponent"></component>
    ```

-   keep-alive

        -   include 排除

        -   exclude 包含

        -   activated deactivated 生命周期

        -   列表页缓存，详情页不缓存

-   mixin 优先级高于组件

-   teleport to 任意位置

### vuex

-   state getters:computed ---> mapState,mapGetters

-   mutations

    -   commit

    -   methods ---> mapMutations

-   actions

    -   dispatch---commit

    -   methods ---> mapActions

-   modules createNamespacedHelpers

### vue-router

-   mode：history hash memory(路由不变，组件变化)

-   router-view router-link，$route $router(e.g. push)

-   路由守卫（next--->return boolean）

    -   全局守卫

        -   beforeEach

        -   beforeResolve (组件解析完)

        -   afterEach

    -   路由独享守卫

        -   beforeEnter

    -   组件内守卫

        -   beforeRouteEnter

        -   beforeRouteUpdate

        -   beforeRouteLeave

-   vue.use(plugin)

    ```javascript
    const MyPlugin = {};
    MyPlugin.install = function (Vue，Options){}
    ```

-   vue.directive

    -   v-draggable

    ```javascript
    Vue.directive("draggable", {
        bind(el, binding, vnode, oldVnode) {
            el.onmousedown = function (e) {
                const disX = e.clientX - el.clientLeft;
                const disY = e.clientY - el.clientTop;
                document.onmousemove = function (e) {
                    el.style.left = e.clientX - disX + "px";
                    el.style.top = e.clientY - disY + "px";
                };
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        },
        unbind(el) {
            el.onmousedown = null;
        },
    });
    ```

    -   v-longpress

    ```javascript
    Vue.directive("longpress", {
        bind(el, binding, vnode, oldVnode) {
            let timer = null;
            el.onmousedown = function () {
                timer = setTimeout(() => {
                    binding.value();
                }, 1000);
            };
            el.onmouseup = function () {
                clearTimeout(timer);
            };
        },
        unbind(el) {
            el.onmousedown = null;
            el.onmouseup = null;
        },
    });
    ```

-   vue.extend(Vue 构造器)

    ```javascript
    // 命令式弹窗
    const Dialog = Vue.extend(dialog);
    const app = new Dialog().$mount(document.createElement("dialog-box"));
    for (let key in options) {
        app[key] = options[key];
    }
    document.body.appendChild(app.$el);
    ```

-   $props `<Demo v-bind="$props" />`

-   composition API

    -   ref reactive

        -   ref 基本类型

        -   reactive 对象

    -   toRef toRefs

        -   toRef(obj, key) 解构单个 reactive 对象

        -   toRefs(obj) 解构 reactive 对象

### principle

-   编译

    -   render 函数的形参 createElemet(tag, props, children) ---> vnode

-   vue 响应式

    -   Object.defineProperty

        ```javascript
        const obj = {};
        Object.defineProperty(obj, "name", {
            get() {
                console.log("get");
                return val;
            },
            set(newVal) {
                console.log("set");
                val = newVal;
            },
        });

        obj.name = "name";
        console.log(obj.name);
        ```

        -   深度监听性能差

        -   无法监听数组，数组索引修改不具备响应式

        -   无法监听新增、删除属性 Vue.set(obj, "age", 18) Vue.delete(obj, "age")

    -   Proxy

        ```javascript
        const obj = {};
        const proxy = new Proxy(obj, {
            get(target, key, receiver) {
                const result = Reflect.get(target, key, receiver);
                console.log("get", key);
                return result;
            },
            set(target, key, value, receiver) {
                const result = Reflect.set(target, key, value, receiver);
                console.log("set", key, value);
                return result;
            },
            deleteProperty(target, key) {
                const result = Reflect.deleteProperty(target, key);
                console.log("deleteProperty", key);
                return result;
            },
        });

        proxy.name = "name";
        console.log(proxy.name);
        ```

        -   惰性监听

-   虚拟 DOM

    -   tag props children

    -   patch(dom, vnode)

    -   diff

        -   同层比较，不深度比较 双指针

        -   key 就地复用

        -   双端比较（V2），最长递增子序列、patchFlag、静态提升、函数缓存（V3）

## react

-   setState

    -   不可改变原有值

    -   同步 setTimeout、setInterval、promise.then 自定义 DOM 事件 ajax 回调（v17）

    -   函数不会合并 (preState, props) => ()

-   createPortal 挂载到指定 DOM 节点

-   异步组件

    -   React.lazy(() => import("./Test"))

    -   Suspense fallback

-   性能优化

    -   shouldComponentUpdate

    -   PureComponent 类组件 浅比较

    -   React.memo 函数组件

    -   immutable.js

-   组件复用

    -   `const HOC = (WrappedComponent) => (props) => <WrappedComponent {...props} />`

    -   render props `<Test render={(data) => <div>{data}</div>} />`

### react-redux

-   单向数据流 dispatch(action:{type: String,value: any})--->reducer(swtich)--->state

-   react-redux

    -   Provider

    -   connect(mapStateToProps, mapDispatchToProps)(Component)

        -   mapStateToProps(state, ownProps)

        -   mapDispatchToProps(dispatch, ownProps)

-   redux-thunk

    -   applyMiddleware(thunk)

    -   action 返回函数(dispatch)

-   combineReducers

    -   combineReducers({reducer1, reducer2})

    -   state.reducer1

    -   actionType 做 namespace

-   redux toolkit

    -   configureStore({reducer1, reducer2})

    -   createSlice

        ```javascript
        const counterSlice = createSlice({
            name: "counter",
            initialState: {
                value: 0,
            },
            reducers: {
                increment(state) {
                    state.value++;
                },
                decrement(state) {
                    state.value--;
                },
            },
            extraReducers(builder) {
                builder.addCase(incrementAsync.fulfilled, (state, action) => {
                    state.value += action.payload;
                });
            },
        });

        export const incrementAsync = createAsyncThunk("counter/incrementAsync", async (amount) => {
            const response = await fetchCount(amount);
            return response.data;
        });

        export const { increment, decrement } = counterSlice.actions;
        export default counterSlice.reducer;
        ```

    -   use

        -   import counterSlice

        -   useSelector(state => state.counter.value)

        -   useDispatch()，dispatch(increment())

### react-router

-   use

    -   createBrowserRouter(createHashRouter) 创建 router 实例 `<RouterProvider router={router}></RouterProvider>`

    -   Outlet 路由占位

    -   useNavigate 跳转

    -   useSearchParams 获取 query 参数，useParams 获取 param 动态路由参数（:id）

### hooks(re-render 依赖执行顺序)

    -   useState（useReducer）

        -   初始化函数只执行一次

    -   useEffect

        -   依赖为值类型

        -   修改 state 可借助 ref

        -   依赖空时 componentwillmount 有值 componentdidupdate

        -   依赖空时return函数 componentwillUnMount 有值 其他情况组件更新时执行

    -   useRef

    -   useContext

    -   useMemo 缓存值

    -   useCallback 缓存函数

### principle

-   函数式编程，纯函数、不可变值

-   合成事件

-   diff oldNode 仅右移

## webapck

-   module---chunk---bundle

-   base

    -   merge 合并配置

    -   devServer

    -   module

        -   noParse(min.js 引入不解析 e.g. noParse:/jquery/)

        -   rules loader

-   loader

    -   babel-loader(cacheDirectory exclude)

    -   css-loader postcss-loader(autoprefixer)

    -   url-loader

-   plugin

    -   html-webpack-plugin (多入口 enytry、output[name])

    -   clean-webpack-plugin

    -   mini-css-extract-plugin(style-loader---> loader)

    -   define-plugin(环境变量)

    -   ignore-plugin(忽略引入 moment 语言包)

-   optimization

    -   minimizer

        -   terser-webpack-plugin(js)

        -   optimize-css-assets-webpack-plugin(css)

    -   splitChunks

        -   cacheGroups

            -   vendors(node_modules)

            -   commons(多入口时,commons.chunks 和 html-webpack-plugin.chunks 通过配置对应)

-   线程插件

    -   happypack(多线程编译) babel-loader--->happypack/loader

    -   parallel-webpack(多进程 uglifyjs 压缩)

-   dll

    -   webpack.DllPlugin dll + manifest.json

    -   webpack.DllReferencePlugin

-   自定义 loader

    ```javascript
    module.exports = function (source) {
        return source.replace("hello", "world");
    };
    ```

-   自定义插件

    -   compiler.hooks

        -   emit 生成资源到 output 目录之前

        -   afterEmit 生成资源到 output 目录之后

        -   done 编译完成

    -   Tapable

        -   tap 同步钩子

        -   tapAsync 异步钩子 callback()

        -   tapPromise promise 钩子 return promise

    ```javascript
    class MyPlugin {
        constructor(options) {
            this.options = options;
            this.options.localUrlIn = this.options.localUrlIn || "./build";
            this.options.localUrlOut = this.options.localUrlOut || "./zip";
            this.options.project_name = this.options.project_name || "offline";
            this.options.business_name = this.options.business_name || "liujianfang";
        }
        apply(compiler) {
            compiler.hooks.afterEmit.tap("OfflinePlugin", async (compilation) => {
                await this.uploadPackage(this.options.localUrlIn, this.options.version, "www"); // 上传到服务器www
                await this.zipFile(this.options.localUrlIn, this.options.localUrlOut); // 压缩文件
                await this.uploadPackage(this.options.localUrlOut, this.options.version, "zipbuild"); // 上传到服务器zipbuild
                await this.updatePackageApi(); // 更新中台数据
            });
        }
    }

    new OfflinePlugin({ version: version, pack_name: name, project_name: "offline-Alpha", main_file: "index.html", app_id: "com.huafang.hfofflinewebandroid" });
    ```

### babel

-   polyfill

    -   core-js(可配置按需引入)

    -   regenerator

-   babel-runtime(不污染全局)

## JQuery

-   取值赋值二合一

-   筛选方法

    -   find 查找后代元素

    -   siblings 查找兄弟元素 排他思想

    -   hasClass 判断是否有类名

    -   eq 获取指定索引元素

    -   选择器隐式迭代

-   链式编程

-   事件

    ```javascript
    $("body").on("click", "button", function () {});
    ```

## TypeScript

-   常用类型

    -   array

        -   `let arr: number[] = [1, 2, 3]`

        -   `let arr: (number | string)[] = [1, 2, 3, "4"]`

    -   函数

        -   `const add = (a: number=1, b?: number=1): number => a + b`

        -   `const add: (a: number, b: number) => number = (a, b) => a + b`

-   interface（支持继承）

-   修饰符

    -   public

    -   private 只能在类内部访问

    -   protected 当前类和子类可以访问

    -   readonly

-   抽象类(不常用)

    ```typescript
    abstract class Animal {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        abstract run(name: string): string;
    }

    class Dog extends Animal {
        constructor(name: string) {
            super(name);
        }
        run(name: string): string {
            return `${this.name} is running`;
        }
    }
    ```

-   类约束(不常用)

    ```typescript
    interface Animal {
        name: string;
        run(name: string): string;
    }

    interface X {
        title: string;
    }

    class Dog implements Animal，X {
        name: string;
        title: string;
        constructor(name: string, title: string) {
            this.name = name;
            this.title = title;
        }
        run(name: string): string {
            return `${this.name} is running`;
        }
    }
    ```

-   泛型

    ```typescript
    // normal
    const fun = <T>(arg: T): T => {
        return arg;
    };

    fun<string>("name");

    // interface
    interface Idata {
        length: number;
    }

    const fun = <T extends Idata>(arg: T): T => {
        return arg;
    };

    fun<string>("name");

    // class
    class Person<T> {
        name: T;
        constructor(name: T) {
            this.name = name;
        }
    }

    new Person<string>("name");

    // example
    type IResponse<T> = {
        data: T;
        code: string;
    };

    function query<T>(param: string): Promise<IResponse<T>> {
        return new Promise((resolve) => {}); // 省略部分代码
    }

    query<{ age: number }>("tom").then((res) => {
        if (res.code === "00000") {
            console.log(res.data.age); // number
        }
    });
    ```

-   声明文件 .d.ts

    -   declare (var function class enum)

        ```typescript
        declare let jQuery: (selector: string) => any;
        ```

    -   interface type

    -   export export default

## SSR

### Nuxt

-   生命周期

    -   服务端生命周期

        -   nuxtServerInit(store) 设置初始化数据

        -   middleware({store,route,redirect,params,query,req,res}) 全局、页面 守卫 中间件有执行顺序

        -   validate({params,query}) 路由校验

        -   asyncData({store,params}) 页面 return data

        -   fetch() 任何组件 this.data 注意版本

    -   共有生命周期

        -   beforeCreate

        -   created

-   路由

    -   子路由 `<nuxt-child />`

-   nuxt.config.js

    -   head(组件内为函数)

    -   plugins ({$axios,store,inject})=>{}

        -   axios api 封装

        -   第三方库

    -   modules

        -   @nuxtjs/router 自定义路由

        -   cookie-universal-nuxt 服务端设置 cookie

        -   @nuxtjs/axios

        -   @nuxtjs/proxy

        -   nuxt-ssr-cache 服务端缓存页面

-   部署

    -   build ==> .nuxt static nuxt.config.js package.json

    -   pm2

## Program

-   动态布局

    -   对象 deepclone

    -   页面重载，动画处理，弹窗系统

    -   路由空栈问题

    -   时序设计

    -   代码解耦，与互动层热区处理 ref or calss

    -   安卓 ios 差异

    -   布局文件和 socket 的使用策略

    -   核心方法

        -   getSyncPullInfo

        -   registerPLayoutOnClickCallback

        -   registerSyncPullInfoCallback

        -   invokePRoomLayoutMethods

-   班级博客

-   云乐汇

## Algorithm

-   时间复杂度

    -   二分时间复杂度 O(logn)

    -   unshift 等改变原数组索引 时间复杂度 O(n)

-   打印时间

    -   `console.time("time")`

    -   `console.timeEnd("time")`

-   链表

    ```typescript
    interface INode {
        value: any;
        next: INode | null;
        prev?: INode | null;
    }
    ```

    -   查询慢(时间复杂度 O(n))，增删快(时间复杂度 O(1)) 数组反之

    -   react fiber

    -   反转链表

-   二叉树

    ```typescript
    interface INode {
        value: any;
        left: INode | null;
        right: INode | null;
    }
    ```

    -   前中后序遍历

    -   中序遍历二叉搜索树查找

        -   二叉搜索树：左子树所有节点小于根节点，右子树所有节点大于根节点

        -   二分法 贪心

-   方法

    -   指针 单循环，多指针

    -   递归 递归思路，循环（队列）实现

-   思维

    -   动态规划 爬楼梯、斐波那契数列、机器人走方格、背包

    -   贪心

    -   二分

-   排序

    -   快速排序(时间复杂度 O(nlogn))

    ```javascript
    const quickSort = (arr) => {
        if (arr.length <= 1) return arr;
        const midIndex = Math.floor(arr.length / 2);
        const midValue = arr[midIndex];
        const left = [];
        const right = [];
        for (let i = 0; i < arr.length; i++) {
            if (i !== midIndex) {
                if (arr[i] < midValue) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
        }
        return [...quickSort(left), midValue, ...quickSort(right)];
    };
    ```

    -   冒泡排序(时间复杂度 O(n^2))

    ```javascript
    // 写一个冒泡排序
    function bubbleSort(arr) {
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    ```

## Question

-   git lock

-   ios 时间格式

-   whistle 翻译 socket 插件

-   双击放大 300ms 延迟，viewport 设置 content="width=device-width,initial-scale=1.0"

-   禁止第三方 cookie，samesite

-   登陆信息验证

    -   JWT token

    -   cookie session

    -   设置 cookie domain 主域名共享 cookie

    -   SSO 单点登陆 localStorage + postMessage 通信

    -   OAuth2.0(三方登录)

-   网络协议

    -   HTTP 应用层

        -   H2.0 多路复用 一个 tcp 并发请求

        -   Https 非对称加密（公私钥）+对称加密（公钥生成的随机码）

        -   伪造证书，中间人攻击(抓包工具)

    -   TCP、UDP 传输层

-   资源加载

    -   defer 并行加载，最后执行

    -   async 并行加载，直接执行

    -   preload 优先加载

    -   prefetch 空闲加载

    -   dns-prefetch DNS 预查询

    -   preconnect DNS 预连接

-   页面通信

    -   websocket

    -   localStorage

    -   iframe，postMessage

    -   sharedWorker(webWorker)

-   首屏优化

    -   spa 路由懒加载

    -   SSR

    -   离线包 + 预加载

    -   分页、懒加载

-   10W 数据渲染

    -   中间层 node

    -   虚拟列表

-   监控

    -   window.onerror 可监听异步报错

    -   onunhandledrejection 监听 promise 报错

    -   Vue errorCaptured 下级、errorHandler 全局

    -   react ErrorBoundary 下级组件渲染报错

-   LRU 缓存淘汰算法(哈希+有序 = map)

    ```javascript
    class LRU {
        data = new Map();
        constructor(max) {
            this.max = max;
        }
        set(key, value) {
            const data = this.data;
            if (data.has(key)) {
                data.delete(key);
            }
            data.set(key, value);
            if (data.size > this.max) {
                const [key] = data.keys();
                data.delete(key);
            }
        }
        get(key) {
            const data = this.data;
            if (data.has(key)) {
                const value = data.get(key);
                data.delete(key);
                data.set(key, value);
                return value;
            }
            return -1;
        }
    }

    const lru = new LRU(3);
    lru.set(1, 1);
    lru.set(2, 2);
    lru.set(3, 3);
    lru.set(4, 4);
    lru.get(2);
    lru.set(5, 5);
    ```

-   数组--树

    ```javascript
    const arrToTree = (arr) => {
        const map = {};
        const tree = [];
        arr.forEach((item) => {
            map[item.id] = item;
        });
        arr.forEach((item) => {
            const parent = map[item.parentId];
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                tree.push(item);
            }
        });
        return tree;
    };

    const treeToArr = (tree) => {
        const arr = [];
        const queue = [...tree];
        while (queue.length) {
            const node = queue.shift();
            arr.push(node);
            if (node.children) {
                queue.push(
                    ...node.children.map((item) => {
                        item.parentId = node.id;
                        return item;
                    })
                );
            }
        }
        return arr;
    };
    ```

-   对象属性

    -   对象点的优先级高于赋值，赋值从右到左

    -   key 为字符串或者 Symbol，不是则调用 toString 方法

-   图片懒加载

    -   data-src

    -   scroll + getBoundingClientRect + clientHeight + 节流 or IntersectionObserver

-   从 0 到 1 的项目初期

    -   需求讨论 全员

    -   方案、时序、类图、技术选型、物料申请、排期

    -   gitlab、开发文档、代码环境

    -   接口文档对齐、jsbridge 文档

    -   使用文档

    -   测试

    -   上线

-   常用设计模式

    -   单例模式(createCache)

    -   工厂模式(new)

    -   观察者模式（DOM 事件）

    -   策略模式(if else, H5 活动页)

    -   发布订阅模式（自定义事件）

    -   代理模式（事件代理、Proxy 响应式）

    -   迭代器模式（for of、Generator）

    -   装饰器模式

-   es6

    -   let const

    -   解构赋值

    -   模板字符串

    -   扩展运算符

    -   箭头函数

    -   Symbol Map Set

    -   Proxy Reflect

    -   for of

    -   promise async await

    -   class (本质是函数)

-   js arrt 和 prop 的区别

    -   attr HTML 标签上的特性

    -   prop DOM 对象上的属性

-   轮播图, ios lazy 模式没有过度动画

-   vue 函数组件 只能使用 props

-   手写 Vnode

    ```javascript
    const VNode = {
        tag: "div",
        props: {
            className: "container",
            dataset: {
                id: 1,
            },
            on: {
                click: onClick,
            },
        },
        children: [
            "name",
            title,
            {
                tag: Component,
            },
        ],
    };
    ```

-   新技术

    -   SWC 代替 babel

    -   esbuild 代替 webpack

    -   deno 代替 node

    -   webAssembly 运行 js 以外的语言

-   跨域携带 cookie, XMLHttpRequest.withCredentials

-   setTimeout 代替 setInterval

-   合并两个递增数组，双指针 while 循环

-   实现 reactive、effect

    ```javascript
    const fns = new Set();
    let activeFn = null;
    function reactive(obj) {
        return new Proxy(obj, {
            get(target, key) {
                if (activeFn) {
                    fns.add(activeFn);
                }
                return target[key];
            },
            set(target, key, value) {
                target[key] = value;
                fns.forEach((fn) => fn());
            },
        });
    }
    function effect(fn) {
        activeFn = fn;
        fn();
    }

    const state = reactive({ count: 0 });
    effect(() => {
        console.log(state.count);
    });
    ```

-   docker webpack 代码不更新

    -   webpack watchOptions.poll

    -   python 模拟文件修改冒泡

    -   docker 外启动 webpack

    -   wsl2 linux

-   跳转风险 获取完整 url(new Url)

-   git 暂存 git stash pop

-   react 组件封装

    -   设计 props optionGroups valueGroups itemHeight height onChange

    -   init max 和 min 边界值 初始化选中项 transform

    -   picker onTouch 事件控制

        -   startTouch moveTouch pageY transform

        -   onTouchEnd 计算 activeIndex onChange

-   客服

    -   智齿

    -   容联七陌

-   数字千分位

    ```javascript
    function toThousands(num) {
        let res = "";
        for (let i = num.length - 1; i >= 0; i--) {
            const j = num.length - i;
            if (j % 3 === 0) {
                if (i === 0) {
                    res = num[i] + res;
                } else {
                    res = "," + num[i] + res;
                }
            } else {
                res = num[i] + res;
            }
        }
        return res;
    }

    console.log(toThousands("1234567890"));
    ```

-   实现 if（a == 1 && a == 2 && a == 3）{ console.log(1) }

    -   隐式转换 valueOf --> toString 生成基本类型

    ```javascript
    const a = {
        value: 1,
        valueOf() {
            return this.value++;
        },
    };
    if (a == 1 && a == 2 && a == 3) {
        console.log(1);
    }
    ```

-   手写 json.stringify

    ```javascript
    function stringify(obj) {
        const type = typeof obj;
        if (type !== "object" || obj === null) {
            return String(obj);
        } else {
            let res = [];
            const arrTag = Array.isArray(obj);
            for (let k in obj) {
                let item = obj[k];
                const type = typeof item;
                if (type !== "object" || item === null) {
                    item = String(item);
                } else if (type === "object") {
                    item = stringify(item);
                }
                res.push((arrTag ? "" : `${k}:`) + String(item));
            }
            return (arrTag ? "[" : "{") + String(res) + (arrTag ? "]" : "}");
        }
    }

    const obj = {
        a: 1,
        b: "2",
        c: undefined,
        d: function () {},
        e: {
            f: 3,
        },
        g: [4, 5, 6],
    };

    console.log(stringify(obj));
    ```

-   判断空对象

    -   Object.keys

    -   JSON.stringify
