import { SiteData } from '../.vitepress/theme/components/types'

export const linkData:SiteData[]=[
  {
    title:'常用工具',
    items: [{
        icon: 'https://caniuse.com/img/favicon-128.png',
        title: 'Can I use',
        desc: '前端 API 兼容性查询',
        link: 'https://caniuse.com'
      },{
        icon: 'https://tool.lu/favicon.ico',
        title: '在线工具',
        desc: '开发人员的工具箱',
        link: 'https://tool.lu'
      },{
        icon: 'https://www.markdown.xyz/favicon.ico',
        title: 'Markdown ',
        desc: 'Markdown 指南 是一份免费且开源的 Markdown 参考手册',
        link: 'https://www.markdown.xyz/'
      },{
        icon: 'https://www.bootcdn.cn/assets/ico/favicon.ico',
        title: 'BootCDN ',
        desc: '稳定、快速、免费的前端开源项目 CDN 加速服务',
        link: 'https://www.bootcdn.cn/'
      },{
        icon: 'https://tinypng.com/images/favicon.ico',
        title: 'TinyPNG ',
        desc: '在线png、jpg图片压缩工具',
        link: 'https://tinypng.com/'
      }
    ]
  },{
    title: 'JS相关文档',
    items: [
      {
        icon: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
        title: 'MDN|web开发者指南',
        desc: '关于CSS, HTML, and JavaScript 等web前端的技术文档',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript'
      },
      {
        icon: 'https://es6.ruanyifeng.com/favicon.ico',
        title: 'ES6 入门教程',
        desc: '阮一峰介绍 ECMAScript 6 新特性',
        link: 'https://es6.ruanyifeng.com/'
      },
      {
        icon: 'https://zh.javascript.info/img/favicon/favicon.png',
        title: '现代 JavaScript 教程',
        desc: '以最新的 JavaScript 标准为基准,为你讲解从基础到高阶的 JavaScript 相关知识',
        link: 'https://zh.javascript.info/'
      },{
        icon: 'https://www.tslang.cn/assets/images/icons/favicon-96x96.png',
        title: 'TypeScript',
        desc: 'TypeScript具有类型系统，且是JavaScript的超集',
        link: 'https://www.tslang.cn/'
      }, {
        icon: 'https://www.babeljs.cn/img/favicon.png',
        title: 'Babel',
        desc: 'Babel 是一个 JavaScript 编译器',
        link: 'https://www.babeljs.cn/'
      },{
        icon: '../public/label_logo/webassembly.png',
        title: 'WebAssembly',
        desc: 'WebAssembly/wasm WebAssembly 或者 wasm 是一个可移植、体积小、加载快并且兼容 Web 的全新格式',
        link: 'https://www.wasm.com.cn/'
      },
      {
        icon: 'https://wangdoc.com/assets/icons/favicon-96x96.png',
        title: '网道',
        desc: '复杂的技术，简单的讲解',
        link: 'https://wangdoc.com/'
      }
    ]
  }
  ,{
     title:'Vue生态',
     items: [
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 3',
        desc: '渐进式 JavaScript 框架',
        link: 'https://cn.vuejs.org'
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue 2',
        desc: '渐进式 JavaScript 框架',
        link: 'https://v2.cn.vuejs.org'
      },
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue Router',
        desc: 'Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由',
        link: 'https://router.vuejs.org/zh'
      },
      {
        icon: 'https://pinia.vuejs.org/logo.svg',
        title: 'Pinia',
        desc: '符合直觉的 Vue.js 状态管理库',
        link: 'https://pinia.vuejs.org/zh'
      },
      {
        icon: 'https://nuxt.com.cn/icon.png',
        title: 'Nuxt.js',
        desc: '一个基于 Vue.js 的通用应用框架',
        link: 'https://nuxt.com.cn/'
      },
      {
        icon: 'https://vueuse.org/favicon.svg',
        title: 'VueUse',
        desc: 'Vue Composition API 的常用工具集',
        link: 'https://vueuse.org'
      },
      {
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        title: 'Element Plus',
        desc: '基于 Vue 3，面向设计师和开发者的组件库',
        link: 'https://element-plus.org'
      },
      {
        icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
        title: 'Ant Design Vue',
        desc: 'Ant Design 的 Vue 实现，开发和服务于企业级后台产品',
        link: 'https://antdv.com'
      }
     ]
  },{
    title: 'React生态',
    items: [{
        icon: 'https://legacy.reactjs.org/favicon.ico',
        title: 'React',
        desc: '用于构建 Web 和原生交互界面的库',
        link: 'https://react.docschina.org/'
    },{
        icon: 'https://www.mobxjs.com/img/mobx.png',
        title: 'MobX',
        desc: '简单，可扩展的状态管理',
        link: 'https://www.mobxjs.com/'
    },{
        icon: 'https://reactrouter.com/favicon-light.png',
        title: 'React Routers',
        desc: '一个用于 React 的声明式、基于组件的客户端和服务端路由库',
        link: 'https://reactrouter.com/en/main'
    },{
        icon: 'https://www.reduxjs.cn/img/redux.png',
        title: 'Redux',
        desc: 'Redux 是 JavaScript 应用程序的状态容器，提供可预测的状态管理',
        link: 'https://www.reduxjs.cn/'
    }
  ]
  },{
    title: 'Node相关',
    items: [
      {
        icon: 'https://nodejs.org/static/images/favicons/favicon.png',
        title: 'Node',
        desc: 'Node.js® 是一个开源、跨平台的 JavaScript 运行时环境',
        link: 'https://nodejs.org/'
    },{
        icon: 'https://www.expressjs.com.cn/images/favicon.png',
        title: 'Express',
        desc: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架',
        link: 'https://www.expressjs.com.cn/'
    },{
        icon: '../public/label_logo/logo_koa.jpg',
        title: 'Koa',
        desc: 'Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石',
        link: 'http://www.koajs.com.cn/'
    },{
        icon: 'https://hapi.dev/favicon.png',
        title: 'Hapi中文文档',
        desc: 'Hapi 致力于完全的分离 node HTTP 服务器、路由以及业务逻辑',
        link: 'https://hapi.dev/tutorials/?lang=zh_CN'
    },{
        icon: 'https://socket.io/zh-CN/images/favicon.png',
        title: 'Socket.IO',
        desc: '支持及时、双向与基于事件的交流。它可以在每个平台、每个浏览器和每个设备上工作，可靠性和速度同样稳定。',
        link: 'https://socket.io/zh-CN/'
    },{
        icon: 'https://nextjs.org/static/favicon/favicon.ico',
        title: 'NestJs',
        desc: 'NestJs 是用 Node.js 构建的框架，用于构建高效、可扩展的 Node.js 服务器端应用',
        link: 'https://nextjs.org/learn/basics/create-nextjs-app'
    },
      {
        icon: 'https://www.fastify.cn/images/favicon-96x96.7e8a68b1b80c1799.png',
        title: 'Fastify',
        desc: 'Fastify，快速并且低开销的 web 框架，专为 Node.js 平台量身打造',
        link: 'https://www.fastify.cn/'
    },
  ]
  },{
    title: '构建工具类',
    items: [
      {
        icon: 'https://www.webpackjs.com/favicon.f326220248556af65f41.ico',
        title: 'Webpack',
        desc: 'webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具',
        link: 'https://www.webpackjs.com/'
    },{
        icon: 'https://www.rollupjs.com/img/favicon.png',
        title: 'Rollup',
        desc: 'Rollup 是一个 JavaScript 模块打包工具，可以将多个小的代码片段编译为完整的库和应用',
        link: 'https://www.rollupjs.com/'
    },{
        icon: 'https://www.gulpjs.com.cn/img/favicon.png',
        title: 'Gulp',
        desc: '用自动化构建工具增强你的工作流程！',
        link: 'https://www.gulpjs.com.cn/'
    },{
        icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/rjhwzy/ljhwZthlaukjlkulzlp/favicon-1714.png',
        title: 'Rspack',
        desc: '基于 Rust 的高性能 Web 构建工具',
        link: 'https://www.rspack.dev/zh/'
    },
      {
        icon: 'https://www.parceljs.cn/assets/favicon.ico',
        title: 'Parcel',
        desc: '极速零配置Web应用打包工具',
        link: 'https://www.parceljs.cn/'
    },
  ]
  },{
    title: 'CSS相关文档',
    items: [
      {
        icon: 'https://www.sass.hk/favicon.ico',
        title: 'Sass中文文档',
        desc: '世界上最成熟、最稳定、最强大的专业级CSS扩展语言！',
        link: 'https://www.sass.hk/'
      },
      {
        icon: 'https://less.bootcss.com/public/ico/favicon.ico',
        title: 'Less中文文档',
        desc: 'Less是一门向后兼容的 CSS 扩展语言',
        link: 'https://less.bootcss.com/'
      },
      {
        icon: 'https://www.stylus-lang.cn/img/stylus-logo.png',
        title: 'Stylus中文文档',
        desc: '富于表现力、动态的、健壮的 CSS',
        link: 'https://www.stylus-lang.cn/'
      },
      {
        icon: 'https://www.tailwindcss.cn/favicons/favicon.ico',
        title: 'TailwindCSS中文文档',
        desc: '快速、灵活、可靠，没有运行时负担',
        link: 'https://www.tailwindcss.cn/'
      },
      {
        icon: '../public/label_logo/logo_unocss.svg',
        title: 'UnoCSS',
        desc: 'UnoCSS 是一个具有高性能且极具灵活性的即时原子化 CSS 引擎',
        link: 'https://unocss.dev/'
      },
    ]
  },{
    title: '常用ICON图标库',
    items: [
      {
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01XZe8pH1USpiUNT1QN_!!6000000002517-2-tps-114-114.png',
        title: '阿里巴巴矢量图标库',
        desc: '国内功能很强大且图标内容很丰富的矢量图标库！',
        link: 'https://www.iconfont.cn/'
      },
      {
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        title: 'IconPark',
        desc: '丰富多彩的资源库免费使用',
        link: 'https://iconpark.oceanengine.com/home'
      },
      {
        icon: '../public/label_logo/logo_icons8.jpg',
        title: 'Icons8',
        desc: 'Free Icons, Clipart Illustrations, Photos, and Music',
        link: 'https://icons8.com/'
      },
      {
        icon: 'https://media.flaticon.com/dist/min/img/apple-icon-72x72-precomposed.png',
        title: 'Flaction',
        desc: '提供 PNG、SVG、EPS、PSD 和 BASE 64 矢量图标格式，完全可以满足你 UI 设计和网页设计项目',
        link: 'https://www.flaticon.com/'
      },
      {
        icon: 'https://framerusercontent.com/images/xYWUE6fSnRyPyBimyskHG7Gws.png',
        title: 'Streamline',
        desc: '全世界最大的图标库，内容涵盖了几乎所有类别的 icon',
        link: 'https://www.streamlinehq.com/'
      },
      {
        icon: '../public/label_logo/logo_emoji.jpg',
        title: 'Streamline Emoji',
        desc: '850+卡哇伊风格矢量emoji，属于Streamline UX插画素材的一部分',
        link: 'https://www.streamlinehq.com/emojis/kawaii-emoji?ref=iamxk'
      },
      {
        icon: 'https://iconscout.com/favicon.ico',
        title: 'IconScout',
        desc: '国际知名设计网站 IconScout，一些大厂，比如谷歌，迪士尼，索尼等都在用的设计网站。其号称世界上最大的设计生态系统',
        link: 'https://iconscout.com/'
      },
      {
        icon: 'https://unpkg.byted-static.com/byted/arco-config/1.0.12/assets/arco_iconbox.ico',
        title: 'IconBox',
        desc: '同样是由字节跳动推出的一款图标库。首页是像阿里的 iconfont 一样',
        link: 'https://arco.design/iconbox/libs'
      },
      {
        icon: 'https://remixicon.com/favicon.ico',
        title: 'REMIX ICON',
        desc: 'https://remixicon.com/',
        link: 'https://remixicon.com/'
      },
    ]
  }
];