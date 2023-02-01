import axios from "axios";
import { API_ENTRYPOINT } from "@/utils/constants";

export default async function handler(req, res) {
  const { q } = req.query;
  const { page = 1 } = req.query;
  if (!q) {
    res.status(400).json({ error: "Set a query value" });
    return;
  }
  const config = {
    method: "get",
    url: `${API_ENTRYPOINT}/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${q}&page=${page}`,
  };

  try {
    let response = await axios(config);
    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json(e.response);
  }
}
