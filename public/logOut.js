async function logOutButtonHandler(){
    const response = await fetch('/api/users/logOut', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' }
    });

    if(response.ok){
        document.location.replace('/login');
    }else{
        alert(response.statusText)
    }
};

document.querySelector('#logOut').addEventListener('click', logOutButtonHandler);