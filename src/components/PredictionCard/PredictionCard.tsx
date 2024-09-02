import { Card, Divider } from "@telegram-apps/telegram-ui";
import { FC } from "react";

type PredictionCardProps = {
    title: string,
    percentage?: number,
    value?: string,
}

export const PredictionCard: FC<PredictionCardProps> = ({ title, percentage, value }) => {
  return (
    <Card style={{ marginTop: '10px', marginLeft: '10px', marginRight: '5px', marginBottom: '5px', minWidth: '100px' }}>
      <Card.Cell
        readOnly
        subtitle={
          <div
            style={{
              display: "flex",
              gap: 5,
              flexDirection: "column",
            }}
          >
            <Divider />
            <div style={{ display: "flex", gap: 20 }}>
              {value ? <div>{value}</div> : ''}
              {percentage ? <div>{percentage.toFixed(2)}%</div> : <div>0%</div>}
            </div>
          </div>
        }
      >
        {title}
      </Card.Cell>
    </Card>
  );
};
