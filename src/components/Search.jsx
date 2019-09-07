import * as React from "react";
import { observer,inject } from "mobx-react";

import { Row, Col, Input, Tabs, Button,Icon } from "antd";
import ParticleEffectButton from "react-particle-effect-button";
import { observable } from "mobx";
import TbaleLoosers from "./TbaleLoosers";
@inject('store')
@observer
class Search extends React.Component {
  @observable hidden = { social: false, personal: false };
  @observable isSearching = { social: false, personal: false };
  @observable data = { social: '', personal: '' }
  handleChange=(e,type)=>{
    this.data[type] = e.currentTarget.value;
  }
  onSubmit = (event,type)=>{
    event.preventDefault();
    const {store} = this.props;
    store.getUserInfo(this.data[type])
  }
  onClick = status => {
    this.hidden[status] = true;
  };
  onComplete = (flag, status) => {
    this.isSearching[status] = flag !== undefined ? flag : true;
    this.hidden[status] = false;
  };
  render() {
    const { TabPane } = Tabs;
    const {store} = this.props;
    console.log(store.freeCount)
    return (
      <Row type="flex" style={{ padding: "40px 0px" }} justify="center">
        <Col span={12}>
          <h1> Антибуллинг 0.1 </h1>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<div><Icon type="user" />Анализ страницы</div> } key="1">
              {!this.isSearching.personal ? (
                <div className="searchBlockWrapper">
                  <ParticleEffectButton
                    color="#FFD520"
                    easing="easeOutQuad"
                    hidden={this.hidden.personal}
                    onComplete={() => this.onComplete(undefined, "personal")}
                    duration={700}
                  >
                    <form onSubmit={(e)=>this.onSubmit(e, "personal")} className="searchBlock">
                      <Input
                        placeholder="Ссылка на страницу"
                        size="large"
                        className="searchInput"
                        value={this.data.personal}
                        onChange={(e)=>this.handleChange(e,'personal')}
                      />

                      <Button
                        onClick={() => this.onClick("personal")}
                        size="large"
                        type="primary"
                        htmlType="submit"
                        icon="security-scan"
                        disabled={!store.freeCount}
                      >
                        Проверить страницу
                      </Button>
                    </form>
                  </ParticleEffectButton>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => this.onComplete(false, "personal")}
                    size="large"
                    type="dashed"
                    icon='arrow-left'
                  >
                    Новый поиск
                  </Button>
                  <TbaleLoosers />
                </div>
              )}
            </TabPane>
            <TabPane tab={<div><Icon type='team' />Анализ сообщества</div> } key="2">
              {!this.isSearching.social ? (
                <div className="searchBlockWrapper">
                  <ParticleEffectButton
                    color="#FFD520"
                    easing="easeOutQuad"
                    hidden={this.hidden.social}
                    onComplete={() => this.onComplete(undefined, "social")}
                    duration={700}
                  >
                    <form onSubmit={(e)=>this.onSubmit(e, "social")} className="searchBlock">
                      <Input
                        placeholder="Ссылка на группу ВК"
                        size="large"
                        className="searchInput"
                        value={this.data.social}
                        onChange={(e)=>this.handleChange(e,'social')}
                      />
                      <Button
                        onClick={() => this.onClick("social")}
                        size="large"
                        type="primary"
                        icon="security-scan"
                      >
                        Проверить группу
                      </Button>
                    </form>
                  </ParticleEffectButton>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => this.onComplete(false, "social")}
                    size="large"
                    type="dashed"
                    icon='arrow-left'
                  >
                    Новый поиск
                  </Button>
                  <TbaleLoosers />
                </div>
              )}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default Search;
