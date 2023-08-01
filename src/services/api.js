import { sendPost } from "../utils/sendApiRequest";

export const loginApi = sendPost("api/login")

export const signupApi = sendPost("api/register")

export const addBlogApi = sendPost("api/add-blog")

export const fetchBlogsApi = sendPost("api/blogs")

export const deleteBlogApi = sendPost("api/delete-blog")

export const updateBlogApi = sendPost("api/update-blog")

export const updateProfileApi = sendPost("api/update-profile")

export const updateLikeApi = sendPost("api/like")

export const fetchCategoriesApi = sendPost("api/categories")




