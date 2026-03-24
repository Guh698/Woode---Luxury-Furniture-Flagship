if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

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
let activeMenuTarget = null;
let isMenuAnimating = false;
let activedMenu = false;
let menuAnimating = false;

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
  editFirstProduct->{
    name,
    "slug": slug.current,
    mainImage,
    highlightImage,
    description
  }, hoverimg1, editFirstSlug,  
  editSecondProduct->{
    name,
    "slug": slug.current,
    mainImage,
    highlightImage,
    description
  }, hoverimg2, editSecondSlug,  
  editThirdProduct->{
    name,
    "slug": slug.current,
    mainImage,
    highlightImage,
    description
  }, hoverimg3, editThirdSlug, 
  editFourthProduct->{
    name,
    "slug": slug.current,
    mainImage,
    highlightImage,
    description
  }, hoverimg4, editFourthSlug,
  editFifthProduct->{
    name,
    "slug": slug.current,
    mainImage,
    highlightImage,
    description
  }, hoverimg5, editFifthSlug, 
  editSixthProduct->{
    name,
    "slug": slug.current,
    mainImage,
    highlightImage,
    description
  }, hoverimg6, editSixthSlug, 
  editSeventhProduct->{
    name,
    "slug": slug.current,
    mainImage,
    highlightImage,
    description
  }, hoverimg7, editSeventhSlug, editSecondText
}`;

function initSmoother(contentEl) {
  if (ScrollSmoother.get()) ScrollSmoother.get().kill();
  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      smoother = ScrollSmoother.create({
        wrapper: ".smooth-wrapper",
        content: contentEl,
        smooth: 1,
        effects: false,
      });
    },

    "(max-width: 1023px)": function () {
      smoother = ScrollSmoother.create({
        wrapper: ".smooth-wrapper",
        content: contentEl,
        smooth: 1,
        effects: true,
      });
    },
  });
}

async function populateHomeData(container) {
  try {
    const data = await client.fetch(homeQuery);

    const firstEditLink = container.querySelector(".first-container a");
    const firstEditImg = container.querySelector(".the-edit-first-photo");

    if (data.editFirstProduct) {
      if (firstEditLink && data.editFirstProduct.slug) {
        firstEditLink.href = `product-page.html?slug=${data.editFirstProduct.slug}`;
      }

      if (firstEditImg && data.editFirstProduct.mainImage) {
        firstEditImg.src = urlFor(data.editFirstProduct.mainImage).url();
      }
    }
    const secondEditLink = container.querySelector(".second-container a");
    const secondEditImg = container.querySelector(".the-edit-second-photo");

    if (data.editSecondProduct) {
      if (secondEditLink && data.editSecondProduct.slug) {
        secondEditLink.href = `product-page.html?slug=${data.editSecondProduct.slug}`;
      }

      if (secondEditImg && data.editSecondProduct.mainImage) {
        secondEditImg.src = urlFor(data.editSecondProduct.mainImage).url();
      }
    }
    const thirdEditLink = container.querySelector(".third-container a");
    const thirdEditImg = container.querySelector(".the-edit-third-photo");

    if (data.editThirdProduct) {
      if (thirdEditLink && data.editThirdProduct.slug) {
        thirdEditLink.href = `product-page.html?slug=${data.editThirdProduct.slug}`;
      }

      if (thirdEditImg && data.editThirdProduct.mainImage) {
        thirdEditImg.src = urlFor(data.editThirdProduct.mainImage).url();
      }
    }
    const fourthEditLink = container.querySelector(".fourth-container a");
    const fourthEditImg = container.querySelector(".the-edit-fourth-photo");

    if (data.editFourthProduct) {
      if (fourthEditLink && data.editFourthProduct.slug) {
        fourthEditLink.href = `product-page.html?slug=${data.editFourthProduct.slug}`;
      }

      if (fourthEditImg && data.editFourthProduct.mainImage) {
        fourthEditImg.src = urlFor(data.editFourthProduct.mainImage).url();
      }
    }

    const fifthEditLink = container.querySelector(".fifth-container a");
    const fifthEditImg = container.querySelector(".the-edit-fifth-photo");

    if (data.editFifthProduct) {
      if (fifthEditLink && data.editFifthProduct.slug) {
        fifthEditLink.href = `product-page.html?slug=${data.editFifthProduct.slug}`;
      }

      if (fifthEditImg && data.editFifthProduct.mainImage) {
        fifthEditImg.src = urlFor(data.editFifthProduct.mainImage).url();
      }
    }

    const sixthEditLink = container.querySelector(".sixth-container a");
    const sixthEditImg = container.querySelector(".the-edit-sixth-photo");

    if (data.editSixthProduct) {
      if (sixthEditLink && data.editSixthProduct.slug) {
        sixthEditLink.href = `product-page.html?slug=${data.editSixthProduct.slug}`;
      }

      if (sixthEditImg && data.editSixthProduct.mainImage) {
        sixthEditImg.src = urlFor(data.editSixthProduct.mainImage).url();
      }
    }

    const seventhEditLink = container.querySelector(".seventh-container a");
    const seventhEditImg = container.querySelector(".the-edit-seventh-photo");

    if (data.editSeventhProduct) {
      if (seventhEditLink && data.editSeventhProduct.slug) {
        seventhEditLink.href = `product-page.html?slug=${data.editSeventhProduct.slug}`;
      }

      if (seventhEditImg && data.editSeventhProduct.mainImage) {
        seventhEditImg.src = urlFor(data.editSeventhProduct.mainImage).url();
      }
    }

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

function initHomeAnimations(container) {
  homeAbortController = new AbortController();
  const { signal } = homeAbortController;

  homeCtx = gsap.context(() => {
    const sloganElement = container.querySelector("#hero_slogan");
    if (sloganElement) {
      gsap.from(sloganElement, { opacity: 0, y: 30, duration: 1, delay: 0.5 });
    }

    ScrollTrigger.create({
      trigger: ".the-edit",
      start: "top center",
      onEnter: () => gsap.to(globalHeaderBg, { y: 0 }),
      onLeaveBack: () => gsap.to(globalHeaderBg, { y: "-100%" }),
    });

    const images = container.querySelectorAll("#hero_background img");
    const timerContainer = container.querySelector("#hero_timers_container");
    const globalHeaderBg = document.querySelector(".header-background");

    const theEdit = container.querySelector(".the-edit");
    const animWrapper = container.querySelector(".animation-wrapper");
    if (theEdit && animWrapper) {
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          const extraHeight = theEdit.offsetHeight - window.innerHeight;
          if (extraHeight > 0) {
            gsap.set(animWrapper, { marginBottom: extraHeight });
          }

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
                  .to(nextImg, {
                    duration: 1.7,
                    opacity: 1,
                    ease: "power2.inOut",
                  })
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
        },

        "(max-width: 1023px)": function () {
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
                  .to(nextImg, {
                    duration: 1.7,
                    opacity: 1,
                    ease: "power2.inOut",
                  })
                  .set(img, { zIndex: 0, opacity: 0 })
                  .set(nextImg, { zIndex: 1 });

                if (isLast) {
                  tl.set(timers, {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  });
                }
              });
            }
          }

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
              gsap.to(img, { scale: 1.1 });
            });

            img.addEventListener("mouseleave", () => {
              gsap.to(img, { scale: 1 });
            });
          });
        },
      });
    }
  }, container);
}

function killHome() {
  if (homeCtx) homeCtx.revert();
  if (homeAbortController) homeAbortController.abort();
}

function initProductPageAnimations(container) {
  productPageCtx = gsap.context(() => {
    const globalHeader = document.querySelector("header");
    const globalHeaderBg = document.querySelector(".header-background");
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": function () {
        let productPhotosTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".product-details",
            start: "center center",
            end: "+=2700",
            pin: true,
            scrub: true,
            onEnter() {
              gsap.to(globalHeader, { y: "-100%" });
              gsap.to(globalHeaderBg, { y: "-100%" });
            },
            onEnterBack() {
              gsap.to(globalHeader, { y: "-100%" });
              gsap.to(globalHeaderBg, { y: "-100%" });
            },
            onLeave() {
              gsap.to(globalHeader, { y: "0%" });
              gsap.to(globalHeaderBg, { y: "0%" });
            },
            onLeaveBack() {
              gsap.to(globalHeader, { y: "0%" });
              gsap.to(globalHeaderBg, { y: "0%" });
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
      },

      "(max-width: 1023px)": function () {},
    });
  });
}

function killProductPage() {
  if (productPageCtx) productPageCtx.revert();
}

function initProductsCategory(container) {
  productsCtx = gsap.context(() => {
    const cards = gsap.utils.toArray(".product-card");
    const cardContainer = container.querySelector(
      ".products-category-cards-container",
    );

    const backToHomeLink = document.querySelector(".back-to-home-btn");
    const hoverLine = document.querySelector(".hover-line");

    backToHomeLink.addEventListener("mouseenter", () =>
      gsap.fromTo(
        hoverLine,
        { x: "-100%" },
        { x: "0%", duration: 0.4, overwrite: true },
      ),
    );
    backToHomeLink.addEventListener("mouseleave", () =>
      gsap.to(hoverLine, { x: "100%", duration: 0.4, overwrite: true }),
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
        targetX += velocity * 0.8;
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

function killProductsCategory() {
  if (productsCtx) productsCtx.revert();
}

function initContactAnimations(container) {
  let contactCtx = gsap.context(() => {
    const backToHomeLink = document.querySelector(".back-to-home-btn");
    const hoverLine = document.querySelector(".hover-line");

    backToHomeLink.addEventListener("mouseenter", () =>
      gsap.fromTo(
        hoverLine,
        { x: "-100%" },
        { x: "0%", duration: 0.4, overwrite: true },
      ),
    );
    backToHomeLink.addEventListener("mouseleave", () =>
      gsap.to(hoverLine, { x: "100%", duration: 0.4, overwrite: true }),
    );
    const contactLinks = document.querySelectorAll(".contact-link");
    contactLinks.forEach((contactLink) => {
      const hoverLine = contactLink.querySelector(".hover-line");
      contactLink.addEventListener("mouseenter", () => {
        let tl = gsap.timeline();
        tl.fromTo(hoverLine, { x: 0 }, { x: "100%", duration: 0.3 });
        tl.set(hoverLine, { x: "-100%" });
        tl.to(hoverLine, { x: 0 });
      });
    });

    // --- Infinite Ticker Loop ---
    const photoContainers = gsap.utils.toArray(
      ".contact-animated-photos-container",
    );
    if (photoContainers.length === 0) return;

    let containerHeight;
    let wrapFunction;
    let currentY = 0;
    const speed = 1.5; // Pixels per frame. Adjust for speed.

    function updateMetrics() {
      // Get the height of one full container (usually 100vh)
      containerHeight = photoContainers[0].clientHeight;

      // Wrap logic: when a container hits -containerHeight (off the top),
      // it teleports to containerHeight (off the bottom)
      wrapFunction = gsap.utils.wrap(-containerHeight, containerHeight);
    }

    // Initialize and handle window resizing
    updateMetrics();
    window.addEventListener("resize", updateMetrics);

    const contactTickerFunc = () => {
      currentY += speed;

      photoContainers.forEach((block, i) => {
        // Container 0 starts at 0, Container 1 starts at containerHeight
        const initialOffset = i * containerHeight;

        // Calculate the new Y position and wrap it if necessary
        const yPos = wrapFunction(initialOffset - currentY);

        // Apply the movement
        gsap.set(block, {
          y: yPos,
          force3D: true,
        });
      });
    };

    gsap.ticker.add(contactTickerFunc);

    return () => gsap.ticker.remove(contactTickerFunc);
  }, container);
}

function killContact() {
  if (contactCtx) contactCtx.revert();
}

function initGlobalHeader() {
  const headerLinks = document.querySelectorAll(".header-link");
  const livingLink = document.getElementById("living_link");
  const diningLink = document.getElementById("dining_link");
  const bedroomLink = document.getElementById("bedroom_link");
  const collectionsLink = document.getElementById("collections_link");
  const searchLink = document.getElementById("search_link");
  const cartLink = document.getElementById("cart_link");
  const cartTargetCloseBtn = document.getElementById("cart_close_btn");

  const categoryMenus = [
    { link: livingLink, target: "#menu_living" },
    { link: diningLink, target: "#menu_dining" },
    { link: bedroomLink, target: "#menu_bedroom" },
    { link: collectionsLink, target: "#menu_collections" },
    { link: searchLink, target: "#search_tab" },
    { link: cartLink, target: "#cart_tab" },
  ];

  categoryMenus.forEach(({ link, target }) => {
    if (!link) return;

    link.addEventListener("click", () => {
      if (isMenuAnimating) return;

      const targetOverlay = document.querySelector(target);

      if (target === "#cart_tab") {
        isMenuAnimating = true;
        document.body.style.overflow = "hidden";

        const targetItems = targetOverlay.querySelectorAll(
          "h2, .cart-tab-line, .investment-counter, .pieces-counter, .contact-concierge-btn",
        );

        const tl = gsap.timeline({
          onComplete: () => {
            isMenuAnimating = false;
          },
        });

        if (activeMenuTarget) {
          const oldOverlay = document.querySelector(activeMenuTarget);
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

          activeMenuTarget = null;
        }

        gsap.set(targetItems, { opacity: 0, y: 15 });

        tl.to(
          targetOverlay,
          { x: "0%", duration: 0.8, ease: "expo.inOut" },
          activeMenuTarget ? "<0.1" : undefined,
        )
          .to(
            [targetItems, cartTargetCloseBtn],
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
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
          )
          .to(
            ".categories-tab-overlay",
            {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.8,
              ease: "expo.inOut",
            },
            0,
          );

        cartTargetCloseBtn.addEventListener(
          "click",
          () => {
            document.body.style.overflow = "";
            const tl = gsap.timeline({
              onComplete: () => {
                activeMenuTarget = null;
                isMenuAnimating = false;
              },
            });

            tl.to([cartTargetCloseBtn, targetItems], {
              y: -10,
              opacity: 0,
              duration: 0.4,
              stagger: -0.02,
              pointerEvents: "none",
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
          },
          { once: true },
        );
        return;
      }

      const targetItems = targetOverlay.querySelectorAll(
        ".product-categories h3, .product-categories li, .search-item",
      );

      if (activeMenuTarget === target) {
        isMenuAnimating = true;
        const tl = gsap.timeline({
          onComplete: () => {
            activeMenuTarget = null;
            isMenuAnimating = false;
          },
        });

        tl.to(targetItems, {
          y: -10,
          opacity: 0,
          duration: 0.4,
          stagger: -0.02,
          ease: "power2.in",
        })
          .to(targetOverlay, { y: "-100%", duration: 0.8, ease: "expo.inOut" })
          .to(
            ".categories-tab-overlay",
            {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.8,
              ease: "expo.inOut",
            },
            0,
          );
      } else {
        isMenuAnimating = true;

        if (activeMenuTarget) {
          const oldOverlay = document.querySelector(activeMenuTarget);
          const oldItems = oldOverlay.querySelectorAll(
            ".product-categories h3, .product-categories li, .search-item",
          );

          const tl = gsap.timeline({
            onComplete: () => {
              activeMenuTarget = target;
              isMenuAnimating = false;
            },
          });

          tl.to(oldItems, {
            y: -10,
            opacity: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.in",
          }).set(oldOverlay, { y: "-100%" });

          tl.set(targetOverlay, { y: "0%" })
            .fromTo(
              targetItems,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.03,
                ease: "power3.out",
              },
            )
            .to(
              ".categories-tab-overlay",
              {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.8,
                ease: "expo.inOut",
              },
              0,
            );
        } else {
          const tl = gsap.timeline({
            onComplete: () => {
              activeMenuTarget = target;
              isMenuAnimating = false;
            },
          });

          gsap.set(targetItems, { opacity: 0, y: 15 });

          tl.to(targetOverlay, {
            y: "0%",
            duration: 0.8,
            ease: "expo.inOut",
          })
            .to(
              targetItems,
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
              ".categories-tab-overlay",
              {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.8,
                ease: "expo.inOut",
              },
              0,
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
    link.addEventListener("mouseenter", () =>
      gsap.fromTo(
        line,
        { x: "-100%" },
        { x: "0%", duration: 0.4, overwrite: true },
      ),
    );
    link.addEventListener("mouseleave", () =>
      gsap.to(line, { x: "100%", duration: 0.4, overwrite: true }),
    );
  });

  const mobileMenuBtn = document.getElementById("mobile_menu_link");
  const mobileMenuTab = document.getElementById("mobile_menu");
  const mobileTargetItems = mobileMenuTab.querySelectorAll(
    ".category-item, .contact-link",
  );

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      if (menuAnimating) return;

      menuAnimating = true;

      if (!activedMenu) {
        document.body.style.overflow = "hidden";

        gsap.to("#path3", {
          y: 0.71,
          rotation: 50,
          transformOrigin: "50% 50%",
        });
        gsap.to("#path3-9", {
          y: -0.71,
          rotation: -50,
          transformOrigin: "50% 50%",
        });

        let menuTimeline = gsap.timeline({
          onComplete() {
            activedMenu = true;
            menuAnimating = false;
          },
        });

        menuTimeline
          .to(mobileMenuTab, { x: 0, duration: 0.8, ease: "expo.inOut" })
          .to(
            mobileTargetItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: { each: -0.02, from: "top" },
              ease: "power2.in",
            },
            "-=0.3",
          );
      } else {
        gsap.to("#path3", { y: 0, rotation: 0, transformOrigin: "50% 50%" });
        gsap.to("#path3-9", { y: 0, rotation: 0, transformOrigin: "50% 50%" });

        let ClosingMenuTimeline = gsap.timeline({
          onComplete() {
            activedMenu = false;
            menuAnimating = false;
            gsap.set(mobileTargetItems, { y: 10 });
            document.body.style.overflow = "";
          },
        });

        ClosingMenuTimeline.to(mobileTargetItems, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          stagger: { each: -0.02, from: "bottom" },
          ease: "power2.in",
        }).to(mobileMenuTab, { x: "100%", duration: 0.8, ease: "expo.inOut" });
      }
    });
  }
}

function resetHeaderState() {
  gsap.set(".header-background", { y: "-100%" });
  gsap.set(".hover-line", { x: "-100%" });
  gsap.set(".mobile-menu", { x: "100%" });
  gsap.set("#path3", { y: 0, rotation: 0, transformOrigin: "50% 50%" });
  gsap.set("#path3-9", { y: 0, rotation: 0, transformOrigin: "50% 50%" });

  const menuOverlays = document.querySelectorAll(
    "#menu_living, #menu_dining, #menu_bedroom, #menu_collections, #search_tab",
  );

  gsap.to(menuOverlays, {
    y: "-100%",
    duration: 0.3,
    ease: "power2.inOut",
  });

  // ADD THESE TWO LINES:
  activeMenuTarget = null;
  isMenuAnimating = false;
  activedMenu = false;
  menuAnimating = false;
}

initGlobalHeader();
let transitionTl = gsap.timeline();

barba.init({
  sync: false,
  debug: true,

  views: [
    {
      namespace: "home",
      async beforeEnter(data) {
        gsap.set(["header, footer"], { opacity: 1, pointerEvents: "auto" });
        gsap.set(".header-background", { y: "-100%" });
        document.body.classList.add("is-home");
        document.body.classList.remove("is-product");
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.touchAction = "";
        await populateHomeData(data.next.container);
      },
      afterEnter(data) {
        initSmoother(data.next.container);
        initHomeAnimations(data.next.container);
        setTimeout(() => ScrollTrigger.refresh(), 600);
      },
      afterLeave() {
        killHome();
      },
      beforeLeave() {
        gsap.to(".categories-tab-overlay", {
          opacity: 0,
          pointerEvents: "none",
        });
      },
    },
    {
      namespace: "product-page",
      async beforeEnter(data) {
        document.body.classList.add("is-home");
        document.body.classList.remove("is-product");
        document.body.style.overflow = "";
        document.body.style.height = "";
        document.body.style.touchAction = "";
        gsap.set(".header-background", { y: 0 });

        const urlParams = new URLSearchParams(window.location.search);

        const currentSlug = urlParams.get("slug");

        if (currentSlug) {
          const nextDom = data.next.container;
          const query = `*[_type == "product" && slug.current == "${currentSlug}"][0]`;
          const productData = await client.fetch(query);

          nextDom.querySelector(".product-page-hero h1").textContent =
            productData.name;
          nextDom.querySelector(".product-price").textContent =
            `$${productData.price} USD`;
          nextDom.querySelector(".product-materials").textContent =
            productData.materials;
          nextDom.querySelector(".product-dimensions").textContent =
            productData.dimensions;
          if (productData.highlightImage) {
            nextDom.querySelector(".product-main-photo").src = urlFor(
              productData.highlightImage,
            ).url();
          }
          nextDom.querySelector(".product-description").textContent =
            productData.shortDescription;
          nextDom.querySelector(".product-details-description").textContent =
            productData.detailedDescription;
        }
      },
      afterEnter(data) {
        initSmoother(data.next.container);

        initProductPageAnimations(data.next.container);

        setTimeout(() => ScrollTrigger.refresh(), 600);
      },
      afterLeave() {
        killProductPage();
        gsap.set(".header-background", { y: "-100%" });
      },
      beforeLeave() {
        gsap.to(".categories-tab-overlay", {
          opacity: 0,
          pointerEvents: "none",
        });
      },
    },
    {
      namespace: "contact",
      beforeEnter() {
        document.body.classList.remove("is-home");
        document.body.classList.add("is-product");
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        document.body.style.touchAction = "none";
        gsap.set(["header, footer"], { opacity: 0, pointerEvents: "none" });
        gsap.set(".header-background", { y: "-100%" });
      },
      afterEnter(data) {
        initContactAnimations(data.next.container);
      },
      afterLeave() {
        killContact();
        gsap.set(["header, footer"], { opacity: 1, pointerEvents: "auto" });
        gsap.set(".header-background", { y: "-100%" });
      },
    },
    {
      namespace: "product-categories",
      async beforeEnter(data) {
        document.body.classList.remove("is-home");
        document.body.classList.add("is-product");
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        document.body.style.touchAction = "none";
        gsap.set("header", { opacity: 0, pointerEvents: "none" });
        gsap.set("footer", { opacity: 0, pointerEvents: "none" });

        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get("category");

        if (currentCategory) {
          const nextDom = data.next.container;

          const query = `*[_type == "product" && category == "${currentCategory}"]{
            name,
            "slug": slug.current,
            mainImage
          }`;

          const categoryProducts = await client.fetch(query);

          const titleEl = nextDom.querySelector(".products-category-title");
          if (titleEl) {
            titleEl.textContent = currentCategory
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());
          }

          const cards = nextDom.querySelectorAll(".product-card");

          categoryProducts.forEach((product, index) => {
            if (cards[index]) {
              cards[index].innerHTML = `
                <a href="product-page.html?slug=${product.slug}" style="display:block; width:100%; height:100%; text-decoration:none;">
                  <img src="${urlFor(product.mainImage).url()}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
                  <h3 style="color: #ebe3e3; margin-top: 1rem; font-family: 'Bodoni Moda', serif; font-size: 1.5rem; font-weight: 400;">${product.name}</h3>
                </a>
              `;
            }
          });
        }
      },
      afterEnter(data) {
        initProductsCategory(data.next.container);
      },
      afterLeave() {
        killProductsCategory();
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
          smoother.scrollTo(smoother.scrollTop(), false);
          smoother.paused(true);
        }

        resetHeaderState();

        let tl = gsap.timeline({ onComplete: done });

        tl.fromTo(
          ".transition",
          { y: "100%" },
          { y: "0%", duration: 0.8, ease: "power3.inOut" },
        );
      },
      enter(data) {
        if (smoother) {
          smoother.kill();
          smoother = null;
        }

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
      },
    },
  ],
});
