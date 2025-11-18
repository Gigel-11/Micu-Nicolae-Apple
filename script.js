document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('menu-btn');
	const mainNav = document.getElementById('main-nav');
	const header = document.getElementById('site-header');

	if (menuBtn && mainNav) {
		menuBtn.addEventListener('click', function () {
			const isOpen = mainNav.classList.toggle('open');
			menuBtn.setAttribute('aria-expanded', isOpen);
		});

		// Close menu with Esc
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && mainNav.classList.contains('open')) {
				mainNav.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Add subtle header background on scroll
	window.addEventListener('scroll', function () {
		if (!header) return;
		header.classList.toggle('scrolled', window.scrollY > 20);
	});

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
			var href = anchor.getAttribute('href');
			if (href && href.length > 1) {
				var target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
					if (mainNav && mainNav.classList.contains('open')) {
						mainNav.classList.remove('open');
					}
				}
			}
					});

		/* Image editor: per-card image upload + filter/transform controls */
		(function(){
			const STORAGE_KEY = 'image-settings-v1';
			const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

			function applySettings(img, settings){
				if (!img || !settings) return;
				if (settings.src) img.src = settings.src;
				const f = [];
				f.push(`brightness(${settings.brightness || 100}%)`);
				f.push(`contrast(${settings.contrast || 100}%)`);
				f.push(`saturate(${settings.saturate || 100}%)`);
				f.push(`grayscale(${settings['grayscale'] || 0}%)`);
				f.push(`sepia(${settings.sepia || 0}%)`);
				if (settings.blur) f.push(`blur(${settings.blur || 0}px)`);
				if (settings['hue-rotate']) f.push(`hue-rotate(${settings['hue-rotate'] || 0}deg)`);
				img.style.filter = f.join(' ');
				const rotate = (settings.rotate || 0);
				const scale = (settings.scale || 100)/100;
				img.style.transform = `rotate(${rotate}deg) scale(${scale})`;
				img.style.opacity = ((settings.opacity || 100)/100).toString();
			}

			function readSettings(id){
				return saved[id] || null;
			}

			function saveSettings(id, settings){
				saved[id] = settings;
				localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
			}

			document.querySelectorAll('.card[data-img-id]').forEach(card => {
				const id = card.getAttribute('data-img-id');
				const img = card.querySelector('.card-img');
				const noImg = card.querySelector('.no-img');
				const editBtn = card.querySelector('.edit-img-btn');
				const controls = card.querySelector('.img-controls');
				const upload = card.querySelector('.img-upload');
				const ranges = Array.from(card.querySelectorAll('input[type="range"]'));
				const saveBtn = card.querySelector('.img-save');
				const resetBtn = card.querySelector('.img-reset');

				// initialize from storage
				const settings = readSettings(id);
				if (settings && settings.src){
					img.src = settings.src;
					if (noImg) noImg.style.display = 'none';
					applySettings(img, settings);
					// set slider values
					ranges.forEach(r => {
						const prop = r.dataset.prop;
						if (prop && settings.hasOwnProperty(prop)) r.value = settings[prop];
					});
				}

				// toggle controls
				editBtn.addEventListener('click', () => {
					const open = controls.classList.toggle('open');
					controls.setAttribute('aria-hidden', !open);
					editBtn.setAttribute('aria-expanded', open);
				});

				// upload
				upload.addEventListener('change', (e) => {
					const file = e.target.files && e.target.files[0];
					if (!file) return;
					const reader = new FileReader();
					reader.onload = function(ev){
						img.src = ev.target.result;
						if (noImg) noImg.style.display = 'none';
						// update settings
						const cur = readSettings(id) || {};
						cur.src = ev.target.result;
						saveSettings(id, cur);
					};
					reader.readAsDataURL(file);
				});

				// live update filters when sliding
				ranges.forEach(r => r.addEventListener('input', () => {
					const prop = r.dataset.prop;
					const cur = readSettings(id) || {};
					cur[prop] = r.value;
					applySettings(img, cur);
				}));

				// save button persists current slider values
				saveBtn.addEventListener('click', () => {
					const cur = readSettings(id) || {};
					ranges.forEach(r => { cur[r.dataset.prop] = r.value; });
					if (img && img.src) cur.src = img.src;
					saveSettings(id, cur);
					// provide quick feedback
					saveBtn.textContent = 'Salvat';
					setTimeout(()=> saveBtn.textContent = 'Salvează', 1200);
				});

				// reset filters to defaults
				resetBtn.addEventListener('click', () => {
					const defaults = {brightness:100,contrast:100,saturate:100,grayscale:0,sepia:0,blur:0,'hue-rotate':0,opacity:100,rotate:0,scale:100};
					ranges.forEach(r => { const p=r.dataset.prop; if (defaults.hasOwnProperty(p)) r.value = defaults[p]; });
					applySettings(img, defaults);
					const cur = readSettings(id) || {};
					// keep src but reset filters
					cur.brightness = 100; cur.contrast = 100; cur.saturate = 100; cur.grayscale = 0; cur.sepia = 0; cur.blur = 0; cur['hue-rotate']=0; cur.opacity=100; cur.rotate=0; cur.scale=100;
					saveSettings(id, cur);
				});
			});
		})();

});

	// Reveal-on-scroll for elements with .reveal
	(function (){
		if (!('IntersectionObserver' in window)){
			// fallback: show all
			document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
			return;
		}

		const obs = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting){
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		}, {threshold: 0.12});

		document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
	})();

	// Improve keyboard accessibility: allow Enter/Space on card links when card is focused
	document.addEventListener('keydown', function(e){
		if (e.key === 'Enter' || e.key === ' '){
			const active = document.activeElement;
			if (active && active.classList && active.classList.contains('card')){
				const link = active.querySelector('.link');
				if (link) link.click();
			}
		}
	});
});
