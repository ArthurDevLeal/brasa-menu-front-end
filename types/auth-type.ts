export interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserPropsReturn {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export interface loginUserProps {
  email: string;
  password: string;
}

export interface loginUserPropsReturn {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}