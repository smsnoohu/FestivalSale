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
const scrollHeight = () => {
    var elementHeight = document.getElementById('sale-list').children[0].clientHeight * 3;
    document.getElementById('sale-list').style.height = elementHeight + 'px';
}
const footerHeight = () => {
    var elementHeight = document.getElementById('footer').clientHeight;
    document.getElementById('wrapper').style.paddingBottom = elementHeight + 'px';
}


const getData = (data) => {
	return new Promise((resolve, reject) => {
		resolve(data);
	});
}

const loadHeader = (data) => {
	document.getElementById('header').innerHTML = `
        <img src="${data.siteIdentity.logoPath}" alt="${data.siteIdentity.companyName}" title="${data.siteIdentity.companyName}" />`
}
const loadStickBox = (data) => {
	document.getElementById('stick-box').innerHTML = `
        <div class="description">${data.stickBox}</div>`;
}

const loadBanner = (data) => {
	document.getElementById('banner').innerHTML = `
        <div class="description">${data.bannerDetails.bannerDesc}</div>
        <img src="${data.bannerDetails.bannerImagePath}" alt="${data.bannerDetails.bannerImageTitle}" title="${data.bannerDetails.bannerImageTitle}" />`;
}
const loadSaleCounter = (data) => {
	const deadline = new Date(data.saleEndDate);
	startTimer("clock", deadline);
}
const loadSaleList = (data) => {
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
const loadPromo = (data) => {
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
const loadOverlay = () => {
	document.body.innerHTML += `
		<div class="overlay">
			<div class="overlay-inner">
				<h2>404</h2>
				<p>Oooops!! Something went wrong. <a href="">Try again</a> later.</p>
			</div>
		</div>	
	`;
	document.body.style.overflow = 'hidden';
}

const url = "js/data.json"
fetch(url, {
	method: "GET",
	mode: "no-cors"
	})
	.then(response => response.json())
	.then(this.getData)
	.then((data)=>{
        loadHeader(data);
        loadStickBox(data);
		loadBanner(data);
		loadSaleCounter(data);
		loadSaleList(data);
		loadPromo(data);
		scrollHeight();
		footerHeight();
		window.addEventListener("resize", scrollHeight);
		window.addEventListener("resize", footerHeight);
	})
	.catch(err => {
		loadOverlay();
	});