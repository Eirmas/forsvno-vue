import axios from "axios";

export function submit(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    /* const fd = new FormData([...data]);
    data.forEach((control, i) => {
      fd.append(`Input-${i}`, JSON.stringify(control));
    });
    console.log(fd); */
    const fd = new FormData();
    data.controls.forEach((control) => {
      if (control.component === "Attachment") {
        control.value.forEach((file) => {
          const name = file.name.replace(".", "@");
          fd.append(`Attachment-${name}-stream`, file);
          fd.append(`Attachment-${name}`, file.type);
        });
      } else {
        fd.append(control.component, control.value);
      }
    });
    fd.append("receiver", data.receiver);
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
