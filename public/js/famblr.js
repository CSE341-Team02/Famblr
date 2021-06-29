$(document).ready(function () {
    if (localStorage.famblrToken) {
        userData = jwt_decode(localStorage.famblrToken);
        imageSrc = userData.profilePicture ? `/uploads/${userData.profilePicture}` : '/images/profile.png'
        $("#top-nav-profile-pic").attr('src', imageSrc)
    }
});