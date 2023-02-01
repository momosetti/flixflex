import axios from "axios";
import { API_ENTRYPOINT } from "@/utils/constants";

export default async function handler(req, res) {
  const config = {
    method: "get",
    url: `${API_ENTRYPOINT}/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
  };

  try {
    let response = await axios(config);
    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json(e.response);
  }
}
