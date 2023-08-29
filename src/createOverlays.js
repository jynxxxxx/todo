function PopUp(){
    const overlay = document.querySelector('.overlay');
    const formcontainer = document.querySelector('.formcontainer');

    overlay.style.display = 'flex';
};

function ClearPopUp(){
    const overlay = document.querySelector('.overlay');
    const formcontainer = document.querySelector('.formcontainer');

    overlay.style.display = 'none';
    formcontainer.innerHTML = '';
};

export {PopUp, ClearPopUp};


