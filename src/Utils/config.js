
const config = {
    development: {
        apiBaseUrl: "http://api.goonj.pk/v2",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://localhost/hepage"
    },
    staging: {
        apiBaseUrl: 'http://api.goonj.pk/v2',
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://staging.hepage.goonj.pk"
    },
    production: {
        apiBaseUrl: "http://api.goonj.pk/v2",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://hepage.goonj.pk"
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