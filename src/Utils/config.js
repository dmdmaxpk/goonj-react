const config = {
    development: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        // paywallUrl: "http://3.126.102.117:5000",
        paywallUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        dramaLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/dramas",
        hepage: "http://localhost/hepage",
        liveStreamUrl: "//weblive.goonj.pk",
        streamKey: 'e9bf48c16653b130688bdf412302ad0a'
    },
    staging: {
        apiBaseUrl: 'https://api.goonj.pk/v2',
        // paywallUrl: "http://3.126.102.117:5000",
        paywallUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/web-thumb",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        dramaLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/dramas",
        hepage: "http://hepage.goonj.pk",
        // liveStreamUrl: "//kaios.streamax.io",
        // streamKey: '72fb58000a0d1561f60da877b5a009fb'
        liveStreamUrl: "//weblive.goonj.pk",
        streamKey: 'e9bf48c16653b130688bdf412302ad0a'
    },
    production: {
        apiBaseUrl: "https://api.goonj.pk/v2",
        // paywallUrl: "http://3.126.102.117:5000",
        paywallUrl: "https://api.goonj.pk/v2",
        bannerUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/banners",
        channelLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/live/logo",
        videoLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/video/thumb",
        dramaLogoUrl: "https://content-dmd.s3.eu-central-1.amazonaws.com/TP-Content/static-content/dramas",
        hepage: "http://hepage.goonj.pk",
        liveStreamUrl: "//weblive.goonj.pk",
        streamKey: 'e9bf48c16653b130688bdf412302ad0a'
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
