import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) => {
  const date = new Date();
  const storageRef = ref(storage, `images/${date + file.name}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },

      (error) => {
        reject("Something went wrong!", error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;

// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "./firebase";

// const upload = (file) => {
//   console.log(file, "fileee");
//   const date = new Date().toISOString(); // Using ISO string for better formatting
//   const storageRef = ref(storage, `images/${date}_${file.name}`);

//   return new Promise((resolve, reject) => {
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//       },
//       (error) => {
//         console.log("Upload error:", error);
//         reject("Something went wrong!", error.code);
//       },
//       async () => {
//         try {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           console.log("File available at", downloadURL);
//           resolve(downloadURL);
//         } catch (error) {
//           console.log("Error getting download URL:", error);
//           reject("Error getting download URL:", error);
//         }
//       }
//     );
//   });
// };

// export default upload;
