import type { App, DefineComponent } from "vue";

function getComponentNameFromPath(path: string): string {
  const fileName = path.split("/").pop() || "";
  return fileName.replace(/\.\w+$/, "");
}

// Registers /components/content/* globally for use in markdown files
export async function registerComponents(app: App) {
  const modules = {
    ...import.meta.glob("/src/components/wrapper/MarkdownWrapper.vue"),
    ...import.meta.glob("/src/components/content/*.vue"),
  };
  for (const [path, loader] of Object.entries(modules)) {
    const mod = (await loader()) as { default: DefineComponent };
    const comp = mod.default;
    const name = comp.name ?? getComponentNameFromPath(path);
    app.component(name, comp);
  }
}
