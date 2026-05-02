const localHosts = ["localhost", "127.0.0.1", "::1"];

export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL || "/api";

  if (typeof window === "undefined") {
    return configuredUrl;
  }

  try {
    const apiUrl = new URL(configuredUrl, window.location.origin);
    const browserHost = window.location.hostname;

    if (localHosts.includes(browserHost) && !localHosts.includes(apiUrl.hostname)) {
      return "http://localhost:3000/api";
    }

    if (localHosts.includes(apiUrl.hostname) && !localHosts.includes(browserHost)) {
      apiUrl.hostname = browserHost;
      return apiUrl.toString().replace(/\/$/, "");
    }
  } catch (err) {
    console.error("Invalid API URL", err);
  }

  return configuredUrl.replace(/\/$/, "");
};
