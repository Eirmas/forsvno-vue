/**
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * This file contains the submit function used in Form.vue
 *
 * */

import axios from "axios";

export function submit(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();

    data.controls.forEach((control) => {
      if (control.component === "Attachment") {
        control.value.forEach((file) => {
          const name = file.name.replace(".", "@");
          fd.append(`attachment-${name}-stream`, file);
          fd.append(`attachment-${name}`, file.type);
        });
      } else {
        fd.append(control.id, JSON.stringify({ value: control.value, text: control.label }));
      }
    });

    fd.append("receiver", data.receiver);
    fd.append("token", data.token);
    console.log(data);
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
