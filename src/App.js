import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faUsers,
  faCalendar,
  faUserFriends,
  faFlag,
  faAngleDown,
  faCaretDown,
  faCog,
  faBell,
  faVideo,
  faPhotoVideo,
  faComment,
  faShare,
  faSmile,
  faShoppingCart,
  faSearch,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faUsers,
  faCalendar,
  faUserFriends,
  faFlag,
  faAngleDown,
  faCaretDown,
  faCog,
  faBell,
  faVideo,
  faPhotoVideo,
  faComment,
  faShare,
  faSmile,
  faShoppingCart,
  faSearch,
  faChevronRight
);
function App() {
  return (
    <div>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
