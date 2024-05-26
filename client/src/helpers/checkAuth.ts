import axios from "axios";
import config from "../../projectConfig";

axios.defaults.baseURL = config.baseAPIUrl;
const checkAuth = () => {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/";
    return;
  }
  axios
    .post(
      "/checkAuth",
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .catch((err) => {
      if (err.response.data.success == false) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        window.location.href = "/";
      }
    });
};

export default checkAuth;
