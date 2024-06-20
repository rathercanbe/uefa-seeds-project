import React, { createContext, useEffect, useState } from "react";

export const TableContext = createContext(null);
export const CountryRankingContext = createContext(null);
export const ClubRankingContext = createContext(null);
export const CountryLinkContext = createContext(null);
export const CupsWinnersContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [table, setTable] = useState([]);
  const [countryRanking, setCountryRanking] = useState([]);
  const [clubRanking, setClubRanking] = useState([]);
  const [countryLink, setCountryLink] = useState([]);
  const [cupsWinners, setCupsWinners] = useState([]);

  useEffect(() => {
    getLeagueTable();
    getLeagueTable();
    getCountryRanking();
    getClubRanking();
    getCountryLink();
    getCupWinners();
  }, []);

  const getLeagueTable = () => {
    fetch(`https://robertkonopka.shop/tables.json`)
      .then((response) => response.json())
      .then((data) => {
        setTable(data);
      })
      .catch((error) => console.error(error));
  };

  const getCupWinners = () => {
    fetch(`https://robertkonopka.shop/cups.json`)
      .then((response) => response.json())
      .then((data) => {
        setCupsWinners(data);
      })
      .catch((error) => console.error(error));
  };

  const getClubRanking = () => {
    fetch(`https://robertkonopka.shop/rankingklubowy.json`)
      .then((response) => response.json())
      .then((data) => {
        setClubRanking(data);
      })
      .catch((error) => console.error(error));
  };

  const getCountryRanking = () => {
    fetch(`https://robertkonopka.shop/rankinguefa.json`)
      .then((response) => response.json())
      .then((data) => {
        setCountryRanking(data);
      })
      .catch((error) => console.error(error));
  };

  const getCountryLink = () => {
    fetch(`https://robertkonopka.shop/country_link.json`)
      .then((response) => response.json())
      .then((data) => {
        setCountryLink(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <TableContext.Provider value={table}>
      <ClubRankingContext.Provider value={clubRanking}>
        <CountryRankingContext.Provider value={countryRanking}>
          <CountryLinkContext.Provider value={countryLink}>
            <CupsWinnersContext.Provider value={cupsWinners}>
              {children}
            </CupsWinnersContext.Provider>
          </CountryLinkContext.Provider>
        </CountryRankingContext.Provider>
      </ClubRankingContext.Provider>
    </TableContext.Provider>
  );
};

export default StoreProvider;
