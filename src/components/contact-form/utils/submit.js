import axios from "axios";

export function submit(url, data, config) {
  console.log(data);
  // This needs some work, just used for testing
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    data.controls.forEach((control) => {
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
    fd.append("token", data.token);
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
