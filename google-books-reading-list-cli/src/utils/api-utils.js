import axios from "axios";
import chalk from "chalk";

import { API } from "./api-config";

export async function generalQuery(userQuery) {
  const url = getApiUrl(API.BASE_URI, userQuery);

  return await axios({
    method: "get",
    url: url
  });
}

export async function queryTitleField(userQuery) {
  const url = getApiUrl(API.BASE_URI_TITLE, userQuery);

  return await axios({
    method: "get",
    url: url
  });
}

export async function queryAuthorField(userQuery) {
  const url = getApiUrl(API.BASE_URI_AUTHOR, userQuery);

  return await axios({
    method: "get",
    url: url
  });
}

export function parseData(data, userQuery) {
  if (data.items) {
    return data.items.map(vol => {
      return {
        title: vol.volumeInfo.title,
        authors: vol.volumeInfo.authors,
        publisher: vol.volumeInfo.publisher
      };
    });
  } else if (data.totalItems === 0) {
    console.error(
      chalk.redBright(
        `Your search "${userQuery}" did not match any book results. Please try again. Program exit.`
      )
    );
  }
}

function getApiUrl(baseUri, userQuery) {
  let url = baseUri + userQuery.trim().toLowerCase() + `&${API.MAX_RESULTS}`;
  return url;
}
