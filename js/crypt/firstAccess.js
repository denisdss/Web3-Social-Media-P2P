
const downloadKeys = () => {
    // button with script to download keys
    document.body.innerHTML = '';
    let button = document.createElement('button');
    button.innerHTML = 'Download Keys';
    button.onclick = async function(){
        const password = decode(await hash(prompt("Enter your password:")));
        debug('Password hashed is:');
        debug(( password));
        debug("Retrieving keys");
        const public_oaep = await getData('keys','public-RSA-OAEP')
        
    }
    document.body.appendChild(button);
}

export {downloadKeys};