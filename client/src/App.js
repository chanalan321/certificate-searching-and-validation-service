import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import SearchResult from './SearchResult';
import SearchResultDetail from './SearchResultDetail';
import Login from './Login';
import Admin from './Admin';
import Worker from './worker';
import CreateCertificate from './CreateCertificate';
import ReviewingCertificate from './ReviewingCertificate';
import ProblemCertificate from './ProblemCertificate';
import AuditCertificate from './AuditCertificate';
import ModifiedCertificate from './ModifiedCertificate';
import Worker_PublishedCertificate from './Worker_PublishedCertificate';
import Admin_PublishedCertificate from './Admin_PublishedCertificate';
import Student from './Student';


class App extends React.Component {
  render(){
    return(
      <Router >
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/Student" component={Student} />
          <Route path="/Search" component={Search} />
          <Route path="/Search/SearchResult" component={SearchResult} />
          <Route path="/SearchResultDetail" component={SearchResultDetail} />
          <Route path="/Login" component={Login} />          
          <Route exact path="/Worker" component={ReviewingCertificate} />
          <Route path="/Worker/CreateCertificate" component={CreateCertificate} />
          <Route path="/Worker/ReviewingCertificate" component={ReviewingCertificate} />
          <Route path="/Worker/ProblemCertificate" component={ProblemCertificate} />
          <Route path="/Worker/PublishedCertificate" component={Worker_PublishedCertificate} />
          <Route exact path="/Admin" component={AuditCertificate} />
          <Route path="/Admin/AuditCertificate" component={AuditCertificate} />
          <Route path="/Admin/ModifiedCertificate" component={ModifiedCertificate} />
          <Route path="/Admin/PublishedCertificate" component={Admin_PublishedCertificate} />          
        </div>
      </Router>
    )
  }
}
export default App;