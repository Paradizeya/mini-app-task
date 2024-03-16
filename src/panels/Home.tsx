import { FC } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
  NavIdProps,
  ButtonGroup,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <Group header={<Header mode="secondary">Навигация</Header>}>
        <Div>
          <ButtonGroup stretched mode="vertical">
            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => routeNavigator.push("fact")}
            >
              Случайный факт
            </Button>
            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => routeNavigator.push("name")}
            >
              Гадаем по имени
            </Button>
          </ButtonGroup>
        </Div>
      </Group>
    </Panel>
  );
};
