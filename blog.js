async function displayBlogTitles() {
    const response=await fetch("http://localhost:3000/api/posts");
    const blogPosts=await response.json();
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = ''; 
    blogPosts.forEach((post) => {
      const li = document.createElement('li');
      li.textContent = post.title;
      li.onclick = () => loadPostContent(post.id);
      blogList.appendChild(li);
    });
  }
  async function loadPostContent(postId) {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
    const post = await response.json();
    const postContent = document.getElementById('post-content');
    
    postContent.innerHTML = `
        <h2>${post.title}</h2>
        <p><em>Created on ${new Date(post.created_at).toLocaleDateString()}</em></p>
        <p>${post.content}</p>
    `;
}
window.onload = 
  displayBlogTitles;