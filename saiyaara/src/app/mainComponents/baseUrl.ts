// http://saiyaara.prototypesite.biz/home
// http://saiyaara.prototypesite.biz/backend/public
// http://eea28a07.ngrok.io/saiyaara/public/car-api
// http://eea28a07.ngrok.io/saiyaara/public/images/used-car

// export var mainUrl = "//192.168.17.8/saiyaara/public"
// export var mainUrl = "http://saiyaara.prototypesite.biz/backend/public"
// export var mainUrl = "https://whipplewebdesign.com/saiyaara/"
// export var mainUrl = "//192.168.17.8/saiyaara/public"
export var mainUrl = "//192.168.8.23/saiyaara/public"
// export var mainUrl = "//192.168.16.19/saiyaara/public"
// export var mainUrl = "//192.168.8.41/saiyaara/public"
// export var mainUrl = "http://saiyaara.whipplewebdesign.com/backend/public"
// export var testlogin = "/app/l.json"

export var baseUrl = mainUrl + "/car-api"
export var imageUrl = mainUrl + "/images/used-car"
export var imageMUrl = mainUrl + "/images/manufacturer-logo"
export var dealerImageUrl = mainUrl + "/images/dealer-profile"
export var carFeaturesImg = mainUrl + "/images/car_features_icons"

export var imageSize = "99x75_"
export var imageSize1 = "120x120_"
export var imageSize2 = "298x168_"
export var imageSize3 = "478x358_"

var mainVar = [];
export var renderingImgFunc = (mainArr) => {
  for (var i = 0; i <= mainArr.length; i++) {
    if(mainArr[i]){
      if (mainArr[i].picture[0].image1 != "") {
        mainVar.push(mainArr[i].picture[0].image1)
      }
    }
  }
  return mainVar;
}


export function NumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// for (let j = 0; j < mainArr[i].picture.length; j++) {
    //   if (mainArr[i].picture[j].image1 != "") {
    //     mainVar = mainArr[i].picture[j].image1

    //   }
    //   else if (mainArr[i].picture[j].image2 != "") {
    //     mainVar = mainArr[i].picture[j].image2

    //   }
    //   else if (mainArr[i].picture[j].image3 != "") {
    //     mainVar = mainArr[i].picture[j].image3

    //   } else if (mainArr[i].picture[j].image4 != "") {
    //     mainVar = mainArr[i].picture[j].image4

    //   } else {
    //   }

    // }
