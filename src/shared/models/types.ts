export interface User {
  id: string,
  name: string,
  password: string,
  image: string,
  user?: string | null,
  createdComment?: Comment[],
  Token?: Token[]
}

export interface Comment {
  id: string,
  text: string,
  userId: string,
  userName: string,
  createdAt: string,
  user: User,
}

export interface Token {
  userId: string,
  refreshToken: string,
  user: User
}

export type ErrorWithMessage = {
  status: number,
  data: {
    message: string
  }
}