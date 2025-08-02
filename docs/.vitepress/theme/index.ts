import {App , h} from 'vue';

import DefaultTheme  from 'vitepress/theme';
import './style/vars.less'
import './style/rainbow.css'
import './style/index.less'

import SiteTageGroup from './components/SiteTageGroup.vue';

import { useData } from 'vitepress';
export default {
  ...DefaultTheme,
  Layout:()=>{
    const props:Record<string, any> ={};
    //获取frontmatter
    const {frontmatter} =useData()

    //添加自定义class
    if (frontmatter.value?.layoutClass) props.class=frontmatter.value.layoutClass;

    return h(DefaultTheme.Layout,props);
  },
  enhanceApp({app}:{app:App}) {
    app.component('SiteTageGroup',SiteTageGroup)
  }
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')){
    document.documentElement.classList.add('browser-chrome')}
  else if (browser.includes('firefox')){
    document.documentElement.classList.add('browser-firefox')}
  else if (browser.includes('safari')){
    document.documentElement.classList.add('browser-safari')}
}