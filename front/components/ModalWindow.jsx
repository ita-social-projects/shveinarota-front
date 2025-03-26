import { useEffect, useRef } from 'react';

const ModalWindow = () => {
	const path = usePathname();
	const previousPath = useRef(path);
	const popup = useRef();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [path]);

	useEffect(() => {
		if (previousPath.current.startsWith("/dashboard") && !path.startsWith("/dashboard")) {
			window.location.reload();
		}
		previousPath.current = path;
	}, [path]);

	function closePopup() {
		document.body.classList.remove("popup-active");
		document.querySelector(".wrapper").style.paddingRight = "0px";
		document.querySelector(".header").style.paddingRight = "0px";
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("click", (event) => {
				if (event.target === popup.current) {
					document.body.classList.remove("popup-active");
					document.querySelector(".wrapper").style.paddingRight = "0px";
					document.querySelector(".header").style.paddingRight = "0px";
				}
			});
		}
	}, []);

	return (
		<div ref={popup} id="popup" className="popup">
			<div className="popup-content">
				<span onClick={closePopup} id="closeBtn" className="popup__close">
					&times;
				</span>
				<PopupLink href="https://www.paypal.com" text="marishka.polo@gmail.com" img="/images/paypal.jpg" />
				<PopupLink href="https://send.monobank.ua/jar/5VV7zhDJGY" text="5375 4112 0381 7304" img="/images/mono.jpg" />
			</div>
		</div>
	);
};

export default ModalWindow;