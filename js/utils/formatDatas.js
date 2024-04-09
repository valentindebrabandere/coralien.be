export function removeOldConcerts(concerts) {
    const currentDate = new Date();
    return concerts.filter(concert => {
        const concertDate = new Date(concert.date.split('-').reverse().join('-'));
        return concertDate >= currentDate;
    });
}

export function removeDuplicateConcerts(concerts) {
    return concerts.filter((concert, index, self) =>
        index === self.findIndex(t => (
            t.name === concert.name && t.date === concert.date
        ))
    );
}

export function sortConcertsByDate(concerts) {
    return concerts.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateA - dateB;
    });
}

export function parseMarkdownToConcerts(markdownText) {
    const concertBlocks = markdownText.split('\n### ').slice(1); // Split into concert sections
    return concertBlocks.map(block => {
        const lines = block.split('\n').filter(line => line.trim()); // Split block into lines and remove empty ones
        const name = lines[0].trim();
        const date = lines.find(line => line.startsWith('- **Date**:')).split(': ')[1];
        const time = lines.find(line => line.startsWith('- **Time**:')).split(': ')[1];
        const address = lines.find(line => line.startsWith('- **Address**:')).split(': ')[1];
        return { date, time, name, address };
    });
}