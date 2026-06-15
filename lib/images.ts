// Centralized stock imagery for the scaffold so any photo is trivial to swap.
// These are Unsplash photos used as placeholders — replace with Matt's own
// garden/home/process photography before launch (per build-spec: never stocky).
function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const IMAGES = {
  hero: unsplash("1416879595882-3373a0480b5b", 2000), // raised garden beds
  pillarBuilding: unsplash("1581094794329-c8112a89af12", 1000), // workbench / making
  pillarTending: unsplash("1466692476868-aef1dfb1e735", 1000), // green growth
  pillarEnjoying: unsplash("1490750967868-88aa4486c946", 1000), // quiet light / morning
  garden: unsplash("1523348837708-15d4a09cfac2", 1600), // vegetables / harvest
  about: unsplash("1492496913980-501348b61469", 1200), // person, natural light
  writingBuilding: unsplash("1497215728101-856f4ea42174", 900), // desk / systems
  writingTending: unsplash("1592419044706-39796d40f98c", 900), // family / space
  writingEnjoying: unsplash("1500382017468-9049fed747ef", 900), // field / morning
};
