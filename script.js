const content = {
	nav: ['Produse', 'Mac', 'iPhone', 'AirPods', 'Watch'],
	products: [
		{ id: 'iphone', title: 'iPhone', img: 'iPhone17.png', desc: 'Performanță și cameră avansată — totul într-un design compact.' },
		{ id: 'mac', title: 'Mac', img: 'MACpro.png', desc: 'Putere și portabilitate pentru profesioniști și creatori.' },
		{ id: 'airpods', title: 'AirPods', img: 'Airpodss.png', desc: 'Sunet clar, conectivitate instantă și autonomie pentru întreaga zi.' },
		{ id: 'watch', title: 'Watch', img: 'Applewatch.jpg', desc: 'Monitorizare a sănătății, notificări și design elegant pe încheietura ta.' }
	]
};

function buildPage() {
	document.querySelector('.header-inner').innerHTML = `
		<img src="apple.png" alt="Logo Apple" class="logo">
		<nav class="main-nav" id="main-nav">
			${content.nav.map((n, i) => `<a href="#${i === 0 ? 'produse' : n.toLowerCase()}">${n}</a>`).join('')}
		</nav>
		<div class="header-actions">
			<a class="cta" href="#cauta">Cumpără</a>
		</div>
	`;

	document.getElementById('main-content').innerHTML = `
		<section class="hero">
			<div class="container hero-inner">
				<div class="hero-copy">
					<h1>Design. Inovare. Simplitate.</h1>
					<p>Produse concepute pentru performanță, create pentru oameni. Explorează portofoliul nostru și găsește ce ți se potrivește.</p>
					<p class="hero-cta">
						<a class="btn btn-primary" href="#produse">Descoperă</a>
						<a class="btn btn-outline" href="#cauta">Cumpără</a>
					</p>
				</div>
				<div class="hero-media" aria-hidden="true">
					<img src="logo.png" class="device device-large">
				</div>
			</div>
		</section>

		<section id="produse" class="products container">
			<h2>Produse principale</h2>
					<!-- search bar lângă produsele principale -->
					<div class="products-search">
						<input id="productSearch" type="text" placeholder="Caută produs...">
						<button id="productSearchBtn" type="button">Caută</button>
					</div>
					<div class="grid">
						${content.products.map(p => `
							<article class="card" data-id="${p.id}">
								<img src="${p.img}" class="img-placeholder">
								<h3 id="${p.id}">${p.title}</h3>
								<p>${p.desc}</p>
								<a class="link" href="#">Vezi detalii →</a>
							</article>
						`).join('')}
				</div>
			</section>

			<section class="showcase">
			<div class="container">
				<div class="showcase-inner">
					<h2>Tehnologie care îți face viața mai simplă</h2>
					<p>Integrare perfectă între dispozitive pentru o experienț fluidă.</p>
					<button id="buton">Apasă mă</button>
				</div>
			</div>
		</section>
	`;
}

document.addEventListener('DOMContentLoaded', function () {
	buildPage();

	// log input value as a “suggestie” when user clicks the hero button
	const inputEl = document.getElementById('heroInput');
	const buttonEl = document.getElementById('heroButton');
	if (buttonEl && inputEl) {
		buttonEl.addEventListener('click', () => {
			const text = inputEl.value.trim();
			console.log(`Sugestie: ${text}`);
		});
	}

	// product search/filter logic
	const prodInput = document.getElementById('productSearch');
	const prodBtn = document.getElementById('productSearchBtn');
	if (prodBtn && prodInput) {
		prodBtn.addEventListener('click', () => {
			const q = prodInput.value.trim().toLowerCase();
			const cards = Array.from(document.querySelectorAll('.card'));
			let matchCount = 0;
			cards.forEach(card => {
				if (q) {
					if (card.dataset.id.includes(q)) {
						matchCount++;
						card.classList.add('highlight');
						card.style.display = 'block';
						// center and enlarge the single visible card
						card.style.gridColumn = '1 / -1';
						card.style.justifySelf = 'center';
						card.style.margin = '0 auto';
					} else {
						card.classList.remove('highlight');
						card.style.display = 'none';
						card.style.gridColumn = '';
						card.style.justifySelf = '';
						card.style.margin = '';
					}
				} else {
					// empty query: show everything normally
					card.classList.remove('highlight');
					card.style.display = 'block';
					card.style.gridColumn = '';
					card.style.justifySelf = '';
					card.style.margin = '';
				}
			});
			const grid = document.querySelector('.products .grid');
			if (grid) {
				if (matchCount === 1 && q) {
					grid.classList.add('single-result');
				} else {
					grid.classList.remove('single-result');
				}
			}
		});
	}
});