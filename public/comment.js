async function commentFormHandler(event) {
    event.preventDefault();

    const comText = document.querySelector('textarea[name="comment-body"]').nodeValue.trim();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if(comText){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body:  JSON.stringify({
                comText,
                postId
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit',commentFormHandler);
