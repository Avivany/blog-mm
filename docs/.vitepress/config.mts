import { defineConfig,type DefaultTheme } from 'vitepress'
import moduleName from 'node:path'
// import {nav,sidebar} from './config'
// https://vitepress.dev/reference/site-config
const base = "/blog-mm/"; 
export default defineConfig({
  base,
  assetsDir: 'assets',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['link', { rel: 'alternate icon', href: `${base}favicon.ico`, type: 'image/png', sizes: '16x16'  }],
    ['meta', { name: 'author', content:'猫🐱' }]
  ],
  // title: "线框里的生活",
  // title: "帧里帧外",
  // title: "框内猫语",
  title: "猫猫分享站",
  description: "这里留下的独特痕迹，见证了你我独有的故事.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      level: [2, 4],
      label: '当前目录'
    },
    logo:`/logo.png`,
    nav:[
      {text: '导航', link: '/website/index'},
      {
        text:'前端知识库', 
        items:[
          {text: 'JavaScript', link: '/webs/jsdoc/index', activeMatch: '/webs/jsdoc/'},
          {text: 'Html/CSS', link: '/webs/htmlcss/index', activeMatch: '/webs/htmlcss/'},
        ],
      },
      {
        text:'后端知识库',
        items:[
          {text: 'GO 知识库', link: '/webs/go/index', activeMatch: '/webs/go/'},
          {text: '数据库', link: '/webs/db/index', activeMatch: '/webs/db/'},
        ],
      },
      {text: '阅读花园', link: '/read/index'},
    ],
    sidebar:{
      '/webs/go':[
         {
            'text':'GO 知识点',
            'items':[
              {'text':'程序结构与函数','link':'/webs/go/go_syntax'},
              {'text':'基础数据类型','link':'/webs/go/go_basic_types'},
              {'text':'操作符与运算符','link':'/webs/go/go_operators'},
              {'text':'控制流','link':'/webs/go/go_control_flow'},
              {'text':'复合数据类型','link':'/webs/go/go_composite'},
              {'text':'并发编程','link':'/webs/go/go_concurrency'},
              {'text':'错误处理','link':'/webs/go/go_error'},
            ],
         }
      ],
      '/webs/db':[
         {
            'text':'数据库知识点',
            'items':[
              {'text':'待补充','link':'/webs/db/index'},
            ],
         }
      ],
      '/webs/jsdoc':[
         {
            'text':'Javascript知识点',
            'items':[
              {'text':'数据类型','link':'/webs/jsdoc/js_type'},
              {'text':'类型转换','link':'/webs/jsdoc/js_type_transform'},
              {'text':'数组常用方法','link':'/webs/jsdoc/js_array'},
            ],
          }
      ],
      'read/':[
        {
          text:'高效学习的认知心理学方法',
          collapsed:false,
          items:[
           {'text':'高效学习的认知心理学方法1','link':'/read/gxxxf/chapter1'},
           {'text':'高效学习的认知心理学方法2','link':'/read/gxxxf/chapter2'},
           {'text':'高效学习的认知心理学方法3','link':'/read/gxxxf/chapter3'},
           {'text':'高效学习的认知心理学方法4','link':'/read/gxxxf/chapter4'},
           {'text':'高效学习的认知心理学方法5','link':'/read/gxxxf/chapter5'},
          ]
        },{
           text:'进阶',
          collapsed:false,
          items:[
            {'text':'进阶-重塑高阶形象1','link':'/read/jj/chapter1'},
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Avivany/blog-mm' }
    ],
    footer: {
      message: '帧里帧外，打破技术的冰冷感，传递技术里的温情与故事.',
      copyright: 'Copyright © 2019-present Moi'
    }
  }
})
