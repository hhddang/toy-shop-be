// Requests
export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  isAdmin?: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

// Responses
export type RegisterResponse = {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
};

export type LoginResponse = {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
};
