import Test from "../components/Test";
import { NoSsr } from "@material-ui/core";
import { updatepagepath } from "../lib/store";
import { connect } from "react-redux";
import Head from "next/head";
import { bindActionCreators } from "redux";
import { getPath } from "../lib/path";

class Settings extends React.Component {
  componentDidMount() {
    console.log(`path: ${getPath()}`);
    this.props.updatepagepath({ path: getPath() });
  }

  render() {
    return (
      <NoSsr>
        <Head>
          <title>MeshMap | Meshery</title>
        </Head>
        <NoSsr>
          <Test />
        </NoSsr>
      </NoSsr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updatepagepath: bindActionCreators(updatepagepath, dispatch),
});

export default connect(null, mapDispatchToProps)(Settings);
