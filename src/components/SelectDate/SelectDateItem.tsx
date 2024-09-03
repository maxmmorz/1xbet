import { FC, MouseEventHandler } from "react";
import cn from "classnames";

import { InlineButtons } from "@telegram-apps/telegram-ui";

type SelectDateItemProps = {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  secondaryText?: string;
};

export const SelectDateItem: FC<SelectDateItemProps> = ({
  isActive,
  onClick,
  text,
  secondaryText,
}) => {
  return (
    <InlineButtons.Item
      className={cn({
        "select-date-time-item__active": isActive,
        "select-date-time-item": !isActive,
      })}
      mode={isActive ? 'gray' : 'plain'}
      onClick={onClick}
      text={secondaryText ?? ''}
    >
      {text}
    </InlineButtons.Item>
  );
};
