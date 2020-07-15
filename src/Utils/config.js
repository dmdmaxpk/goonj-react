
const config = {
    development: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://localhost/hepage",
        liveStreamUrl: "//kaios.streamax.io"
    },
    staging: {
        apiBaseUrl: 'https://api.goonj.pk/v2',
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/web-thumb",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://hepage.goonj.pk",
        liveStreamUrl: "//kaios.streamax.io"
    },
    production: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://hepage.goonj.pk",
        liveStreamUrl: "//weblive.goonj.pk"
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