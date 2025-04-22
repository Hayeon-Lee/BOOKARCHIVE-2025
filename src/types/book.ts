export interface BookData {
  title: string;
  author: string;
  date: Date;
  memo?: string;
}

export interface Summary {
  userId: string;
  nickname: string;
  count: number;
}

export interface MemberSummaryCardProps {
  name: string;
  count: number;
}

export interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (book: BookData) => void;
}

export interface ReadBookData {
  id: string;
  title: string;
  author: string;
  date: Date;
  memo?: string;
}