import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FootballStandings from "./FootballStandings";

describe("FootballStandings Component", () => {
  
  const renderComponent = () => render(<FootballStandings />);

  it("renders without crashing", () => {
    const { getByText } = renderComponent();
    const helloText = getByText(
      "Hello User! Please enter the following details."
    );
    expect(helloText).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    const { getByLabelText } = renderComponent();

    const countryInput = getByLabelText("Country Name");
    const leagueInput = getByLabelText("League Name");
    const teamInput = getByLabelText("Team Name");

    fireEvent.change(countryInput, { target: { value: "England" } });
    fireEvent.change(leagueInput, { target: { value: "Premier League" } });
    fireEvent.change(teamInput, { target: { value: "Liverpool" } });

    expect(countryInput.value).toBe("England");
    expect(leagueInput.value).toBe("Premier League");
    expect(teamInput.value).toBe("Liverpool");
  });
});
