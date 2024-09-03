import { Avatar, Headline } from "@telegram-apps/telegram-ui";
import { FC } from "react";

import './LeagueHeadline.css'

type LeagueHeadlineProps = {
  leagueName: string;
  leagueEmblemUrl: string;
};

export const LeagueHeadline: FC<LeagueHeadlineProps> = ({
  leagueName,
  leagueEmblemUrl,
}) => {
  return (
    <Headline weight="1" className="league-headline">
      <Avatar size={28} src={leagueEmblemUrl} />
      {leagueName}
    </Headline>
  );
};
