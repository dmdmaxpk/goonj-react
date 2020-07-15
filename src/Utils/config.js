
const config = {
    development: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://localhost/hepage",
        liveStreamUrl: "//weblive.goonj.pk",
        streamKey: '4db8dd0a0cf9271e4f7fe2fe8ded6fe3'
    },
    staging: {
        apiBaseUrl: 'https://api.goonj.pk/v2',
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/web-thumb",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://hepage.goonj.pk",
        // liveStreamUrl: "//kaios.streamax.io",
        // streamKey: '72fb58000a0d1561f60da877b5a009fb'
        liveStreamUrl: "//weblive.goonj.pk",
        streamKey: '4db8dd0a0cf9271e4f7fe2fe8ded6fe3'
    },
    production: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        hepage: "http://hepage.goonj.pk",
        liveStreamUrl: "//weblive.goonj.pk",
        streamKey: '4db8dd0a0cf9271e4f7fe2fe8ded6fe3'
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