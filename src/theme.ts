const darktheme = {
    borderColor: "#ffffff36",
    blackBg: "#0000005c",
    whiteBg: "#ffffff",
    red: "#dc2e4e",
    green: "#3cb043"
};

const lightTheme = {};

const defaultTheme = {
    fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        xxl: "22px",
        xxxl: "24px",
        heading: "90px",
        mheading: "40px"
    },
    borderRadius: {
        small: "5px",
        medium: "10px",
        large: "15px",
        circle: "50%"
    },
    fontFamily: "Poppins"
};

const theme = {
    dark: {
        color: darktheme,
        ...defaultTheme
    },
    light: {
        color: lightTheme,
        ...defaultTheme
    }
};

export default theme;
