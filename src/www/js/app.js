const updateTimer = (deadline) => {
    // calculates time left until deadline 
    const time = deadline - new Date();
    return {
        'days': Math.floor(time / (1000 * 60 * 60 * 24)),
        'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
        'minutes': Math.floor((time / (1000 * 60)) % 60),
        'seconds': Math.floor((time / (1000)) % 60),
        'total': time
    };
}

const animateClock = (span) => {
    // animation lasts for 0.5 seconds
    span.className = 'turn';
    setTimeout(() => {
        span.className = '';
    }, 500);
}

const startTimer = (id, deadline) => {
    // calls updateTimer every second
    const timeInterval = setInterval(() => {
        const clock = document.getElementById(id);
        let timer = updateTimer(deadline);

        clock.innerHTML =
            '<span>' + timer.days + '</span>' +
            '<span>' + timer.hours + '</span>' +
            '<span>' + timer.minutes + '</span>' +
            '<span>' + timer.seconds + '</span>';

        const spans = clock.getElementsByTagName("span");
        animateClock(spans[3]);
        if (timer.seconds == 59) animateClock(spans[2]);
        if (timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
        if (timer.minutes == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);


        // check if deadline has passed
        if (timer.total < 1) {
            clearInterval(timeInterval);
            clock.innerHTML =
                '<span>0</span><span>0</span><span>0</span><span>0</span>';
        }

    }, 1000);
}


const data = {
    "siteIdentity": {
        "logoPath": "images/logo.png",
        "companyName": "MZ.com"
    },
    "bannerDetails": {
        "bannerImagePath": "images/banner.jpg",
        "bannerImageTitle": "This is Header Banner"
    },
    "stickBox": "This is Fixed",
    "saleEndDate": "December 23, 2019 13:00:00",
    "saleItemsInfo": [{
            "itemName": "1CakCity Men Digital Sports Watch LED Screen Large Face Military Watches and Waterproof Casual Luminous Stopwatch",
            "itemImagePath": "images/1.jpg",
            "itemOriginalPrice": "15<sup>99</sup>",
            "itemDiscountPrice": "12<sup>99</sup>"
        },
        {
            "itemName": "1CakCity Men s Digital Sports Watch LED Screen Large Face Military Watches and Waterproof Casual Luminous Stopwatch",
            "itemImagePath": "images/1.jpg",
            "itemOriginalPrice": "15<sup>99</sup>",
            "itemDiscountPrice": "12<sup>99</sup>"
        },
        {
            "itemName": "1CakCity Men s Digital Sports Watch LED Screen Large Face Military Watches and Waterproof Casual Luminous Stopwatch",
            "itemImagePath": "images/1.jpg",
            "itemOriginalPrice": "15<sup>99</sup>",
            "itemDiscountPrice": "12<sup>99</sup>"
        },
        {
            "itemName": "1CakCity Men s Digital Sports Watch LED Screen Large Face Military Watches and Waterproof Casual Luminous Stopwatch",
            "itemImagePath": "images/1.jpg",
            "itemOriginalPrice": "15<sup>99</sup>",
            "itemDiscountPrice": "12<sup>99</sup>"
        }
    ],
    "promoDetails": [{
            "promoInfo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            "promoInfo": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
    ]
};



let date = data.saleEndDate;

const loadHeader = () => {
	document.getElementById('header').innerHTML = `
        <img src="${data.siteIdentity.logoPath}" alt="${data.siteIdentity.companyName}" title="${data.siteIdentity.companyName}" />`
}
const loadStickBox = () => {
	document.getElementById('stick-box').innerHTML = `
        <div class="description">${data.stickBox}</div>`;
}

const loadBanner = () => {
	document.getElementById('banner').innerHTML = `
        <div class="description">${data.bannerDetails.bannerDesc}</div>
        <img src="${data.bannerDetails.bannerImagePath}" alt="${data.bannerDetails.bannerImageTitle}" title="${data.bannerDetails.bannerImageTitle}" />`;
}
const loadSaleCounter = () => {
	const deadline = new Date(data.saleEndDate);
	startTimer("clock", deadline);
}
const loadSaleList = () => {
	document.getElementById('sale-list').innerHTML = `
        ${data.saleItemsInfo.map((itemInfo) => {
            return `
                <li>
                    <img src="${itemInfo.itemImagePath}" alt="${itemInfo.itemName}" />
                    <div class="item-details">
                        <p>${itemInfo.itemName}</p>
                        <div class="price-block">
                            <strike>${itemInfo.itemOriginalPrice}</strike>
                            <span>${itemInfo.itemDiscountPrice}</span>
                        </div>
                    </div>
                </li>
            `
        }).join("")}
    `;
}
const loadPromo = () => {
	document.getElementById('promo').innerHTML = `
        ${data.promoDetails.map((promo) => {
            return `
                <div class="promo">
                    <p>${promo.promoInfo}</p>
                </div>
            `
        }).join("")}
    `;
}
const scrollHeight = () => {
    var elementHeight = document.getElementById('sale-list').children[0].clientHeight * 3;
    document.getElementById('sale-list').style.height = elementHeight + 'px';
}
const footerHeight = () => {
    var elementHeight = document.getElementById('footer').clientHeight;
    document.getElementById('wrapper').style.paddingBottom = elementHeight + 'px';
}


window.onload = () => {
	loadHeader();
    loadStickBox();
	loadBanner();
	loadSaleCounter();
	loadSaleList();
	loadPromo();
    scrollHeight();
    footerHeight();
};
window.addEventListener("resize", scrollHeight);
window.addEventListener("resize", footerHeight);