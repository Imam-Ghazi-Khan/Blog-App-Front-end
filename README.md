
Backend Repo: https://github.com/Imam-Ghazi-Khan/blog-app-apis

APIS consumed:

Users:
get or create users:
api/users/

get single user:
api/users/{userID}

delete user:
api/users/{userID}

Categories:
get or create categories:
api/categories/

update category:
api/categories/{categoryID}

delete category:
api/categories/{categoryID}

Posts:
create posts: api/user/{userId}/category/{categoryId}/posts

update posts:
api/posts/{postID}

get posts by user:
api/user/{userID}/posts

get posts by category:
api/category/{categoryID}/posts

get posts by post id:
api/posts/{postID}

all posts: api/posts

get posts with page number, page size and sorting:
api/posts?pageNumber={pageNumber}&pageSize={pageSize}&sortBy=postId&sortDir={asc/desc}

search posts: api/posts/search/{searchKeyword}

delete post:
api/posts/{postId}

Comments:
add comments:
api/posts/{postId}/comments

delete comments:
api/comments/{commentID}
