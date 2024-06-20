import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router";
import {
  ClubRankingContext,
  CountryRankingContext,
} from "../../../stores/StoreProvider";

const Rankings = ({ title }) => {
  const [ranking, setRanking] = useState([]);
  const { ranking_type } = useParams();
  const clubRanking = useContext(ClubRankingContext);
  const countryRanking = useContext(CountryRankingContext);

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  useEffect(() => {
    if (ranking_type === "club") {
      getClubRanking();
    } else if (ranking_type === "country") {
      getCountryRanking();
    }
  }, [ranking_type, clubRanking, countryRanking]);

  const getClubRanking = () => {
    setRanking(clubRanking);
  };

  const getCountryRanking = () => {
    setRanking(countryRanking);
  };

  const tableHTML = ranking.map((team) => {
    return (
      <tr key={team.position}>
        <th scope="row">{team.position}</th>
        {ranking_type === "club" ? (
          <td>{team.name}</td>
        ) : (
          <td>{team.country}</td>
        )}
        <td>{team.first}</td>
        <td>{team.second}</td>
        <td>{team.third}</td>
        <td>{team.fourth}</td>
        <td>{team.five}</td>
        {ranking_type === "club" ? (
          <td>{team.totalPoints}</td>
        ) : (
          <td>{team.ranking}</td>
        )}
      </tr>
    );
  });

  return (
    <>
      <Sidebar sidebar_type="rankings" />
      {ranking_type ? (
        <div className="table-responsive">
          <table
            className="table table-dark table-striped"
            style={{
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th scope="col">Pos</th>
                {ranking_type === "club" ? (
                  <th scope="col">Club</th>
                ) : (
                  <th scope="col">Country</th>
                )}
                <th scope="col">First Season</th>
                <th scope="col">Second Season</th>
                <th scope="col">Third Season</th>
                <th scope="col">Fourth Season</th>
                <th scope="col">Fifth Season</th>
                <th scope="col">Total Points</th>
              </tr>
            </thead>
            <tbody>{tableHTML}</tbody>
          </table>
        </div>
      ) : (
        "Select ranking type from sidebar"
      )}
    </>
  );
};

export default Rankings;
