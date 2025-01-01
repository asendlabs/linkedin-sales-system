import axios from "axios";

const options = {
  method: "GET",
  url: "https://linkedin-data-scraper.p.rapidapi.com/profile_updates",
  params: {
    profile_url: "https://www.linkedin.com/in/wreshi",
    page: "1",
  },
  headers: {
    "x-rapidapi-key": "bfbf5b93b0mshf5fca9062a8c18cp10a742jsnc825e0a53411",
    "x-rapidapi-host": "linkedin-data-scraper.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}

interface LinkedInPost {
  postText?: string;
  postLink: string;
  imageComponent?: string[];
  linkedInVideoComponent?: unknown; // Type can be specified based on actual video component structure
  linksInPost: string[];
  actor: unknown; // Type can be specified based on actual actor object structure
  header?: unknown; // Type can be specified based on actual header object structure
  is_repost: boolean;
  socialCount: unknown; // Type can be specified based on actual social count object structure
  postedAt: string;
  postedAgo: string;
  urn: string;
  reactionsUrn: string;
  commentsUrn: string;
  repostsUrn: string;
}

interface LinkedInPagination {
  count: number;
  start: number;
  total: number;
}

interface LinkedInResponse {
  posts: LinkedInPost[];
  pagination: LinkedInPagination;
  paginationToken: string;
}