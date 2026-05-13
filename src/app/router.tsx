import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { DashboardPage } from "../pages/DashboardPage";
import { WorkspacePage } from "../pages/WorkspacePage";
import { MaterialsPage } from "../pages/MaterialsPage";
import { PricingPage } from "../pages/PricingPage";
import { ProjectFormPage } from "../pages/ProjectFormPage";
import { ReportPage } from "../pages/ReportPage";
import { SettingsPage } from "../pages/SettingsPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "projects/new", element: <ProjectFormPage /> },
        { path: "workspace", element: <WorkspacePage /> },
        { path: "materials", element: <MaterialsPage /> },
        { path: "pricing", element: <PricingPage /> },
        { path: "report", element: <ReportPage /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
