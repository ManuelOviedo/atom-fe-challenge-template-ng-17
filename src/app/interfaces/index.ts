export interface ILoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export interface ILoginCredentials {
  email: string;
}

export interface ITask {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface IResponse {
  success: boolean;
  message: string;
  data: IUser[] | ITask[] | IUser | ITask;
}

export interface ILoginForm {
  email: string;
}

export interface IDialogData {
  title: string;
  user?: IUser;
}

export interface IConfirmDialogData {
  title: string;
  message: string;
}
