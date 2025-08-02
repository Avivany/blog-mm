import { defineConfig,DefaultTheme } from 'vitepress'
// import {nav,sidebar} from './config'


const nav:DefaultTheme.NavItem[]=[
    {text: '导航', link: '/website/index', activeMatch: '/website/'},
    {
      text:'前端知识库', 
      items:[
        {text: 'JavaScript', link: '/webs/jsdoc/index', activeMatch: '/webs/jsdoc/'},
        {text: 'Html/CSS', link: '/webs/htmlcss/index', activeMatch: '/webs/htmlcss/'},
      ],
    }
];

const sidebar:DefaultTheme.Config['sidebar']={
  '/webs/jsdoc':[
    {
      'text':'Javascript知识点',
      'items':[
        {'text':'数据类型','link':'/webs/jsdoc/js_type'},
        {'text':'类型转换','link':'/webs/jsdoc/js_type_transform'},
        {'text':'数组常用方法','link':'/webs/jsdoc/js_array'},
      ],
    }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16'  }],
    ['meta', { name: 'author', content:'猫🐱' }]
  ],
  title: "猫猫の个站",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav:[
      {text: '导航', link: '/website/index'},
      {
        text:'前端知识库', 
        items:[
          {text: 'JavaScript', link: '/webs/jsdoc/index', activeMatch: '/webs/jsdoc/'},
          {text: 'Html/CSS', link: '/webs/htmlcss/index', activeMatch: '/webs/htmlcss/'},
        ],
      }
    ],
    sidebar:{
      '/webs/jsdoc':[
         {
            'text':'Javascript知识点',
            'items':[
              {'text':'数据类型','link':'/webs/jsdoc/js_type'},
              {'text':'类型转换','link':'/webs/jsdoc/js_type_transform'},
              {'text':'数组常用方法','link':'/webs/jsdoc/js_array'},
            ],
          }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
