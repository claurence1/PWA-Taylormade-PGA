window.onload = function () {
	Promise.resolve(imagePaths).then(resImagePaths => {
		resImagePaths.forEach((imagePath, index) => {
			const imageAffiche = document.createElement("a");

			imageAffiche.classList.add("full");
			imageAffiche.classList.add("progressive");
			imageAffiche.classList.add("replace");

			imageAffiche.setAttribute("href", imagePath);

			imageAffiche.innerHTML = `<img src="${imagePath[0]}" class="preview" loading="lazy" width="20" height="15" alt="preview"/>`

			const boutonFavoris = document.createElement('button');
			boutonFavoris.innerHTML = '★';
			boutonFavoris.classList.add("img");
			boutonFavoris.classList.add("rounded-circle");
			boutonFavoris.setAttribute("id", `${imagePath[0]}`);

			const galleryImage = document.createElement('div');
			galleryImage.classList.add("gallery-image")
			const imgHolder = document.createElement('div');
			imgHolder.classList.add("img-holder");

			imgHolder.append(imageAffiche);
			imgHolder.append(boutonFavoris);

			galleryImage.append(imgHolder);

			document.getElementById("gallery").appendChild(galleryImage);

			boutonFavoris.addEventListener("click", () => {
				fetch(`http://localhost:3000/favorite?image=${encodeURIComponent(imagePath[0])}` )
					.then((response) => {
						navigator.serviceWorker.ready.then(
							(serviceWorkerRegistration) => {
								serviceWorkerRegistration.pushManager.subscribe(
									{
										userVisibleOnly: true,
										applicationServerKey: "BNANPi8bmsrs4-wBjl_Et7dDewZWSHjYKKZuoDvZai1fvnhS282gY_PdYl38DXs4pS-FORfya5jkOs1dMkjpTHY"
									}
								).then(_subscription => {
									Notification.requestPermission(permission => {
										if (permission === "granted") {
											const notification = new Notification("You're falling in love");
										}
									});
								});
							}
						);
					})
					.catch(console.error);
			})
		})
	})
		.catch(err => {
			const messageElement = document.createElement("p");
			messageElement.innerText = err;
			document.getElementById("gallery").appendChild(messageElement)
		})
};