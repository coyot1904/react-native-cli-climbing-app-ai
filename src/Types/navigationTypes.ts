export type RootStackParamList = {
  ChatScreen: undefined;
  MapScreen: undefined;
  TrackScreen: { mountain: any };
};

export type ChatScreenProps = {
  navigation: any;
};

export type MapScreenProps = {
  navigation: any;
};

export type TrackScreenProps = {
  navigation: any;
  route: { params: { trail: any } };
};
