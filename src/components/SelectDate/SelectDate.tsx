import { FC } from "react";
import moment from "moment";
import { InlineButtons } from "@telegram-apps/telegram-ui";

import { SelectDateItem } from "./SelectDateItem";

import './SelectDate.css'

type SelectDateProps = {
  date: string;
  onDateChangeCallback: (date: string) => void;
};

export const SelectDate: FC<SelectDateProps> = ({
  date,
  onDateChangeCallback,
}) => {
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "day");
  const dayAfterTomorrow = moment().add(2, "day");
  const dayAfterAfterTomorrow = moment().add(3, "day");

  return (
    <InlineButtons className="select-date">
      <SelectDateItem
        isActive={date === today}
        onClick={() => onDateChangeCallback(today)}
        text="Сегодня"
      />
      <SelectDateItem
        isActive={date === tomorrow.format("YYYY-MM-DD")}
        onClick={() => onDateChangeCallback(tomorrow.format("YYYY-MM-DD"))}
        text={tomorrow.format("MMM")}
        secondaryText={tomorrow.format("DD")}
      />
      <SelectDateItem
        isActive={date === dayAfterTomorrow.format("YYYY-MM-DD")}
        onClick={() =>
          onDateChangeCallback(dayAfterTomorrow.format("YYYY-MM-DD"))
        }
        text={dayAfterTomorrow.format("MMM")}
        secondaryText={dayAfterTomorrow.format("DD")}
      />
      <SelectDateItem
        isActive={date === dayAfterAfterTomorrow.format("YYYY-MM-DD")}
        onClick={() =>
          onDateChangeCallback(dayAfterAfterTomorrow.format("YYYY-MM-DD"))
        }
        text={dayAfterAfterTomorrow.format("MMM")}
        secondaryText={dayAfterAfterTomorrow.format("DD")}
      />
    </InlineButtons>
  );
};
