export interface BookData {
  id?: string;
  title: string;
  author: string;
  targetDate: Date;
  targetAmount: string;
  completeDate?: Date | null;
  isCompleted?: boolean;
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

export interface ReadBookData extends BookData {
  id: string;
  deleted?: boolean;
}

export type DeletedBook = { id: string; deleted: true };

export interface BookCardProps extends ReadBookData {
  userId: string;
  onUpdate?: (updateBook: ReadBookData | DeletedBook) => void;
}
