// MPA View Transitions!
window.addEventListener("pagereveal", async (e) => {

	// There is an automatic viewTransition, so the user comes from the same origin
	if (e.viewTransition) {

		if (!navigation.activation?.from) {
			e.viewTransition.skipTransition();
			return;
		}

		const transitionClass = determineTransitionClass(navigation.activation.from, navigation.currentEntry);
		document.documentElement.dataset.transition = transitionClass;

		await e.viewTransition.finished;
		delete document.documentElement.dataset.transition;
	}

	// User comes from different origin or did a reload
	else {

		// Do a reload animation
		if (navigation.activation.navigationType == 'reload') {
			document.documentElement.dataset.transition = "reload";
			const t = document.startViewTransition(() => {
				// NOOP
			});
			try {
				await t.finished;
				delete document.documentElement.dataset.transition;
			} catch (e) {
				console.log(e);
			}
			return;
		}

		// @TODO: manually create a “welcome” viewTransition here?
	}
});