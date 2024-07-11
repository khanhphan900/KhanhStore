const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const homeDelUser = document.getElementById("del-user");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email-reg");
    const password = document.getElementById("pass-reg");
    const prePassword = document.getElementById("pass-reg-check");

    if (password.value !== prePassword.value) {
      alert("password không giống nhau");
      return;
    }

    let user = {
      email: email.value,
      password: password.value,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Create success user!!");
    window.location.href = "login.html";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const emailLogin = document.getElementById("email-login").value;
    const passLogin = document.getElementById("pass-login").value;
    console.log(user);
    if (user.email !== emailLogin && user.login !== passLogin) {
      alert("Nhập sai user");
      return;
    }
    alert("Đăng nhập thành công");
    window.location.href = "home-admin.html";
  });
}

if (homeDelUser) {
  homeDelUser.addEventListener("click", (e) => {
    localStorage.removeItem("user");
    alert("Remove user");
    window.location.href = "register.html";
  });
}
