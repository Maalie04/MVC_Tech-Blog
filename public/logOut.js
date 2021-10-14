console.log("hit this page")
async function logOutButtonHandler(){
   
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' }
    });

    if(response.ok){
        document.location.replace('/login');
    }else{
        alert(response.statusText)
    }
};

document.querySelector('#logout').addEventListener('click', logOutButtonHandler);