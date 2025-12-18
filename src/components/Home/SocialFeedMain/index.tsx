"use client";

import Feed from "@/components/Feed";
import FriendList from "@/components/FriendList";

const SocialFeedMain = () => {
  return (
    <div className="flex h-full w-full">
      {/* Feed - Left Side */}
      <div className="flex-1 overflow-y-auto mx-20">
        <Feed />
      </div>

      {/* FriendList - Right Side */}
      <div className="hidden lg:block">
        <FriendList />
      </div>
    </div>
  );
};

export default SocialFeedMain;
