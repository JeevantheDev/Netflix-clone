export interface IXhr {
  getRequest: (url: string) => void;
}

export interface IVideodata {
  video_title: string | null;
  video_thumbnail_url: string | null;
  video_url: string | null;
}
