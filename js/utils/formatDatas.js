export function removeOldConcerts(concerts) {
  const currentDate = new Date();
  return concerts.filter((concert) => {
    const concertDate = new Date(concert.date.split("-").reverse().join("-"));
    return concertDate >= currentDate;
  });
}

export function removeDuplicateConcerts(concerts) {
  return concerts.filter(
    (concert, index, self) =>
      index ===
      self.findIndex((t) => t.name === concert.name && t.date === concert.date)
  );
}

export function sortConcertsByDate(concerts) {
  return concerts.sort((a, b) => {
    const dateA = new Date(a.date.split("-").reverse().join("-"));
    const dateB = new Date(b.date.split("-").reverse().join("-"));
    return dateA - dateB;
  });
}

export function parseMarkdownToConcerts(markdownText) {
    const concertBlocks = markdownText.split("\n### ").slice(1); // Split into concert sections
    return concertBlocks.map((block) => {
      const lines = block.split("\n").filter((line) => line.trim()); // Split block into lines and remove empty ones
      const name = lines[0].trim();
  
      const findLine = (lineStart, concertName) => {
        const line = lines.find((line) => line.startsWith(lineStart));
        if (!line) {
          console.warn(`Warning: '${lineStart.trim()}' not provided for concert '${concertName}'.`);
          return 'Not provided';
        }
        return line.split(": ")[1].trim();
      };
  
      const date = findLine("- **Date**", name);
      const time = findLine("- **Time**", name);
      const address = findLine("- **Address**", name);
      const link = findLine("- **Link**", name);
  
      return { date, time, name, address, link };
    });
  }
  
  
