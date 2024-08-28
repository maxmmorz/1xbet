import { type FC, useMemo, useState } from "react";
import {
  useInitData,
  useLaunchParams,
  type User,
} from "@telegram-apps/sdk-react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  Avatar,
  Blockquote,
  List,
  Placeholder,
  Section,
} from "@telegram-apps/telegram-ui";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import {
  DisplayData,
  type DisplayDataRow,
} from "@/components/DisplayData/DisplayData.tsx";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: "id", value: user.id.toString() },
    { title: "username", value: user.username },
    { title: "photo_url", value: user.photoUrl },
    { title: "last_name", value: user.lastName },
    { title: "first_name", value: user.firstName },
    { title: "is_bot", value: user.isBot },
    { title: "is_premium", value: user.isPremium },
    { title: "language_code", value: user.languageCode },
    { title: "allows_to_write_to_pm", value: user.allowsWriteToPm },
    { title: "added_to_attachment_menu", value: user.addedToAttachmentMenu },
  ];
}

export const MatchDescriptionPage: FC = () => {
  const [data, setData] = useState();
  const [accordionExpaned, setAccordionExpaned] = useState(false);
  const [accordionExpaned1, setAccordionExpaned1] = useState(false);
  const [accordionExpaned2, setAccordionExpaned2] = useState(true);
  // const [accordionExpaned3, setAccordionExpaned3] = useState(true);
  const initData = useInitData();
  const { id } = useParams();

  useQuery(
    ["todos", id],
    async () => {
      const response = await fetch(
        `https://sport-highlights-api.p.rapidapi.com/football/matches/${id}`,
        {
          headers: new Headers({
            "x-rapidapi-key":
              "71b1972553msh9ebbdd4d3dbc3d6p1dc394jsn8b986ade594b",
            "x-rapidapi-host": "sport-highlights-api.p.rapidapi.com",
          }),
        }
      );

      return response.json();
    },
    {
      onSuccess: (data) => {
        setData(data[0]);
      },
    }
  );

  console.log(data);

  const basicDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!data) {
      return;
    }

    const {
      country,
      league,
      referee,
    } = data;
    return [
      {
        title: "Страна",
        value: (
          <div style={{ display: 'flex', gap: '4px' }}>
            <Avatar size={20} src={country?.logo} />  {country?.name}
          </div>
        ),
      },
      {
        title: "Лига",
        value: (
          <div style={{ display: 'flex', gap: '4px' }}>
            <Avatar size={20} src={league?.logo} /> {league?.name}
          </div>
        ),
      },
      { title: "Рефери", value: referee.name || "Неизвестен" }
    ];
  }, [data]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return [
      {title: 'Победа принимающей команды', value: '45.245%'},
      {title: 'Ничья', value: '26.614%'},
      {title: 'Победа гостевой команды', value: '28.136%'},

    ]
  }, [data]);

  const homeTeamData = useMemo<DisplayDataRow[] | undefined>(() => {
    console.log('qwe',data)
    if (!data?.homeTeam) {
      return;
    }
    const { name, logo } = data.homeTeam;


    return [
      { title: "Название", value: <><Avatar size={20} src={logo} />{name}</> },
    ];
  }, [data]);

  const awayTeamData = useMemo<DisplayDataRow[] | undefined>(() => {
    console.log('qwe',data)
    if (!data?.awayTeam) {
      return;
    }
    const { name, logo } = data.awayTeam;


    return [
      { title: "Название", value: <><Avatar size={20} src={logo} />{name}</> },
    ];
  }, [data]);


  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.receiver
      ? getUserRows(initData.receiver)
      : undefined;
  }, [initData]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData?.chat) {
      return;
    }
    const { id, title, type, username, photoUrl } = initData.chat;

    return [
      { title: "id", value: id.toString() },
      { title: "title", value: title },
      { title: "type", value: type },
      { title: "username", value: username },
      { title: "photo_url", value: photoUrl },
    ];
  }, [initData]);

  if (!basicDataRows) {
    return (
      <Placeholder
        header="Oops"
        description="Application was launched with missing init data"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: "block", width: "144px", height: "144px" }}
        />
      </Placeholder>
    );
  }
  return (
    <List>
      {userRows && <DisplayData header={"ИИ прогноз"} rows={userRows} />}
      <Section>
        <Accordion
          expanded={accordionExpaned2}
          onChange={() => {
            setAccordionExpaned2(!accordionExpaned2);
          }}
        >
          <AccordionSummary>Общие данные</AccordionSummary>
          <AccordionContent>
            <div
              style={{
                padding: "10px 20px 20px",
              }}
            >
              <DisplayData rows={basicDataRows} />
            </div>
          </AccordionContent>
        </Accordion>
      </Section>
      <Section>
        <Accordion
          expanded={accordionExpaned}
          onChange={() => {
            setAccordionExpaned(!accordionExpaned);
          }}
        >
          <AccordionSummary>Принимающая команда</AccordionSummary>
          <AccordionContent>
            <div
              style={{
                padding: "10px 20px 20px",
              }}
            >
              <DisplayData rows={homeTeamData} />
            </div>
          </AccordionContent>
        </Accordion>
      </Section>
      <Section>
        <Accordion
          expanded={accordionExpaned1}
          onChange={() => {
            setAccordionExpaned1(!accordionExpaned1);
          }}
        >
          <AccordionSummary>Гостевая команда</AccordionSummary>
          <AccordionContent>
            <div
              style={{
                padding: "10px 20px 20px",
              }}
            >
              <DisplayData rows={awayTeamData} />
            </div>
          </AccordionContent>
        </Accordion>
      </Section>
      
      {/* <Section>
        <Accordion
          expanded={accordionExpaned3}
          onChange={() => {
            setAccordionExpaned3(!accordionExpaned3);
          }}
        >
          <AccordionSummary>Погода</AccordionSummary>
          <AccordionContent>
            <div
              style={{
                padding: "10px 20px 20px",
              }}
            >
            </div>
          </AccordionContent>
        </Accordion>
      </Section> */}

      {receiverRows && <DisplayData header={"Receiver"} rows={receiverRows} />}
      {chatRows && <DisplayData header={"Chat"} rows={chatRows} />}
    </List>
  );
};
