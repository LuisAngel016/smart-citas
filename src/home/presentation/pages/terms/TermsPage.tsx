import { CustomFooter } from "../../components";
import { CustomHeader } from "../../components/CustomHeader";


export const TermsPage = () => {
  return (
    <>
      <CustomHeader showNavigation={false} />

      <section className="container mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-primary">Términos y Condiciones de Uso</h1>
        <p className="mb-4">
          Estos Términos regulan el uso de la plataforma <strong>SmartCitas</strong>, disponible en
          <a href="https://smart-citas.netlify.app/" target="_blank" className="text-primary underline ml-1">www.smartcitas.com</a>.
          Al utilizar el servicio, aceptas plenamente estas condiciones.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Uso del servicio</h2>
        <p className="mb-4">
          SmartCitas permite agendar, administrar y gestionar citas en línea. Cada usuario es responsable
          de la veracidad de la información ingresada y del uso adecuado de la plataforma.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Planes y pagos</h2>
        <p className="mb-4">
          La plataforma ofrece planes gratuitos y planes premium. Los pagos se procesan mediante pasarelas seguras
          y los precios se comunican de forma transparente antes de la compra.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Propiedad intelectual</h2>
        <p className="mb-4">
          Todos los contenidos, códigos, marcas y diseños pertenecen a SmartCitas. Queda prohibida su reproducción
          o uso no autorizado sin permiso escrito.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Responsabilidad</h2>
        <p className="mb-4">
          SmartCitas no será responsable por pérdidas o interrupciones derivadas del mal uso del sistema,
          fallas de terceros o causas de fuerza mayor.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Modificaciones</h2>
        <p className="mb-4">
          Nos reservamos el derecho de actualizar estos Términos cuando sea necesario.
          Cualquier cambio será publicado en el sitio web.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Jurisdicción</h2>
        <p className="mb-4">
          Este acuerdo se rige por las leyes de la República de Colombia. Cualquier disputa será resuelta
          ante los tribunales competentes del país.
        </p>

        <p className="italic text-sm text-gray-600">
          Última actualización: 3 de noviembre de 2025.
        </p>
      </section >

      <CustomFooter />
    </>
  );
}

export default TermsPage;
