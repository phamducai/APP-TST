export const ScreenName = {
  SplashScreen: 'SplashScreen',
  Main: 'Main',
  BookStack: 'BookStack',
  BookCollection: 'BookCollection',
  Book: 'Book',
  BookDetail: 'BookDetail',
  AudioStack: 'AudioStack',
  Audio: 'Audio',
  AudioCategory: 'AudioCategory',
  AudioSubCategory: 'AudioSubCategory',
  VideoStack: 'VideoStack',
  VideoCategory: 'VideoCategory',
  Videos: 'Videos',
  VideoDetail: 'VideoDetail',
  PagodaStack: 'PagodaStack',
  Pagoda: 'Pagoda',
  PagodaMap: 'PagodaMap',
};

export const getScreenTitle = screenName => {
  switch (screenName) {
    case ScreenName.Book:
      return 'Sách';
    case ScreenName.Audio:
      return 'Mp3';
    case ScreenName.AudioCategory:
      return 'Mp3';
    case ScreenName.VideoCategory:
      return 'Video';
    case ScreenName.Videos:
      return 'Video';
    case ScreenName.Pagoda:
      return 'Thiền đường';
    case ScreenName.BookCollection:
      return 'Tuyển tập sách';
    default:
      return 'Tổ sư thiền';
  }
};
