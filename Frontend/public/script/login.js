const API_ENDPOINT = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";
const APPLICATION_KEY = "{{API_KEY}}"; // Replace with your actual key

function onLoginClicked() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const resultDiv = document.getElementById("result");

  axios
    .post(
      API_ENDPOINT,
      {
        UserName: username,
        PassWord: password,
      },
      {
        headers: {
          "Application-Key": APPLICATION_KEY,
        },
      }
    )
    .then((response) => {
      const data = response.data;
      if (data.status) {
        displaySuccess(resultDiv, data);
      } else {
        displayError(resultDiv, data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      displayError(
        resultDiv,
        error.response.data.Description || error.response.data.message
      );
    });
}

function displaySuccess(resultDiv, data) {
  resultDiv.innerHTML = `
          <p><strong>ยินดีต้อนรับ, ${data.displayname_th}!</strong></p>
          <p>ประเภท: ${data.type === "student" ? "นักศึกษา" : "บุคลากร"}</p>
          ${
            data.type === "student"
              ? `<p>คณะ: ${data.faculty}</p>`
              : `<p>หน่วยงาน: ${data.organization}</p>`
          }
        `;
  resultDiv.classList.add("show");
  setTimeout(() => {
    resultDiv.classList.remove("show");
    void resultDiv.offsetWidth; // Trigger reflow to restart animation
    resultDiv.classList.add("show");
  }, 10);
}

function displayError(resultDiv, message) {
  resultDiv.innerHTML = `<p>เข้าสู่ระบบล้มเหลว: ${message}</p>`;
  resultDiv.classList.add("show");
  setTimeout(() => {
    resultDiv.classList.remove("show");
    void resultDiv.offsetWidth;
    resultDiv.classList.add("show");
  }, 10);
}
