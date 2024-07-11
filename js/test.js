const storage = firebase.storage();

// Hiển thị ảnh xem trước khi chọn file
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Gán ảnh cho thẻ img
        document.getElementById("preview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById("preview").src = "";
    }
  });

function uploadImage() {
  const file = document.getElementById("fileInput").files[0];
  if (file) {
    const storageRef = storage.ref("images/" + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Quan sát trạng thái upload (progress, pause, resume)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("status").innerText =
          "Upload is " + progress + "% done";
      },
      function (error) {
        // Xử lý lỗi
        document.getElementById("status").innerText = "Error: " + error.message;
      },
      function () {
        // Thẻ hiển thị hoàn thành upload thành công
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          document.getElementById("status").innerText = "Upload successful!";
        });
      }
    );
  } else {
    document.getElementById("status").innerText = "No file selected";
  }
}
