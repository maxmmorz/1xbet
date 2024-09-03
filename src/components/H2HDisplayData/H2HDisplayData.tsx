import { Avatar, Cell, List, Section } from "@telegram-apps/telegram-ui";
import moment from "moment";
import { FC, useState } from "react";
import { useQuery } from "react-query";

type H2HDisplayDataProps = {
  team1: number;
  team2: number;
};

export const H2HDisplayData: FC<H2HDisplayDataProps> = ({ team1, team2 }) => {
  const [data, setData] = useState<Array<{
    id: number;
    starting_at: string;
    participants: Array<{
      image_path: string;
      name: string;
    }>
    scores: Array<{
      description: string;
      score: {
        participant: string;
        goals: number;
      }
    }>
  }>>([]);

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

  console.log("qwe", data);

  if (!data) {
    return;
  }

  return (
    <List style={{ paddingBottom: "100px" }}>
      {data.map((item) => (
        <Section key={item.id}>
          <Cell
            className="display-data__line"
            subhead={
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {moment(item?.starting_at).format("DD MMM YYYY")}
                </div>
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
                    <h4>{item?.participants?.[0].name}</h4> -{" "}
                    <h4>
                      {
                        item?.scores.filter(
                          (score) =>
                            score.description === "CURRENT" &&
                            score.score.participant === "home"
                        )?.[0].score.goals
                      }
                    </h4>
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
                    <h4>{item?.participants?.[1].name}</h4>-
                    <h4>
                      {
                        item?.scores.filter(
                          (score) =>
                            score.description === "CURRENT" &&
                            score.score.participant === "away"
                        )?.[0].score.goals
                      }
                    </h4>
                  </div>
                </div>
              </div>
            }
            readOnly
            multiline={true}
          />
        </Section>
      ))}
    </List>
  );
};
