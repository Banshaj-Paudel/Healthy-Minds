import axios, { AxiosInstance } from "axios";
class HttpService {
  public http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get(url: string) {
    this.updateToken();
    return this.http.get(url);
  }
  post(url: string, data: any) {
    this.updateToken();
    return this.http.post(url, data);
  }
  put(url: string, data: any) {
    this.updateToken();
    return this.http.put(url, data);
  }
  delete(url: string) {
    this.updateToken();
    return this.http.delete(url);
  }

  public updateToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.http.defaults.headers.common["Authorization"] = `Bearer: ${token}`;
    } else {
      delete this.http.defaults.headers.common["Authorization"];
    }
  }
}

export default HttpService;
