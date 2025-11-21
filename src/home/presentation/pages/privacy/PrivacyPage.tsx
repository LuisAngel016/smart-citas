import { CustomFooter } from "../../components";
import { CustomHeader } from "../../components/CustomHeader";


export const PrivacyPage = () => {
  return (
    <>
      <CustomHeader showNavigation={false} />

      <section className="container mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-primary">Política de Privacidad</h1>
        <p className="mb-4">
          En <strong>Appointler</strong> nos tomamos muy en serio la privacidad y seguridad de los datos
          de nuestros usuarios. Esta política explica cómo recopilamos, utilizamos y protegemos tu información personal.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Información que recopilamos</h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Datos personales como nombre, correo electrónico y número de teléfono.</li>
          <li>Datos del negocio: nombre comercial, servicios, horarios y citas registradas.</li>
          <li>Información técnica (cookies, IP, navegador) para mejorar la experiencia de usuario.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Uso de la información</h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Gestionar tu cuenta y tus citas.</li>
          <li>Enviar notificaciones, recordatorios y actualizaciones.</li>
          <li>Mejorar la seguridad y funcionamiento del sistema.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Protección de datos</h2>
        <p className="mb-4">
          Aplicamos medidas de seguridad técnicas y organizativas para evitar accesos no autorizados
          y proteger la integridad de la información almacenada.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Derechos del usuario</h2>
        <p className="mb-4">
          Puedes acceder, corregir o eliminar tus datos personales escribiendo a
          <strong> privacidad@appointler.com</strong>. Cumplimos con la Ley 1581 de 2012 de Protección
          de Datos Personales y demás normativas aplicables en Colombia.
        </p>

        <p className="italic text-sm text-gray-600">
          Última actualización: 3 de noviembre de 2025.
        </p>
      </section>

      <CustomFooter />
    </>
  );
}

export default PrivacyPage;
