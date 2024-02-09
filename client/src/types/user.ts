export type UserType = {
  id: number;
  username: string;
  image_icon: string | null;
};

export type UserRoomType = {
  id: number;
  name: string;
  description: string;
  created_user_id: number;
  created_at: string;
  user_id: number;
  room_id: number;
};
