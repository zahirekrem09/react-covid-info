import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
import { prettyPrintStat, sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]); // React hooks
  const [country, setCountry] = useState("worldwide");
  const [counryInfo, setCounryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
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

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  // console.log(counryInfo);
  return (
    <div className="app">


      <div className="app__left">
        {/* Header */}
        {/* Title and input dropdown */}
        <Card className="app__headerCard" >
        <CardContent>
        <div className="app__header">
          <div className="app__logo">
            <img className="app__logoImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyk2l9wbIt0m3AVcAq5oktv1pWEASR9Fa5DA&usqp=CAU" alt=""/>
          <h1>Covid-19 Info</h1>
          </div>
        
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
        </CardContent>
      </Card>
       

        <Grid container className="" spacing={3}>
          <Grid item xs={12}  sm = {4}>
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              cases={prettyPrintStat(counryInfo.todayCases)}
              total={prettyPrintStat(counryInfo.cases)}
            />
          </Grid>
          <Grid item xs={12}  sm = {4}>
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(counryInfo.todayRecovered)}
              total={prettyPrintStat(counryInfo.recovered)}
            />
          </Grid>
          <Grid item xs={12}  sm = {4}>
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(counryInfo.todayDeaths)}
              total={prettyPrintStat(counryInfo.deaths)}
            />
          </Grid>
        </Grid>
        {/* Map */}
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/* Chart */}
          <br />
          <h3>Worlwide New {casesType}</h3>
          <br />
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
