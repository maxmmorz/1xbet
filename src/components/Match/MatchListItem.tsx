import {
  Avatar,
  Cell,
  Section,
} from "@telegram-apps/telegram-ui";
import type { FC, ReactNode } from "react";

import { Link } from "@/components/Link/Link.tsx";

import "./DisplayData.css";
import moment from "moment";

export type DisplayDataRow = { title: string } & (
  | { type: "link"; value?: string }
  | { value: ReactNode }
);

export interface DisplayDataProps {
  header?: ReactNode;
  footer?: ReactNode;
  rows: {
    value?: string;
    id?: number;
    starting_at?: string;
    participants?: Array<{
      image_path?: string;
      name?: string;
    }>
  }[];
}

export const MatchListItem: FC<DisplayDataProps> = ({ header, rows }) => (
  <>
    <Section header={header}>
      {rows.map((item, idx) => {
        return (
          <Link to={`/match-description/${item.id}`} key={idx}>
            <Cell
              className="display-data__line"
              subhead={
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {moment(item?.starting_at).format('HH:mm')}
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
                      <Avatar size={20} src={item?.participants?.[0].image_path} />
                      <h4>{item?.participants?.[0].name}</h4>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        height: "38px",
                      }}
                    >
                      <Avatar size={20} src={item?.participants?.[1].image_path} />
                      <h4>{item?.participants?.[1].name}</h4>
                    </div>
                  </div>
                </div>
              }
              readOnly
              multiline={true}
            />
          </Link>
        );
      })}
    </Section>
  </>
);
