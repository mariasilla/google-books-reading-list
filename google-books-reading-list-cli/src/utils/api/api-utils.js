import axios from "axios";

import { API } from "./api-config";

export async function performApiSearch(uri, userQuery) {
  const url = getApiUrl(uri, userQuery);

  return await axios({
    method: "get",
    url: url
  });
}

export function parseBookData(data) {
  if (data.items) {
    return data.items.map(vol => {
      return {
        title: vol.volumeInfo.title,
        authors: vol.volumeInfo.authors,
        publisher: vol.volumeInfo.publisher
      };
    });
  } else {
    return false;
  }
}

function getApiUrl(baseUri, userQuery) {
  let url = baseUri + userQuery.trim().toLowerCase() + `&${API.MAX_RESULTS}`;
  return url;
}
