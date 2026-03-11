import { Navbar } from "../components/Navbar";
import { FeaturedPost } from "../components/FeaturedPost";
import { TrendingTopics } from "../components/TrendingTopics";
import { BlogGrid } from "../components/BlogGrid";
import  NewsletterBanner  from "../components/NewsletterBanner";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <FeaturedPost />
        <TrendingTopics />
        <BlogGrid />
        <NewsletterBanner />
      </main>
      <Footer />
    </>
  );
}
