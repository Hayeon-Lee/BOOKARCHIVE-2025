export interface LoginUser {
    userId: string;
    nickname: string;
}

export interface UserStore {
    loginUser: LoginUser;
    setUser: (loginUser : LoginUser) => void;
    clearUser: () => void;
}