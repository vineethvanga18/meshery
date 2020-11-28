import React from "react";
import { connect } from "react-redux";
import { createUseRemoteComponent, getDependencies, createRequires } from "@paciolan/remote-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import { bindActionCreators } from "redux";
import { updateLoadTestData } from "../lib/store";
import GrafanaCustomCharts from "./GrafanaCustomCharts";
import MesheryPerformanceComponent from "./MesheryPerformanceComponent";

const fetcher = (url) => fetch(url, { headers: { "x-auth-token": "welcome123" } }).then((res) => res.text());

const requires = createRequires(getDependencies);

const useRemoteComponent = createUseRemoteComponent({
  requires,
  fetcher,
});

function Test({ grafana, updateLoadTestData }) {
  const [loading, err, RemoteComponent] = useRemoteComponent("https://component-store.sagacious.dev/main.js");

  if (loading) {
    return <CircularProgress />;
  }

  if (err != null) {
    return <div>Unknown Error: {err.toString()}</div>;
  }

  return (
    <RemoteComponent
      GrafanaCustomCharts={GrafanaCustomCharts}
      updateLoadTestData={updateLoadTestData}
      grafana={grafana}
      MesheryPerformanceComponent={MesheryPerformanceComponent}
    />
  );
}

const mapStateToProps = (st) => {
  const grafana = st.get("grafana").toJS();
  return { grafana };
};

const mapDispatchToProps = (dispatch) => ({
  updateLoadTestData: bindActionCreators(updateLoadTestData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
