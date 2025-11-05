export type MessageType = {
  content: string;
  timestamps: string;
  username: string;
};

export type RoomType = {
  _id: string;
  name: string;
  members: string[];
  createDate: string;
  createdBy: string;
};
