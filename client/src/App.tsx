import { Route, Switch } from "wouter";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
