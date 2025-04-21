export interface BookData {
    title: string;
    author: string;
    date: Date;
    memo?: string;
}

export interface Summary {
    userId: string;
    name: string;
    count: number;
}