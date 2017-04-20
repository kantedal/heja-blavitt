export interface IUser {
  username: string
  email: string
  password?: string
  comments: any[]
  votedNews: any[]
  discussionEntries: any[]
  filteredNewsSources: string[]
}

export const createUser = (username: string, password: string, email: string): IUser => {
  return {
    username,
    email,
    password,
    comments: [],
    votedNews: [],
    discussionEntries: [],
    filteredNewsSources: []
  }
}