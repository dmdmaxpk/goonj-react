
const config = {
    development: {
        apiBaseUrl: "http://api.goonj.pk/v2",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo"
    },
    staging: {
        apiBaseUrl: 'http://api.goonj.pk/v2',
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo"
    },
    production: {
        apiBaseUrl: process.env.REACT_APP_PRODUCTION_BE_URL
    }
}

let environment = 'staging';
if (process.env.REACT_APP_ENV) {
  environment = process.env.REACT_APP_ENV ;
} else {
    environment = 'staging'
}

const getConfig = (environment) => {
    return config[environment];
}
export default config[environment];