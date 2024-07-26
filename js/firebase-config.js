const firebaseConfig = {
  apiKey: "AIzaSyCTHNq6-Q8DCniH1nGi0SKxAS3HcGUt0no",
  authDomain: "khanhstore-712b6.firebaseapp.com",
  projectId: "khanhstore-712b6",
  storageBucket: "khanhstore-712b6.appspot.com",
  messagingSenderId: "1073834095461",
  appId: "1:1073834095461:web:307c00179b0434c134e78c",
  measurementId: "G-F048KNKW4V",
};

firebase.initializeApp(firebaseConfig);

//#region up Img
function uploadImage(type) {
  return new Promise((resolve, reject) => {
    const file = document.getElementById(`input-file-${type}`).files[0];
    if (file) {
      const imgPath = "images/" + file.name;
      const storageRef = storage.ref(imgPath);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          // Theo dõi tiến trình upload nếu cần
        },
        function (error) {
          // Xử lý lỗi upload nếu có
          console.error("Upload failed:", error);
          reject(error);
        },
        function () {
          // Hoàn thành upload thành công
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("imgUpload " + downloadURL);
            resolve(downloadURL);
          });
        }
      );
    } else {
      console.error("File không tồn tại!");
      resolve("");
    }
  });
}
//#region Img form
function handleFileChange(event, type) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById(`img-${type}`).src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
