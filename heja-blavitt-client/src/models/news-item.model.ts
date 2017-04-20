export default class NewsItem {
  currentUserVote: number = 0

  constructor(
    public newsId: string,
    public id: string,
    public content: string,
    public pubDate: number,
    public source: string,
    public title: string,
    public url: string,
    public comments: any[],
    public imgUrl: string,
    public votes: number,
  ) {}

  public static mapFromJSON(jsonNews: any): NewsItem {
    return new NewsItem(
      jsonNews['newsId'],
      jsonNews['_id'],
      jsonNews['content'],
      jsonNews['pubDate'],
      jsonNews['source'],
      jsonNews['title'],
      jsonNews['url'],
      jsonNews['comments'],
      jsonNews['imgUrl'],
      parseInt(jsonNews['votes'])
    )
  }
}
