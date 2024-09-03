import { FC } from "react";
import { List } from "@telegram-apps/telegram-ui";
import { DisplayData } from "../DisplayData/DisplayData";

type PrematchDisplayDataProps = {
  stadiumName: string;
  stadiumCityName: string;
  weather: {
    description: string;
    clouds: string;
    temperature: number;
    humidity: string;
    wind: number;
  };
};

export const PrematchDisplayData: FC<PrematchDisplayDataProps> = ({
  stadiumName,
  stadiumCityName,
  weather,
}) => {
  const stadiumRows = [
    { title: "Название", value: stadiumName },
    { title: "Город", value: stadiumCityName },
  ];

  const weatherRows = [
    {
      value: weather.description === "sky is clear" ? "Солнечно" : "",
    },
    {
      title: "Облачность",
      value: weather.clouds,
    },
    {
      title: "Температура",
      value: weather.temperature + '℃',
    },
    {
      title: "Влажность",
      value: weather.humidity,
    },
    {
      title: "Ветер",
      value: weather.wind + 'м/с',
    },
  ];

  //   const teamRows = [
  //     { title: "Название", value: stadiumName },
  //     { title: "Город", value: stadiumCityName },
  //   ];

  return (
    <List style={{ paddingBottom: "100px", paddingTop: "12px" }}>
      <DisplayData header="Стадион" rows={stadiumRows} />
      <DisplayData header="Погода" rows={weatherRows} />

      {/* <DisplayData rows={teamRows} /> */}
    </List>
  );
};
