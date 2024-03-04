// Initializes Lenis and sets up scroll event listeners
const lenisJs = () => {
  const lenis = new Lenis();
  // Event listener for scroll events, no action defined yet
  lenis.on("scroll", (e) => {});

  // Updates ScrollTrigger on scroll events
  lenis.on("scroll", ScrollTrigger.update);

  // Adds a function to the GSAP ticker that updates Lenis on each animation frame
  gsap.ticker.add((time) => {
    lenis.raf(time * 800);
  });

  // Disables lag smoothing for GSAP animations
  gsap.ticker.lagSmoothing(0);
};
lenisJs();

// Function to animate text content by splitting it into individual letters
const clutterAnimation = (element) => {
  const htmlTag = document.querySelector(element);
  let clutter = "";

  // Wraps each letter in a span with a class for animation
  htmlTag.textContent.split("").forEach((word) => {
    clutter += `<span>${word}</span>`;
  });

  // Replaces the element's content with the animated spans
  htmlTag.innerHTML = clutter;
};

// Function to animate navigation elements on mouse enter
const navAnimation = () => {
  // Selects the first navigation element
  const navElem1 = document.querySelector(".nav-elem1");

  // Applies clutter animation to the text content of the first navigation element
  clutterAnimation(".nav-elem1>h3");
  clutterAnimation(".nav-elem1>a");

  // Adds mouse enter event listener to animate the first navigation element
  navElem1.addEventListener("mouseenter", () => {
    // Animates the opacity of the link
    gsap.to(".nav-elem1>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    // Animates the position and opacity of the text spans
    gsap.to(".nav-elem1>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        // Resets the position and opacity of the text spans
        tl.to(".nav-elem1>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        // Animates the opacity back to 1
        tl.to(".nav-elem1>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        // Animates the opacity of the link back to 0
        tl.to(".nav-elem1>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });

  // Selects the second navigation element
  const navElem2 = document.querySelector(".nav-elem2");

  // Applies clutter animation to the text content of the second navigation element
  clutterAnimation(".nav-elem2>h3");
  clutterAnimation(".nav-elem2>a");

  // Adds mouse enter event listener to animate the second navigation element
  navElem2.addEventListener("mouseenter", () => {
    // Animates the opacity of the link
    gsap.to(".nav-elem2>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    // Animates the position and opacity of the text spans
    gsap.to(".nav-elem2>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        // Resets the position and opacity of the text spans
        const tl = gsap.timeline();
        tl.to(".nav-elem2>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        // Animates the opacity back to 1
        tl.to(".nav-elem2>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        // Animates the opacity of the link back to 0
        tl.to(".nav-elem2>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });
};

// Calling the navAnimation function
navAnimation();

// Function to animate a menu on click
const menuAnimation = () => {
  // Selects the menu element
  const menu = document.querySelector(".nav-elem1");

  // Adds a click event listener to the menu
  menu.addEventListener("click", () => {
    const tl = gsap.timeline();
    // Animates the menu's opacity and pointer events
    tl.to(".nav-menu", {
      opacity: 1,
      pointerEvents: "all",
    });

    // Animates the text rotation and scaling
    tl.to(".anime-text", {
      delay: -0.3,
      rotate: "-90deg",
      duration: 1,
      scale: 3,
    });

    // Animates the movement of h1 elements within .anime-text
    tl.to(
      ".anime-text>h1",
      {
        x: "1500",
        stagger: {
          amount: 1,
          from: "center",
        },
      },
      "a"
    );

    // Moves .anime-text to the top
    tl.to(
      ".anime-text",
      {
        top: "-100%",
      },
      "a"
    );

    // Animates the scale, opacity, and y position of elements within .nav-menu-top
    tl.to(
      ".nav-menu-top>div",
      {
        scale: 1,
        opacity: 1,
        y: 50,
      },
      "b"
    );

    // Animates the scale, opacity, and y position of .nav-menu-bottom links
    tl.to(
      ".nav-menu-bottom a",
      {
        scale: 1,
        opacity: 1,
        y: 50,
      },
      "b"
    );
  });

  // Selects the menu close button
  const menuClose = document.querySelector(".menu-close");

  // Adds a click event listener to the menu close button
  menuClose.addEventListener("click", () => {
    const tl = gsap.timeline();
    // Reverses the animations for .nav-menu-top and .nav-menu-bottom elements
    tl.to(
      ".nav-menu-top>div",
      {
        scale: 0.6,
        opacity: 0,
        y: 0,
      },
      "a"
    );

    tl.to(
      ".nav-menu-bottom a",
      {
        scale: 0.6,
        opacity: 0,
        y: 0,
      },
      "a"
    );

    // Moves .anime-text back to its original position
    tl.to(
      ".anime-text",
      {
        top: "-100%",
      },
      "a"
    );

    // Reverses the movement of h1 elements within .anime-text
    tl.to(
      ".anime-text>h1",
      {
        x: "0",
        stagger: {
          amount: 1,
          from: "center",
        },
      },
      "a"
    );

    // Resets the rotation and scaling of .anime-text
    tl.to(".anime-text", {
      delay: -0.3,
      rotate: "0deg",
      duration: 1,
      scale: 1.2,
    });

    // Hides the menu by setting its opacity to 0 and disabling pointer events
    tl.to(".nav-menu", {
      opacity: 0,
      pointerEvents: "none",
    });
  });
};

// Calls the menuAnimation function to initialize the menu animations
menuAnimation();

const page2Animation = () => {
  clutterAnimation(".page2-title > h1");
  gsap.from(".page2-title > h1>span", {
    y: 200,
    opacity: 0,
    // rotate: 180,
    stagger: {
      amount: 2,
      from: "random",
    },
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2-title>h1",
      start: "top 60%",
      end: "top 10%",
      scrub: 1,
      // markers: true,
    },
  });

  const page2PartsTl = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2",
      start: "top 0%",
      end: "top -1200%",
      pin: true,
      scrub: 1,
      // markers: true,
    },
  });

  gsap.from(".page2-right,.page2-rotation", {
    opacity: 0,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page2",
      start: "top 0%",
      end: "top -100%",
      scrub: 1,
      // markers: true,
    },
  });

  page2PartsTl.to(
    ".parts-counter",
    {
      onUpdate: () => {
        document.querySelector(".parts-counter").textContent = "01";
        const allNavigation = document.querySelectorAll(
          ".page2-navigation-circle"
        );
        allNavigation.forEach((item, index) => {
          if (index === 0) {
            gsap.to(item, {
              backgroundColor: "#000",
            });
          } else {
            gsap.to(item, {
              backgroundColor: "#fff",
            });
          }
        });
      },
    },
    "same"
  );

  // page2PartsTl.to(
  //   ".page2-title > h1 ",
  //   {
  //     color: "transparent",
  //   },
  //   "same"
  // );

  page2PartsTl.to(
    ".page2",
    {
      backgroundColor: "#DB4D1A",
    },
    "same"
  );

  page2PartsTl.to(
    ".page2-part1",
    {
      top: "-100%",
    },
    "same"
  );

  page2PartsTl.to(
    ".part1-text",
    {
      left: "-100%",
    },
    "same"
  );

  page2PartsTl.to(
    ".parts-counter",
    {
      onUpdate: () => {
        document.querySelector(".parts-counter").textContent = "02";
        const allNavigation = document.querySelectorAll(
          ".page2-navigation-circle"
        );
        allNavigation.forEach((item, index) => {
          if (index === 1) {
            gsap.to(item, {
              backgroundColor: "#000",
            });
          } else {
            gsap.to(item, {
              backgroundColor: "#fff",
            });
          }
        });
      },
    },
    "same1"
  );

  page2PartsTl.to(
    ".page2",
    {
      backgroundColor: "#B3B3B3",
    },
    "same1"
  );

  page2PartsTl.to(
    ".page2-part2",
    {
      top: "-100%",
    },
    "same1"
  );

  page2PartsTl.to(
    ".part2-text",
    {
      left: "-100%",
    },
    "same1"
  );

  page2PartsTl.to(
    ".parts-counter",
    {
      onUpdate: () => {
        document.querySelector(".parts-counter").textContent = "03";
        const allNavigation = document.querySelectorAll(
          ".page2-navigation-circle"
        );
        allNavigation.forEach((item, index) => {
          if (index === 2) {
            gsap.to(item, {
              backgroundColor: "#000",
            });
          } else {
            gsap.to(item, {
              backgroundColor: "#fff",
            });
          }
        });
      },
    },
    "same2"
  );

  page2PartsTl.to(
    ".page2",
    {
      backgroundColor: "#3E8DCE",
    },
    "same2"
  );

  page2PartsTl.to(
    ".page2-part3",
    {
      top: "-100%",
    },
    "same2"
  );

  page2PartsTl.to(
    ".part3-text",
    {
      left: "-100%",
    },
    "same2"
  );

  page2PartsTl.to(
    ".parts-counter",
    {
      onUpdate: () => {
        document.querySelector(".parts-counter").textContent = "04";
        const allNavigation = document.querySelectorAll(
          ".page2-navigation-circle"
        );
        allNavigation.forEach((item, index) => {
          if (index === 3) {
            gsap.to(item, {
              backgroundColor: "#000",
            });
          } else {
            gsap.to(item, {
              backgroundColor: "#fff",
            });
          }
        });
      },
    },
    "same3"
  );

  page2PartsTl.to(
    ".page2",
    {
      backgroundColor: "#A031FF",
    },
    "same3"
  );

  page2PartsTl.to(
    ".page2-part4",
    {
      top: "-100%",
    },
    "same3"
  );

  page2PartsTl.to(
    ".part4-text",
    {
      left: "-100%",
    },
    "same3"
  );

  page2PartsTl.to(
    ".parts-counter",
    {
      onUpdate: () => {
        document.querySelector(".parts-counter").textContent = "05";
        const allNavigation = document.querySelectorAll(
          ".page2-navigation-circle"
        );
        allNavigation.forEach((item, index) => {
          if (index === 4) {
            gsap.to(item, {
              backgroundColor: "#000",
            });
          } else {
            gsap.to(item, {
              backgroundColor: "#fff",
            });
          }
        });
      },
    },
    "same4"
  );

  page2PartsTl.to(
    ".page2",
    {
      backgroundColor: "#3B7977",
    },
    "same4"
  );

  page2PartsTl.to(
    ".page2-part5",
    {
      top: "-100%",
    },
    "same4"
  );

  page2PartsTl.to(
    ".part5-text",
    {
      left: "-100%",
    },
    "same4"
  );

  page2PartsTl.to(
    ".parts-counter",
    {
      onUpdate: () => {
        document.querySelector(".parts-counter").textContent = "06";
        const allNavigation = document.querySelectorAll(
          ".page2-navigation-circle"
        );
        allNavigation.forEach((item, index) => {
          if (index === 5) {
            gsap.to(item, {
              backgroundColor: "#000",
            });
          } else {
            gsap.to(item, {
              backgroundColor: "#fff",
            });
          }
        });
      },
    },
    "same5"
  );

  page2PartsTl.to(
    ".page2",
    {
      backgroundColor: "#1477FB",
    },
    "same5"
  );

  page2PartsTl.to(
    ".page2-part6",
    {
      top: "-100%",
    },
    "same5"
  );

  page2PartsTl.to(
    ".part6-text",
    {
      left: "-100%",
    },
    "same5"
  );

  page2PartsTl.to(
    ".parts-counter",
    {
      onUpdate: () => {
        document.querySelector(".parts-counter").textContent = "07";
        const allNavigation = document.querySelectorAll(
          ".page2-navigation-circle"
        );
        allNavigation.forEach((item, index) => {
          if (index === 6) {
            gsap.to(item, {
              backgroundColor: "#000",
            });
          } else {
            gsap.to(item, {
              backgroundColor: "#fff",
            });
          }
        });
      },
    },
    "same6"
  );

  page2PartsTl.to(
    ".page2",
    {
      backgroundColor: "#AE928D",
    },
    "same6"
  );

  page2PartsTl.to(
    ".page2-part7",
    {
      top: "-100%",
    },
    "same6"
  );

  page2PartsTl.to(
    ".part7-text",
    {
      left: "-100%",
    },
    "same6"
  );
  page2PartsTl.to(".page2", {
    backgroundColor: "#EBE4DF",
  });
};
page2Animation();

clutterAnimation(".page5-title-box > h1");
function page5Animation() {
  gsap.to(".main", {
    backgroundColor: "#000",
    scrollTrigger: {
      scroller: "body",
      trigger: ".page5",
      start: "top 30%",
      end: "top 0%",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.from(".page5-title-box > h1>span", {
    x: 200,
    opacity: 0,
    // rotate: 180,
    scale: 0.5,
    stagger: {
      amount: 2,
    },
    scrollTrigger: {
      scroller: "body",
      trigger: ".page5-title-box",
      start: "top 20%",
      end: "top 0%",
      scrub: 1,
      // markers: true,
    },
  });

  const page5AllSvg = document.querySelectorAll(".page5-all-svg");
  const page5AllTitles = document.querySelectorAll(".page5-all-titles");

  let flag = 0;
  page5AllSvg.forEach((svg, index) => {
    svg.addEventListener("click", () => {
      if (flag === 0) {
        gsap.to(svg, {
          rotate: "45deg",
        });
        for (let i = 0; i < page5AllTitles.length; i++) {
          if (i === index) {
            if (index === 3 || index === 7) {
              gsap.to(page5AllTitles[i], {
                height: "34vw",
              });
            } else if (index === 5) {
              gsap.to(page5AllTitles[i], {
                height: "28vw",
              });
            } else {
              gsap.to(page5AllTitles[i], {
                height: "22vw",
              });
            }
          } else {
            gsap.to(page5AllTitles[i], {
              height: "6vw",
            });
            gsap.to(page5AllSvg[i], {
              rotate: "0deg",
            });
          }
        }
        flag = 1;
      } else {
        gsap.to(svg, {
          rotate: "0deg",
        });

        gsap.to(page5AllTitles[index], {
          height: "6vw",
        });

        flag = 0;
      }
    });
  });
}

page5Animation();

function page6Animation() {
  clutterAnimation(".page6-title-box > h1");

  gsap.from(".page6-title-box > h1>span", {
    y: -200,
    opacity: 0,
    // rotate: 180,
    scale: 0.5,
    stagger: {
      amount: 2,
    },
    scrollTrigger: {
      scroller: "body",
      trigger: ".page6-title-box",
      start: "top 50%",
      end: "top 30%",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.from(".strip1", {
    top: "-200%",
    scrollTrigger: {
      scroller: "body",
      trigger: ".page6",
      start: "top 60%",
      end: "top -100%",
      // markers: true,
      scrub: 1,
    },
  });

  gsap.from(".strip2", {
    top: "100%",
    scrollTrigger: {
      scroller: "body",
      trigger: ".page6",
      start: "top 60%",
      end: "top -100%",
      // markers: true,
      scrub: 1,
    },
  });
}
page6Animation();

function page7Animation() {
  clutterAnimation(".page7-title-box > h1");

  gsap.from(".page7-title-box > h1>span", {
    y: -200,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page7-title-box",
      start: "top 50%",
      end: "top 30%",
      scrub: 1,
      // markers: true,
    },
  });

  clutterAnimation(".page7>p:nth-child(2)");
  clutterAnimation(".page7>p:nth-child(3)");

  gsap.from(".page7>p:nth-child(2)>span", {
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page7>p:nth-child(2)",
      start: "top 70%",
      end: "top 40%",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.from(".page7>p:nth-child(3)>span", {
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page7>p:nth-child(3)",
      start: "top 80%",
      end: "top 40%",
      scrub: 1,
      // markers: true,
    },
  });
}
page7Animation();

function page8Animation() {
  clutterAnimation(".page8-title-box > h1");

  gsap.from(".page8-title-box > h1>span", {
    y: -200,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page8-title-box",
      start: "top 50%",
      end: "top 30%",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.from(".page8-elem > h1,.page8 a", {
    y: 100,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page8-elem",
      start: "top 70%",
      end: "top 40%",
      scrub: 1,
      // markers: true,
    },
  });
}

page8Animation();

function page9Animation() {
  const footerElem1 = document.querySelector(".footer-elem1");

  clutterAnimation(".footer-elem1>h3");
  clutterAnimation(".footer-elem1>a");
  footerElem1.addEventListener("mouseenter", () => {
    gsap.to(".footer-elem1>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    gsap.to(".footer-elem1>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        tl.to(".footer-elem1>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        tl.to(".footer-elem1>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        tl.to(".footer-elem1>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });

  const footerElem2 = document.querySelector(".footer-elem2");

  clutterAnimation(".footer-elem2>h3");
  clutterAnimation(".footer-elem2>a");
  footerElem2.addEventListener("mouseenter", () => {
    gsap.to(".footer-elem2>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    gsap.to(".footer-elem2>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        tl.to(".footer-elem2>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        tl.to(".footer-elem2>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        tl.to(".footer-elem2>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });

  const footerElem3 = document.querySelector(".footer-elem3");

  clutterAnimation(".footer-elem3>h3");
  clutterAnimation(".footer-elem3>a");
  footerElem3.addEventListener("mouseenter", () => {
    gsap.to(".footer-elem3>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    gsap.to(".footer-elem3>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        tl.to(".footer-elem3>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        tl.to(".footer-elem3>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        tl.to(".footer-elem3>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });

  const footerElem4 = document.querySelector(".footer-elem4");

  clutterAnimation(".footer-elem4>h3");
  clutterAnimation(".footer-elem4>a");
  footerElem4.addEventListener("mouseenter", () => {
    gsap.to(".footer-elem4>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    gsap.to(".footer-elem4>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        tl.to(".footer-elem4>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        tl.to(".footer-elem4>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        tl.to(".footer-elem4>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });

  const footerElem5 = document.querySelector(".footer-elem5");

  clutterAnimation(".footer-elem5>h3");
  clutterAnimation(".footer-elem5>a");
  footerElem5.addEventListener("mouseenter", () => {
    gsap.to(".footer-elem5>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    gsap.to(".footer-elem5>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        tl.to(".footer-elem5>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        tl.to(".footer-elem5>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        tl.to(".footer-elem5>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });

  const footerElem6 = document.querySelector(".footer-elem6");

  clutterAnimation(".footer-elem6>h3");
  clutterAnimation(".footer-elem6>a");
  footerElem6.addEventListener("mouseenter", () => {
    gsap.to(".footer-elem6>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    gsap.to(".footer-elem6>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        tl.to(".footer-elem6>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        tl.to(".footer-elem6>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        tl.to(".footer-elem6>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });

  const footerElem7 = document.querySelector(".footer-elem7");

  clutterAnimation(".footer-elem7>h3");
  clutterAnimation(".footer-elem7>a");
  footerElem7.addEventListener("mouseenter", () => {
    gsap.to(".footer-elem7>a", {
      opacity: 1,
      duration: 1.5,
      delay: 0.6,
    });

    gsap.to(".footer-elem7>h3>span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "random",
      },
      onComplete: () => {
        const tl = gsap.timeline();
        tl.to(".footer-elem7>h3>span", {
          y: 0,
          opacity: 0,
          duration: 0.1,
        });
        tl.to(".footer-elem7>h3>span", {
          opacity: 1,
          duration: 0.3,
        });
        tl.to(".footer-elem7>a", {
          duration: 0.3,
          opacity: 0,
        });
      },
    });
  });
}

page9Animation();

//  ##############################################################
// ################ Three js CODE STARTS HERE ####################
// ###############################################################

import * as THREE from "three";

// create a cube scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 20;

const canvas = document.getElementById("cube");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // alpha: true,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.LinearFilter;
renderer.toneMappingExposure = 0.8;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

// add a cube
const cubeScale = 1;
const geometry = new THREE.BoxGeometry(
  16 * cubeScale,
  9 * cubeScale,
  16 * cubeScale
);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material = [
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("cube/4.png"),
  }), // Right
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("cube/2.png"),
  }), // Left
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    // map: new THREE.TextureLoader().load("cube/2.png"),
  }), // Top
  new THREE.MeshBasicMaterial({
    // map: new THREE.TextureLoader().load("cube/2.png"),
    color: 0xffffff,
  }), // Bottom
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("cube/1.png"),
  }), // Front
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("cube/3.png"),
  }), // Back
];
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.set(0, 0, 0);

const handleResize = () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Update renderer size and camera aspect ratio
  renderer.setSize(newWidth, newHeight);
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
};

const winCount = 3;
const cubeAnimationTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page4",
    scroller: "body",
    start: "top 0%",
    end: `top -600%`,
    scrub: true,
    pin: true,
    // markers: true,
    // anticipatePin: 1,
  },
});

cubeAnimationTimeline
  .fromTo(
    cube.scale,
    {
      x: 0,
      y: 0,
      z: 0,
    },
    {
      x: 1,
      y: 1,
      z: 1,
      duration: 5,
    }
  )
  .to(cube.rotation, {
    y: Math.PI * 2,
    duration: 15,
  })
  .to(cube.rotation, {
    x: -Math.PI / 2,
    duration: 15,
  })
  .to(cube.scale, {
    x: 3,
    y: 3,
    z: 3,
    duration: 25,
  });

// Corrected event listener for window resize
window.addEventListener("resize", handleResize);

const animate = () => {
  requestAnimationFrame(animate);

  // cube.rotation.y += 0.01;
  // cube.rotation.x += 0.01;

  renderer.render(scene, camera);
};

animate();
