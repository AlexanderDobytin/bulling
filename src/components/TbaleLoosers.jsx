import * as React from "react";
import {
  Table,
  Carousel,
  Result,
  Tooltip,
  Progress,
  Tag,
  Alert,
  Row,
  Divider
} from "antd";
import { observer, inject } from "mobx-react";
import { Card } from "antd";

const columns = [
  {
    title: "Имя актора",
    dataIndex: "vkName",
    key: "vkName",
    render: (vkName, data) => {
      return <a href={`https://vk.com/${data.vkId}`}>{vkName}</a>;
    }
  },
  {
    title: "Оценка акивности на странице",
    dataIndex: "aggressiveLevelAt",
    key: "aggressiveLevelAt",
    render: aggressiveLevelAt => {
      const getStatus = level => {
        if (level < 3) {
          return "низкая вероятность булинга";
        }
        if (level < 7) {
          return "подозрительная активность на странице";
        }
        return "высокая вероятность булинга";
      };
      return (
        <div>
          <Tooltip title={getStatus(aggressiveLevelAt)}>
            <Progress
              percent={aggressiveLevelAt * 10}
              format={() => `${aggressiveLevelAt * 10}/100`}
              type="dashboard"
              strokeColor={{
                "0%": "#f5222d",
                "100%": "#87d068"
              }}
            />
          </Tooltip>
          <div>
            <Tag color="red">Мат в комментариях</Tag>
            <Tag color="red">Оскорбительные фото</Tag>
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
    const dataSource = attackers.map((item, i) => {
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
              message={!!store.freeCount ? `Осталось ${store.freeCount} бесплатных анализа`:`Бесплатных анализов не осталось`}
              description={
                <span>
                  Для продления подписки пройдите по <a href="/">этой</a> ссылке
                </span>
              }
              type="info"
              showIcon
            />
            <Row type="flex" justify="center">
              <Card
                hoverable
                style={{ width: 240, margin: "40px auto" }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
                  format={() => `${victim.bullingLevel}/100`}
                  type="dashboard"
                  strokeColor={{
                    "0%": "#f5222d",
                    "100%": "#87d068"
                  }}
                />
              </Card>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
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
