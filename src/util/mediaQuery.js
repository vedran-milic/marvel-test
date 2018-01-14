export const checkMediaQuery = (width) => {
  if(window.matchMedia) {
    return window.matchMedia("(min-width: "+width+"px)").matches;
  } else {
    let windowWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    return windowWidth >= width;
  }
};
