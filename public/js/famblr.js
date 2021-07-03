function famblrLogout() {
    delete localStorage.famblrToken;
    window.location.href = "/logout"
}