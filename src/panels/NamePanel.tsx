import { FC, useEffect, useState } from "react";
import {
  Button,
  Div,
  FormItem,
  FormLayoutGroup,
  Group,
  Input,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../hooks";
import { getAge } from "../shared/api";

export const NamePanel: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 3000);

  const { data, refetch } = useQuery({
    queryKey: ["age", name.toLowerCase()],
    queryFn: () => getAge(name.toLowerCase()),
    enabled: false,
  });

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [debouncedName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) {
      refetch();
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Возраст по имени
      </PanelHeader>

      <Group>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormLayoutGroup mode="vertical">
            <FormItem htmlFor="name" top="Имя">
              <Input
                id="name"
                placeholder="Жми на кнопку!"
                required
                value={name}
                onChange={(e) => handleChange(e)}
              />
            </FormItem>
            {data && <Div>Возраст: {data}</Div>}
            <Div>
              <Button size="l" stretched appearance="accent" type="submit">
                Угадай мой возраст!
              </Button>
            </Div>
          </FormLayoutGroup>
        </form>
      </Group>
    </Panel>
  );
};
