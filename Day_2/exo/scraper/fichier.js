import * as cheerio from "cheerio";

async function fetch(){
const url = 'https://fr.wikipedia.org/wiki/Tableau_des_médailles_des_Jeux_olympiques_d%27hiver_de_2022';
const $ = await cheerio.fromURL(url);
const table = $('.wikitable').first();
	const data = []
table.find('tbody tr').each((index, element) => {
  const row = $(element).find('td');
  const rank = $(row[0]).text().trim();
  const country = $(row[1]).text().trim();
  const gold = $(row[2]).text().trim();
  const silver = $(row[3]).text().trim();
  const bronze = $(row[4]).text().trim();
  const total = $(row[5]).text().trim();
  if (rank && country) {
	  data.push(
		  {
			  rank,
			  country,
			  gold,
			  silver,
			  bronze,
			  total
		})
  }
	console.log(data)
});
}
fetch()
