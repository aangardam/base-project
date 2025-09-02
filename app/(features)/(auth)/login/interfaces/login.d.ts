export interface ILogin {
    email?: string;
    password?: string;
    captcha?: string;
    new_password?: string;
    confirm_password?: string;
}

export interface ILoginResponse {
    token: string;
    accoundId: number;
    fullName: string;
    email: string;
    active:number;
}