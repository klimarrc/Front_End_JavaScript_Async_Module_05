/* Kailine Lima 
October 29, 2025.
JavaScript Async/ Await Assignment_5 */

const DATASET = 'https://data.winnipeg.ca/Organizational-Support-Services/Air-Quality/f58p-2ju3'
let commonName = 'Ash';
function buildSoqlUrl(commonName) {
	const baseUrl = `https://data.winnipeg.ca/resource/${DATASET}.json`;
	const where = `$where=lower(commo-name) LIKE lower('%${commonName}%')`;
    const order = `&$order = diameter_at_breast_height DESC`;
    const limit = `&$limite =100`;

	return encodeURI (`${baseUrl}? ${where} + ${order} + ${limit}`);

}
