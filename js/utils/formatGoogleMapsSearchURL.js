export function formatGoogleMapsSearchURL(address) {
  // Base URL for Google Maps search
  const baseURL = "https://www.google.com/maps/search/?api=1&query=";

  // Encode the address to make it URL-friendly
  const encodedAddress = encodeURIComponent(address);

  // Combine the base URL with the encoded address
  const searchURL = `${baseURL}${encodedAddress}`;

  return searchURL;
}
