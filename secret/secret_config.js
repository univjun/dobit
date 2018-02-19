var federation = {
    'naver': {
        'clientID': 'D1U6SDPCPCb0IWtjMNgf',
        'clientSecret': 'WKniLtpPL6',
        'callbackURL': "http://localhost:3000/login/naver/callback"
    },
    'facebook': {
        'clientID': '1623452237717047',
        'clientSecret': 'e24c87ec5bd70e7c757aed8a8773a540',
        'callbackURL': "http://localhost:3000/login/facebook/callback"
    },
    'kakao': {
        'clientID': '9555a9531d508825f92242da00edefaf',
        'clientSecret': '',
        'callbackURL': "http://localhost:3000/login/kakao/callback"
    }
};


module.exports = federation;