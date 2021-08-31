async function addPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#postTitle').nodeValue.trim();
    const text = document.querySelector('textarea[name="postText').nodeValue.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            text
        }),
        headers: { 'ContentType': 'application/json'}
    }),

    if(response.ok){
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
};

document.querySelector('.add-post').addEventListener('submit', addPostHandler);