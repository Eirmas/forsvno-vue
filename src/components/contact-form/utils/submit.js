import axios from "axios";

export function submit(url, data, config) {
  return new Promise((resolve, reject) => {
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
export default {
  submit
};
