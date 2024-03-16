import { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Div,
  FormItem,
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Textarea,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useQuery } from "@tanstack/react-query";
import { getFact } from "../shared/api";

export const FactPanel: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [text, setText] = useState("");
  const { refetch, isRefetching } = useQuery({
    queryKey: ["fact"],
    queryFn: async () => {
      const result = await getFact();
      if (result) setText(result);
      return result;
    },
    enabled: false,
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      const firstSpaceIndex = value.indexOf(" ");

      if (firstSpaceIndex !== -1) {
        inputRef.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
        inputRef.current.focus();
      }
    }
  }, [text]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Факты
      </PanelHeader>
      <Group>
        <FormItem top="Случайный факт">
          <Textarea
            getRef={inputRef}
            placeholder="Жми на кнопку!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormItem>
        <Div>
          <Button
            size="l"
            stretched
            appearance="positive"
            onClick={() => refetch()}
            loading={isRefetching}
            disabled={isRefetching}
          >
            Получить случайный факт!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
