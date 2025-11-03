import { CustomFooter } from "../../components";
import { CustomHeader } from "../../components/CustomHeader";


export const BlogPage = () => {
  return (
    <>
      <CustomHeader showNavigation={false} />

      <section className="container mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-primary">Blog SmartCitas</h1>
        <p className="mb-4">
          El <strong>Blog de SmartCitas</strong> es un espacio creado para compartir conocimiento,
          ideas y estrategias que impulsen la transformación digital de los negocios.
        </p>
        <p className="mb-6">
          Aquí encontrarás artículos sobre productividad, atención al cliente, tendencias tecnológicas
          y guías prácticas para aprovechar al máximo la automatización en tu empresa.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Estrategias para fidelizar y retener clientes.</li>
          <li>Herramientas digitales para emprendedores.</li>
          <li>Actualizaciones y novedades de SmartCitas.</li>
          <li>Casos de éxito y testimonios reales.</li>
        </ul>
        <p>
          🔍 <strong>Aprende, crece e innova</strong> con los contenidos más relevantes del sector.
        </p>
      </section>

      <CustomFooter />
    </>
  );
}

export default BlogPage;
