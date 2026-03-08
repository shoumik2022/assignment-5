console.log("Sign In functionality coming");

document.getElementById("signin-btn").addEventListener("click", function () {

  const usernameInput = document.getElementById("input-username");
  const username = usernameInput.value;
  console.log(username);

  const passwordInput = document.getElementById("input-password");
  const password = passwordInput.value;
  console.log(password);

  if (username === "admin" && password === "admin123") {
    alert("Sign In Success");
    window.location.assign("home.html");
  } else {
    alert("Sign In Failed");
  }
});