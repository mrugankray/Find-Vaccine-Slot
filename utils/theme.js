import { createMuiTheme } from '@material-ui/core/styles';
import { primary } from "./colors"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif'
    }
  },
});

export default theme