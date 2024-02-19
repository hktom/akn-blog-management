export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IUserResponse {
  status: number;
  data: IUser | IUser[] | null;
  error: any;
}

export interface UserInterface {
  getUserById(userId: number): Promise<IUserResponse>;
  getUserByEmail(userEmail: string): Promise<IUserResponse>;
}
