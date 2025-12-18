import {
  useQuery,
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";

// Unsplash API Types
export type UnsplashPhoto = {
  id: string;
  urls: {
    thumb: string;
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
    };
  };
};

// JSONPlaceholder API Types
export type PlaceholderPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type PlaceholderUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
};

// Feed Item Type
export type FeedItem = {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    role: string;
  };
  content: {
    text: string;
    thumbnail: string;
    thumbnailAlt: string;
  };
  source: string;
  timestamp: string;
  timestampDate: Date;
  likeCount: number;
  postUrl: string;
};

// Unsplash API Functions
// Using Picsum Photos as a free alternative (no API key required)
export const getUnsplashPhoto = async (): Promise<UnsplashPhoto> => {
  const photoId = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/seed/${photoId}/400/300`;

  return {
    id: photoId.toString(),
    urls: {
      thumb: imageUrl,
      small: imageUrl,
      regular: imageUrl,
      full: imageUrl,
    },
    alt_description: "Random photo from Picsum",
    user: {
      name: "Picsum Photos",
      username: "picsum",
      profile_image: {
        small: "https://api.dicebear.com/7.x/avataaars/svg?seed=picsum",
      },
    },
  };
};

export const useUnsplashPhoto = () =>
  useQuery<UnsplashPhoto>({
    queryKey: ["unsplash-photo"],
    queryFn: getUnsplashPhoto,
    refetchOnWindowFocus: false,
    retry: 2,
  });

// JSONPlaceholder API Functions
export const getPlaceholderPost = async (): Promise<PlaceholderPost> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" +
      Math.floor(Math.random() * 100 + 1)
  );
  if (!response.ok) {
    throw new Error("Failed to fetch placeholder post");
  }
  return response.json();
};

export const getPlaceholderUser = async (
  userId: number
): Promise<PlaceholderUser> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch placeholder user");
  }
  return response.json();
};

export const usePlaceholderPost = () =>
  useQuery<PlaceholderPost>({
    queryKey: ["placeholder-post"],
    queryFn: getPlaceholderPost,
    refetchOnWindowFocus: false,
    retry: 2,
  });

export const usePlaceholderUser = (userId: number) =>
  useQuery<PlaceholderUser>({
    queryKey: ["placeholder-user", userId],
    queryFn: () => getPlaceholderUser(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    retry: 2,
  });

// Fetch multiple posts for pagination
const POSTS_PER_PAGE = 5;

// Fetch all users once (JSONPlaceholder has 10 users)
let allUsersCache: PlaceholderUser[] | null = null;
const getAllUsers = async (): Promise<PlaceholderUser[]> => {
  if (allUsersCache) return allUsersCache;

  const userPromises = Array.from({ length: 10 }, (_, i) =>
    fetch(`https://jsonplaceholder.typicode.com/users/${i + 1}`).then((res) =>
      res.json()
    )
  );
  allUsersCache = await Promise.all(userPromises);
  return allUsersCache;
};

const fetchFeedPage = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<FeedItem[]> => {
  const startId = (pageParam - 1) * POSTS_PER_PAGE + 1;

  // Fetch multiple posts in parallel
  const postPromises = Array.from({ length: POSTS_PER_PAGE }, (_, i) => {
    const postId = startId + i;
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
      (res) => res.json()
    );
  });

  const posts: PlaceholderPost[] = await Promise.all(postPromises);

  // Get all users
  const allUsers = await getAllUsers();

  // Create variety by using post.id to select different users
  // This ensures each post gets a different user even if userId is the same
  const userMap = new Map(allUsers.map((u) => [u.id, u]));

  // Sources and roles for variety
  const sources = [
    "X",
    "LinkedIn",
    "Facebook",
    "Instagram",
    "Twitter",
    "Reddit",
  ];
  const roles = [
    "CEO",
    "CTO",
    "Co-Founder",
    "Product Manager",
    "Software Engineer",
    "Designer",
    "Marketing Director",
    "Developer",
    "Founder",
    "VP of Engineering",
    "Head of Product",
    "Content Creator",
    "Influencer",
    "Community Manager",
  ];

  // Generate photos for each post
  const feedItems: FeedItem[] = await Promise.all(
    posts.map(async (post, index) => {
      // Use post.id to select different user for variety
      // This ensures each post gets a unique user even if original userId is same
      const userIndex = (post.id - 1) % allUsers.length;
      const user = allUsers[userIndex];
      const photoId = Math.floor(Math.random() * 1000) + post.id;
      const imageUrl = `https://picsum.photos/seed/${photoId}/400/300`;

      // Use different source and role for variety
      const sourceIndex = (post.id + index) % sources.length;
      const roleIndex = (post.id + index) % roles.length;
      const source = sources[sourceIndex];
      const role = user?.company?.name
        ? `${roles[roleIndex]} at ${user.company.name}`
        : roles[roleIndex];

      // Create unique name by combining user name with post id for variety
      const uniqueName = `${user?.name || "Unknown"} ${
        post.id > 100 ? `#${post.id}` : ""
      }`;

      // Generate random like count (0-1000)
      const likeCount = Math.floor(Math.random() * 1001);

      // Generate random timestamp within last 7 days (not exceeding today)
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const randomTime =
        sevenDaysAgo.getTime() +
        Math.random() * (now.getTime() - sevenDaysAgo.getTime());
      const timestampDate = new Date(randomTime);

      // Format timestamp
      const formatTimestamp = (date: Date): string => {
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
      };

      return {
        id: post.id.toString(),
        author: {
          name: uniqueName,
          username: user?.username || "unknown",
          avatar: user?.email
            ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}-${post.id}`
            : `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id}`,
          role: role,
        },
        content: {
          text: post.body,
          thumbnail: imageUrl,
          thumbnailAlt: `Post ${post.id} thumbnail`,
        },
        source: source,
        timestamp: formatTimestamp(timestampDate),
        timestampDate: timestampDate,
        likeCount: likeCount,
        postUrl: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      };
    })
  );

  return feedItems;
};

// Combined Feed Data Hook with Infinite Scroll
export const useFeedData = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["feed-items"],
    queryFn: (context: QueryFunctionContext<readonly unknown[], number>) =>
      fetchFeedPage({ pageParam: context.pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Continue loading more pages (unlimited)
      return allPages.length + 1;
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const feedItems = data?.pages.flat() || [];

  return {
    data: feedItems,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
