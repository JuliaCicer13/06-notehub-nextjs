export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
      id: string;
      title: string;
      content: string;
      categoryId: string;
      userId: string;
      createdAt: string;
      updatedAt: string;
      tag: NoteTag,
}