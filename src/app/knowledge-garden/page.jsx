import KnowledgeGarden from "@/components/KnowledgeGarden";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Knowledge Garden — Vikas Gulia',
  description: 'An interactive personal knowledge ecosystem. Showcase of learning roadmaps, book summaries, philosophies, and development articles.',
};

const Page = () => {
  return (
    <>
      <Header />
      <KnowledgeGarden />
      <Footer />
    </>
  );
};

export default Page;
