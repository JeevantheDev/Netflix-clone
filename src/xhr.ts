import { youtube_parser_data, getVideoDetails } from "./youtubeDataParser";
import { IXhr, IVideodata } from "./constants";

class XHR implements IXhr {
  xhr: XMLHttpRequest;
  constructor() {
    this.xhr = new XMLHttpRequest();
  }
  getRequest(url: string) {
    return new Promise((resolve, reject) => {
      this.xhr.open("GET", url, true);
      let responseBody = {};

      this.xhr.onload = async function () {
        responseBody = await JSON.parse(this.response);
        resolve(responseBody);
      };
      this.xhr.onerror = () => reject(responseBody);
      this.xhr.send();
    });
  }

  getRequestForVideo(key: string) {
    return new Promise((resolve, reject) => {
      this.xhr.open(
        "GET",
        `https://www.youtube.com/get_video_info?html5=1&video_id=${key}`,
        true
      );

      let responsedata: IVideodata = {
        video_title: "",
        video_thumbnail_url: "",
        video_url: "",
      };

      this.xhr.onload = function () {
        let data = youtube_parser_data(this.response);
        responsedata = getVideoDetails(data);
        resolve(responsedata);
      };
      this.xhr.onerror = () => reject(responsedata);
      this.xhr.send();
    });
  }
}

export const xhr = new XHR();
