
async function editPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const text = document.querySelector('textarea[name="post-text"]').value.trim();

    console.log(title);
    console.log(text);

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            title,
            text
        }),
        headers: { 'Content-Type': 'application/json' }
    });
console.log(`${id}`)

    if(response.ok){
        document.location.replace('/dashboard');
    }else {
        alert(response.statusText)
    }
};

async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {

        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'

        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);