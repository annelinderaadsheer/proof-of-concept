// MPA View Transitions
window.addEventListener("pagereveal", async (e) => {

	// Er is een automatische viewTransition, dat betekent dat de gebruiker van dezelfde website komt
	if (e.viewTransition) {

		// Als de gebruiker niet via een vorige pagina komt, sla de overgang over
		if (!navigation.activation?.from) {
			e.viewTransition.skipTransition();
			return;
		}

		// Bepaal de overgangsklasse en voeg deze toe aan het documentelement
		const transitionClass = determineTransitionClass(navigation.activation.from, navigation.currentEntry);
		document.documentElement.dataset.transition = transitionClass;

		// Wacht tot de overgang voltooid is en verwijder dan de overgangsklasse
		await e.viewTransition.finished;
		delete document.documentElement.dataset.transition;
	}

	// Gebruiker komt van een andere pagina of heeft een reload uitgevoerd
	else {

		// Voer een reload-animatie uit als het een reloadnavigatie is
		if (navigation.activation.navigationType == 'reload') {
			document.documentElement.dataset.transition = "reload";
			const t = document.startViewTransition(() => {
				// Geen bewerking (NOOP)
			});
			try {
				// Wacht tot de reload-animatie voltooid is en verwijder dan de overgangsklasse
				await t.finished;
				delete document.documentElement.dataset.transition;
			} catch (e) {
				console.log(e);
			}
			return;
		}
	}
});