import { isRGB } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Cell,
  Checkbox,
  InlineButtons,
  Section,
} from "@telegram-apps/telegram-ui";
import type { FC, ReactNode } from "react";

import { RGB } from "@/components/RGB/RGB.tsx";
import { Link } from "@/components/Link/Link.tsx";

import "./DisplayData.css";
import { InlineButtonsItem } from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";

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
  <>
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
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {new Date(item.starting_at).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
                      <Avatar size={20} src={item.participants[0].image_path} />
                      <h4>{item.participants[0].name}</h4>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        height: "38px",
                      }}
                    >
                      <Avatar size={20} src={item.participants[1].image_path} />
                      <h4>{item.participants[1].name}</h4>
                    </div>
                  </div>
                </div>
              }
              readOnly
              multiline={true}
            ></Cell>
          </Link>
        );
      })}
     
    </Section>
  </>
);
