import React, { useState } from "react";
import { Endpoints, Standings } from "../constant/model";
import "../css/FootballStandings.css";
import bgImage from "../assets/bg.webp";

export default function FootballStandings() {
  const [formData, setFormData] = useState({
    countryName: "",
    leagueName: "",
    teamName: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    countryName: false,
    leagueName: false,
    teamName: false,
  });

  const [boxColor, setBoxColor] = useState("white");
  const [isClientOffline, setIsClientOffline] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const setClientMode = () => {
    setIsClientOffline(!isClientOffline);
    isClientOffline
      ? alert("Client is in online mode.")
      : alert("Client is in offline mode.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFieldErrors({
      ...fieldErrors,
      [name]: false,
    });
  };

  const handleGetFootballStandings = async () => {
    if (!formData.countryName || !formData.leagueName || !formData.teamName) {
      alert("Please enter all values.");

      setFieldErrors({
        countryName: !formData.countryName,
        leagueName: !formData.leagueName,
        teamName: !formData.teamName,
      });
      return;
    }
    setBoxColor("white");

    try {
      const apiUrl =
        Endpoints.FOOTBALL_API +
        Endpoints.API +
        Endpoints.VERSION_1 +
        Endpoints.COUNTRIES +
        Endpoints.QUESTION_MARK +
        Endpoints.COUNTRY_NAME +
        Endpoints.EQUALS +
        `${formData.countryName}` +
        Endpoints.AND +
        Endpoints.LEAGUE_NAME +
        Endpoints.EQUALS +
        `${formData.leagueName}` +
        Endpoints.AND +
        Endpoints.TEAM_NAME +
        Endpoints.EQUALS +
        `${formData.teamName}` +
        Endpoints.AND +
        Endpoints.IS_CLIENT_OFFLINE +
        Endpoints.EQUALS +
        `${isClientOffline}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();

        for (const key in data) {
          if (data.hasOwnProperty(key) && Standings.hasOwnProperty(key)) {
            Standings[key] = data[key];
          }
        }

        setIsDataAvailable({
          isDataAvailable: true,
        });
      } else {
        alert("Request failed. Please try again after some time.");
      }
    } catch (error) {
      alert("Request failed. Please try again after some time.");
      console.error("Network error", error);
    }
  };

  return (
    <div
      className="football-standings-display"
      style={{
        background: `url(${bgImage})`,
      }}
    >
      <div
        className="football-standings-display-box"
        style={{
          backgroundColor: boxColor,
        }}
      >
        <h2>Hello User! Please enter the following details.</h2>
        <div
          style={{
            backgroundColor: fieldErrors.countryName ? "red" : "transparent",
          }}
        >
          <label
            htmlFor="countryName"
            className="football-standings-input-label"
          >
            Country Name
          </label>
          <input
            type="text"
            name="countryName"
            id="countryName"
            value={formData.countryName}
            onChange={handleChange}
            required
          />
        </div>
        <div
          style={{
            backgroundColor: fieldErrors.leagueName ? "red" : "transparent",
          }}
        >
          <label
            htmlFor="leagueName"
            className="football-standings-input-label"
          >
            League Name
          </label>
          <input
            type="text"
            name="leagueName"
            id="leagueName"
            value={formData.leagueName}
            onChange={handleChange}
            required
          />
        </div>
        <div
          style={{
            backgroundColor: fieldErrors.teamName ? "red" : "transparent",
          }}
        >
          <label htmlFor="teamName" className="football-standings-input-label">
            Team Name
          </label>
          <input
            type="text"
            name="teamName"
            id="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button onClick={handleGetFootballStandings}>
            Get Football Standings
          </button>
        </div>
      </div>
      <div>
        {isDataAvailable && (
          <div className="football-standings-data">
            <h2>Football Data Table</h2>
            <table>
              <tbody>
                {Object.entries(Standings).map(([key, value]) => (
                  <tr>
                    <td>{key}</td> :
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="football-standings-button">
        <label className="football-standings-input-label">Client Mode</label>
        <button onClick={setClientMode}>
          {isClientOffline ? "Offline" : "Online"}
        </button>
      </div>
    </div>
  );
}
