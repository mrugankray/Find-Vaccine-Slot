import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { SearchTypeContext } from "../../pages/index"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
    boxShadow: "none",
    marginBottom: "0.5em"
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const searchTypeContext = useContext(SearchTypeContext)
  const tabType = [
      {
          index: 0,
          label: "Search By PIN"
      },
      {
          index: 1,
          label: "Search By Discrict"
      }
  ]
  const [tab, setTab] = React.useState(tabType[0].index);

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
    // console.log(searchTypeContext)
    searchTypeContext.setSearchType(newTab)
  };

  return (
      <>
        <Paper className={classes.root}>
            <Tabs
                value={tab}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                centered
            >
                <Tab label={`${tabType[0].label}`} />
                <Tab label={`${tabType[1].label}`} />
            </Tabs>
        </Paper>
      </>
  );
}