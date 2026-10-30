import { Hero } from "./components/layout/Hero";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { TrendExplorer } from "./components/TrendExplorer";
import styles from "./page.module.scss";

const { page } = styles;

export default function HomePage() {
  return (
    <main className={page}>
      <SiteHeader />
      <Hero />
      <TrendExplorer />
      <SiteFooter />
    </main>
  );
}
