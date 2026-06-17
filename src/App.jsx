import { useState, useEffect } from "react";

// TODO: Integrar con API real de MyRealFood o propia API de recetas
// TODO: Implementar autenticación real de usuarios (Firebase/Supabase)
// TODO: Integrar escáner de código de barras (QuaggaJS o similar)
// TODO: Conectar planes nutricionales con backend real

const COLORS = {
  primary: "#4CAF50",
  primaryDark: "#388E3C",
  primaryLight: "#A5D6A7",
  secondary: "#FF7043",
  background: "#F8FBF8",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F8F1",
  text: "#1B2A1B",
  textSecondary: "#5A7A5A",
  textLight: "#8FAF8F",
  border: "#DCE8DC",
  accent: "#FFC107",
  danger: "#E53935",
  white: "#FFFFFF",
  cardShadow: "0 2px 12px rgba(76,175,80,0.10)",
};

const recipes = [
  {
    id: 1,
    name: "Bowl de Quinoa con Verduras",
    time: "25 min",
    kcal: 380,
    difficulty: "Fácil",
    category: "Almuerzo",
    emoji: "🥗",
    tags: ["Sin gluten", "Vegano"],
    ingredients: ["Quinoa", "Espinacas", "Tomate cherry", "Aguacate", "Limón", "AOVE"],
    steps: [
      "Cocina la quinoa según instrucciones del paquete.",
      "Lava y prepara todas las verduras.",
      "Monta el bowl con la quinoa como base.",
      "Añade las verduras y el aguacate.",
      "Aliña con limón y aceite de oliva."
    ],
    macros: { proteinas: 14, carbos: 48, grasas: 16, fibra: 8 },
    rating: 4.8,
    reviews: 1240,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    id: 2,
    name: "Salmón al Horno con Limón",
    time: "20 min",
    kcal: 290,
    difficulty: "Fácil",
    category: "Cena",
    emoji: "🐟",
    tags: ["Sin gluten", "Alto en proteína"],
    ingredients: ["Salmón", "Limón", "Ajo", "Romero", "AOVE", "Sal"],
    steps: [
      "Precalienta el horno a 200°C.",
      "Marina el salmón con limón, ajo y romero.",
      "Hornea 15-18 minutos.",
      "Sirve con verduras al vapor."
    ],
    macros: { proteinas: 32, carbos: 2, grasas: 18, fibra: 0 },
    rating: 4.9,
    reviews: 2100,
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
  },
  {
    id: 3,
    name: "Porridge de Avena con Frutos Rojos",
    time: "10 min",
    kcal: 310,
    difficulty: "Muy fácil",
    category: "Desayuno",
    emoji: "🫐",
    tags: ["Vegano", "Sin azúcar añadido"],
    ingredients: ["Avena", "Leche vegetal", "Frutos rojos", "Chía", "Canela"],
    steps: [
      "Calienta la leche vegetal.",
      "Añade la avena y cocina 5 minutos.",
      "Agrega la chía y canela.",
      "Decora con frutos rojos frescos."
    ],
    macros: { proteinas: 10, carbos: 52, grasas: 7, fibra: 9 },
    rating: 4.7,
    reviews: 3450,
    img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80",
  },
  {
    id: 4,
    name: "Pollo Teriyaki con Arroz Integral",
    time: "35 min",
    kcal: 450,
    difficulty: "Media",
    category: "Almuerzo",
    emoji: "🍗",
    tags: ["Alto en proteína"],
    ingredients: ["Pechuga de pollo", "Arroz integral", "Salsa tamari", "Jengibre", "Ajo", "Sésamo"],
    steps: [
      "Cocina el arroz integral.",
      "Marina el pollo con tamari, jengibre y ajo.",
      "Saltea el pollo hasta dorar.",
      "Sirve sobre el arroz con sésamo."
    ],
    macros: { proteinas: 42, carbos: 45, grasas: 8, fibra: 3 },
    rating: 4.6,
    reviews: 1870,
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
  },
  {
    id: 5,
    name: "Tortilla de Espinacas y Queso",
    time: "15 min",
    kcal: 260,
    difficulty: "Fácil",
    category: "Cena",
    emoji: "🥚",
    tags: ["Sin gluten", "Vegetariano"],
    ingredients: ["Huevos", "Espinacas", "Queso feta", "Cebolla", "AOVE"],
    steps: [
      "Saltea la cebolla y espinacas.",
      "Bate los huevos con sal.",
      "Mezcla todo y cuaja en sartén.",
      "Añade el queso feta al final."
    ],
    macros: { proteinas: 22, carbos: 4, grasas: 18, fibra: 2 },
    rating: 4.5,
    reviews: 980,
    img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80",
  },
  {
    id: 6,
    name: "Ensalada Mediterránea",
    time: "10 min",
    kcal: 220,
    difficulty: "Muy fácil",
    category: "Almuerzo",
    emoji: "🥙",
    tags: ["Vegano", "Sin gluten", "Crudo"],
    ingredients: ["Tomate", "Pepino", "Aceitunas", "Cebolla morada", "AOVE", "Orégano"],
    steps: [
      "Corta todas las verduras.",
      "Mezcla en un bol.",
      "Aliña con aceite y orégano.",
      "Sirve frío."
    ],
    macros: { proteinas: 4, carbos: 18, grasas: 14, fibra: 5 },
    rating: 4.7,
    reviews: 1560,
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
  },
];

const weekPlan = {
  Lunes: {
    desayuno: { name: "Porridge de Avena", kcal: 310, emoji: "🫐" },
    almuerzo: { name: "Bowl de Quinoa", kcal: 380, emoji: "🥗" },
    cena: { name: "Salmón al Horno", kcal: 290, emoji: "🐟" },
    snack: { name: "Manzana + Almendras", kcal: 180, emoji: "🍎" },
  },
  Martes: {
    desayuno: { name: "Tostadas de Aguacate", kcal: 280, emoji: "🥑" },
    almuerzo: { name: "Pollo Teriyaki", kcal: 450, emoji: "🍗" },
    cena: { name: "Ensalada Mediterránea", kcal: 220, emoji: "🥙" },
    snack: { name: "Yogur con Frutos Rojos", kcal: 150, emoji: "🍓" },
  },
  Miércoles: {
    desayuno: { name: "Huevos Revueltos", kcal: 240, emoji: "🍳" },
    almuerzo: { name: "Lentejas con Verduras", kcal: 420, emoji: "🫘" },
    cena: { name: "Tortilla de Espinacas", kcal: 260, emoji: "🥚" },
    snack: { name: "Plátano + Nueces", kcal: 200, emoji: "🍌" },
  },
  Jueves: {
    desayuno: { name: "Porridge de Avena", kcal: 310, emoji: "🫐" },
    almuerzo: { name: "Ensalada Mediterránea", kcal: 220, emoji: "🥙" },
    cena: { name: "Pollo Teriyaki", kcal: 450, emoji: "🍗" },
    snack: { name: "Manzana + Almendras", kcal: 180, emoji: "🍎" },
  },
  Viernes: {
    desayuno: { name: "Tostadas de Aguacate", kcal: 280, emoji: "🥑" },
    almuerzo: { name: "Bowl de Quinoa", kcal: 380, emoji: "🥗" },
    cena: { name: "Salmón al Horno", kcal: 290, emoji: "🐟" },
    snack: { name: "Yogur con Frutos Rojos", kcal: 150, emoji: "🍓" },
  },
  Sábado: {
    desayuno: { name: "Pancakes de Avena", kcal: 350, emoji: "🥞" },
    almuerzo: { name: "Pasta Integral con Verduras", kcal: 490, emoji: "🍝" },
    cena: { name: "Pizza de Coliflor", kcal: 320, emoji: "🍕" },
    snack: { name: "Frutas de Temporada", kcal: 120, emoji: "🍇" },
  },
  Domingo: {
    desayuno: { name: "Smoothie Bowl", kcal: 290, emoji: "🥤" },
    almuerzo: { name: "Paella de Verduras", kcal: 430, emoji: "🍲" },
    cena: { name: "Crema de Calabaza", kcal: 190, emoji: "🎃" },
    snack: { name: "Palitos de Zanahoria", kcal: 80, emoji: "🥕" },
  },
};

const products = [
  { id: 1, name: "Avena Orgánica", brand: "NaturAliment", score: 95, emoji: "🌾", category: "Buenos", kcal: 389, nutriscore: "A" },
  { id: 2, name: "Yogur Natural Sin Azúcar", brand: "Danone", score: 88, emoji: "🥛", category: "Buenos", kcal: 61, nutriscore: "A" },
  { id: 3, name: "Bollería Industrial", brand: "Bimbo", score: 12, emoji: "🍩", category: "Malos", kcal: 412, nutriscore: "E" },
  { id: 4, name: "Refresco Cola", brand: "CocaCola", score: 5, emoji: "🥤", category: "Malos", kcal: 180, nutriscore: "E" },
  { id: 5, name: "Almendras Naturales", brand: "Borges", score: 92, emoji: "🥜", category: "Buenos", kcal: 575, nutriscore: "A" },
  { id: 6, name: "Pechuga de Pavo", brand: "Campofrío", score: 45, emoji: "🦃", category: "Mediocres", kcal: 98, nutriscore: "C" },
];

const categories = [
  { id: "all", label: "Todas", emoji: "🍽️" },
  { id: "Desayuno", label: "Desayuno", emoji: "🌅" },
  { id: "Almuerzo", label: "Almuerzo", emoji: "☀️" },
  { id: "Cena", label: "Cena", emoji: "🌙" },
];

const achievements = [
  { emoji: "🔥", label: "7 días seguidos", done: true },
  { emoji: "🥗", label: "10 recetas cocinadas", done: true },
  { emoji: "💧", label: "Hidratación perfecta", done: false },
  { emoji: "🏆", label: "Mes saludable", done: false },
];

const navItems = [
  { id: "home", label: "Inicio", icon: "🏠" },
  { id: "recipes", label: "Recetas", icon: "🍽️" },
  { id: "scanner", label: "Escáner", icon: "📷" },
  { id: "plan", label: "Mi Plan", icon: "📅" },
  { id: "profile", label: "Perfil", icon: "👤" },
];

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const mealTypes = ["desayuno", "almuerzo", "cena", "snack"];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [favorites, setFavorites] = useState([1, 3]);
  const [scanMode, setScanMode] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [animateIn, setAnimateIn] = useState(true);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [waterCount, setWaterCount] = useState(5);
  const [showScanResult, setShowScanResult] = useState(false);

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, [activeTab]);

  const filteredRecipes = recipes.filter((r) => {
    const matchCat = selectedCategory === "all" || r.category === selectedCategory;
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleScan = () => {
    // TODO: Integrar escáner real de código de barras (QuaggaJS / ZXing)
    setScanMode(true);
    setTimeout(() => {
      setScanMode(false);
      setScannedProduct(products[Math.floor(Math.random() * products.length)]);
      setShowScanResult(true);
    }, 2000);
  };

  const totalKcalDay = Object.values(weekPlan[selectedDay]).reduce((acc, m) => acc + m.kcal, 0);

  const scoreColor = (score) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 50) return "#FFC107";
    return "#E53935";
  };

  const nutriscoreColor = (ns) => {
    const map = { A: "#2E7D32", B: "#66BB6A", C: "#FFC107", D: "#FF7043", E: "#E53935" };
    return map[ns] || "#888";
  };

  // ===== SCREENS =====

  const HomeScreen = () => (
    <div style={{ padding: "0 0 24px 0" }}>
      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #388E3C 0%, #4CAF50 60%, #81C784 100%)",
        padding: "36px 20px 48px 20px",
        borderRadius: "0 0 32px 32px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)"
        }} />
        <div style={{
          position: "absolute", bottom: -50, left: -20,
          width: 120, height: 120, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)"
        }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: 0 }}>¡Buenos días! 👋</p>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "4px 0 0 0" }}>
              {/* TODO: Mostrar nombre real del usuario autenticado */}
              Tu camino saludable
            </h2>
          </div>
          <div style={{
            width: 46, height: 46, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, cursor: "pointer"
          }}>
            🥦
          </div>
        </div>
        {/* Progress */}
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "14px 16px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Objetivo diario</span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>1.480 / 1.800 kcal</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, height: 8 }}>
            <div style={{
              width: "82%", height: "100%", borderRadius: 8,
              background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
              transition: "width 1s ease"
            }} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: "6px 0 0 0" }}>
            320 kcal restantes para hoy
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 12, padding: "20px 16px 0 16px", overflowX: "auto" }}>
        {[
          { icon: "🔥", label: "Racha", value: "7 días" },
          { icon: "💧", label: "Agua", value: `${waterCount}/8` },
          { icon: "🥗", label: "Recetas", value: "12 cocinadas" },
          { icon: "⭐", label: "Puntos", value: "840 pts" },
        ].map((stat, i) => (
          <div key={i} style={{
            minWidth: 90, background: COLORS.surface, borderRadius: 16,
            padding: "12px 10px", textAlign: "center",
            boxShadow: COLORS.cardShadow, flexShrink: 0,
            border: `1px solid ${COLORS.border}`,
            cursor: stat.label === "Agua" ? "pointer" : "default"
          }}
            onClick={() => stat.label === "Agua" && waterCount < 8 && setWaterCount(waterCount + 1)}
          >
            <div style={{ fontSize: 24 }}>{stat.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, marginTop: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recetas destacadas */}
      <div style={{ padding: "24px 16px 0 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, margin: 0 }}>Recetas Populares</h3>
          <button onClick={() => setActiveTab("recipes")} style={{
            background: "none", border: "none", color: COLORS.primary,
            fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0
          }}>Ver todas →</button>
        </div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4 }}>
          {recipes.slice(0, 4).map((recipe) => (
            <div key={recipe.id}
              onClick={() => { setSelectedRecipe(recipe); setActiveTab("recipes"); }}
              style={{
                minWidth: 160, background: COLORS.surface, borderRadius: 18,
                overflow: "hidden", boxShadow: COLORS.cardShadow, cursor: "pointer",
                border: `1px solid ${COLORS.border}`, flexShrink: 0,
                transition: "transform 0.18s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                height: 100, background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.surfaceAlt})`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44,
                position: "relative"
              }}>
                <img src={recipe.img} alt={recipe.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
                  onError={e => { e.target.style.display = "none"; }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>{recipe.emoji}</span>
              </div>
              <div style={{ padding: "10px 10px 12px" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, margin: "0 0 4px 0", lineHeight: 1.3 }}>
                  {recipe.name}
                </p>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: COLORS.textSecondary }}>⏱ {recipe.time}</span>
                  <span style={{ fontSize: 11, color: COLORS.primary, fontWeight: 600 }}>🔥 {recipe.kcal} kcal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan de hoy */}
      <div style={{ padding: "24px 16px 0 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, margin: 0 }}>Plan de Hoy — Lunes</h3>
          <button onClick={() => setActiveTab("plan")} style={{
            background: "none", border: "none", color: COLORS.primary,
            fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0
          }}>Ver plan →</button>
        </div>
        {mealTypes.map((meal, i) => {
          const item = weekPlan["Lunes"][meal];
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: COLORS.surface, borderRadius: 14, padding: "12px 14px",
              marginBottom: 10, boxShadow: "0 1px 6px rgba(76,175,80,0.07)",
              border: `1px solid ${COLORS.border}`
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, background: COLORS.surfaceAlt,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
              }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: COLORS.text }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary, textTransform: "capitalize" }}>{meal}</p>
              </div>
              <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 700 }}>{item.kcal} kcal</span>
            </div>
          );
        })}
      </div>

      {/* Logros */}
      <div style={{ padding: "24px 16px 0 16px" }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, margin: "0 0 14px 0" }}>Mis Logros</h3>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {achievements.map((a, i) => (
            <div key={i} style={{
              minWidth: 100, background: a.done ? COLORS.primaryLight : COLORS.surface,
              borderRadius: 16, padding: "14px 10px", textAlign: "center",
              border: `1px solid ${a.done ? COLORS.primaryDark : COLORS.border}`,
              flexShrink: 0, opacity: a.done ? 1 : 0.5
            }}>
              <div style={{ fontSize: 28 }}>{a.emoji}</div>
              <p style={{ fontSize: 11, color: a.done ? COLORS.primaryDark : COLORS.textSecondary, margin: "6px 0 0 0", fontWeight: 600 }}>
                {a.label}
              </p>
              {a.done && <p style={{ fontSize: 10, color: COLORS.primaryDark, margin: "2px 0 0 0" }}>✓ Conseguido</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RecipesScreen = () => {
    if (selectedRecipe) {
      return (
        <div style={{ paddingBottom: 24 }}>
          {/* Header imagen */}
          <div style={{
            height: 240, background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.surfaceAlt})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 72, position: "relative", overflow: "hidden"
          }}>
            <img src={selectedRecipe.img} alt={selectedRecipe.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{selectedRecipe.emoji}</span>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45))"
            }} />
            <button onClick={() => setSelectedRecipe(null)} style={{
              position: "absolute", top: 16, left: 16, zIndex: 10,
              background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
              width: 38, height: 38, fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>←</button>
            <button onClick={() => toggleFavorite(selectedRecipe.id)} style={{
              position: "absolute", top: 16, right: 16, zIndex: 10,
              background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
              width: 38, height: 38, fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {favorites.includes(selectedRecipe.id) ? "❤️" : "🤍"}
            </button>
          </div>

          <div style={{ padding: "20px 16px" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {selectedRecipe.tags.map((tag, i) => (
                <span key={i} style={{
                  background: COLORS.primaryLight, color: COLORS.primaryDark,
                  fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20
                }}>{tag}</span>
              ))}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: "0 0 8px 0" }}>
              {selectedRecipe.name}
            </h2>
            <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 14 }}>
              <span style={{ color: COLORS.accent, fontSize: 14 }}>★</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{selectedRecipe.rating}</span>
              <span style={{ fontSize: 12, color: COLORS.textSecondary }}>({selectedRecipe.reviews.toLocaleString()} reseñas)</span>
            </div>

            {/* Info pills */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { icon: "⏱", text: selectedRecipe.time },
                { icon: "🔥", text: `${selectedRecipe.kcal} kcal` },
                { icon: "📊", text: selectedRecipe.difficulty },
              ].map((item, i) => (
                <div key={i} style={{
                  background: COLORS.surfaceAlt, borderRadius: 24, padding: "6px 14px",
                  display: "flex", gap: 6, alignItems: "center", border: `1px solid ${COLORS.border}`
                }}>
                  <span>{item.icon}</span>
                  <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Macros */}
            <div style={{
              background: COLORS.surfaceAlt, borderRadius: 16, padding: 16,
              marginBottom: 20, border: `1px solid ${COLORS.border}`
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, margin: "0 0 12px 0" }}>
                Macronutrientes
              </h4>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {[
                  { label: "Proteínas", value: selectedRecipe.macros.proteinas, unit: "g", color: "#E53935" },
                  { label: "Carbos", value: selectedRecipe.macros.carbos, unit: "g", color: "#FFC107" },
                  { label: "Grasas", value: selectedRecipe.macros.grasas, unit: "g", color: "#4CAF50" },
                  { label: "Fibra", value: selectedRecipe.macros.fibra, unit: "g", color: "#2196F3" },
                ].map((m, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.value}{m.unit}</div>
                    <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredientes */}
            <h4 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 10px 0" }}>
              🛒 Ingredientes
            </h4>
            {selectedRecipe.ingredients.map((ing, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%", background: COLORS.primary, flexShrink: 0
                }} />
                <span style={{ fontSize: 14, color: COLORS.text }}>{ing}</span>
              </div>
            ))}

            {/* Preparación */}
            <h4 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "20px 0 10px 0" }}>
              👨‍🍳 Preparación
            </h4>
            {selectedRecipe.steps.map((step, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start"
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", background: COLORS.primary,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: "#fff", fontWeight: 700, flexShrink: 0
                }}>{i + 1}</div>
                <p style={{ fontSize: 14, color: COLORS.text, margin: 0, lineHeight: 1.6 }}>{step}</p>
              </div>
            ))}

            <button style={{
              width: "100%", padding: "15px", background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
              color: "#fff", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 700,
              cursor: "pointer", marginTop: 20,
              boxShadow: "0 4px 14px rgba(76,175,80,0.35)"
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              ➕ Añadir al Plan
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: "20px 16px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: "0 0 16px 0" }}>
          🍽️ Recetas Saludables
        </h2>

        {/* Buscador */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: COLORS.surface, borderRadius: 14, padding: "10px 14px",
          border: `1px solid ${COLORS.border}`, marginBottom: 16,
          boxShadow: "0 1px 6px rgba(76,175,80,0.07)"
        }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar recetas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1, border: "none", outline: "none", fontSize: 14,
              color: COLORS.text, background: "transparent"
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{
              background: "none", border: "none", color: COLORS.textSecondary,
              cursor: "pointer", fontSize: 16, padding: 0
            }}>✕</button>
          )}
        </div>

        {/* Categorías */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{
              flexShrink: 0, padding: "8px 16px", borderRadius: 24,
              border: selectedCategory === cat.id ? "none" : `1px solid ${COLORS.border}`,
              background: selectedCategory === cat.id
                ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`
                : COLORS.surface,
              color: selectedCategory === cat.id ? "#fff" : COLORS.textSecondary,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 6
            }}>
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de recetas */}
        {filteredRecipes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: COLORS.textSecondary }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 15 }}>No hay recetas con ese filtro</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                style={{
                  background: COLORS.surface, borderRadius: 18, overflow: "hidden",
                  boxShadow: COLORS.cardShadow, cursor: "pointer",
                  border: `1px solid ${COLORS.border}`,
                  transition: "transform 0.18s, box-shadow 0.18s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(76,175,80,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = COLORS.cardShadow;
                }}
              >
                <div style={{
                  height: 110, background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.surfaceAlt})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 44, position: "relative"
                }}>
                  <img src={recipe.img} alt={recipe.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>{recipe.emoji}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                    style={{
                      position: "absolute", top: 8, right: 8, zIndex: 5,
                      background: "rgba(255,255,255,0.9)", border: "none",
                      borderRadius: "50%", width: 30, height: 30, fontSize: 14,
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                  >
                    {favorites.includes(recipe.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div style={{ padding: "10px 10px 12px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, margin: "0 0 5px 0", lineHeight: 1.35 }}>
                    {recipe.name}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: COLORS.textSecondary }}>⏱ {recipe.time}</span>
                    <span style={{ fontSize: 11, color: COLORS.primary, fontWeight: 700 }}>🔥 {recipe.kcal}</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                    {recipe.tags.slice(0, 1).map((tag, i) => (
                      <span key={i} style={{
                        background: COLORS.primaryLight, color: COLORS.primaryDark,
                        fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 600
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ScannerScreen = () => (
    <div style={{ padding: "20px 16px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: "0 0 8px 0" }}>
        📷 Escáner de Alimentos
      </h2>
      <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 20px 0" }}>
        Escanea el código de barras de cualquier producto para conocer su calidad nutricional
      </p>

      {/* Scanner area */}
      <div style={{
        background: COLORS.text, borderRadius: 20, padding: 20,
        marginBottom: 20, position: "relative", overflow: "hidden",
        minHeight: 220, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        {scanMode ? (
          <>
            <div style={{
              width: 180, height: 180, border: "3px solid #4CAF50",
              borderRadius: 12, position: "relative"
            }}>
              <div style={{
                position: "absolute", top: -3, left: -3,
                width: 24, height: 24, borderTop: "4px solid #4CAF50",
                borderLeft: "4px solid #4CAF50", borderRadius: "4px 0 0 0"
              }} />
              <div style={{
                position: "absolute", top: -3, right: -3,
                width: 24, height: 24, borderTop: "4px solid #4CAF50",
                borderRight: "4px solid #4CAF50", borderRadius: "0 4px 0 0"
              }} />
              <div style={{
                position: "absolute", bottom: -3, left: -3,
                width: 24, height: 24, borderBottom: "4px solid #4CAF50",
                borderLeft: "4px solid #4CAF50", borderRadius: "0 0 0 4px"
              }} />
              <div style={{
                position: "absolute", bottom: -3, right: -3,
                width: 24, height: 24, borderBottom: "4px solid #4CAF50",
                borderRight: "4px solid #4CAF50", borderRadius: "0 0 4px 0"
              }} />
              {/* Scan line animation */}
              <div style={{
                position: "absolute", left: 0, right: 0, top: "50%",
                height: 2, background: "#4CAF50", opacity: 0.8,
                animation: "none"
              }} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 16 }}>
              Escaneando...
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 64, marginBottom: 12 }}>📷</div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textAlign: "center", margin: 0 }}>
              Apunta la cámara al código de barras
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "center", margin: "4px 0 0 0" }}>
              {/* TODO: Integrar cámara real del dispositivo */}
              Demostración con producto aleatorio
            </p>
          </>
        )}
      </div>

      <button onClick={handleScan} disabled={scanMode} style={{
        width: "100%", padding: "15px", borderRadius: 16, border: "none",
        background: scanMode ? COLORS.textLight : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
        color: "#fff", fontSize: 16, fontWeight: 700, cursor: scanMode ? "not-allowed" : "pointer",
        boxShadow: scanMode ? "none" : "0 4px 14px rgba(76,175,80,0.35)",
        marginBottom: 20
      }}>
        {scanMode ? "⏳ Escaneando..." : "📸 Escanear Producto"}
      </button>

      {/* Resultado del escaneo */}
      {showScanResult && scannedProduct && (
        <div style={{
          background: COLORS.surface, borderRadius: 20, overflow: "hidden",
          boxShadow: COLORS.cardShadow, border: `2px solid ${scoreColor(scannedProduct.score)}`,
          marginBottom: 20
        }}>
          <div style={{
            background: scoreColor(scannedProduct.score), padding: "12px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28 }}>{scannedProduct.emoji}</span>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: 0 }}>{scannedProduct.name}</p>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: 0 }}>{scannedProduct.brand}</p>
              </div>
            </div>
            <button onClick={() => setShowScanResult(false)} style={{
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
              width: 28, height: 28, color: "#fff", cursor: "pointer", fontSize: 14
            }}>✕</button>
          </div>
          <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: "0 0 2px 0" }}>Puntuación MyRealFood</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    fontSize: 28, fontWeight: 800, color: scoreColor(scannedProduct.score)
                  }}>{scannedProduct.score}</div>
                  <div style={{
                    fontSize: 13, color: scoreColor(scannedProduct.score), fontWeight: 600
                  }}>/ 100</div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "0 0 4px 0" }}>Nutri-Score</p>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: nutriscoreColor(scannedProduct.nutriscore),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: 18
                }}>{scannedProduct.nutriscore}</div>
              </div>
            </div>
            <div style={{ background: COLORS.border, borderRadius: 6, height: 8, marginBottom: 12 }}>
              <div style={{
                height: "100%", borderRadius: 6,
                width: `${scannedProduct.score}%`,
                background: scoreColor(scannedProduct.score),
                transition: "width 0.8s ease"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: COLORS.textSecondary }}>🔥 {scannedProduct.kcal} kcal / 100g</span>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: scoreColor(scannedProduct.score)
              }}>
                {scannedProduct.category === "Buenos" ? "✅ Buena elección" :
                  scannedProduct.category === "Malos" ? "❌ Evítalo" : "⚠️ Con moderación"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Productos recientes */}
      <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, margin: "0 0 14px 0" }}>
        Productos Populares
      </h3>
      {products.map((p) => (
        <div key={p.id} style={{
          display: "flex", alignItems: "center", gap: 12,
          background: COLORS.surface, borderRadius: 14, padding: "12px 14px",
          marginBottom: 10, boxShadow: "0 1px 6px rgba(76,175,80,0.07)",
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: COLORS.surfaceAlt,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
          }}>{p.emoji}</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: COLORS.text }}>{p.name}</p>
            <p style={{ margin: 0, fontSize: 11, color: COLORS.textSecondary }}>{p.brand}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: scoreColor(p.score),
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 12
            }}>{p.score}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const PlanScreen = () => (
    <div style={{ padding: "20px 0 24px 0" }}>
      <div style={{ padding: "0 16px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, margin: "0 0 6px 0" }}>
          📅 Mi Plan Semanal
        </h2>
        <p style={{ fontSize: 14, color: COLORS.textSecondary, margin: "0 0 16px 0" }}>
          Tu menú personalizado para esta semana
        </p>
      </div>

      {/* Días selector */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 16px 16px 16px" }}>
        {days.map((day) => (
          <button key={day} onClick={() => { setSelectedDay(day); setExpandedMeal(null); }} style={{
            flexShrink: 0, padding: "8px 14px", borderRadius: 24,
            border: selectedDay === day ? "none" : `1px solid ${COLORS.border}`,
            background: selectedDay === day
              ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`
              : COLORS.surface,
            color: selectedDay === day ? "#fff" : COLORS.textSecondary,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s"
          }}>
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Resumen del día */}
      <div style={{
        margin: "0 16px 16px 16px",
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
        borderRadius: 18, padding: "16px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: 0 }}>{selectedDay}</p>
          <p style={{ color: "#fff", fontWeight: 800, fontSize: 24, margin: "2px 0 0 0" }}>
            {totalKcalDay} kcal
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: "2px 0 0 0" }}>
            Total del día
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          {[
            { label: "Comidas", value: "4" },
            { label: "Agua", value: "8 vasos" },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{s.label}: </span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comidas del día */}
      <div style={{ padding: "0 16px" }}>
        {mealTypes.map((meal, i) => {
          const item = weekPlan[selectedDay][meal];
          const isExpanded = expandedMeal === meal;
          const mealIcons = { desayuno: "🌅", almuerzo: "☀️", cena: "🌙", snack: "🍎" };
          const mealLabels = { desayuno: "Desayuno", almuerzo: "Almuerzo", cena: "Cena", snack: "Snack" };

          return (
            <div key={i} style={{ marginBottom: 12 }}>
              <div
                onClick={() => setExpandedMeal(isExpanded ? null : meal)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: COLORS.surface, borderRadius: isExpanded ? "16px 16px 0 0" : 16,
                  padding: "14px 16px", cursor: "pointer",
                  border: `1px solid ${isExpanded ? COLORS.primary : COLORS.border}`,
                  borderBottom: isExpanded ? `1px solid ${COLORS.border}` : undefined,
                  transition: "all 0.2s"
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 14,
                  background: isExpanded ? COLORS.primaryLight : COLORS.surfaceAlt,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 11, color: isExpanded ? COLORS.primary : COLORS.textSecondary, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {mealIcons[meal]} {mealLabels[meal]}
                  </p>
                  <p style={{ margin: "2px 0 0 0", fontSize: 14, fontWeight: 700, color: COLORS.text }}>
                    {item.name}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.primary }}>{item.kcal}</div>
                  <div style={{ fontSize: 10, color: COLORS.textSecondary }}>kcal</div>
                </div>
                <span style={{
                  color: COLORS.textSecondary, fontSize: 16,
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s"
                }}>▼</span>
              </div>
              {isExpanded && (
                <div style={{
                  background: COLORS.surfaceAlt, borderRadius: "0 0 16px 16px",
                  padding: "14px 16px", border: `1px solid ${COLORS.primary}`,
                  borderTop: "none"
                }}>
                  <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: "0 0 10px 0" }}>
                    Información nutricional estimada
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { label: "Calorías", value: item.kcal, unit: "kcal", color: COLORS.secondary },
                      { label: "Proteínas", value: Math.round(item.kcal * 0.08), unit: "g", color: "#E53935" },
                      { label: "Carbos", value: Math.round(item.kcal * 0.12), unit: "g", color: "#FFC107" },
                    ].map((m, idx) => (
                      <div key={idx} style={{
                        flex: 1, background: COLORS.surface, borderRadius: 12,
                        padding: "10px 8px", textAlign: "center",
                        border: `1px solid ${COLORS.border}`
                      }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: m.color }}>{m.value}</div>
                        <div style={{ fontSize: 10, color: COLORS.textSecondary }}>{m.unit}</div>
                        <div style={{ fontSize: 10, color: COLORS.textSecondary }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: "100%", marginTop: 12, padding: "10px",
                    background: "none", border: `1.5px solid ${COLORS.primary}`,
                    borderRadius: 12, color: COLORS.primary, fontWeight: 600,
                    fontSize: 13, cursor: "pointer"
                  }}>
                    🔄 Cambiar receta
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón generar plan */}
      <div style={{ padding: "16px 16px 0 16px" }}>
        <button style={{
          width: "100%", padding: "15px",
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
          color: "#fff", border: "none", borderRadius: 16,
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 4px 14px rgba(76,175,80,0.35)"
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {/* TODO: Integrar con algoritmo de IA para generar planes personalizados */}
          ✨ Generar Nuevo Plan
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: COLORS.textSecondary, marginTop: 8 }}>
          Basado en tus objetivos y preferencias
        </p>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div style={{ padding: "0 0 24px 0" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
        padding: "36px 20px 60px 20px",
        borderRadius: "0 0 32px 32px",
        position: "relative"
      }}>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 20px 0" }}>Mi Perfil</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, border: "3px solid rgba(255,255,255,0.5)"
          }}>👤</div>
          <div>
            {/* TODO: Mostrar nombre real del usuario autenticado */}
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0 }}>Usuario MyRealFood</h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: "4px 0 0 0" }}>
              🥦 Comiendo saludable desde 2024
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "2px 0 0 0" }}>
              {/* TODO: Email real del usuario */}
              usuario@ejemplo.com
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ margin: "-30px 16px 20px 16px" }}>
        <div style={{
          background: COLORS.surface, borderRadius: 20, padding: 16,
          boxShadow: COLORS.cardShadow, border: `1px solid ${COLORS.border}`,
          display: "flex", justifyContent: "space-around"
        }}>
          {[
            { emoji: "🔥", value: "7", label: "Días racha" },
            { emoji: "🍽️", value: "12", label: "Recetas" },
            { emoji: "⭐", value: "840", label: "Puntos" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary }}>{s.value}</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Objetivos */}
      <div style={{ padding: "0 16px 20px 16px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 12px 0" }}>
          🎯 Mis Objetivos
        </h3>
        <div style={{
          background: COLORS.surface, borderRadius: 16, overflow: "hidden",
          border: `1px solid ${COLORS.border}`, boxShadow: COLORS.cardShadow
        }}>
          {[
            { label: "Objetivo calórico", value: "1.800 kcal / día" },
            { label: "Objetivo", value: "Alimentación saludable" },
            { label: "Actividad física", value: "3 veces por semana" },
            { label: "Restricciones", value: "Sin restricciones" },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "14px 16px",
              borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none"
            }}>
              <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Opciones */}
      <div style={{ padding: "0 16px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, margin: "0 0 12px 0" }}>
          ⚙️ Configuración
        </h3>
        <div style={{
          background: COLORS.surface, borderRadius: 16, overflow: "hidden",
          border: `1px solid ${COLORS.border}`, boxShadow: COLORS.cardShadow, marginBottom: 16
        }}>
          {[
            { icon: "👤", label: "Editar perfil" },
            { icon: "🎯", label: "Mis objetivos" },
            { icon: "🔔", label: "Notificaciones" },
            { icon: "💳", label: "Suscripción Premium" },
            { icon: "❤️", label: "Recetas favoritas" },
            { icon: "📊", label: "Mi progreso" },
          ].map((opt, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
              borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none",
              cursor: "pointer", transition: "background 0.15s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.surfaceAlt}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: 20 }}>{opt.icon}</span>
              <span style={{ flex: 1, fontSize: 14, color: COLORS.text, fontWeight: 500 }}>{opt.label}</span>
              <span style={{ color: COLORS.textSecondary, fontSize: 16 }}>›</span>
            </div>
          ))}
        </div>

        {/* Premium banner */}
        <div style={{
          background: `linear-gradient(135deg, #FFC107, #FF7043)`,
          borderRadius: 18, padding: "18px 20px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 14
        }}>
          <span style={{ fontSize: 36 }}>👑</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: 0 }}>MyRealFood Premium</p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, margin: "2px 0 0 0" }}>
              Planes personalizados + sin anuncios
            </p>
          </div>
          <button style={{
            background: "#fff", border: "none", borderRadius: 20,
            padding: "8px 14px", fontSize: 12, fontWeight: 700,
            color: "#FF7043", cursor: "pointer", flexShrink: 0
          }}>Ver</button>
        </div>

        {/* Cerrar sesión */}
        <button style={{
          width: "100%", padding: "13px",
          background: "none", border: `1.5px solid ${COLORS.border}`,
          borderRadius: 14, color: COLORS.danger, fontSize: 14, fontWeight: 600,
          cursor: "pointer"
        }}>
          {/* TODO: Implementar lógica de cierre de sesión real */}
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );

  const screens = {
    home: <HomeScreen />,
    recipes: <RecipesScreen />,
    scanner: <ScannerScreen />,
    plan: <PlanScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#E8F5E9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: "20px 0"
    }}>
      {/* Mobile frame */}
      <div style={{
        width: "100%",
        maxWidth: 430,
        minHeight: "100vh",
        background: COLORS.background,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 60px rgba(0,0,0,0.15)",
        overflow: "hidden"
      }}>
        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: 80,
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease"
        }}>
          {screens[activeTab]}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          background: COLORS.surface,
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          zIndex: 100,
          boxShadow: "0 -4px 20px rgba(76,175,80,0.10)",
          padding: "6px 0 10px 0"
        }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id !== "recipes") setSelectedRecipe(null);
                  if (item.id !== "scanner") { setScanMode(false); setShowScanResult(false); }
                }}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 3, padding: "6px 4px",
                  background: "none", border: "none", cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                <div style={{
                  width: 44, height: 28, borderRadius: 14,
                  background: isActive ? COLORS.primaryLight : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: item.id === "scanner" ? 22 : 20,
                  transition: "background 0.2s",
                  transform: (isActive || hoveredNav === item.id) ? "scale(1.12)" : "scale(1)"
                }}>
                  {item.icon}
                </div>
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? COLORS.primaryDark : COLORS.textSecondary,
                  transition: "color 0.15s"
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}