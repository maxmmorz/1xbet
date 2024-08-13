import { type FC } from "react";
import { List } from "@telegram-apps/telegram-ui";

import { MatchListItem } from "@/components/Match/MatchListItem";

export const MatchesListPage: FC = () => {
  const dataRow1 = [
    { title: "Крылья Советов - Факел Воронеж", value: "11.08 19:30" },
    { title: "Спартак - Ахмат", value: "11.08 22:00" },
  ];

  const dataRow2 = [
    { title: "Гоу Эхед Иглз - Фортуна Ситтард", value: "11.08 17:30" },
    { title: "Утрехт - Зволле", value: "11.08 17:30" },
    { title: "Аякс - Херенвен", value: "11.08 19:45" },
  ];

  const dataRow3 = [
    { title: "Эшторил - Санта Клара", value: "11.08 19:30" },
    { title: "Фамаликан - Бенфика", value: "11.08 22:00" },
    { title: "Фаренсе - Морейренсе", value: "11.08 22:00" },
    { title: "Брага - Эштрела", value: "11.08 00:30" },
  ];

  const dataRow4 = [{ title: "Брешиа - Венеция", value: "11.08 21:00" }];

  return (
    <List>
      <MatchListItem
        header={"🇷🇺 Чемпионат России. Премьер-лига"}
        rows={dataRow1}
      />
      <MatchListItem
        header={"🇳🇱 Чемпионат Нидерландов. Эредивизи"}
        rows={dataRow2}
      />
      <MatchListItem
        header={"🇵🇹 Чемпионат Португалии. Премьер-лига"}
        rows={dataRow3}
      />
      <MatchListItem header={"🇮🇹 Кубок Италии"} rows={dataRow4} />
    </List>
  );
};
