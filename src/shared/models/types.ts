export interface User {
  id?: string,
  name?: string,
  password?: string,
  image?: string,
  createdComment?: Comment[],
  Token?: Token[]
}

export interface Comment {
  id?: string,
  text: string,
  userId?: string,
  userName?: string,
  createdAt?: string,
  user?: User,
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

export type PaginatedResult<T> = {
  data: T[];
  meta: {
    totalCount: number;
    pageCount: number;
    currentPage: number;
    perPage: number;
  };
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
  // [Symbol.iterator](): Iterator<T>;
}


export type UserDataLogin = Pick<User, 'name' | 'password' | 'image'>
export type UserDataId = Omit<User, 'id'>
export type AuthResponse = User & { accessToken: string, refreshToken: string }
// export type AuthResponse = User & { accessToken: string }