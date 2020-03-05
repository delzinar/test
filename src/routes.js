import UpdatePolicyView from "views/UpdatePolicyView/UpdatePolicyView";
import AreaOfInterestView from "views/AreaOfInterestView/AreaOfInterestView";
import SettingsView from "views/SettingsView/SettingsView";

const dashboardRoutes = [
   {
    path: "/update",
    name: "Update Policy",
    icon: "pe-7s-note2",
    component: UpdatePolicyView,
    layout: "/admin"
  },
  {
    path: "/area",
    name: "Area of Interest",
    icon: "pe-7s-note2",
    component: AreaOfInterestView,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "pe-7s-note2",
    component: SettingsView,
    layout: "/admin"
  }
];

export default dashboardRoutes;
