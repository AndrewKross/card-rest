import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { AppRoute } from "../../const";
import MainPage from "../main-page/main-page";
import CardPage from "../card-page/card-page";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN} component={MainPage}/>
        <Route exact path={`${AppRoute.CARD}:id`}
               render={({ match, history }) => <CardPage personId={match.params.id} history={history}/>}/>
        <Route render={() => (
          <React.Fragment>
            <h1>Ошибка: 404. Страница не найдена.</h1>
            <Link to={AppRoute.MAIN}>Вернуться на главную</Link>
          </React.Fragment>
        )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
