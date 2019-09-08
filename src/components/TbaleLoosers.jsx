import * as React from "react";
import {
  Table,
  Carousel,
  Result,
  Tooltip,
  Progress,
  Tag,
  Col,
  Empty,
  Alert,
  Button,
  Row,
  Divider
} from "antd";
import { observer, inject } from "mobx-react";
import { Card } from "antd";
const ButtonGroup = Button.Group;
const columns = [
  {
    title: "",
    dataIndex: "vkName",
    key: "vkName",
    render: (vkName, data) => {
      return (
        <div>
          <a href={`https://vk.com/id${data.vkId}`}>{vkName}</a>
          {data.aggressiveLevelAt !== 0 && (
            <div>
              <Divider />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Tooltip title={"Залокировать"}>
                  <Button icon="close" type="danger"></Button>
                </Tooltip>
                <Tooltip title="Пожаловаться">
                  <Button icon="warning" type="primary"></Button>
                </Tooltip>
                <Tooltip title={"Позвонить его маме"}>
                  <Button icon="phone" type="primary"></Button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      );
    }
  },
  {
    title: "Оценка агрессии на странице",
    dataIndex: "aggressiveLevelAt",
    key: "aggressiveLevelAt",
    render: (aggressiveLevelAt, data) => {
      const getStatus = level => {
        if (level < 30) {
          return "низкая вероятность булинга";
        }
        if (level < 70) {
          return "подозрительная активность на странице";
        }
        return "высокая вероятность булинга";
      };

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Tooltip title={getStatus(aggressiveLevelAt)}>
            <Progress
              percent={aggressiveLevelAt}
              format={() => `${aggressiveLevelAt}/100`}
              type="dashboard"
              strokeColor={{
                "0%": "#f5222d",
                "100%": "#87d068"
              }}
            />
          </Tooltip>

          <div>
            {data.tags &&
              data.tags.map((tag, i) => (
                <Tag key={"tag-" + i} color="red">
                  {tag}
                </Tag>
              ))}
          </div>
        </div>
      );
    }
  }
];

@inject("store")
@observer
class TbaleLoosers extends React.Component {
  render() {
    const { Meta } = Card;
    const { store } = this.props;
    const attackers = store.getAttackers;
    const victim = store.getVictim;
    if (attackers === undefined) {
      return <Empty />;
    }
    const sortA = attackers.sort((a, b) => {
      return b.aggressiveLevelAt - a.aggressiveLevelAt;
    });
    const dataSource = sortA.map((item, i) => {
      return { ...item, key: "attackers" + i };
    });
    return (
      <div>
        {store.fetchUserInfoHasError ? (
          <Result
            status="error"
            title="Страница не доступна"
            subTitle="Анализ по этому адресу невозможен. Вероятно вы ошиблись при вводе, либо старница пользователя закрыта от вас."
          />
        ) : (
          <div>
            <Divider />
            <Alert
              message={
                !!store.freeCount
                  ? `Осталось ${store.freeCount} бесплатных анализа`
                  : `Бесплатных анализов не осталось`
              }
              description={
                <span>
                  Для продления подписки пройдите по <a href="/">этой</a> ссылке
                </span>
              }
              type="info"
              showIcon
            />
            <Divider />
            <Row type="flex" justify="center">
              <Col span="8">
                <Card
                  hoverable
                  style={{ with: "240px", marginRight: "20px" }}
                  cover={
                    <img
                      alt="example"
                      src="https://sun9-22.userapi.com/c9704/u1908820/a_08ea628f.jpg?ava=1"
                    />
                  }
                >
                  <Meta
                    title={victim.vkName}
                    description={`Оценка буллинга ${victim.bullingLevel}/100`}
                  />
                  <Divider />
                  <Progress
                    percent={victim.bullingLevel}
                    strokeColor={{
                      "0%": "#f5222d",
                      "100%": "#87d068"
                    }}
                  />
                </Card>
              </Col>
              <Col span="16">
                <Table dataSource={dataSource} columns={columns} />
              </Col>
            </Row>
          </div>
        )}

        <Carousel autoplay>
          <img src="/src/img/banner-1.jpg" height="200px" />
          <img src="/src/img/banner-2.jpg" height="200px" />
          <img src="/src/img/banner-3.jpg" height="200px" />
        </Carousel>
      </div>
    );
  }
}

export default TbaleLoosers;
