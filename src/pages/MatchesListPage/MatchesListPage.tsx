import { useState, type FC } from "react";
import { List } from "@telegram-apps/telegram-ui";
import { useQuery } from "react-query";
import moment from "moment";

import "moment/dist/locale/ru";

import { MatchListItem } from "@/components/Match/MatchListItem";
import { LeagueHeadline } from "@/components/LeagueHeadline/LeagueHeadline";
import { SelectDate } from "@/components/SelectDate/SelectDate";

moment.locale("ru");

export const MatchesListPage: FC = () => {
  const [data, setData] = useState<{
    string?: Array<{
      league: {
        country: {
          image_path: string;
        };
        name: string;
      };
      value?: string;
      id: number;
      starting_at: string;
      participants: Array<{
        image_path: string;
        name: string;
      }>;
    }>;
  }>({});
  const [searchDate, setSearchDate] = useState(moment().format("YYYY-MM-DD"));

  useQuery(
    ["fixtures", searchDate],
    async () => {
      const response = await fetch(
        `https://staging.ecozy.de/1xapi/fixtures/date/${searchDate}?include=participants;league;league.country&locale=ru`
      );

      return response.json();
    },
    {
      onSuccess: (data) => {
        const mappedByLeadue = data.data.reduce(
          (
            acc: { [key: string]: string },
            cur: {
              league: {
                name: string;
              };
            }
          ) => {
            return {
              ...acc,
              [cur.league.name]: [...(acc[cur.league.name] || []), cur],
            };
          },
          {}
        );

        setData(mappedByLeadue);
      },
    }
  );

  return (
    <>
      <List style={{ paddingBottom: "100px" }}>
        {Object.entries(data).map(([key, value]) => {
          return (
            <MatchListItem
              key={key}
              header={
                <LeagueHeadline
                  leagueName={value[0]?.league.name}
                  leagueEmblemUrl={value?.[0]?.league.country.image_path}
                />
              }
              rows={value}
            />
          );
        })}
      </List>
      <SelectDate date={searchDate} onDateChangeCallback={setSearchDate} />
    </>
  );
};
