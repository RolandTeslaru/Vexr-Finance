export interface IUser {
    _id: string;
    email: string;
    name: string;
    provider: "google" | "email" | "github";
}

export interface LoginUserParams{
    email: string;
    password: string;
}