const request = require('request-promise');
const cheerio = require('cheerio');

const movieTitleURL = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250';

const scrapeTitleList = async (scrapeTargetURL = movieTitleURL) => {
    const result = await request(scrapeTargetURL);
    const $ = cheerio.load(result);
    const movies = $('tr').map( (index, element) => {
        return {
            title: $(element).find('td.titleColumn > a').text(),
            descriptionURL: $(element).find('td.titleColumn > a').attr('href'),
            rank: index,
            year: $(element).find('td.titleColumn > span.secondaryInfo').text(),
            rating: $(element).find('td.ratingColumn.imdbRating > strong').text(),
        };
    }).get();
    console.log(movies);
}

scrapeTitleList();