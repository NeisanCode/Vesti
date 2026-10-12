import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Truck,
  X,
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "../components/ui/button";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  color: string;
  image: string;
  alt: string;
  badge?: string;
};
const products: Product[] = [
  {
    id: "calista-coat",
    name: "Calista Wool Coat",
    category: "Outerwear",
    price: 248,
    color: "Warm oat",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    alt: "Woman wearing a light coat",
    badge: "New",
  },
  {
    id: "mara-knit",
    name: "Mara Mockneck Knit",
    category: "Knitwear",
    price: 98,
    color: "Soft ivory",
    image:
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=900&q=85",
    alt: "Woman wearing a cream sweater",
  },
  {
    id: "solene-trouser",
    name: "Solene Pleat Trouser",
    category: "Tailoring",
    price: 128,
    color: "Espresso",
    image:
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=85",
    alt: "Woman in tailored neutral outfit",
  },
  {
    id: "sienna-dress",
    name: "Sienna Midi Dress",
    category: "Dresses",
    price: 168,
    color: "Ink blue",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    alt: "Woman in a flowing dark dress",
    badge: "Bestseller",
  },
  {
    id: "nora-shirt",
    name: "Nora Cotton Shirt",
    category: "Shirting",
    price: 88,
    color: "Crisp white",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=85",
    alt: "Woman wearing a white shirt",
  },
  {
    id: "arlene-bag",
    name: "Arlene Leather Bag",
    category: "Accessories",
    price: 158,
    color: "Cognac",
    image:
      "https://images.unsplash.com/photo-1585488434455-8b2f7117d55a?auto=format&fit=crop&w=900&q=85",
    alt: "Tan leather bag",
  },
  {
    id: "elsa-set",
    name: "Elsa Ribbed Set",
    category: "Essentials",
    price: 116,
    color: "Natural",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    alt: "Woman wearing a neutral outfit",
  },
  {
    id: "lucie-jacket",
    name: "Lucie Blazer",
    category: "Tailoring",
    price: 198,
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    alt: "Woman in a black blazer",
  },
];
const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const addToCart = (product: Product) => {
    setCart((items) => [...items, product]);
    setCartOpen(true);
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
          <Route
            path="/product/:id"
            element={<ProductPage addToCart={addToCart} />}
          />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        </Routes>
      </main>
      <SiteFooter />
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={(index) =>
          setCart((items) => items.filter((_, i) => i !== index))
        }
      />
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}
function SiteHeader({
  cartCount,
  onOpenCart,
}: {
  cartCount: number;
  onOpenCart: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Our story", "/#story"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#faf9f7]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link
          className="font-serif text-[27px] font-semibold tracking-[-0.07em] text-stone-950"
          to="/"
        >
          VÉSTI<span className="text-[#ae4d32]">.</span>
        </Link>
        <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-600 md:flex">
          {links.map(([label, href]) => (
            <NavLink
              key={href}
              className={({ isActive }) =>
                `transition-colors hover:text-stone-950 ${isActive && href === "/" ? "text-stone-950" : ""}`
              }
              to={href}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <button className="icon-button hidden sm:grid" aria-label="Search">
            <Search size={18} strokeWidth={1.7} />
          </button>
          <button
            className="icon-button hidden sm:grid"
            aria-label="Saved items"
          >
            <Heart size={18} strokeWidth={1.7} />
          </button>
          <button
            className="icon-button relative grid"
            onClick={onOpenCart}
            aria-label="Open shopping bag"
          >
            <ShoppingBag size={18} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ae4d32] px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="icon-button grid md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-t border-stone-200 bg-[#faf9f7] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-[0.14em]">
            {links.map(([label, href]) => (
              <NavLink
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function HomePage({ addToCart }: { addToCart: (product: Product) => void }) {
  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-[#e7e1db]">
        <img
          className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1800&q=90"
          alt="Woman in timeless neutral fashion"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/44 via-black/13 to-transparent" />
        <div className="relative mx-auto flex min-h-[650px] max-w-[1440px] items-center px-5 lg:px-10">
          <div className="max-w-xl pt-8 text-white">
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em]">
              The autumn / winter edit
            </p>
            <h1 className="font-serif text-5xl leading-[0.93] tracking-[-0.055em] sm:text-7xl">
              A softer kind
              <br />
              of statement.
            </h1>
            <p className="mt-7 max-w-sm text-base leading-7 text-white/85">
              Considered layers and enduring pieces for the way you live now.
            </p>
            <Link
              className="mt-9 inline-flex h-12 items-center gap-5 bg-white px-6 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-950 transition-transform hover:-translate-y-0.5"
              to="/shop"
            >
              Explore the collection <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <p className="absolute bottom-7 right-6 rotate-90 origin-bottom-right text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 lg:right-10">
          Scroll to discover
        </p>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="New arrivals"
          title={
            <>
              The pieces we
              <br />
              can’t stop wearing.
            </>
          }
        />
        <ProductGrid products={products.slice(0, 4)} addToCart={addToCart} />
      </section>
      <section
        id="story"
        className="grid min-h-[640px] grid-cols-1 bg-[#332c27] text-[#f8f6f2] lg:grid-cols-2"
      >
        <div className="relative min-h-[440px] overflow-hidden lg:order-2 lg:min-h-full">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
            alt="Woman in a tailored coat walking in the city"
          />
        </div>
        <div className="flex items-center px-6 py-20 sm:px-14 lg:px-20">
          <div className="max-w-md">
            <p className="eyebrow text-[#dcb491]">Made to live in</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              A wardrobe with
              <br />
              room to breathe.
            </h2>
            <p className="mt-7 text-[15px] leading-7 text-stone-300">
              We make clothing that feels as good on a slow Sunday as it does in
              a packed room. Less noise, more intention.
            </p>
            <Link
              className="mt-9 inline-flex items-center gap-4 border-b border-[#dcb491] pb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#f2c9a5]"
              to="/shop"
            >
              Meet the collection <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Selected for you"
          title={<>Everyday, elevated.</>}
          arrows
        />
        <ProductGrid products={products.slice(4, 8)} addToCart={addToCart} />
      </section>
      <section className="border-y border-stone-200 bg-[#e8d9ca] px-5 py-14 text-center">
        <p className="font-serif text-2xl tracking-[-0.04em] text-stone-800 sm:text-3xl">
          “Beautiful things should make ordinary days feel a little less
          ordinary.”
        </p>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
          — VÉSTI studio
        </p>
      </section>
    </>
  );
}
function SectionHeading({
  eyebrow,
  title,
  arrows = false,
}: {
  eyebrow: string;
  title: ReactNode;
  arrows?: boolean;
}) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-3">{title}</h2>
      </div>
      {arrows ? (
        <div className="hidden gap-2 md:flex">
          <button className="round-nav">
            <ChevronLeft size={18} />
          </button>
          <button className="round-nav">
            <ChevronRight size={18} />
          </button>
        </div>
      ) : (
        <Link className="hidden link-arrow sm:flex" to="/shop">
          Shop all <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
function ProductGrid({
  products: productList,
  addToCart,
}: {
  products: Product[];
  addToCart: (product: Product) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-10">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
function ProductCard({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (product: Product) => void;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="group">
      <div className="relative aspect-[.76] overflow-hidden bg-stone-100">
        <Link to={`/product/${product.id}`}>
          <img
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            src={product.image}
            alt={product.alt}
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#faf9f7] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]">
            {product.badge}
          </span>
        )}
        <button
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 opacity-100 backdrop-blur transition hover:bg-white md:opacity-0 md:group-hover:opacity-100"
          onClick={() => setSaved(!saved)}
          aria-label="Save item"
        >
          <Heart
            size={15}
            className={saved ? "fill-[#ae4d32] text-[#ae4d32]" : ""}
          />
        </button>
        <button
          className="absolute bottom-3 left-3 right-3 hidden h-11 items-center justify-center gap-2 bg-stone-950 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-[#ae4d32] md:flex md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={14} /> Add to bag
        </button>
      </div>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              {product.category}
            </p>
            <Link
              className="mt-1 block font-serif text-lg tracking-[-0.025em] hover:underline"
              to={`/product/${product.id}`}
            >
              {product.name}
            </Link>
          </div>
          <span className="pt-4 text-sm text-stone-700">
            {money(product.price)}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-700 underline underline-offset-4 md:hidden"
        >
          Add to bag
        </button>
      </div>
    </article>
  );
}

function ShopPage({ addToCart }: { addToCart: (product: Product) => void }) {
  const [filter, setFilter] = useState("All pieces");
  const filters = [
    "All pieces",
    "Outerwear",
    "Knitwear",
    "Dresses",
    "Tailoring",
    "Essentials",
  ];
  const displayed =
    filter === "All pieces"
      ? products
      : products.filter((product) => product.category === filter);
  return (
    <>
      <section className="bg-[#e7e1db] px-5 py-16 text-center lg:py-20">
        <p className="eyebrow">Autumn / winter 2025</p>
        <h1 className="mt-3 font-serif text-5xl tracking-[-0.055em] sm:text-6xl">
          The collection
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-stone-600">
          A carefully edited selection of pieces to wear, rewear and make your
          own.
        </p>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-10 lg:px-10 lg:py-14">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-stone-200 pb-5 sm:flex-row sm:items-center">
          <div className="flex gap-5 overflow-x-auto text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`shrink-0 transition ${filter === item ? "text-stone-950" : "hover:text-stone-950"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="shrink-0 text-xs text-stone-500">
            {displayed.length} pieces
          </span>
        </div>
        <ProductGrid products={displayed} addToCart={addToCart} />
      </section>
    </>
  );
}

function ProductPage({ addToCart }: { addToCart: (product: Product) => void }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) ?? products[0];
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Oat");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItems = () => {
    for (let index = 0; index < qty; index += 1) addToCart(product);
    setAdded(true);
  };
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-6 lg:px-10 lg:py-9">
      <div className="mb-6 flex gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span className="text-stone-900">{product.name}</span>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.55fr_.8fr] lg:gap-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="aspect-[.76] overflow-hidden bg-stone-100">
            <img
              className="h-full w-full object-cover"
              src={product.image}
              alt={product.alt}
            />
          </div>
          <div className="relative aspect-[.76] overflow-hidden bg-stone-100">
            <img
              className="h-full w-full object-cover grayscale-[18%]"
              src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85"
              alt="Product style detail"
            />
            <span className="absolute bottom-3 left-3 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em]">
              Details
            </span>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.05em] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg">{money(product.price)}</p>
          <div className="mt-6 flex items-center gap-1.5">
            <div className="flex text-[#ae4d32]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="ml-2 text-xs text-stone-500">
              4.9 · 28 reviews
            </span>
          </div>
          <p className="mt-7 max-w-md text-sm leading-6 text-stone-600">
            A beautifully cut staple in a soft wool blend. Designed with a
            relaxed silhouette and made for the long way around.
          </p>
          <div className="mt-8">
            <div className="mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.13em]">
              <span>Colour</span>
              <span className="font-medium normal-case tracking-normal text-stone-500">
                {color}
              </span>
            </div>
            <div className="flex gap-2">
              {[
                ["Oat", "bg-[#d5c4aa]"],
                ["Black", "bg-stone-900"],
                ["Chestnut", "bg-[#875b37]"],
              ].map(([name, className]) => (
                <button
                  key={name}
                  onClick={() => setColor(name)}
                  className={`h-9 w-9 rounded-full ${className} ${color === name ? "ring-1 ring-stone-950 ring-offset-3" : ""}`}
                  aria-label={name}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.13em]">
              Size
            </p>
            <div className="grid max-w-md grid-cols-4 gap-2">
              {["XS", "S", "M", "L"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSize(option)}
                  className={`h-11 border text-xs transition ${size === option ? "border-stone-950 bg-stone-950 text-white" : "border-stone-300 hover:border-stone-700"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="mt-3 text-xs text-stone-500 underline underline-offset-4">
              Size guide
            </button>
          </div>
          <div className="mt-8 flex gap-3">
            <div className="flex h-[52px] items-center border border-stone-300">
              <button
                className="grid h-full w-11 place-items-center"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Minus size={14} />
              </button>
              <span className="grid w-9 place-items-center text-sm">{qty}</span>
              <button
                className="grid h-full w-11 place-items-center"
                onClick={() => setQty(qty + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
            <Button
              className="h-[52px] flex-1 rounded-none bg-stone-950 text-[11px] uppercase tracking-[0.14em] hover:bg-[#ae4d32]"
              onClick={addItems}
            >
              {added ? (
                <>
                  <Check size={15} /> Added to bag
                </>
              ) : (
                <>
                  <ShoppingBag size={15} /> Add to bag
                </>
              )}
            </Button>
          </div>
          <div className="mt-7 space-y-3 border-t border-stone-200 pt-5 text-xs text-stone-600">
            <p className="flex items-center gap-3">
              <Truck size={16} /> Complimentary shipping on orders over $150
            </p>
            <p className="flex items-center gap-3">
              <PackageCheck size={16} /> Easy 30-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  cart,
  isOpen,
  onClose,
  onRemove,
}: {
  cart: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (index: number) => void;
}) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((total, product) => total + product.price, 0);
  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 z-50 cursor-default bg-stone-950/45 backdrop-blur-[1px]"
          onClick={onClose}
          aria-label="Close cart overlay"
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-[460px] flex-col bg-[#fcfbf9] shadow-2xl transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-[84px] shrink-0 items-center justify-between border-b border-stone-200 px-6">
          <h2 className="font-serif text-2xl tracking-[-0.04em]">
            Your bag{" "}
            <span className="font-sans text-sm text-stone-500">
              ({cart.length})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag size={28} strokeWidth={1.2} />
            <h3 className="mt-5 font-serif text-2xl">Your bag is empty.</h3>
            <p className="mt-2 text-sm text-stone-500">
              Find something you’ll want to wear on repeat.
            </p>
            <Button
              className="mt-7 rounded-none bg-stone-950 px-6 text-[10px] uppercase tracking-[0.14em]"
              onClick={() => {
                onClose();
                navigate("/shop");
              }}
            >
              Shop now
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="divide-y divide-stone-200">
                {cart.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="flex gap-4 py-5"
                  >
                    <img
                      className="h-28 w-20 object-cover"
                      src={product.image}
                      alt={product.alt}
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-serif text-lg leading-tight">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            {product.color} · S
                          </p>
                        </div>
                        <span className="text-sm">{money(product.price)}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-stone-500">
                          Quantity 1
                        </span>
                        <button
                          onClick={() => onRemove(index)}
                          className="text-[10px] font-bold uppercase tracking-[0.12em] underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-stone-200 px-6 py-5">
              <div className="flex justify-between font-serif text-xl">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Taxes and shipping calculated at checkout.
              </p>
              <Button
                className="mt-5 h-12 w-full rounded-none bg-stone-950 text-[10px] uppercase tracking-[0.16em] hover:bg-[#ae4d32]"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                Checkout
              </Button>
              <button
                onClick={onClose}
                className="mt-2 h-11 w-full border border-stone-900 text-[10px] font-bold uppercase tracking-[0.14em]"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function CheckoutPage({ cart }: { cart: Product[] }) {
  const [complete, setComplete] = useState(false);
  const fallback = [products[0], products[3]];
  const items = cart.length ? cart : fallback;
  const subtotal = items.reduce((total, product) => total + product.price, 0);
  const shipping = subtotal >= 150 ? 0 : 12;
  if (complete)
    return (
      <section className="mx-auto flex min-h-[68vh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e7e1db]">
          <Check size={30} />
        </div>
        <p className="eyebrow mt-7">Order confirmed</p>
        <h1 className="mt-3 font-serif text-4xl tracking-[-0.05em]">
          Thank you for your order.
        </h1>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          We’ve sent the details to your inbox. Your new pieces will be on their
          way soon.
        </p>
        <Link
          className="mt-8 bg-stone-950 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white"
          to="/shop"
        >
          Keep shopping
        </Link>
      </section>
    );
  return (
    <section className="bg-[#f7f5f2]">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-12 lg:grid-cols-[1.1fr_.8fr] lg:gap-24 lg:px-10 lg:py-18">
        <div>
          <Link
            className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-stone-600"
            to="/shop"
          >
            <ChevronLeft size={15} /> Continue shopping
          </Link>
          <p className="eyebrow">Secure checkout</p>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.05em]">
            Almost yours.
          </h1>
          <form
            className="mt-10 space-y-8"
            onSubmit={(event) => {
              event.preventDefault();
              setComplete(true);
            }}
          >
            <FormSection title="Contact">
              <label className="field-label">
                Email address
                <input required type="email" placeholder="you@example.com" />
              </label>
              <label className="mt-3 flex items-center gap-2 text-xs text-stone-600">
                <input type="checkbox" className="size-3.5 accent-stone-950" />{" "}
                Email me with news and offers
              </label>
            </FormSection>
            <FormSection title="Delivery">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="field-label sm:col-span-2">
                  Country / region
                  <select defaultValue="United States">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                  </select>
                </label>
                <label className="field-label">
                  First name
                  <input required placeholder="First name" />
                </label>
                <label className="field-label">
                  Last name
                  <input required placeholder="Last name" />
                </label>
                <label className="field-label sm:col-span-2">
                  Address
                  <input required placeholder="Street address" />
                </label>
                <label className="field-label">
                  City
                  <input required placeholder="City" />
                </label>
                <label className="field-label">
                  Postal code
                  <input required placeholder="Postal code" />
                </label>
              </div>
            </FormSection>
            <FormSection title="Payment">
              <div className="rounded-sm border border-stone-900 bg-white">
                <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      defaultChecked
                      type="radio"
                      name="payment"
                      className="accent-stone-950"
                    />{" "}
                    Card
                  </label>
                  <div className="flex gap-1">
                    <span className="card-mark bg-[#1a1f71]">VISA</span>
                    <span className="card-mark bg-[#eb001b]">●●</span>
                  </div>
                </div>
                <div className="space-y-3 bg-stone-50 p-4">
                  <label className="field-label">
                    Card number
                    <input required placeholder="1234 1234 1234 1234" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="field-label">
                      Expiration
                      <input required placeholder="MM / YY" />
                    </label>
                    <label className="field-label">
                      Security code
                      <input required placeholder="CVV" />
                    </label>
                  </div>
                </div>
              </div>
            </FormSection>
            <Button
              type="submit"
              className="h-14 w-full rounded-none bg-stone-950 text-[10px] uppercase tracking-[0.16em] hover:bg-[#ae4d32]"
            >
              Pay {money(subtotal + shipping)}
            </Button>
          </form>
        </div>
        <aside className="h-fit bg-white p-6 lg:sticky lg:top-28 lg:p-8">
          <h2 className="font-serif text-2xl tracking-[-0.04em]">
            Order summary
          </h2>
          <div className="mt-6 divide-y divide-stone-100">
            {items.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex gap-4 py-4 first:pt-0"
              >
                <div className="relative">
                  <img
                    className="h-20 w-16 object-cover"
                    src={product.image}
                    alt={product.alt}
                  />
                  <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-stone-700 text-[9px] text-white">
                    1
                  </span>
                </div>
                <div className="flex flex-1 justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg leading-tight">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {product.color} · S
                    </p>
                  </div>
                  <span className="text-sm">{money(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 border-t border-stone-200 pt-5 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span>{shipping ? money(shipping) : "Free"}</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-4 font-serif text-xl text-stone-950">
              <span>Total</span>
              <span>{money(subtotal + shipping)}</span>
            </div>
          </div>
          <div className="mt-7 flex items-center gap-3 border-t border-stone-100 pt-5 text-xs text-stone-500">
            <Truck size={17} /> Free shipping on orders over $150
          </div>
        </aside>
      </div>
    </section>
  );
}
function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-4 font-serif text-2xl tracking-[-0.04em]">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}
function SiteFooter() {
  return (
    <footer className="bg-[#1e1c1a] px-5 pb-7 pt-14 text-stone-300 lg:px-10 lg:pt-16">
      <div className="mx-auto grid max-w-[1440px] gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Link
            className="font-serif text-[28px] font-semibold tracking-[-0.07em] text-white"
            to="/"
          >
            VÉSTI<span className="text-[#d79a74]">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">
            Thoughtful pieces for a life beautifully lived.
          </p>
        </div>
        <FooterColumn
          title="Shop"
          links={["New arrivals", "Clothing", "Accessories", "Gift cards"]}
        />
        <FooterColumn
          title="About"
          links={["Our story", "Journal", "Care guide", "Stockists"]}
        />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
            A note from us
          </p>
          <p className="mt-4 text-sm leading-6">
            Occasional letters, first looks, and quiet inspiration.
          </p>
          <div className="mt-4 flex border-b border-stone-600">
            <input
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-stone-500"
              placeholder="Email address"
            />
            <button aria-label="Subscribe">
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1440px] flex-col justify-between gap-4 border-t border-stone-700 pt-6 text-[10px] uppercase tracking-[0.12em] text-stone-500 sm:flex-row">
        <span>© 2025 VÉSTI studio</span>
        <div className="flex gap-5">
          <a href="#instagram" className="flex items-center gap-1">
            <Camera size={13} /> Instagram
          </a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
        {title}
      </p>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link}>
            <a className="transition hover:text-white" href="#footer">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
