import axios from "axios";

export default async function handler(req, res) {
  const config = {
    method: "get",
    url: "https://api.themoviedb.org/3/movie/popular?api_key=8f52ff60fc237845607efe9791fdb6cb",
  };

  try {
    let response = await axios(config);
    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json(e.response);
  }
}
