export type FriendStatus = {
  type: "active" | "inactive";
  hoursAgo?: number;
};

export type Friend = {
  id: string;
  name: string;
  avatar: string;
  status: FriendStatus;
};
