export interface SiteLinkTag {
  /**
   * 站点图标
   * 站点名称
   * 站点描述
   * 站点链接
   */
  icon?:string|{svg:string},
  title:string,
  desc?:string,
  link:string,
  badge?:string|{text?:string,type?:'info' | 'tip' | 'warning' | 'danger'}
}
export interface SiteData {
  title: string,// 站点模块标题
  items: SiteLinkTag[]
}