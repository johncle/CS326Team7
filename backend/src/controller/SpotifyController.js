import mockData from "../mockData/mockSpotifyData.json" assert { type: "json" };

class SpotifyController {
  getAudioFeatures(req, res) {
    res.json(mockData.audio_features);
  }

  getRecommendations(req, res) {
    res.json(mockData.recommendations);
  }
}

export default new SpotifyController();
