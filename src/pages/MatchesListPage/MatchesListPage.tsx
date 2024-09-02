import { useState, type FC } from "react";
import {
  Avatar,
  Headline,
  InlineButtons,
  List,
} from "@telegram-apps/telegram-ui";
import { useQuery } from "react-query";
import moment from "moment";
import "moment/dist/locale/ru";

import { MatchListItem } from "@/components/Match/MatchListItem";

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
        `https://staging.ecozy.de/1xapi/fixtures/date/${searchDate}?include=participants;league;league.country`
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
      <List style={{ paddingBottom: "50px" }}>
        {Object.entries(data).map(([key, value]) => {
          return (
            <MatchListItem
              key={key}
              header={
                <Headline
                  weight="1"
                  style={{
                    paddingLeft: "24px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "#17212B",
                  }}
                >
                  <Avatar
                    size={28}
                    src={value?.[0]?.league.country.image_path}
                  />
                  {value[0]?.league.name}
                </Headline>
              }
              rows={value}
            />
          );
        })}
      </List>
      <InlineButtons
        mode="plain"
        style={{
          width: "100vw",
          overflow: "scroll",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#212121",
          zIndex: "10",
        }}
      >
        <InlineButtons.Item
          style={{
            backgroundColor:
              searchDate === moment().format("YYYY-MM-DD")
                ? "#2f2f2f"
                : "#212121",
          }}
          onClick={() => {
            setSearchDate(moment().format("YYYY-MM-DD"));
          }}
          mode="bezeled"
        >
          Сегодня
        </InlineButtons.Item>
        <InlineButtons.Item
          style={{
            backgroundColor:
              searchDate === moment().add(1, "day").format("YYYY-MM-DD")
                ? "#2f2f2f"
                : "#212121",
          }}
          onClick={() => {
            setSearchDate(moment().add(1, "day").format("YYYY-MM-DD"));
          }}
          text={moment().add(1, "day").format("DD")}
        >
          {moment().add(1, "day").format("MMM")}
        </InlineButtons.Item>
        <InlineButtons.Item
          style={{
            backgroundColor:
              searchDate === moment().add(2, "day").format("YYYY-MM-DD")
                ? "#2f2f2f"
                : "#212121",
          }}
          onClick={() => {
            setSearchDate(moment().add(2, "day").format("YYYY-MM-DD"));
          }}
          text={moment().add(2, "day").format("DD")}
        >
          {moment().add(2, "day").format("MMM")}
        </InlineButtons.Item>
      </InlineButtons>
    </>
  );
};
