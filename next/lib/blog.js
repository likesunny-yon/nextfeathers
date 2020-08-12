import axios from "axios";

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE
  ? process.env.NEXT_PUBLIC_PAGE_SIZE
  : 20;

export const getPublicPosts = (pageId = 0) => {
  const skip = pageId * pageSize;
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_HOST +
        "/posts?$sort[createdAt]=-1&_isPublic=1" +
        "&$limit=" +
        pageSize +
        "&$skip=" +
        skip
    )
    .then((res) => {
      // console.log(res);
      return res;
    });
};

export const searchPublicPosts = (kw, pageId = 0) => {
  const skip = pageId * pageSize;
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_HOST +
        "/posts/?$search=" +
        encodeURIComponent(kw) +
        "&_isPublic=1" +
        "&$limit=" +
        pageSize +
        "&$skip=" +
        skip
    )
    .then((res) => {
      return res;
    });
};

export const getPublicPost = (slug) => {
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_HOST + "/posts/?slug=" + slug + "&_isPublic=1"
    )
    .then((res) => {
      return res;
    });
};

export const getPublicPostsByTag = (tag, pageId = 0) => {
  const skip = pageId * pageSize;
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_HOST +
        "/posts/?tags[$in]=" +
        tag +
        "&_isPublic=1" +
        "&$limit=" +
        pageSize +
        "&$skip=" +
        skip
    )
    .then((res) => {
      return res;
    });
};

export const getPublicTags = () => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_HOST + "/tags?$sort[createdAt]=-1")
    .then((res) => {
      return res;
    });
};
