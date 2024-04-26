export async function verifyToken(toast, navigate) {
  // We use two tokens, the access token and the refresh token,
  // to allow the user to stay connected even if the first token has expired.
  // The access token has a shorter validity period, but if it becomes invalid,
  // we can use the refresh token to obtain a new access token.
  // This way, we can keep the user logged in without requiring them to log in again each time the token expires.
  const req = await fetch("http://localhost:3001/api/refreshToken", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
    },
  });

  // If the status is not 200, it means the refresh token is invalid or expired
  if (req.status !== 200) {
    // If the refresh token is invalid, we redirect the user to the login page
    toast.error("Vous devez vous re-connecter pour accéder à cette page");
    setInterval(() => {
      navigate("/login");
    }, 500);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return;
  }

  // If the refresh token is valid, we can get the new tokens
  const tokens = await req.json();
  localStorage.setItem("token", tokens.token);
  localStorage.setItem("refreshToken", tokens.refreshToken);
}
