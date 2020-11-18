import React from "react";
import { createUseRemoteComponent, getDependencies, createRequires } from "@paciolan/remote-component";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export default function Test() {
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
      <RemoteComponent name="Meshery" />
    </div>
  );
}
