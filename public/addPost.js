const addPostHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the new post form
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
  
    // Create a new post if both fields contain content
    if (title && text) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json'},
      });
  
      // If successful return the browser to the dashboard
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('#add-post').addEventListener('submit', addPostHandler);





