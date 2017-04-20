import {NewsPage} from "../pages/news/news";

export interface IPage {
  page: any
  title: string
  icon: string
  isSelected: boolean
}

export let Pages: IPage[] = [
  {
    page: NewsPage,
    title: 'Nyheter',
    icon: 'ios-paper',
    isSelected: true
  },
  {
    page: NewsPage,
    title: 'Diskussion',
    icon: 'ios-chatbubbles',
    isSelected: false
  },
  {
    page: NewsPage,
    title: 'Inställningar',
    icon: 'ios-settings',
    isSelected: false
  }
]