import React, { useContext, useEffect, useState } from "react";
import {
  CountryLinkContext,
  CountryRankingContext,
  TableContext,
  CupsWinnersContext,
} from "../../stores/StoreProvider";
import { useParams } from "react-router";
import Sidebar from "../Page/Sidebar/Sidebar";

const AccessList = (props) => {
  const [accessList, setAccessList] = useState([]);
  const [table, setTable] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [countryLink, setCountryLink] = useState([]);
  const [cupsWinners, setCupsWinners] = useState([]);
  const [accessListTeams, setAccessListTeams] = useState([]);
  const countryRankingContext = useContext(CountryRankingContext);
  const tableContext = useContext(TableContext);
  const { league_code } = useParams();
  const countryLinkContext = useContext(CountryLinkContext);
  const cupsWinnersContext = useContext(CupsWinnersContext);

  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  useEffect(() => {
    getAccessList();
    setTable(getLeagueTable());
    setRanking(countryRankingContext);
    setCountryLink(countryLinkContext);
    setCupsWinners(cupsWinnersContext);
  }, [league_code, countryRankingContext, tableContext, countryLinkContext]);

  useEffect(() => {
    if (
      ranking.length > 0 &&
      table.length > 0 &&
      countryLink.length > 0 &&
      cupsWinners.length > 0 &&
      league_code
    ) {
      setAccessListTeams(getAccessListTeams());
    }
  }, [league_code, ranking, table, countryLink, cupsWinners]);

  const getLeagueTable = () => {
    if (tableContext) {
      const currentTableFiltered = tableContext.filter(
        (current) => current.league_code === league_code
      );

      return currentTableFiltered;
    }
  };

  const getAccessList = () => {
    fetch(`https://robertkonopka.shop/countryranking.json`)
      .then((response) => response.json())
      .then((data) => {
        setAccessList(data);
      })
      .catch((error) => console.error(error));
  };

  const getNameOfCurrentCountry = () => {
    const countryLinkFiltered = countryLink.filter(
      (link) => link.code === league_code
    );

    return countryLinkFiltered[0].name;
  };

  const getCupCodeOfCurrentCountry = () => {
    const countryLinkFiltered = countryLink.filter(
      (link) => link.code === league_code
    );

    return countryLinkFiltered[0].cup;
  };

  const getPositionOfCurrentCountry = () => {
    const nameCountry = getNameOfCurrentCountry();

    return ranking.filter((rank) => rank.country === nameCountry)[0].position;
  };

  const getAccestListForCurrentCountry = () => {
    const position = getPositionOfCurrentCountry();

    return accessList.filter(
      (access) => Number(access.position) === Number(position)
    )[0];
  };

  const getAccessListTeams = () => {
    const currentCountryAccessList = getAccestListForCurrentCountry();
    const currentCountryTable = table;
    let currentCountryAccessListTeams = [];
    let cupCode = getCupCodeOfCurrentCountry();
    let cupPlaceToLeague = false;
    let cupMove = 0;
    let numberOfChampionsLeaguePlaces = 0;
    let cupRemainTeams = cupsWinners.filter(
      (cup) => cup.league_code === cupCode
    );

    let remainTeams = cupRemainTeams[0].remain_teams;

    //console.log(remainTeams);

    currentCountryTable[0].table.map((cct) => {
      if (remainTeams.indexOf(cct.name) !== -1) {
        cupPlaceToLeague = true;
        cupMove = 1;
      }

      let positionLeague = parseInt(cct.position) + cupMove;

      let currentKey = "team" + Number(positionLeague);
      currentKey = currentKey.toString();

      Object.keys(currentCountryAccessList).map((key, index) => {
        if (key === "cup") {
          numberOfChampionsLeaguePlaces = parseInt(index) - 1;
        }
        if (currentKey === key) {
          console.log(numberOfChampionsLeaguePlaces);
          let accessListObject = {
            team: cct.name,
            access: currentCountryAccessList[key],
          };

          currentCountryAccessListTeams.push(accessListObject);
        }
      });
    });

    console.log(currentCountryAccessListTeams);
    //console.log(cupsWinnersContext);
    return currentCountryAccessListTeams;
  };

  return (
    <>
      <Sidebar sidebar_type="access" />
      {league_code ? (
        <div className="table-responsive"></div>
      ) : (
        "Select league from sidebar"
      )}
    </>
  );
};

export default AccessList;
