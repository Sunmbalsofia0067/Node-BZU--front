import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useSelector,useDispatch} from "react-redux";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {

  let {navStyle, themeType} = useSelector(({settings}) => settings);
  let {pathname} = useSelector(({common}) => common);
  let {auth} = useSelector(({auth})=>auth);
  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
          {/*<AppsNavigation/>*/}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
            {auth.role===1?
              <>
                <Menu.Item key="currentUser">
                  <Link to="/currentUser"><i className="icon icon-user"/>
                    <span><IntlMessages id={auth.fullName}/></span>
                  </Link>
                </Menu.Item>
            <Menu.Item key="user">
              <Link to="/User"><i className="icon icon-litcoin"/>
                <span><IntlMessages id="User"/></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="roles">
              <Link to="/roles"><i className="icon icon-cards-list-view"/>
                <span><IntlMessages id="Roles"/></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="programs">
              <Link to="/programs"><i className="icon icon-card"/>
                <span><IntlMessages id="Programs"/></span>
              </Link>
            </Menu.Item>
            <Menu.Item key="courses">
              <Link to="/courses"><i className="icon icon-callout "/>
                <span><IntlMessages id="Courses"/></span>
              </Link>
            </Menu.Item>
                <Menu.Item key="students">
                  <Link to="/students"><i className="icon icon-list-select-o"/>
                    <span><IntlMessages id="Students"/></span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="teachers">
                  <Link to="/teachers"><i className="icon icon-anchor"/>
                    <span><IntlMessages id="Teachers"/></span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="uploads">
                  <Link to="/uploads"><i className="icon icon-spin"/>
                    <span><IntlMessages id="Uploads"/></span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="attendance">
                  <Link to="/attendance"><i className="icon icon-chart-line"/>
                    <span><IntlMessages id="Attendance"/></span>
                  </Link>
                </Menu.Item>
              </>
              :[
                auth.role ===2?
              <>
              <Menu.Item key="currentUser">
              <Link to="/currentUser"><i className="icon icon-user"/>
              <span><IntlMessages id={auth.fullName}/></span>
              </Link>
              </Menu.Item>
                <Menu.Item key="courses">
                  <Link to="/courses"><i className="icon icon-callout "/>
                    <span><IntlMessages id="Courses"/></span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="uploads">
                  <Link to="/uploads"><i className="icon icon-spin"/>
                    <span><IntlMessages id="Uploads"/></span>
                  </Link>
                </Menu.Item>
              </>:
                  <>
                  <Menu.Item key="currentUser">
                    <Link to="/currentUser"><i className="icon icon-user"/>
                      <span><IntlMessages id={auth.fullName}/></span>
                    </Link>
                  </Menu.Item>
                <Menu.Item key="courses">
                  <Link to="/courses"><i className="icon icon-callout "/>
                    <span><IntlMessages id="Courses"/></span>
                  </Link>
                </Menu.Item>
                </>
              ]}

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;

