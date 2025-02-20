import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
// import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

//Calendar
import CalendarReducer from "./calendar/reducer";
//Ecommerce
import EcommerceReducer from "./ecommerce/reducer";

//Project
import ProjectsReducer from "./projects/reducer";

// Tasks
import TasksReducer from "./tasks/reducer";


// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

// Pages > Team
import TeamDataReducer from "./team/reducer";


// API Key
import APIKeyReducer from "./apiKey/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    Login: LoginReducer,
    Account: AccountReducer,
    // ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Calendar: CalendarReducer,
    Projects: ProjectsReducer,
    Ecommerce: EcommerceReducer,
    Tasks: TasksReducer,
    DashboardEcommerce: DashboardEcommerceReducer,
    Team: TeamDataReducer,
    APIKey: APIKeyReducer
});

export default rootReducer;