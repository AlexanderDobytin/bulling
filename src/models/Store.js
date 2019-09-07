import { observable, computed, action } from "mobx";
import { notification } from "antd";

class Store {
  
  @observable userData = {};
  @observable isAuthorized = false;
  @observable fetchUserInfoHasError = false;
  @observable freeCount = 5
  constructor() {
    this.isAuthorized = this.auth;
  }
  
  @computed get auth() {
    const getCookie = name => {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]).split(":") : undefined;
    };
    return getCookie("logpass");
  }
  
  @computed get getAttackers() {
    return (
      this.userData && this.userData.victim && this.userData.victim.attackers
    );
  }
  @computed get getVictim() {
    return (
      this.userData && this.userData.victim 
    );
  }
  
  @action openNotification = (title, description) => {
    notification.open({
      message: title,
      description: description
    });
  };
  
  @action authorization = data => {
    return fetch(
      " https://api-government-dev.itlabs.io/anti-bulling/bulling/api/auth/",
      { method: "POST", body: JSON.stringify(data) }
    );
  };
  
  @action getUserInfo = (url) => {
    try {
      fetch(
        "https://api-government-dev.itlabs.io/anti-bulling/bulling/api/bulling/",
        { method: "POST" , body:JSON.stringify({vkUrl:url})}
      ).then(res => {
        this.freeCount =this.freeCount-1;
        if (res.status === 200) {
          res.json().then(data => {
            this.userData = data.data;
            this.fetchUserInfoHasError = false;
          });
        }
        else{
          this.fetchUserInfoHasError = true;
        }
      
      });
    } catch (e) {
      this.openNotification("Ошибка", "апи всё, ждем.");
      this.fetchUserInfoHasError = true;
    }
  };
}
export default Store;
