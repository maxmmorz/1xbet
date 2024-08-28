import { useEffect, useState, type FC } from "react";
import { Avatar, List } from "@telegram-apps/telegram-ui";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { MatchListItem } from "@/components/Match/MatchListItem";

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const MatchesListPage: FC = () => {
  const [data, setData] = useState([]);

  useQuery(
    "todos",
    async () => {
      const response = await fetch(
        "https://sport-highlights-api.p.rapidapi.com/football/matches?date=2024-08-23",
        {
          headers: new Headers({
            "x-rapidapi-key":
              "71b1972553msh9ebbdd4d3dbc3d6p1dc394jsn8b986ade594b",
            "x-rapidapi-host": "sport-highlights-api.p.rapidapi.com",
          }),
        }
      );

      return response.json();
    },
    {
      onSuccess: (data) => {
        const mappedByLeadue = data.data.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.league.name]: [...(acc[cur.league.name] || []), cur],
          };
        }, {});

        setData(mappedByLeadue);
      },
    }
  );

  console.log(data);

  return (
    <List>
      {Object.entries(data).map(([key, value]) => {
        return (
          <MatchListItem
            key={key}
            header={`${getFlagEmoji(value[0].country.code)} ${key}`}
            rows={value}
          />
        );
      })}
    </List>
  );
};
