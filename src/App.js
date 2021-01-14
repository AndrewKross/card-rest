import React from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {AppRoute} from "./const";
import MainPage from "./components/main-page/main-page";
import CardPage from "./components/card-page/card-page";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN} component={MainPage} />
        <Route exact path={`${AppRoute.CARD}:id`}
               render={({ match, history }) => <CardPage personId={match.params.id} history={history} />} />
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
