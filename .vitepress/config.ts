import { resolve } from 'path'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import type { Config } from '@vue/theme'
import type { UserConfig } from 'vitepress'
import { NavbarFix } from './plugins/navbar'
import Components from 'unplugin-vue-components/vite'

export default defineConfigWithTheme<Config>({
  extends: baseConfig as () => UserConfig<Config>,

  lang: 'zh-CN',
  title: 'vue-hbs-admin',
  description: '提供现成的开箱解决方案及丰富的示例，提高开发效率。',
  base: '/',
  srcDir: 'src',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    algolia: {
      indexName: 'Hongbusi',
      appId: '58YVUHI1VL',
      apiKey: '1bde22dfb8f411080436bd011af2c580'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Hongbusi/vue-hbs-admin' }
    ],

    editLink: {
      repo: 'Hongbusi/vue-hbs-admin-docs',
      text: 'Edit this page on GitHub'
    },

    nav: [
      { text: '教程', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '在线预览', link: 'https://vue-hbs-admin.netlify.app' }
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/components/': getComponentsSidebar(),
      '/': getGuideSidebar()
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    plugins: [
      NavbarFix(),
      Components({
        dirs: resolve(__dirname, 'theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: '../.vitepress/components.d.ts',
        transformer: 'vue3',
      })
    ]
  },

  vue: {
    reactivityTransform: true
  }
})

function getGuideSidebar() {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/' },
        { text: '贡献指南', link: '/guide/' }
      ]
    },
    {
      text: '开发指南',
      items: [
        { text: '新增路由', link: '/guide/add-route' },
        { text: '组件开发规范', link: '/guide/component' },
      ]
    }
  ]
}

function getComponentsSidebar() {
  return [
    {
      text: '组件',
      items: [
        { text: '介绍', link: '/components/' },
        { text: '文档模版', link: '/components/example' }
      ]
    },
    {
      text: '常用组件',
      items: [
        { text: 'Page', link: '/components/page' },
        { text: 'Excel', link: '/components/excel' },
        { text: '数字动画', link: '/components/count-to' },
        { text: '水印', link: '/components/watermark' },
        { text: '图片裁剪', link: '/components/cropper' }
      ]
    }
  ]
}
