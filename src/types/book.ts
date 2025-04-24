export interface BookData {
  id: string;
  title: string;
  author: string;
  date: Date;
  rating?: string;
}

export interface Summary {
  userId: string;
  nickname: string;
  count: number;
}

export interface MemberSummaryCardProps {
  nickname: string;
  count: number;
  userId: string;
  onClick: () => void;
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
  rating?: string;
}

export interface BookCardProps extends BookData {
  onUpdate?: (updateBook: ReadBookData) => void;
}
