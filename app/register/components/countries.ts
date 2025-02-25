import { countries } from "countries-list";

// Convert countries object to array format we need
const countriesList = Object.entries(countries)
  .map(([code, country]) => ({
    value: code,
    label: country.name,
    flag: "+ " + country.phone,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export default countriesList;
