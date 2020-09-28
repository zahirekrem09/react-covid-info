import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]); // React hooks
  const [country, setCountry] = useState("worldwide");
  const [counryInfo, setCounryInfo] = useState([]);

  useEffect(() => {
    // api endpoint :"https://disease.sh/v3/covid-19/countries"
    // TODO: api connect useEffect() fecth or axios
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //unidede kin, turkey
            value: country.countryInfo.iso2, //uk,tr
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCounryInfo(data);
      });
  }, []);
  //Dropdown Change
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    //api endpoint :"https://disease.sh/v3/covid-19/countries/[countryCode]"

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCounryInfo(data);
      });
  };
  console.log(counryInfo);
  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        {/* Title and input dropdown */}
        <div className="app__header">
          <h1>Covid-19 Info</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* Infoboxs title = "Coronavirus cases" */}
          <InfoBox
            title="Coronavirus Cases"
            cases={counryInfo.todayCases}
            total={counryInfo.cases}
          />
          {/* Infoboxs title = "Coronavirus recoveries"*/}
          <InfoBox
            title="Recovered"
            cases={counryInfo.todayRecovered}
            total={counryInfo.recovered}
          />
          {/* Infoboxs title = "Coronavirus cases"*/}
          <InfoBox
            title="Deaths"
            cases={counryInfo.todayDeaths}
            total={counryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          {/* Chart */}
          <h3>Worlwide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
