let flag = true;
document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});
function iniciarApp() {
    verPass();
}

function verPass() {
    if (flag) {
        document.getElementById("password").type = "password";
        document.getElementById("esconder-pass").src = "build/img/verPass.png"
        flag = false;
    } else {
        document.getElementById("password").type = "text";
        document.getElementById("esconder-pass").src = "build/img/esconderPass.png"
        flag = true;
    }
}