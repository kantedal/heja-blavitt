import {NewsPage} from "../pages/news/news";
import {SettingsPage} from "../pages/settings/settings";
import {DiscussionPage} from "../pages/discussion/discussion";

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
    page: DiscussionPage,
    title: 'Diskussion',
    icon: 'ios-chatbubbles',
    isSelected: false
  },
  {
    page: SettingsPage,
    title: 'Inställningar',
    icon: 'ios-settings',
    isSelected: false
  }
]