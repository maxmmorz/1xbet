import { FC, useState } from "react";
import {
  Accordion,
  Headline,
  List,
  Section,
} from "@telegram-apps/telegram-ui";

import { PredictionCard } from "../PredictionCard/PredictionCard";

export type PredictionsDisplayDataProps = {
  winner?: {
    "1": number;
    X: number;
    "2": number;
  };
  doubleChance?: {
    "1/X": number;
    "2/X": number;
    "1/2": number;
  };
  bothTeamsScore?: {
    yes: number;
    no: number;
  };
  moreLess?: {
    "1.5": {
      yes: number;
      no: number;
    };
    "2.5": {
      yes: number;
      no: number;
    };
    "3.5": {
      yes: number;
      no: number;
    };
    "4.5": {
      yes: number;
      no: number;
    };
  };
  correctScore?: {
    "0-0": number;
    "0-1": number;
    "0-2": number;
    "0-3": number;
    "1-0": number;
    "1-1": number;
    "1-2": number;
    "1-3": number;
    "2-0": number;
    "2-1": number;
    "2-2": number;
    "2-3": number;
    "3-0": number;
    "3-1": number;
    "3-2": number;
    "3-3": number;
  };
};

export const PredictionsDisplayData: FC<PredictionsDisplayDataProps> = ({
  winner,
  doubleChance,
  bothTeamsScore,
  moreLess,
  correctScore,
}) => {
  const [openedAccordions, setOpenedAccordions] = useState({
    winner: true,
    doubleChance: true,
    bothTeamsScore: true,
    moreLess: true,
    correctScore: true,
  });

  if (
    !winner ||
    !doubleChance ||
    !bothTeamsScore ||
    !moreLess ||
    !correctScore
  ) {
    return null;
  }

  return (
    <List style={{ paddingBottom: '100px' }}>
      <Section>
        <Accordion
          expanded={openedAccordions.winner}
          onChange={(status) =>
            setOpenedAccordions({ ...openedAccordions, winner: status })
          }
        >
          <Accordion.Summary>
            <Headline weight="3">Победа</Headline>
          </Accordion.Summary>
          <Accordion.Content>
            <PredictionCard title="1" percentage={winner["1"]} />
            <PredictionCard title="X" percentage={winner["X"]} />
            <PredictionCard title="2" percentage={winner["2"]} />
          </Accordion.Content>
        </Accordion>
      </Section>
      <Section>
        <Accordion
          expanded={openedAccordions.doubleChance}
          onChange={(status) =>
            setOpenedAccordions({
              ...openedAccordions,
              doubleChance: status,
            })
          }
        >
          <Accordion.Summary>
            <Headline weight="3">Двойной шанс</Headline>
          </Accordion.Summary>
          <Accordion.Content>
            <PredictionCard title="1/X" percentage={doubleChance["1/X"]} />
            <PredictionCard title="2/X" percentage={doubleChance["2/X"]} />
            <PredictionCard title="1/2" percentage={doubleChance["1/2"]} />
          </Accordion.Content>
        </Accordion>
      </Section>
      <Section>
        <Accordion
          expanded={openedAccordions.bothTeamsScore}
          onChange={(status) =>
            setOpenedAccordions({
              ...openedAccordions,
              bothTeamsScore: status,
            })
          }
        >
          <Accordion.Summary>
            <Headline weight="3">Обе забьют</Headline>
          </Accordion.Summary>
          <Accordion.Content>
            <PredictionCard title="Да" percentage={bothTeamsScore.yes} />
            <PredictionCard title="Нет" percentage={bothTeamsScore.no} />
          </Accordion.Content>
        </Accordion>
      </Section>
      <Section>
        <Accordion
          expanded={openedAccordions.moreLess}
          onChange={(status) =>
            setOpenedAccordions({
              ...openedAccordions,
              moreLess: status,
            })
          }
        >
          <Accordion.Summary>
            <Headline weight="3">Голов больше/меньше</Headline>
          </Accordion.Summary>
          <Accordion.Content>
            <PredictionCard
              title="Больше 1.5"
              percentage={moreLess["1.5"].yes}
            />
            <PredictionCard
              title="Меньше 1.5"
              percentage={moreLess["1.5"].no}
            />
            <PredictionCard
              title="Больше 2.5"
              percentage={moreLess["2.5"].yes}
            />
            <PredictionCard
              title="Меньше 2.5"
              percentage={moreLess["2.5"].no}
            />
            <PredictionCard
              title="Больше 3.5"
              percentage={moreLess["3.5"].yes}
            />
            <PredictionCard
              title="Меньше 3.5"
              percentage={moreLess["3.5"].no}
            />
            <PredictionCard
              title="Больше 4.5"
              percentage={moreLess["4.5"].yes}
            />
            <PredictionCard
              title="Меньше 4.5"
              percentage={moreLess["4.5"].no}
            />
          </Accordion.Content>
        </Accordion>
      </Section>
      <Section>
        <Accordion
          expanded={openedAccordions.correctScore}
          onChange={(status) =>
            setOpenedAccordions({
              ...openedAccordions,
              correctScore: status,
            })
          }
        >
          <Accordion.Summary>
            <Headline weight="3">Точный счет</Headline>
          </Accordion.Summary>
          <Accordion.Content>
            <PredictionCard title="0-0" percentage={correctScore["0-0"]} />
            <PredictionCard title="0-1" percentage={correctScore["0-1"]} />
            <PredictionCard title="0-2" percentage={correctScore["0-2"]} />
            <PredictionCard title="0-3" percentage={correctScore["0-3"]} />
            <PredictionCard title="1-0" percentage={correctScore["1-0"]} />
            <PredictionCard title="1-2" percentage={correctScore["1-2"]} />
            <PredictionCard title="1-3" percentage={correctScore["1-3"]} />
            <PredictionCard title="2-0" percentage={correctScore["2-0"]} />
            <PredictionCard title="2-1" percentage={correctScore["2-1"]} />
            <PredictionCard title="2-2" percentage={correctScore["2-2"]} />
            <PredictionCard title="2-3" percentage={correctScore["2-3"]} />
            <PredictionCard title="3-0" percentage={correctScore["3-0"]} />
            <PredictionCard title="3-1" percentage={correctScore["3-1"]} />
            <PredictionCard title="3-2" percentage={correctScore["3-2"]} />
            <PredictionCard title="3-3" percentage={correctScore["3-3"]} />
          </Accordion.Content>
        </Accordion>
      </Section>
    </List>
  );
};
