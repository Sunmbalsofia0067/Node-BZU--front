import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import UploadResults from "./Courses/uploadResults";
import DownloadResults from "./Courses/downloadResult";
// import EditClient from "./Clients/editClient"
// import EditRole from "./Roles/editRole"
// import EditItem from "./Items/editItem"
// import EditStore from './Stores/editStore'
// import PrintInvoice from "./Sales/printInvoice"
import {useSelector} from "react-redux";
import asyncComponent from "util/asyncComponent";
import SignIn from "../containers/SignIn";


export default function App({match}) {
  const {isAuthenticated, auth} = useSelector(({auth}) => auth);
  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        <Route path='/' exact component={SignIn}/>
        {isAuthenticated ?
          <div>
            {auth.role === 3 ?
              <>
                <Route path={`${match.url}currentUser`}
                       component={asyncComponent(() => import('./Current User/currentUser'))}/>
                <Route path={`${match.url}fees`}
                       component={asyncComponent(() => import('./Current User/Buttons/Fees'))}/>
                <Route path={`${match.url}registrationCard`}
                       component={asyncComponent(() => import('./Current User/Buttons/RegistrationCard'))}/>
                <Route path={`${match.url}resultCard`}
                       component={asyncComponent(() => import('./Current User/Buttons/ResultCard'))}/>
                <Route path={`${match.url}importantDownloads`}
                       component={asyncComponent(() => import('./Current User/Buttons/ImportantDownloads'))}/>
                <Route path={`${match.url}courses`} component={asyncComponent(() => import('./Courses/courses'))}/>
                <Route path={"/downloadResult/:id"} component={DownloadResults}/>
              </>

              :<>
                <Route path={`${match.url}user`} component={asyncComponent(() => import('./Users/index'))}/>
                {/*<Route path={`${match.url}items`} component={asyncComponent(() => import('./Items/Items'))}/>*/}
                {/*<Route path={`${match.url}newItem`} component={asyncComponent(() => import('./Items/newItem'))}/>*/}
                {/*<Route path={`${match.url}newStockIn`} component={asyncComponent(() => import('./StockIn/stockIn'))}/>*/}
                {/*<Route path={`${match.url}sales`} component={asyncComponent(() => import('./Sales/sales'))}/>*/}
                <Route path={`${match.url}currentUser`}
                       component={asyncComponent(() => import('./Current User/currentUser'))}/>
                       <Route path={`${match.url}uploads`}
                       component={asyncComponent(() => import('./Uploads/uploads'))}/>
                {/*<Route path={`${match.url}allSales`} component={asyncComponent(() => import('./Sales/allSales'))}/>*/}
                {/*<Route path={`${match.url}stores`} component={asyncComponent(() => import('./Stores/stores'))}/>*/}
                {/*<Route path={`${match.url}newStore`} component={asyncComponent(() => import('./Stores/newStore'))}/>*/}
                <Route path={`${match.url}teachers`} component={asyncComponent(() => import('./Teachers/teachers'))}/>
                {/*<Route path={`${match.url}clients`} component={asyncComponent(() => import('./Clients/clients'))}/>*/}
                <Route path={`${match.url}newCourses`} component={asyncComponent(() => import('./Courses/newCourses'))}/>
                <Route path={`${match.url}courses`} component={asyncComponent(() => import('./Courses/courses'))}/>
                {/*<Route path={`${match.url}auditStock`}*/}
                {/*       component={asyncComponent(() => import('./AuditStock/auditStock'))}/>*/}
                <Route path={`${match.url}students`} component={asyncComponent(() => import('./Students/students'))}/>
                <Route path={`${match.url}attendance`} component={asyncComponent(() => import('./Attendance/attendance'))}/>
                <Route path={`${match.url}roles`} component={asyncComponent(() => import('./Roles/roles'))}/>
                <Route path={`${match.url}newProgram`} component={asyncComponent(() => import('./Programs/newProgram'))}/>
                <Route path={`${match.url}programs`} component={asyncComponent(() => import('./Programs/programs'))}/>
                <Route path={`${match.url}newUser`} component={asyncComponent(() => import('./Users/newUser'))}/>
                <Route path={`${match.url}newUserTeacher`}
                       component={asyncComponent(() => import('./Users/newTeacher'))}/>
                <Route path={`${match.url}importantDownloads`}
                       component={asyncComponent(() => import('./Current User/Buttons/ImportantDownloads'))}/>
                <Route path={"/uploadResult/:id"} component={UploadResults}/>
                {/*<Route path={"/editClient/:id"} component={EditClient}/>*/}
                {/*<Route path={"/editRole/:id"} component={EditRole}/>*/}
                {/*<Route path={"/editItem/:id"} component={EditItem}/>*/}
                {/*<Route path={"/editStore/:id"} component={EditStore}/>*/}
                {/*<Route path={"/printInvoice/:id"} component={PrintInvoice}/>*/}
              </>
            }
          </div>
          : <Redirect to="/signin"/>}
      </Switch>
    </div>
  );
}


// export default App;
