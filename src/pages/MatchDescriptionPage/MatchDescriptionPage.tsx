import { type FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Divider,
  Headline,
  Section,
  TabsList,
} from "@telegram-apps/telegram-ui";
import { useQuery } from "react-query";
import { DisplayData } from "@/components/DisplayData/DisplayData";
import moment from "moment";
import { PrematchDisplayData } from "@/components/PrematchDisplayData/PrematchDisplayData";
import {
  PredictionsDisplayData,
  PredictionsDisplayDataProps,
} from "@/components/PredictionsDisplayData/PredictionsDisplayData";

export const MatchDescriptionPage: FC = () => {
  const [data, setData] = useState<{
    starting_at: string;
    participants: Array<{ image_path: string; name: string }>;
    league: {
      name: string;
      country: {
        image_path: string;
      };
    };
  }>();
  const [predictions, setPredictions] = useState<PredictionsDisplayDataProps>();
  const [selectedTab, setSelectedTab] = useState("predictions");
  const { id } = useParams();

  useQuery(
    ["data", id],
    async () => {
      const response = await fetch(
        `https://staging.ecozy.de/1xapi/fixtures/${id}?include=participants;league;league.country;predictions;predictions.type`
      );

      return response.json();
    },
    {
      onSuccess: (data) => {
        const mappedByPredictionType = data.data.predictions.reduce(
          (
            acc: object,
            cur: {
              type: {
                developer_name: string;
              };
            }
          ) => ({
            ...acc,
            [cur.type.developer_name]: cur,
          }),
          {}
        );

        const winnerPredictions =
          mappedByPredictionType.FULLTIME_RESULT_PROBABILITY.predictions;
        const doubleChancePredictions =
          mappedByPredictionType.DOUBLE_CHANCE_PROBABILITY.predictions;
        const bothTeamsScorePredictions =
          mappedByPredictionType.BTTS_PROBABILITY.predictions;
        const correctScorePredictions =
          mappedByPredictionType.CORRECT_SCORE_PROBABILITY.predictions.scores;

        const formattedData: PredictionsDisplayDataProps = {
          winner: {
            "1": winnerPredictions.home,
            X: winnerPredictions.draw,
            "2": winnerPredictions.away,
          },
          doubleChance: {
            "1/X": doubleChancePredictions.draw_home,
            "2/X": doubleChancePredictions.draw_away,
            "1/2": doubleChancePredictions.home_away,
          },
          bothTeamsScore: {
            yes: bothTeamsScorePredictions.yes,
            no: bothTeamsScorePredictions.no,
          },
          moreLess: {
            "1.5": {
              yes: mappedByPredictionType.OVER_UNDER_1_5_PROBABILITY.predictions
                .yes,
              no: mappedByPredictionType.OVER_UNDER_1_5_PROBABILITY.predictions
                .no,
            },
            "2.5": {
              yes: mappedByPredictionType.OVER_UNDER_2_5_PROBABILITY.predictions
                .yes,
              no: mappedByPredictionType.OVER_UNDER_2_5_PROBABILITY.predictions
                .no,
            },
            "3.5": {
              yes: mappedByPredictionType.OVER_UNDER_3_5_PROBABILITY.predictions
                .yes,
              no: mappedByPredictionType.OVER_UNDER_3_5_PROBABILITY.predictions
                .no,
            },
            "4.5": {
              yes: mappedByPredictionType.OVER_UNDER_3_5_PROBABILITY.predictions
                .yes,
              no: mappedByPredictionType.OVER_UNDER_3_5_PROBABILITY.predictions
                .no,
            },
          },
          correctScore: {
            "0-0": correctScorePredictions["0-0"],
            "0-1": correctScorePredictions["0-1"],
            "0-2": correctScorePredictions["0-2"],
            "0-3": correctScorePredictions["0-3"],
            "1-0": correctScorePredictions["1-0"],
            "1-1": correctScorePredictions["1-1"],
            "1-2": correctScorePredictions["1-2"],
            "1-3": correctScorePredictions["1-3"],
            "2-0": correctScorePredictions["2-0"],
            "2-1": correctScorePredictions["2-1"],
            "2-2": correctScorePredictions["2-2"],
            "2-3": correctScorePredictions["2-3"],
            "3-0": correctScorePredictions["3-0"],
            "3-1": correctScorePredictions["3-1"],
            "3-2": correctScorePredictions["3-2"],
            "3-3": correctScorePredictions["3-3"],
          },
        };

        setPredictions(formattedData);
        setData(data.data);
      },
    }
  );

  const userRows = useMemo(() => {
    return [
      { value: moment(data?.starting_at).format("HH:mm - DD MMMM YYYY") },
      {
        value: (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar size={40} src={data?.league.country.image_path} />
            <Headline weight="3">{data?.league.name}</Headline>
          </div>
        ),
      },
    ];
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <>
      <Section>
        <div
          style={{
            display: "flex",
            padding: "24px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: "38px",
            }}
          >
            <Avatar size={28} src={data?.participants[0].image_path} />
            <Headline weight="3">{data?.participants[0].name}</Headline>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: "38px",
            }}
          >
            <Headline weight="3">{data?.participants[1].name}</Headline>
            <Avatar size={28} src={data?.participants[1].image_path} />
          </div>
        </div>
      </Section>
      <Divider />
      {userRows && <DisplayData rows={userRows} />}
      <TabsList
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#232E3C",
        }}
      >
        <TabsList.Item
          onClick={() => setSelectedTab("prematch")}
          selected={selectedTab === "prematch"}
        >
          <Headline weight="3">Прематч</Headline>
        </TabsList.Item>
        <TabsList.Item
          onClick={() => setSelectedTab("predictions")}
          selected={selectedTab === "predictions"}
        >
          <Headline weight="3">Прогнозы</Headline>
        </TabsList.Item>
        {/* <TabsList.Item
          onClick={() => setSelectedTab("h2h")}
          selected={selectedTab === "h2h"}
        >
          H2H
        </TabsList.Item> */}
      </TabsList>
      {selectedTab === "prematch" && <PrematchDisplayData />}
      {selectedTab === "predictions" && (
        <PredictionsDisplayData
          winner={predictions?.winner}
          doubleChance={predictions?.doubleChance}
          bothTeamsScore={predictions?.bothTeamsScore}
          moreLess={predictions?.moreLess}
          correctScore={predictions?.correctScore}
        />
      )}
      {/* {selectedTab === "h2h" && <H2HDispayData />} */}
    </>
  );
};
