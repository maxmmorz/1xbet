import { Avatar, List, Section } from "@telegram-apps/telegram-ui";
import moment from "moment";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { DisplayData } from "../DisplayData/DisplayData";

type H2HDisplayDataProps = {
  team1: number;
  team2: number;
};

export const H2HDisplayData: FC<H2HDisplayDataProps> = ({ team1, team2 }) => {
  const [data, setData] = useState<
    Array<{
      id: number;
      starting_at: string;
      participants: Array<{
        image_path: string;
        name: string;
      }>;
      scores: Array<{
        description: string;
        score: {
          participant: string;
          goals: number;
        };
      }>;
    }>
  >([]);

  useQuery(
    ["data", team1, team2],
    async () => {
      const response = await fetch(
        `https://staging.ecozy.de/1xapi/fixtures/head-to-head/${team1}/${team2}?include=scores;participants`
      );

      return response.json();
    },
    {
      onSuccess: (data) => {
        setData(data.data);
      },
    }
  );

  if (!data) {
    return;
  }

  return (
    <List style={{ paddingBottom: "100px", paddingTop: "12px" }}>
      {data.map((item) => (
        <Section key={item.id}>
          <DisplayData
            header={moment(item?.starting_at).format("DD MMMM YYYY")}
            rows={[
              {
                value: (
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          height: "38px",
                        }}
                      >
                        <Avatar
                          size={20}
                          src={item?.participants?.[0].image_path}
                        />
                        <div>{item?.participants?.[0].name}</div> -{" "}
                        <div>
                          {
                            item?.scores.filter(
                              (score) =>
                                score.description === "CURRENT" &&
                                score.score.participant === "home"
                            )?.[0].score.goals
                          }
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          height: "38px",
                        }}
                      >
                        <Avatar
                          size={20}
                          src={item?.participants?.[1].image_path}
                        />
                        <div>{item?.participants?.[1].name}</div>-
                        <div>
                          {
                            item?.scores.filter(
                              (score) =>
                                score.description === "CURRENT" &&
                                score.score.participant === "away"
                            )?.[0].score.goals
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
          {/* <Cell
            className="display-data__line"
            subhead={}
            readOnly
            multiline={true}
          /> */}
        </Section>
      ))}
    </List>
  );
};
