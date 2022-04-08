import axios from "axios";

const base_url = "http://localhost:9000/api";

export class HttpClient {
  httpreq = axios.create({
    baseURL: base_url,
    timeout: 30000,
    timeoutErrorMessage: "Request time out",
    responseType: "json",
  });

  postItem = (url, data, headers = {}) => {
    return this.httpreq.post(url, data, headers);
  };
  getItem = (url, headers = {}, is_strict = false) => {
    if (is_strict) {
      headers.headers = {
        authorization: localStorage.getItem("token"),
      };
    }
    return this.httpreq.get(url, headers);
  };

  putItem = (url, data, headers = {}) => {
    return this.httpreq.put(url, data, headers);
  };

  deleteItem = (url, auth = false) => {
    let headers = {};
    if (auth) {
      headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    }
    return this.httpreq.delete(url, headers);
  };

  getItemById = (url, is_strict = false) => {
    let headers = {};
    if (is_strict) {
      headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    }
    return this.httpreq.get(url, headers);
  };

  updateItem = (url, data, is_strict = false) => {
    let headers = {};
    if (is_strict) {
      headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
    }
    return this.httpreq.put(url, data, headers);
  };

  uploader = (data, files, method, url, is_Strict = false) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      //file append
      for (let key in files) {
        formData.append("image", files[key], files[key]["name"]);
      }

      //text data
      for (let ind in data) {
        formData.append(ind, data[ind]);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          let response;
          if (typeof xhr.response != "object") {
            response = JSON.parse(xhr.response);
          }

          if (response.status === 200) {
            res(response);
          } else {
            rej(response);
          }
        }
      };
      xhr.open(method, `${base_url}/${url}`);
      if (is_Strict) {
        xhr.setRequestHeader("authorization", localStorage.getItem("token"));
      }
      xhr.send(formData);
    });
  };
}
