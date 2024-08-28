import { isRGB } from "@telegram-apps/sdk-react";
import { Avatar, Cell, Checkbox, Section } from "@telegram-apps/telegram-ui";
import type { FC, ReactNode } from "react";

import { RGB } from "@/components/RGB/RGB.tsx";
import { Link } from "@/components/Link/Link.tsx";

import "./DisplayData.css";

export type DisplayDataRow = { title: string } & (
  | { type: "link"; value?: string }
  | { value: ReactNode }
);

export interface DisplayDataProps {
  header?: ReactNode;
  footer?: ReactNode;
  rows: DisplayDataRow[];
}

export const MatchListItem: FC<DisplayDataProps> = ({ header, rows }) => (
  <Section header={header}>
    {rows.map((item, idx) => {
      let valueNode: ReactNode;

      if (item.value === undefined) {
        valueNode = <i>empty</i>;
      } else {
        if ("type" in item) {
          valueNode = <Link to={item.value}>Open</Link>;
        } else if (typeof item.value === "string") {
          valueNode = isRGB(item.value) ? (
            <RGB color={item.value} />
          ) : (
            item.value
          );
        } else if (typeof item.value === "boolean") {
          valueNode = <Checkbox checked={item.value} disabled />;
        } else {
          valueNode = item.value;
        }
      }

      return (
        <Link to={`/match-description/${item.id}`} key={idx}>
          <Cell
            className="display-data__line"
            subhead={
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", justifyContent: 'space-evenly', alignItems: 'center', gap: '4px' }}>
                  <Avatar size={20} src={item.homeTeam?.logo} />
                  <h4>{item.homeTeam?.name}</h4>
                </div>

                <div style={{ display: "flex", justifyContent: 'space-evenly', alignItems: 'center', gap: '4px' }}>
                  <h4>{item.awayTeam?.name}</h4>
                  <Avatar size={20} src={item.awayTeam?.logo} />
                </div>
              </span>
            }
            subtitle={<span className="display-data__line-value">{`${new Date(
              item.date
            ).toDateString()} ${new Date(item.date).toLocaleTimeString(
              "en-GB",
              { hour: "2-digit", minute: "2-digit" }
            )}`}</span>}
            readOnly
            multiline={true}
          >
          </Cell>
        </Link>
      );
    })}
  </Section>
);
