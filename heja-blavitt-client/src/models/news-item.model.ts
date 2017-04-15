export default class NewsItem {
  constructor(
    public content: string,
    public pubDate: number,
    public source: string,
    public title: string,
    public url: string
  ) {}

  public static mapFromJSON(jsonNews: any): NewsItem {
    return new NewsItem(
      jsonNews['content'],
      jsonNews['pubDate'],
      jsonNews['source'],
      jsonNews['title'],
      jsonNews['url'],
    )
  }
}
