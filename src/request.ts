import fetch from "node-fetch";

export default async function requestCrunchyroll(url: string): Promise<string> {
  url = encodeURI(url);

  const response = await fetch(url);

  return response.text();
}
