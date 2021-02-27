export const youtube_parser_data = (data: string) => {
  //---> parse video data - start
  var qsToJson = function (qs: any) {
    var res: any = {};
    var pars = qs.split("&");
    var kv, k, v;
    for (const i in pars) {
      kv = pars[i].split("=");
      k = kv[0];
      v = kv[1];
      res[k] = decodeURIComponent(v);
    }
    return res;
  };
  //---> parse video data - end

  var get_video_info = qsToJson(data);

  if (get_video_info.status == "fail") {
    return {
      status: "error",
      code: "invalid_url",
      msg: "check your url or video id",
    };
  } else {
    // remapping urls into an array of objects

    //--->parse > url_encoded_fmt_stream_map > start

    //will get the video urls
    var tmp = get_video_info["url_encoded_fmt_stream_map"];
    if (tmp) {
      tmp = tmp.split(",");
      for (const i in tmp) {
        tmp[i] = qsToJson(tmp[i]);
      }
      get_video_info["url_encoded_fmt_stream_map"] = tmp;
    }
    //--->parse > url_encoded_fmt_stream_map > end

    //--->parse > player_response > start
    var tmp1 = get_video_info["player_response"];
    if (tmp1) {
      get_video_info["player_response"] = JSON.parse(tmp1);
    }
    //--->parse > player_response > end

    //--->parse > keywords > start
    var keywords = get_video_info["keywords"];
    if (keywords) {
      keywords = keywords.replace(/\+/g, " ").split(",");
      for (const i in keywords) {
        keywords[i] = qsToJson(keywords[i]);
      }
      get_video_info["keywords"] = {
        all: keywords.replace(/\+/g, " "),
        arr: keywords,
      };
    }
    //--->parse > keywords > end

    //return data
    return {
      status: "success",
      raw_data: qsToJson(data),
      video_info: get_video_info,
    };
  }
};

export const getVideoDetails = (data: any) => {
  var video_data = data.video_info;

  var video_title = video_data.player_response.videoDetails.title.replace(
    /\+/g,
    " "
  );
  var video_thumbnail_url =
    video_data.player_response.videoDetails.thumbnail.thumbnails[0].url;

  var video_arr = video_data.player_response.streamingData.formats;
  //quality "hd720"
  var video_arr_final = {
    video_title: "",
    video_thumbnail_url: "",
    video_url: "",
  };
  video_arr.forEach((v1: any) => {
    if (v1.quality == "hd720") {
      video_arr_final = {
        video_title: video_title,
        video_thumbnail_url: video_thumbnail_url,
        video_url: v1.url,
      };
    }
  });
  return video_arr_final;
};
