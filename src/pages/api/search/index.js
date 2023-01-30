import axios from "axios";

export default async function handler(req, res) {
  const { q } = req.query;
  const { page = 1 } = req.query;
  if (!q) {
    res.status(400).json({ error: "Set a query value" });
    return;
  }
  const config = {
    method: "get",
    url: `https://api.themoviedb.org/3/search/multi?api_key=8f52ff60fc237845607efe9791fdb6cb&query=${q}&page=${page}`,
  };

  try {
    let response = await axios(config);
    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json(e.response);
  }
}
