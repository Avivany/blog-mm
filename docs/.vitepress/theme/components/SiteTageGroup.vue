<template>
   <h2 v-if="title" :id="formatTitle" tabindex="-1">
      {{ title }}
      <a class="e-header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h2>
    <div class="e-nav-links">
      <SiteTag v-for="item in items" :noIcon="noIcon" v-bind="item" />
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import {slugify} from '@mdit-vue/shared';
import SiteTag from './SiteTag.vue'
import type { SiteLinkTag } from './types'

const props = defineProps<{
  title: string
  noIcon?: boolean
  items: SiteLinkTag[]
}>()

const formatTitle = computed(() => {
  return slugify(props.title)
})

</script>
<style lang="less" scoped>
  .e-nav-links {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}
/*
@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
  @media (min-width: $media) {
    .e-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}
*/
@media_v:500px, 640px, 768px, 960px, 1440px;
@size_v: 140px, 155px, 175px, 200px, 240px;
@len:length(@media_v);
// when 条件判断
/*.e_size_v(@index) when(@index <=@len){
  @media (min-width: @media_v) {
    .e-nav-links {
      grid-template-columns: repeat(auto-fill, minmax(@size_v, 1fr));
    }
  }
  .e_size_v(@index + 1)
}
.e_size_v(1);*/
 @media (min-width: 500px) {
    .e-nav-links {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }
  }
 @media (min-width: 640px) {
    .e-nav-links {
      grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
    }
  }
  @media (min-width: 768px) {
    .e-nav-links {
      grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    }
  }
 @media (min-width: 960px) {
    .e-nav-links {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

 @media (min-width: 1440px) {
    .e-nav-links {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }
@media (min-width: 960px) {
  .e-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>