const id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
];

async function editPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const text = document.querySelector('textarea[name="postText"]').value.trim();

    const response = await fetch('/api/posts/${id}', {
        method: 'PUT',
        body: JSON.stringify({
            title,
            text
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok){
        document.location.replace('/dashboard');
    }else {
        alert(response.statusText)
    }
};

async function deletePostHandler(){
    const response = await fetch('/api/post/${id}', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert(response.statusText)
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);
document.querySelector('.delete-post-btn').addEventListener('click', deletePostHandler);