
export function createGoogleCalendarURL(concert) {
  // Base URL for creating a new Google Calendar concert
  const baseURL = "https://calendar.google.com/calendar/render?action=TEMPLATE";

  // Format the start and end times
  // Assuming the concert duration is 2 hours for example purposes
  const startTime = formatDateForGoogleCalendar(concert.date, concert.time);
  const endTime = formatDateForGoogleCalendar(concert.date, concert.time, 2);

  // Encode details for URL
  const title = encodeURIComponent("Coralien concert : " + concert.name);
  const details = encodeURIComponent("Concert at " + concert.name);
  const location = encodeURIComponent(concert.address);

  // Construct the full URL
  const url = `${baseURL}&text=${title}&details=${details}&location=${location}&dates=${startTime}/${endTime}`;

  return url;
}

function formatDateForGoogleCalendar(date, time, hoursToAdd = 0) {
    // Parse date and time components
    const [day, month, year] = date.split("-").map((part) => parseInt(part, 10));
    const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
  
    // Create Date object in UTC to avoid local time zone issues
    let concertDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  
    // Add hours if necessary
    if (hoursToAdd !== 0) {
      concertDate = new Date(concertDate.getTime() + hoursToAdd * 60 * 60 * 1000);
    }
  
    // Convert to ISO string and then to the required Google Calendar format
    let formattedDate = concertDate.toISOString().replace(/-|:|\.\d{3}/g, "");
  
    // If hoursToAdd is not 0, keep the time part; otherwise, keep only the date part
    if (hoursToAdd === 0) {
      formattedDate = formattedDate.slice(0, 15) + "Z"; // Keep it as UTC
    } else {
      // For end time, just use the formatted string
      formattedDate = formattedDate.slice(0, 15);
    }
  
    return formattedDate;
  }
  