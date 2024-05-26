function sidebarAccordion(title: string, html: string) {
  const id = Math.random().toString(36).substring(2, 15);
  return `<div class="accordion">
  <input class="toggle" id="${id}" type="checkbox" />
  <label class="title" for="${id}">
    <p>${title}</p>
  </label>
  <div class="content">
    <div class="min-h-0">
      ${html}
    </div>
  </div>
</div>`;
}

export default { sidebarAccordion };
