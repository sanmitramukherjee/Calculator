const contentArea = document.getElementById("content-area");

window.switchMode = async function (mode) {
  contentArea.innerHTML = `<p>Loading ${mode}...</p>`;
  try {
    const module = await import(`./modules/${mode}.js`);
    contentArea.innerHTML = "";
    module.render(contentArea);
  } catch (err) {
    contentArea.innerHTML = `<p style="color:red;">Error loading module: ${err}</p>`;
  }
};
