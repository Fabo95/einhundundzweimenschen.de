import {createTheme } from '@mui/material/styles';


export const commonButtonTheme = createTheme({
    components: {
        // Name of the component
        MuiButton: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              fontFamily: 'Manrope',
              background: "rgba(253,253,253)",
              fontSize:"1em",
              fontWeight: 600,
              padding: "0.5em 1em",
              color: "#D9534F",
              border: "1px solid #D9534F",
              textTransform: "unset",
              borderRadius: "10px",
              lineHeight: "unset",
              minWidth: "unset",
              letterSpacing: "unset",
              transform: "translateY(-50%)",
              '&:hover': {
                  border:"1px solid #D9534F",
                  background: "rgba(253,253,253)"
                  
              }
            },
          },
        },
      },
    })
    