import * as React from "react";
import { Form, Icon, Input, Button, Card, Row, Col, notification } from "antd";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
@inject("store")
@observer
class HorizontalLoginForm extends React.Component {
  @observable error = "";
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { store } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.authorization(values).then(res => {
          if (res.status === 200) {
            document.cookie = `logpass = ${values.login}:${values.password}`;
            store.isAuthorized = true;
          } else {
            this.props.form.resetFields();
            notification.error({
              message: "Ошибка",
              description: "Ведены неверные данные"
            });
          }
        });
        console.log(values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      resetFields
    } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched("login") && getFieldError("login");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <Row type="flex" justify="center">
        <Col span={8}>
          <Card type="inner" className="authForm" title="Авторизация">
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item
                validateStatus={usernameError ? "error" : ""}
                help={usernameError || ""}
              >
                {getFieldDecorator("login", {
                  rules: [{ required: true, message: "Нужно ввести логин" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Логин"
                  />
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? "error" : ""}
                help={passwordError || ""}
              >
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Нужно ввести пароль" }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Пароль"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  icon="login"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Войти
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

export const WrappedHorizontalLoginForm = Form.create({
  name: "horizontal_login"
})(HorizontalLoginForm);
