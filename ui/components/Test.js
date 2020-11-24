import React from "react";
import { connect } from 'react-redux';
import { createUseRemoteComponent, getDependencies, createRequires } from "@paciolan/remote-component";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { bindActionCreators } from 'redux';
import { updateLoadTestData } from "../lib/store";
import GrafanaCustomCharts from './GrafanaCustomCharts';
import MesheryPerformanceComponent from './MesheryPerformanceComponent';

const fetcher = (url) => {
  console.log("here");
  return fetch(url, { headers: { "x-auth-token": "welcome123" } }).then((res) => res.text());
};

const requires = createRequires(getDependencies);

const useRemoteComponent = createUseRemoteComponent({
  requires,
  fetcher,
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Test({ grafana, updateLoadTestData }) {
  const [loading, err, RemoteComponent] = useRemoteComponent("https://component-store.sagacious.dev/main.js");
  const classes = useStyles();

  if (loading) {
    return <CircularProgress />;
  }

  if (err != null) {
    return <div>Unknown Error: {err.toString()}</div>;
  }

  return (
    <div className={classes.root}>
      <RemoteComponent
        GrafanaCustomCharts={GrafanaCustomCharts}
        updateLoadTestData={updateLoadTestData}
        grafana={grafana}
        MesheryPerformanceComponent={MesheryPerformanceComponent} />
    </div>
  );
}

const mapStateToProps = (st) => {
  const grafana = st.get('grafana').toJS();
  return { grafana };
};

const mapDispatchToProps = (dispatch) => ({
  updateLoadTestData: bindActionCreators(updateLoadTestData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Test)