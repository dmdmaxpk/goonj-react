
const config = {
    development: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://localhost/hepage"
    },
    staging: {
        apiBaseUrl: 'https://api.goonj.pk/v2',
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/web-thumb",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://hepage.goonj.pk"
    },
    production: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://hepage.goonj.pk"
    }
}

let environment = 'production';
if (process.env.REACT_APP_ENV) {
  environment = process.env.REACT_APP_ENV ;
} else {
    environment = 'production'
}

const getConfig = (environment) => {
    return config[environment];
}
export default config[environment];