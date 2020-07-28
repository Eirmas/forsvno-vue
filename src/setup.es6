import Vue from "vue";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const setupVue = (className, root) => {
  const runWhenReady = () => {
    const mountTargets = Array.prototype.slice.call(document.querySelectorAll(className));
    for (let i = 0; i < mountTargets.length; i++) {
      const mountTarget = mountTargets[i];
      const { id } = mountTarget;
      const partConfig = window.__INITIAL__DATA__[id];
      new Vue({
        render: (h) => h(root, { props: partConfig })
      }).$mount(mountTarget);
    }
  };
  if (document.readyState !== "loading") {
    runWhenReady();
  } else {
    document.addEventListener("DOMContentLoaded", runWhenReady);
  }
};
export default setupVue;
