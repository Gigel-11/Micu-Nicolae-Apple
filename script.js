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
			<div class="grid">
				${content.products.map(p => `
					<article class="card">
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

});