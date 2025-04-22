export interface LoginUser {
    userId: string;
    nickname: string;
}

export interface UserStore {
    loginUser: LoginUser | null;
    setUser: (loginUser : LoginUser) => void;
    clearUser: () => void;
}

export interface UserSummary {
    userId: string;
    nickname: string;
    count: number;
}