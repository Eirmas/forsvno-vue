import axios from "axios";

<<<<<<< HEAD
export function submit(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    const fd = new FormData([...data]);
    data.forEach((control, i) => {
      fd.append(`Input-${i}`, JSON.stringify(control));
    });
    console.log(fd);
=======
export function submit(url, data, config) {
  console.log(data);
  // This needs some work, just used for testing
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    data.forEach((control) => {
      if (control.component === "Attachment") {
        console.log("isArray");
        control.value.forEach((fileList) => {
          fileList.forEach((file) => {
            console.log(file);
            fd.append(control.component, file);
          });
        });
      } else {
        fd.append(control.component, control.value);
      }
    });
>>>>>>> 65b6c87a8a2c6b9e9fad20c31c029684be7b3d25
    axios.post(url, fd, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      ...config
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export default { submit };
