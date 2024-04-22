export interface IUser {
  [key: string]: string | number,
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  avatar: string,
  email: string,
  login: string,
  phone: string,
  role: string
}

export type ILastMessage ={
  user: IUser,
  time: string,
  content: string
}

export interface IChatItem {
  [key: string]: string | number | ILastMessage | IUser[] | boolean,
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: ILastMessage,
  users: IUser[]
}
