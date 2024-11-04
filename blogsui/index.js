document
  .getElementById("blogPost")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const blogTitle = document.getElementById("blogName").value;
    const blogAuthor = document.getElementById("author").value;
    const blogContent = document.getElementById("content").value;

    const response = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogTitle, blogAuthor, blogContent }),
    });
    console.log(response);
    if (response.ok) {
      document.getElementById("blogName").value = "";
      document.getElementById("author").value = "";
      document.getElementById("content").value = "";
      loadBlogs(); // Refresh the blogs list
    }
  });

async function loadBlogs() {
  const response = await fetch("http://localhost:3000/api/blogs");
  const blogs = await response.json();
  const container = document.getElementById("blogsContainer");
  container.innerHTML = "";

  blogs.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";
    blogCard.innerHTML = `
        <h3>${blog.blogTitle}</h3>
        <p>By: ${blog.blogAuthor}</p>
        <p>${blog.blogContent}</p>
        <h4>Comments</h4>
        <div id="comments-${blog.id}"></div>
        <input id="commentContent-${blog.id}" placeholder="Write a comment">
        <button onclick="addComment(${blog.id})">Comment</button>
      `;
    container.appendChild(blogCard);
    loadComments(blog.id); // Load existing comments for each blog
  });
}

async function addComment(blogId) {
  const commentContent = document.getElementById(
    `commentContent-${blogId}`
  ).value;
  console.log(commentContent)
  const response = await fetch(`http://localhost:3000/api/comments/${blogId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ commentContent, blogId }),
  });

  if (response.ok) {
    document.getElementById(`commentContent-${blogId}`).value = "";
    loadComments(blogId); // Refresh comments
  }
}

async function loadComments(blogId) {
  const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
  const blog = await response.json();
  const commentsContainer = document.getElementById(`comments-${blogId}`);
  commentsContainer.innerHTML = "";

  blog.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.innerHTML = `
        <p>${comment.commentContent}</p>
        <button onclick="deleteComment(${comment.id})">Delete</button>
      `;
    commentsContainer.appendChild(commentDiv);
  });
}

async function deleteComment(commentId) {
  const response = await fetch(
    `http://localhost:3000/api/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    loadBlogs(); // Refresh the blogs list to update comments
  }
}

// Load blogs on page load
window.onload = loadBlogs;
