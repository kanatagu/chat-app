export type RoomType = {
  id: number;
  name: string;
  description: string;
  created_user_id: number;
  created_at: string;
};

type RoomUserType = {
  username: string;
  image_icon: string | null;
  created_at: string;
};

export type RoomDetailsType = {
  id: number;
  name: string;
  description: string;
  created_user_id: number;
  created_at: string;
  users: RoomUserType[];
};
