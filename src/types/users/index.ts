export interface ICreateUsers {
  name: string,
  email: string,
  password: string,
  role: string,
}
export interface ISearchUsers {
  name: string,
  role: string,
  sortBy: string,
  limit: number,
  page: number,
}

export interface IUpdateUser {
  name: string,
  email: string,
  password: string,
}