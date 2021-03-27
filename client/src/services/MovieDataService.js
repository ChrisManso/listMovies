import http from "../http-request";

class MovieDataService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`movie/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/movie/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }
}

export default new MovieDataService();
