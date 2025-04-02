import { getBaseUrl } from "../url";

describe("getBaseUrl", () => {
  it("should return the hardcoded base URL", () => {
    expect(getBaseUrl()).toBe("https://backoffice-server.onrender.com");
  });
});