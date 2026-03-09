export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export type ToDo = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
