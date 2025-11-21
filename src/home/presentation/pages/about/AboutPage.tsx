import { CustomFooter } from "../../components";
import { CustomHeader } from "../../components/CustomHeader";


export const AboutPage = () => {
  return (
    <>
      <CustomHeader showNavigation={false} />

      <section className="container mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-primary">Acerca de Appointler</h1>
        <p className="mb-4">
          En <strong>Appointler</strong> somos una empresa dedicada al desarrollo de soluciones
          tecnológicas diseñadas para <strong>simplificar la gestión de citas y optimizar la productividad</strong>
          de los negocios.
        </p>
        <p className="mb-4">
          Nuestra plataforma fue creada para ayudar a profesionales y empresas —como barberías,
          clínicas, consultorios, spas y centros de servicio— a <strong>automatizar sus reservas,
            ahorrar tiempo y ofrecer una mejor experiencia a sus clientes</strong>.
        </p>
        <p className="mb-4">
          Desarrollamos un sistema <strong>intuitivo, moderno y seguro</strong> que permite administrar
          todo el flujo de agendamiento desde un solo lugar: reserva, confirmación, recordatorios y análisis.
        </p>
        <p className="mb-4">
          <strong>Nuestra misión</strong> es digitalizar la gestión de citas de manera simple y confiable.
          <strong>Nuestra visión</strong> es convertirnos en la plataforma líder en Latinoamérica.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 italic mt-6">
          “Menos tiempo coordinando, más tiempo atendiendo.”
        </blockquote>
      </section>

      <CustomFooter />
    </>
  );
}

export default AboutPage;
