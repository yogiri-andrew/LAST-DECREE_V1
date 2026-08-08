/* =========================================================
   LAST DECREE — V3
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // ÉCRAN DE CHARGEMENT
    // ==============================

    const loader = document.getElementById("loader");

    function finishLoading() {
        if (!loader) return;

        loader.classList.add("hidden");

        setTimeout(() => {
            loader.style.display = "none";
        }, 900);
    }

    // Sécurité : le loader ne peut pas rester bloqué
    setTimeout(finishLoading, 2200);

    window.addEventListener("load", () => {
        setTimeout(finishLoading, 900);
    });


    // ==============================
    // NAVIGATION
    // ==============================

    const navButtons = document.querySelectorAll("[data-page]");
    const pages = document.querySelectorAll(".page");

    function showPage(pageId) {

        if (!pageId) return;

        pages.forEach(page => {
            page.classList.toggle(
                "active",
                page.id === pageId
            );
        });

        navButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.page === pageId
            );
        });

        document.body.classList.remove("menu-open");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        notify(
            `ACCÈS : ${pageId.toUpperCase()}`,
            "system"
        );
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            showPage(button.dataset.page);
        });
    });
    // ==============================
    // MENU MOBILE
    // ==============================

    const menuButton = document.querySelector(
        "#menu-toggle, .menu-toggle, [data-menu-toggle]"
    );

    if (menuButton) {

        menuButton.addEventListener("click", () => {

            document.body.classList.toggle(
                "menu-open"
            );

        });

    }


    // ==============================
    // HORLOGE DU SYSTÈME
    // ==============================

    const clockElements = document.querySelectorAll(
        "#system-clock, .system-clock, [data-clock]"
    );

    function updateClock() {

        const now = new Date();

        const time = now.toLocaleTimeString(
            "fr-FR",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

        const date = now.toLocaleDateString(
            "fr-FR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

        clockElements.forEach(element => {

            element.textContent =
                `${date} // ${time}`;

        });
    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    // ==============================
    // COMPTEURS
    // ==============================

    document
        .querySelectorAll("[data-counter]")
        .forEach(counter => {

            const target =
                Number(counter.dataset.counter) || 0;

            const duration = 1200;

            const start =
                performance.now();

            function animate(now) {

                const progress =
                    Math.min(
                        (now - start) / duration,
                        1
                    );

                const value =
                    Math.floor(
                        target *
                        (1 -
                            Math.pow(
                                1 - progress,
                                3
                            )
                        )
                    );

                counter.textContent = value;

                if (progress < 1) {

                    requestAnimationFrame(
                        animate
                    );

                } else {

                    counter.textContent =
                        target;

                }
            }

            requestAnimationFrame(
                animate
            );

        });
    // ==============================
    // BOUTONS D'ACTION
    // ==============================

    document
        .querySelectorAll(
            "[data-action='notify'], .system-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const message =
                        button.dataset.message ||
                        button.textContent.trim() ||
                        "Commande exécutée.";

                    notify(
                        message,
                        "success"
                    );

                }
            );

        });


    // ==============================
    // ACCORDÉONS
    // ==============================

    document
        .querySelectorAll("[data-accordion]")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    item.classList.toggle(
                        "open"
                    );

                    const content =
                        item.querySelector(
                            "[data-accordion-content]"
                        );

                    if (content) {

                        content.style.maxHeight =
                            item.classList.contains("open")
                                ? `${content.scrollHeight}px`
                                : "0px";

                    }

                }
            );

        });


    // ==============================
    // SYSTÈME DE DÉCRETS
    // ==============================

    const decreeForm =
        document.querySelector(
            "#decree-form"
        );

    const decreeList =
        document.querySelector(
            "#decree-list, [data-decree-list]"
        );


    if (decreeForm) {

        decreeForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const title =
                    decreeForm
                        .querySelector(
                            "[name='title']"
                        )
                        ?.value
                        .trim();

                const text =
                    decreeForm
                        .querySelector(
                            "[name='text']"
                        )
                        ?.value
                        .trim();

                if (!title || !text) {

                    notify(
                        "DÉCRET INCOMPLET.",
                        "error"
                    );

                    return;
                }

                const decree = {

                    title: title,

                    text: text,

                    date:
                        new Date()
                            .toLocaleString(
                                "fr-FR"
                            )

                };

                const decrees =
                    JSON.parse(
                        localStorage.getItem(
                            "lastDecreeDecrees"
                        ) || "[]"
                    );

                decrees.unshift(
                    decree
                );

                localStorage.setItem(
                    "lastDecreeDecrees",
                    JSON.stringify(
                        decrees
                    )
                );

                decreeForm.reset();

                renderDecrees();

                notify(
                    "DÉCRET ARCHIVÉ.",
                    "success"
                );

            }
        );

    }


    function renderDecrees() {

        if (!decreeList) return;

        const decrees =
            JSON.parse(
                localStorage.getItem(
                    "lastDecreeDecrees"
                ) || "[]"
            );

        if (decrees.length === 0) {

            decreeList.innerHTML =
                `<div class="empty-state">
                    AUCUN DÉCRET ENREGISTRÉ.
                </div>`;

            return;
        }

        decreeList.innerHTML =
            decrees
                .map(
                    (decree, index) => `

                    <article class="decree-card">

                        <small>
                            DÉCRET #
                            ${String(index + 1)
                                .padStart(3, "0")}
                            //
                            ${escapeHTML(
                                decree.date
                            )}
                        </small>

                        <h3>
                            ${escapeHTML(
                                decree.title
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                decree.text
                            )}
                        </p>

                    </article>

                `
                )
                .join("");

    }

    renderDecrees();
    // ==============================
    // NOTIFICATIONS
    // ==============================

    function notify(
        message,
        type = "system"
    ) {

        let container =
            document.querySelector(
                "#notifications"
            );

        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.id =
                "notifications";

            document.body.appendChild(
                container
            );
        }

        const notification =
            document.createElement(
                "div"
            );

        notification.className =
            `notification notification-${type}`;

        notification.textContent =
            message;

        container.appendChild(
            notification
        );

        requestAnimationFrame(() => {

            notification.classList.add(
                "show"
            );

        });

        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

            setTimeout(() => {

                notification.remove();

            }, 400);

        }, 3000);

    }


    // ==============================
    // PROTECTION HTML
    // ==============================

    function escapeHTML(value) {

        return String(value)

            .replaceAll(
                "&",
                "&amp;"
            )

            .replaceAll(
                "<",
                "&lt;"
            )

            .replaceAll(
                ">",
                "&gt;"
            )

            .replaceAll(
                '"',
                "&quot;"
            )

            .replaceAll(
                "'",
                "&#039;"
            );

    }


    // ==============================
    // EFFET TERMINAL
    // ==============================

    document
        .querySelectorAll(
            "[data-terminal]"
        )
        .forEach(terminal => {

            const original =
                terminal.textContent;

            terminal.textContent = "";

            let index = 0;

            function type() {

                if (
                    index <
                    original.length
                ) {

                    terminal.textContent +=
                        original[index];

                    index++;

                    setTimeout(
                        type,
                        18
                    );

                }

            }

            type();

        });


    // ==============================
    // SCAN SYSTÈME
    // ==============================

    document
        .querySelectorAll(
            "[data-scan]"
        )
        .forEach(element => {

            setInterval(() => {

                element.classList.remove(
                    "scan-pulse"
                );

                void element.offsetWidth;

                element.classList.add(
                    "scan-pulse"
                );

            }, 3500);

        });


    // ==============================
    // INITIALISATION TERMINÉE
    // ==============================

    console.log(
        "%c LAST DECREE V3 ",
        "background:#080808;" +
        "color:#ff1744;" +
        "font-weight:bold;" +
        "padding:8px 14px;"
    );

    console.log(
        "SYSTEM ONLINE // CORE INITIALIZED"
    );

});
