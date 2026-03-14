import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import "./style.css";

gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  Observer,
);

let smoother;
let homeCtx;
let productPageCtx;
let productsCtx;
let homeAbortController;

const client = createClient({
  projectId: "1zhhp7qc",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-02-09",
});
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const homeQuery = `*[_type == "home"][0]{
  slogan, heroImages[] { asset, alt }, editTitle, editFirstText,
  editFirstImage, hoverimg1, editSecondImage, hoverimg2, editThirdImage, hoverimg3, editFourthImage, hoverimg4,
  editFifthImage, hoverimg5, editSixthImage, hoverimg6, editSeventhImage, hoverimg7, editSecondText
}`;

function initSmoother(contentEl) {
  if (ScrollSmoother.get()) ScrollSmoother.get().kill();
  smoother = ScrollSmoother.create({
    wrapper: ".smooth-wrapper",
    content: contentEl,
    smooth: 1,
    effects: true,
  });
}

//entendi :)
async function populateHomeData(container) {
  try {
    const data = await client.fetch(homeQuery);
    if (!data) return;

    const assignText = (selector, dataVal) => {
      const el = container.querySelector(selector);
      if (el && dataVal) el.textContent = dataVal;
    };

    assignText("#hero_slogan", data.slogan);
    assignText("#the_edit_title", data.editTitle);
    assignText("#the_edit_first_text", data.editFirstText);
    assignText("#the_edit_second_text", data.editSecondText);

    const bgContainer = container.querySelector("#hero_background");
    if (bgContainer && data.heroImages?.length > 0) {
      bgContainer.innerHTML = "";
      data.heroImages.forEach((imgData) => {
        const imgEl = document.createElement("img");
        imgEl.src = urlFor(imgData).width(1920).url();
        imgEl.alt = imgData.alt || "Woode Interior";
        bgContainer.appendChild(imgEl);
      });
    }

    const assignImage = (selector, imgData) => {
      const el = container.querySelector(selector);
      if (el && imgData) el.src = urlFor(imgData).url();
    };

    assignImage(".the-edit-first-photo", data.editFirstImage);
    assignImage(".the-edit-first-hovered-photo", data.hoverimg1);
    assignImage(".the-edit-second-photo", data.editSecondImage);
    assignImage(".the-edit-second-hovered-photo", data.hoverimg2);
    assignImage(".the-edit-third-photo", data.editThirdImage);
    assignImage(".the-edit-third-hovered-photo", data.hoverimg3);
    assignImage(".the-edit-fourth-photo", data.editFourthImage);
    assignImage(".the-edit-fourth-hovered-photo", data.hoverimg4);
    assignImage(".the-edit-fifth-photo", data.editFifthImage);
    assignImage(".the-edit-fifth-hovered-photo", data.hoverimg5);
    assignImage(".the-edit-sixth-photo", data.editSixthImage);
    assignImage(".the-edit-sixth-hovered-photo", data.hoverimg6);
    assignImage(".the-edit-seventh-photo", data.editSeventhImage);
    assignImage(".the-edit-seventh-hovered-photo", data.hoverimg7);
  } catch (error) {
    console.error("Sanity Error:", error);
  }
}

//entendi :)
function initHomeAnimations(container) {
  homeAbortController = new AbortController();
  const { signal } = homeAbortController;

  const headerBackground = document.querySelector(".header-background");
  const headerLinks = document.querySelectorAll(".header-link");
  const livingLink = document.getElementById("living_link");
  const diningLink = document.getElementById("dining_link");
  const bedroomLink = document.getElementById("bedroom_link");
  const collectionsLink = document.getElementById("collections_link");
  const searchLink = document.getElementById("search_link");
  const cartLink = document.getElementById("cart_link");

  const categoryMenus = [
    { link: livingLink, target: "#menu_living" },
    { link: diningLink, target: "#menu_dining" },
    { link: bedroomLink, target: "#menu_bedroom" },
    { link: collectionsLink, target: "#menu_collections" },
    { link: searchLink, target: "#search_tab" },
    { link: cartLink, target: "#cart_tab" },
  ];

  const cartTarget = document.getElementById("cart_tab");

  let activeTarget = null;
  let isAnimating = false;

  homeCtx = gsap.context(() => {
    const sloganElement = container.querySelector("#hero_slogan");
    if (sloganElement) {
      gsap.from(sloganElement, { opacity: 0, y: 30, duration: 1, delay: 0.5 });
    }

    const images = container.querySelectorAll("#hero_background img");
    const timerContainer = container.querySelector("#hero_timers_container");

    if (timerContainer && images.length > 0) {
      timerContainer.innerHTML = "";
      images.forEach(() => {
        const bar = document.createElement("div");
        bar.classList.add("timer-bar");
        timerContainer.appendChild(bar);
      });

      const timers = container.querySelectorAll(".timer-bar");
      if (images.length === 1) {
        gsap.set(images[0], { opacity: 1 });
        gsap.set(timers[0], {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
      } else {
        gsap.set(images, { zIndex: 0, opacity: 0 });
        gsap.set(images[0], { zIndex: 1, opacity: 1 });
        const tl = gsap.timeline({ repeat: -1 });

        images.forEach((img, index) => {
          const nextImg = images[index + 1] || images[0];
          const currentTimer = timers[index];
          const isLast = index === images.length - 1;

          tl.to(currentTimer, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 3.7,
            ease: "none",
          })
            .set(nextImg, { zIndex: 2 })
            .to(nextImg, { duration: 1.7, opacity: 1, ease: "power2.inOut" })
            .set(img, { zIndex: 0, opacity: 0 })
            .set(nextImg, { zIndex: 1 });

          if (isLast) {
            tl.set(timers, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            });
          }
        });
      }
    }

    const theEdit = container.querySelector(".the-edit");
    const animWrapper = container.querySelector(".animation-wrapper");
    if (theEdit && animWrapper) {
      const extraHeight = theEdit.offsetHeight - window.innerHeight;
      if (extraHeight > 0) {
        gsap.set(animWrapper, { marginBottom: extraHeight });
      }

      let theEditTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".animation-wrapper",
          start: "top top",
          pin: true,
          scrub: true,
          ease: "none",
          invalidateOnRefresh: true,
        },
      });

      theEditTl
        .to(".the-edit", { y: 0, ease: "none" })
        .to(".hero-background", { scale: 1.1, ease: "none" }, "<")
        .to(".hero", { filter: "blur(3px)", ease: "none" }, "<");

      ScrollTrigger.create({
        trigger: ".the-edit",
        start: "top center",
        onEnter: () => gsap.to(headerBackground, { y: 0 }),
        onLeaveBack: () => gsap.to(headerBackground, { y: "-100%" }),
      });

      const imgContainers = container.querySelectorAll(".img-container");

      imgContainers.forEach((imgContainer) => {
        const img = imgContainer.querySelector("img");
        const hoveredImg = imgContainer.querySelector(".hovered-img");

        gsap.to(img, {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: imgContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(hoveredImg, {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: imgContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        img.addEventListener("mouseenter", () => {
          gsap.set(img, { opacity: 0 });
        });

        img.addEventListener("mouseleave", () => {
          gsap.set(img, { opacity: 1 });
        });
      });
    }

    const cartTargetCloseBtn = document.getElementById("cart_close_btn");
    categoryMenus.forEach(({ link, target }) => {
      if (!link) return;

      link.addEventListener("click", () => {
        if (isAnimating) return;

        const targetOverlay = document.querySelector(target);

        // --- 1. ISOLATED CART LOGIC (X-Axis) ---
        if (target === "#cart_tab") {
          isAnimating = true;

          const targetItems = targetOverlay.querySelectorAll(
            "h2, .cart-tab-line, .investment-counter, .pieces-counter, .contact-concierge-btn",
          );

          const tl = gsap.timeline({
            onComplete: () => {
              isAnimating = false;
            },
          });

          // NEW LOGIC: Close any open Y-axis menu before sliding the cart in
          if (activeTarget) {
            const oldOverlay = document.querySelector(activeTarget);
            const oldItems = oldOverlay.querySelectorAll(
              ".product-categories h3, .product-categories li, .search-item",
            );

            tl.to(oldItems, {
              y: -10,
              opacity: 0,
              duration: 0.3,
              stagger: 0.02,
              ease: "power2.in",
            }).set(oldOverlay, { y: "-100%" });

            activeTarget = null; // Clear the active target since the cart is now open
          }

          gsap.set(targetItems, { opacity: 0, y: 15 });

          tl.to(
            targetOverlay,
            {
              x: "0%", // Slide in from right
              duration: 0.8,
              ease: "expo.inOut",
            },
            activeTarget ? "<0.1" : undefined,
          )
            .to(
              // Overlap the slide slightly if closing a menu
              [targetItems, cartTargetCloseBtn],
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.04,
                ease: "power3.out",
              },
              "-=0.3",
            )
            .to(
              ".cart-tab-overlay",
              {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.8,
                ease: "expo.inOut",
              },
              0,
            );

          cartTargetCloseBtn.addEventListener("click", () => {
            console.log("clickado");
            const tl = gsap.timeline({
              onComplete: () => {
                activeTarget = null;
                isAnimating = false;
              },
            });

            tl.to([cartTargetCloseBtn, targetItems], {
              y: -10,
              opacity: 0,
              duration: 0.4,
              stagger: -0.02,
              ease: "power2.in",
            })
              .to(targetOverlay, {
                x: "100%",
                duration: 0.8,
                ease: "expo.inOut",
              })
              .to(
                ".cart-tab-overlay",
                {
                  opacity: 0,
                  pointerEvents: "none",
                  duration: 0.8,
                  ease: "expo.inOut",
                },
                0,
              );
          });
          return; // Stop execution so it doesn't run the Y-axis logic below
        }

        // --- 2. STANDARD MENU LOGIC (Y-Axis) ---
        const targetItems = targetOverlay.querySelectorAll(
          ".product-categories h3, .product-categories li, .search-item",
        );

        if (activeTarget === target) {
          isAnimating = true;

          const tl = gsap.timeline({
            onComplete: () => {
              activeTarget = null;
              isAnimating = false;
            },
          });

          tl.to(targetItems, {
            y: -10,
            opacity: 0,
            duration: 0.4,
            stagger: -0.02,
            ease: "power2.in",
          }).to(targetOverlay, {
            y: "-100%",
            duration: 0.8,
            ease: "expo.inOut",
          });
        } else {
          isAnimating = true;

          if (activeTarget) {
            const oldOverlay = document.querySelector(activeTarget);
            const oldItems = oldOverlay.querySelectorAll(
              ".product-categories h3, .product-categories li, .search-item",
            );

            const tl = gsap.timeline({
              onComplete: () => {
                activeTarget = target;
                isAnimating = false;
              },
            });

            tl.to(oldItems, {
              y: -10,
              opacity: 0,
              duration: 0.3,
              stagger: 0.02,
              ease: "power2.in",
            }).set(oldOverlay, { y: "-100%" });

            tl.set(targetOverlay, { y: "0%" }).fromTo(
              targetItems,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.03,
                ease: "power3.out",
              },
            );
          } else {
            const tl = gsap.timeline({
              onComplete: () => {
                activeTarget = target;
                isAnimating = false;
              },
            });

            gsap.set(targetItems, { opacity: 0, y: 15 });

            tl.to(targetOverlay, {
              y: "0%",
              duration: 0.8,
              ease: "expo.inOut",
            }).to(
              targetItems,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.04,
                ease: "power3.out",
              },
              "-=0.3",
            );
          }
        }
      });
    });

    headerLinks.forEach((link) => {
      let line = link.querySelector(".hover-line");

      if (!line) {
        line = document.createElement("div");
        line.classList.add("hover-line");
        link.appendChild(line);
      }

      link.addEventListener(
        "mouseenter",
        () =>
          gsap.fromTo(
            line,
            { x: "-100%" },
            { x: "0%", duration: 0.4, overwrite: true },
          ),
        { signal },
      );
      link.addEventListener(
        "mouseleave",
        () => gsap.to(line, { x: "100%", duration: 0.4, overwrite: true }),
        { signal },
      );
    });
  }, container);
}

//entendi, mas devo pesquisar.
function killHome() {
  if (homeCtx) homeCtx.revert();
  if (homeAbortController) homeAbortController.abort();
}

//eu que fiz :)
function initProductPageAnimations(container) {
  productPageCtx = gsap.context(() => {
    let productPhotosTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".product-details",
        start: "center center",
        end: "+=2700",
        pin: true,
        scrub: true,
        onEnter() {
          gsap.to("header", { y: "-100%" });
          gsap.to(".header-background", { y: "-100%" });
        },
        onEnterBack() {
          gsap.to("header", { y: "-100%" });
          gsap.to(".header-background", { y: "-100%" });
        },
        onLeave() {
          gsap.to("header", { y: "0%" });
          gsap.to(".header-background", { y: "0%" });
        },
        onLeaveBack() {
          gsap.to("header", { y: "0%" });
          gsap.to(".header-background", { y: "0%" });
        },
      },
    });

    productPhotosTl.to(".product-details-photos-container", {
      y: window.innerHeight * -1 - 20,
      ease: "none",
    });

    productPhotosTl.to(".product-details-photos-container", {
      y: window.innerHeight * -2 - 40,
      ease: "none",
    });

    productPhotosTl.to(".product-details-photos-container", {
      y: window.innerHeight * -3 - 60,
      ease: "none",
    });

    productPhotosTl.to(".product-details-photos-container", {
      y: window.innerHeight * -4 - 80,
      ease: "none",
    });
  });
}

//eu que fiz :)
function killProductPage() {
  if (productPageCtx) productPageCtx.revert();
}

//entendi, mas não em detalhes.
function initProductsCategory(container) {
  productsCtx = gsap.context(() => {
    const cards = gsap.utils.toArray(".product-card");
    const cardContainer = container.querySelector(
      ".products-category-cards-container",
    );

    if (cards.length === 0 || !cardContainer) return;

    let targetX = 0,
      currentX = 0;
    const ease = 0.08;
    let itemWidth, totalWidth, wrapWidth;

    function updateMetrics() {
      const cardWidth = cards[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(cardContainer).gap) || 0;
      itemWidth = cardWidth + gap;
      totalWidth = itemWidth * cards.length;
      wrapWidth = gsap.utils.wrap(-itemWidth, totalWidth - itemWidth);
    }
    updateMetrics();

    window.addEventListener("resize", updateMetrics);

    //ver possibilidade de colocar nas setinhas
    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onChange: (self) => {
        const velocity = self.deltaY + self.deltaX;
        targetX -= velocity * 0.8;
      },
    });

    const tickerFunc = () => {
      currentX += (targetX - currentX) * ease;
      cards.forEach((card, i) => {
        const initialPos = i * itemWidth;
        const offset = wrapWidth(initialPos - currentX) - initialPos;
        const actualX =
          offset > totalWidth - itemWidth ? offset - totalWidth : offset;
        gsap.set(card, { x: actualX, force3D: true });
      });
    };
    gsap.ticker.add(tickerFunc);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      gsap.ticker.remove(tickerFunc);
    };
  }, container);
}

//entendi, mas devo pesquisar.
function killProductsCategory() {
  if (productsCtx) productsCtx.revert();
}

function resetHeaderState() {
  gsap.set(".header-background", { y: "-100%" });
  gsap.set(".hover-line", { x: "-100%" });

  const menuOverlays = document.querySelectorAll(
    "#menu_living, #menu_dining, #menu_bedroom, #menu_collections, #search_tab",
  );

  gsap.to(menuOverlays, {
    y: "-100%",
    duration: 0.3,
    ease: "power2.inOut",
  });
}

let transitionTl = gsap.timeline();

barba.init({
  sync: false,
  debug: true,

  views: [
    {
      namespace: "home",
      beforeEnter() {
        document.body.classList.add("is-home");
        document.body.classList.remove("is-product");
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.touchAction = "";
      },
      async afterEnter(data) {
        await populateHomeData(data.next.container);

        initSmoother(data.next.container);
        initHomeAnimations(data.next.container);

        setTimeout(() => ScrollTrigger.refresh(), 600);
      },
      beforeLeave() {
        killHome();
      },
    },
    {
      namespace: "product-page",
      beforeEnter() {
        document.body.classList.add("is-home");
        document.body.classList.remove("is-product");
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.touchAction = "";
        gsap.set(".header-background", { y: 0 });
      },
      async afterEnter(data) {
        await populateHomeData(data.next.container);

        initSmoother(data.next.container);
        initHomeAnimations(data.next.container);
        initProductPageAnimations(data.next.container);

        setTimeout(() => ScrollTrigger.refresh(), 600);
      },
      beforeLeave() {
        killHome();
        killProductPage();
      },
    },
    {
      namespace: "products",
      beforeEnter() {
        document.body.classList.remove("is-home");
        document.body.classList.add("is-product");
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        document.body.style.touchAction = "none";
        gsap.set("header", { opacity: 0, pointerEvents: "none" });
        gsap.set("footer", { opacity: 0, pointerEvents: "none" });
      },
      afterEnter(data) {
        initProductsCategory(data.next.container);
      },
      beforeLeave() {
        killProductsCategory();
      },
      afterLeave() {
        gsap.set("header", { opacity: 1, pointerEvents: "auto" });
        gsap.set("footer", { opacity: 1, pointerEvents: "auto" });
      },
    },
  ],

  transitions: [
    {
      name: "default-transition",
      once(data) {
        document.body.classList.add("is-transitioning");
        gsap.to(".transition", {
          y: "-100%",
          duration: 1,
          ease: "power3.inOut",
          delay: 1.7,
          onComplete: () => {
            document.body.classList.remove("is-transitioning");
          },
        });
      },
      leave(data) {
        const done = this.async();
        document.body.classList.add("is-transitioning");

        if (smoother) {
          smoother.kill();
          smoother = null;
        }

        resetHeaderState();

        let tl = gsap.timeline({ onComplete: done });
        if (smoother) smoother.paused(true);

        tl.fromTo(
          ".transition",
          { y: "100%" },
          { y: "0%", duration: 0.8, ease: "power3.inOut" },
        );
      },
      enter(data) {
        const wrapper = document.querySelector(".smooth-wrapper");
        if (wrapper) wrapper.style.cssText = "";
        window.scrollTo(0, 0);

        let tl = gsap.timeline({
          onComplete: () => {
            document.body.classList.remove("is-transitioning");
          },
        });
        tl.to(".transition", {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.fromTo(
          data.next.container,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, clearProps: "all" },
          "<0.2",
        );
        if (smoother) smoother.paused(false);
      },
    },
  ],
});
