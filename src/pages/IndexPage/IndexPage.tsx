import {
  Section,
  Cell,
  Image,
  List,
  Avatar,
  FixedLayout,
} from "@telegram-apps/telegram-ui";
import type { FC } from "react";

import { Link } from "@/components/Link/Link.tsx";

import tonSvg from "./1xlogo.jpeg";
import ytSvg from "./youtube-svgrepo-com.svg";
import tgSvg from "./telegram-1.svg";

export const IndexPage: FC = () => {
  return (
    <List>
      <Section
        header="Главная страница"
        // footer='You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects'
      >
        <Link to="/ton-connect">
          <Cell
            before={
              <Image src={tonSvg} style={{ backgroundColor: "#007AFF" }} />
            }
            subtitle="ИИ прогнозы"
          >
            1xBet
          </Cell>
        </Link>
      </Section>
      <Section
      // header='Application Launch Data'
      // footer='These pages help developer to learn more about current launch information'
      >
        <Link to="/matches-list">
          <Cell subtitle="Лиги, матчи">Предстоящие матчи</Cell>
        </Link>
        {/* <Link to='/init-data'>
          <Cell subtitle='Лиги, матчи'>Предстоящие матчи</Cell>
        </Link> */}
        <Link to="/theme-params">
          <Cell subtitle="История наших прогнозов">История прогнозов</Cell>
        </Link>
        <Link to="/launch-params">
          <Cell subtitle="Пользовательская информация">Настройки</Cell>
        </Link>
      </Section>

      <FixedLayout vertical="bottom">
        <Section
        // header='Application Launch Data'
        // footer='These pages help developer to learn more about current launch information'
        >
          <Link to="https://www.youtube.com/@1XBETKZ/videos">
            <Cell
              before={
                <Image src={ytSvg} style={{ backgroundColor: "#fff" }} />
              }
            >
              YouTube
            </Cell>
          </Link>
          <Link to="https://web.telegram.org/a/#-1001491966465">
            <Cell
              before={
                <Image src={tgSvg} style={{ backgroundColor: "#fff" }} />
              }
            >
              YouTube
            </Cell>
          </Link>
        </Section>
      </FixedLayout>
    </List>
  );
};
