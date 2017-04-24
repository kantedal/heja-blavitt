export interface INewsComment {
  content: string
  userId: string
  username: string
}

export interface INewsItem {
  newsId: string
  createdAt: number
  pubDate: number
  title: string
  content: string
  source: string
  url: string
  imgUrl: string
  votes: number
  views: number
  comments: INewsComment[]
}