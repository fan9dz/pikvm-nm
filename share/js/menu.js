var systemButton = document.querySelector('#network-dropdown .menu-button');
var systemMenu = document.getElementById('network-menu');
var isMenuVisible = false;

systemButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (isMenuVisible) {
        systemMenu.style.visibility = 'hidden';
    } else {
        systemMenu.style.visibility = 'visible';
    }
    isMenuVisible = !isMenuVisible;
});