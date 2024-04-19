import axios from "axios";

class Perception {
  constructor(tokenEndpoint, apiEndpoint) {
    this.tokenEndpoint = tokenEndpoint;
    this.apiEndpoint = apiEndpoint;
  }

  async getAuthToken() {
    try {
      // the client id and client secret must be stored securely
      const credentials = btoa(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
      );
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      const response = await axios.post(this.tokenEndpoint, params, {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Error getting token: ", error.message);
    }
  }

  // generate the colors from perception
  async generate(terms, maxColors) {
    try {
      const accessToken = await this.getAuthToken();

      const params = new URLSearchParams();
      params.append("count", 1);
      params.append("maxColorsPerPalette", maxColors);
      params.append("query", terms);
      // TODO: how to add a list of terms to the query? should follow the API rules

      const apiResponse = await axios.get(this.apiEndpoint, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { palette } = apiResponse.data.data.recommendations[0];
      const { hexcodes, topTerm } = palette;
      return { hexcodes, topTerm };
    } catch (error) {
      console.error("Error getting palette recommendations: ", error.message);
    }
  }
}

export { Perception };
