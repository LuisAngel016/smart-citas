# Arquitectura de SmartCitas

Este documento describe la arquitectura del frontend de SmartCitas, convenciones y flujos habituales con ejemplos específicos de los módulos `appointments` y `clients`.

## Visión general

SmartCitas adopta una aproximación modular por dominios y una separación en capas inspirada en Clean Architecture:

- Cada dominio tiene su propia carpeta bajo `src/` (por ejemplo `appointments`, `clients`, `auth`).
- Dentro de cada dominio se separan responsabilidades en subcarpetas: `domain`, `application`, `infrastructure`, `presentation`, y ocasionalmente `IoC`.

Estructura típica de un módulo:

```
src/
  <domain>/               # Ejemplo: appointments, clients
    domain/              # Lógica de negocio pura
      entities/          # Modelos del dominio
      interfaces/        # Contratos/tipos compartidos
      repositories/      # Interfaces de repositorios
    application/         # Casos de uso (usecases)
    infrastructure/      # Implementaciones concretas
      dto/              # Data Transfer Objects
      hooks/            # React hooks personalizados
      mappers/          # Transformadores de datos
      repositories/     # Implementaciones de repositorios
    presentation/        # Capa de UI
      components/       # Componentes React
      pages/           # Páginas/vistas
    IoC/               # Inyección de dependencias
```

## Ejemplo detallado: Módulo Appointments

### 📁 domain/ - Lógica de Negocio Pura

#### entities/
```
appointment.entity.ts    # Entidad Appointment
```
**Contenido típico:**
```typescript
export class Appointment {
  id: string;
  clientId: string;
  serviceId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  // ... otros campos
}
```

#### interfaces/
```
appointment-page.interface.ts    # Interface para paginación
```
**Contenido típico:**
```typescript
export interface AppointmentPage {
  items: Appointment[];
  total: number;
  page: number;
  pageSize: number;
}
```

#### repositories/
```
appointment.repository.ts    # Contrato del repositorio
```
**Contenido típico:**
```typescript
export interface IAppointmentRepository {
  getAll(): Promise<Appointment[]>;
  getById(id: string): Promise<Appointment>;
  create(appointment: Appointment): Promise<Appointment>;
  update(id: string, appointment: Appointment): Promise<Appointment>;
  delete(id: string): Promise<void>;
}
```

### 📁 application/ - Casos de Uso

```
create-appointment.usecase.ts     # Crear nueva cita
delete-appointment.usecase.ts     # Eliminar cita
get-appointment-by-id.usecase.ts  # Obtener cita específica
get-appointments.usecase.ts       # Listar todas las citas
update-appointment.usecase.ts     # Actualizar cita existente
```

**Ejemplo de usecase:**
```typescript
// create-appointment.usecase.ts
export class CreateAppointmentUseCase {
  constructor(private repository: IAppointmentRepository) {}
  
  async execute(data: CreateAppointmentDTO): Promise<Appointment> {
    // Lógica de validación
    // Llamada al repositorio
    return await this.repository.create(data);
  }
}
```

### 📁 infrastructure/ - Implementaciones Concretas

#### dto/response/
```
appointment-api.response.ts      # DTO para una cita desde API
appointments-api.response.ts     # DTO para lista de citas desde API
```
**Contenido típico:**
```typescript
// appointment-api.response.ts
export interface AppointmentApiResponse {
  id: string;
  client_id: string;  // snake_case de la API
  service_id: string;
  appointment_date: string;  // fecha como string
  // ... campos de la API
}
```

#### mappers/
```
appointment.mapper.ts    # Transforma API response → Entity
```
**Contenido típico:**
```typescript
export class AppointmentMapper {
  static toDomain(dto: AppointmentApiResponse): Appointment {
    return new Appointment({
      id: dto.id,
      clientId: dto.client_id,  // snake_case → camelCase
      serviceId: dto.service_id,
      date: new Date(dto.appointment_date),  // string → Date
      // ... transformaciones
    });
  }
  
  static toApi(entity: Appointment): AppointmentApiRequest {
    // Inverso: Entity → API format
  }
}
```

#### repositories/
```
appointment.repository.impl.ts    # Implementación del repositorio
```
**Contenido típico:**
```typescript
export class AppointmentRepositoryImpl implements IAppointmentRepository {
  constructor(private httpClient: HttpClient) {}
  
  async getAll(): Promise<Appointment[]> {
    const response = await this.httpClient.get<AppointmentApiResponse[]>('/appointments');
    return response.map(AppointmentMapper.toDomain);
  }
  
  async create(appointment: Appointment): Promise<Appointment> {
    const dto = AppointmentMapper.toApi(appointment);
    const response = await this.httpClient.post('/appointments', dto);
    return AppointmentMapper.toDomain(response);
  }
  // ... otros métodos
}
```

#### hooks/
```
useAppointmentForm.tsx    # Hook para formularios de citas
```
**Contenido típico:**
```typescript
export const useAppointmentForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  
  const onSubmit = async (data) => {
    // Llamada al caso de uso
    await createAppointmentUseCase.execute(data);
  };
  
  return { isDialogOpen, register, handleSubmit, errors, /* ... */ };
}
```

### 📁 presentation/ - Capa de UI

```
components/
  AppointmentModal.tsx        # Modal para crear/editar
  AppointmentCard.tsx         # Card para mostrar cita
  WeeklyCalendar.tsx          # Calendario semanal
pages/
  AppointmentsPage.tsx        # Página principal de citas
```

### 📁 IoC/ - Inyección de Dependencias

```
appointment.container.ts    # Configuración de dependencias
```
**Contenido típico:**
```typescript
// Registro de implementaciones
const httpClient = new HttpClientAdapter();
const appointmentRepository = new AppointmentRepositoryImpl(httpClient);
const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository);
```

---

## Ejemplo detallado: Módulo Clients

### 📁 domain/domain/ (estructura anidada actual)

```
entities/
  client.entity.ts           # Entidad Client
interfaces/
  client-page.interface.ts   # Interface para paginación
repositories/
  client.repository.ts       # Contrato del repositorio
```

**Ejemplo de entidad:**
```typescript
// client.entity.ts
export class Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: Date;
  totalAppointments: number;
}
```

### 📁 application/

```
create-client.usecase.ts         # Registrar nuevo cliente
delete-client.usecase.ts         # Eliminar cliente
get-client-by-id.usecase.ts      # Obtener cliente específico
get-clients.usecase.ts           # Listar todos los clientes
update-client.usecase.ts         # Actualizar datos del cliente
```

### 📁 infrastructure/

```
dto/
  response/
    client-api.response.ts       # DTO para un cliente desde API
    clients-api.response.ts      # DTO para lista de clientes
  request/
    create-client.request.ts     # DTO para crear cliente
    update-client.request.ts     # DTO para actualizar cliente
mappers/
  client.mapper.ts               # Transforma API ↔ Entity
repositories/
  client.repository.impl.ts      # Implementación del repositorio
hooks/
  useClientForm.tsx              # Hook para formularios de clientes
  useClients.tsx                 # Hook para listar clientes
```

### 📁 presentation/

```
components/
  ClientCard.tsx                 # Card para mostrar cliente
  ClientModal.tsx                # Modal para crear/editar
  ClientSearch.tsx               # Buscador de clientes
pages/
  ClientsPage.tsx                # Página principal de clientes
  ClientDetailPage.tsx           # Detalle de un cliente
```

---

---

## Capas y responsabilidades

### 🎯 Domain (Lógica de Negocio Pura)
**No debe depender de frameworks ni HTTP**

- **entities/**: Modelos del dominio con su lógica
  - Ejemplo: `appointment.entity.ts`, `client.entity.ts`
  - Representan conceptos del negocio
  - Pueden tener métodos de validación o comportamiento

- **interfaces/**: Contratos y tipos compartidos
  - Ejemplo: `appointment-page.interface.ts`
  - Define estructuras de datos complejas
  - Tipos de respuesta paginadas

- **repositories/**: Interfaces de repositorios (contratos)
  - Ejemplo: `appointment.repository.ts`, `client.repository.ts`
  - Define ÚNICAMENTE los contratos (interfaces)
  - NO contiene implementaciones

**Regla de oro:** Domain NO conoce cómo se obtienen los datos, solo define QUÉ datos necesita.

---

### 🔄 Application (Casos de Uso)
**Orquesta la lógica de negocio usando interfaces del domain**

- Archivos con patrón `<accion>-<entidad>.usecase.ts`
- Ejemplos:
  - `create-appointment.usecase.ts`
  - `get-clients.usecase.ts`
  - `update-client.usecase.ts`

**Responsabilidades:**
- Validar reglas de negocio
- Coordinar entre múltiples repositorios si es necesario
- Transformar datos entre capas
- NO debe conocer detalles de HTTP o UI

**Ejemplo de estructura:**
```typescript
export class GetAppointmentsUseCase {
  constructor(private repository: IAppointmentRepository) {}
  
  async execute(filters?: AppointmentFilters): Promise<Appointment[]> {
    // Validación de reglas de negocio
    if (filters?.date && filters.date < new Date()) {
      throw new Error('No se pueden buscar citas en el pasado');
    }
    
    // Delegación al repositorio
    return await this.repository.getAll(filters);
  }
}
```

---

### 🔌 Infrastructure (Implementaciones Concretas)
**Conecta con el mundo exterior: APIs, localStorage, etc.**

#### dto/ (Data Transfer Objects)
- **response/**: Respuestas de la API
  - `appointment-api.response.ts` - Estructura que retorna la API
  - `clients-api.response.ts` - Lista de clientes de la API
  
- **request/**: Datos que se envían a la API
  - `create-appointment.request.ts` - Payload para crear cita
  - `update-client.request.ts` - Payload para actualizar cliente

**Propósito:** Aislar el formato de la API del resto de la app

#### mappers/
- Transformadores bidireccionales: API ↔ Domain Entity
- Archivos: `<entidad>.mapper.ts`
  - `appointment.mapper.ts`
  - `client.mapper.ts`

**Funciones típicas:**
- `toDomain(dto)`: API Response → Domain Entity
- `toApi(entity)`: Domain Entity → API Request
- `toDomainList(dtos)`: Array de DTOs → Array de Entities

**Ejemplo:**
```typescript
export class ClientMapper {
  static toDomain(dto: ClientApiResponse): Client {
    return new Client({
      id: dto.id,
      fullName: dto.full_name,        // snake_case → camelCase
      email: dto.email,
      phone: dto.phone_number,
      createdAt: new Date(dto.created_at),  // string → Date
      totalAppointments: dto.appointments_count,
    });
  }
  
  static toApi(client: Client): CreateClientRequest {
    return {
      full_name: client.fullName,     // camelCase → snake_case
      email: client.email,
      phone_number: client.phone,
    };
  }
}
```

#### repositories/
- Implementaciones reales de las interfaces definidas en domain
- Archivos: `<entidad>.repository.impl.ts`
  - `appointment.repository.impl.ts`
  - `client.repository.impl.ts`

**Responsabilidades:**
- Realizar llamadas HTTP
- Manejar errores de red
- Usar mappers para transformar datos
- Implementar cache si es necesario

#### hooks/
- React hooks personalizados que unen UI con lógica
- Archivos: `use<Entidad><Accion>.tsx`
  - `useAppointmentForm.tsx` - Manejo de formularios
  - `useClients.tsx` - Listado con estado
  - `useClientForm.tsx` - Formulario de cliente

**Propósito:** Encapsular lógica reutilizable de UI

---

### 🎨 Presentation (Capa de UI)
**Componentes React y páginas - Solo se preocupa de la UX**

#### components/
- Componentes reutilizables del módulo
- Ejemplos:
  - `AppointmentModal.tsx` - Modal de citas
  - `ClientCard.tsx` - Card de cliente
  - `WeeklyCalendar.tsx` - Calendario

#### pages/
- Páginas completas o vistas principales
- Ejemplos:
  - `AppointmentsPage.tsx`
  - `ClientsPage.tsx`
  - `ClientDetailPage.tsx`

**Reglas:**
- NO debe hacer llamadas HTTP directas
- Usa hooks de infrastructure
- Se enfoca en renderizado y eventos de usuario

---

### 💉 IoC (Inversion of Control)
**Configuración de dependencias**

- Archivo: `<entidad>.container.ts`
  - `appointment.container.ts`
  - `client.container.ts`

**Propósito:**
- Instanciar implementaciones concretas
- Inyectar dependencias en casos de uso
- Centralizar la creación de objetos

**Ejemplo:**
```typescript
// appointment.container.ts
import { HttpClientAdapter } from '@/shared/api/adapters';
import { AppointmentRepositoryImpl } from '../infrastructure/repositories';
import { CreateAppointmentUseCase } from '../application';

// Crear instancias
const httpClient = new HttpClientAdapter();
const appointmentRepository = new AppointmentRepositoryImpl(httpClient);

// Exportar casos de uso configurados
export const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository
);
export const getAppointmentsUseCase = new GetAppointmentsUseCase(
  appointmentRepository
);
```

---

---

## Flujo de datos completo (ejemplo: crear una cita)

### 🔄 Paso a paso con archivos reales

1. **Usuario interactúa con UI** 
   ```
   📄 AppointmentsPage.tsx (presentation/pages/)
   ↓
   Renderiza formulario y llama a hook
   ```

2. **Hook maneja el formulario**
   ```
   📄 useAppointmentForm.tsx (infrastructure/hooks/)
   ↓
   Captura datos del formulario
   Valida inputs
   ```

3. **Hook invoca caso de uso**
   ```
   📄 create-appointment.usecase.ts (application/)
   ↓
   Recibe: CreateAppointmentDTO
   Valida reglas de negocio
   ```

4. **Caso de uso llama al repositorio (interfaz)**
   ```
   📄 appointment.repository.ts (domain/repositories/)
   ↓
   Interface: IAppointmentRepository
   Método: create(appointment: Appointment)
   ```

5. **Implementación del repositorio hace llamada HTTP**
   ```
   📄 appointment.repository.impl.ts (infrastructure/repositories/)
   ↓
   - Transforma entity → DTO con mapper
   - Hace POST a la API
   - Recibe respuesta
   ```

6. **Mapper transforma respuesta API → Entity**
   ```
   📄 appointment.mapper.ts (infrastructure/mappers/)
   ↓
   - Recibe: AppointmentApiResponse (DTO)
   - Convierte: snake_case → camelCase
   - Transforma: string dates → Date objects
   - Retorna: Appointment (Entity)
   ```

7. **Resultado sube por las capas**
   ```
   Mapper → Repository → UseCase → Hook → Component
   ↓
   Actualiza UI con nueva cita creada
   ```

### 📊 Diagrama visual del flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  AppointmentsPage.tsx → useAppointmentForm.tsx              │
│  (Usuario completa formulario)                               │
└────────────────────────┬────────────────────────────────────┘
                         │ onSubmit(formData)
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  create-appointment.usecase.ts                               │
│  - Valida reglas de negocio                                  │
│  - Llama a repository.create()                               │
└────────────────────────┬────────────────────────────────────┘
                         │ IAppointmentRepository
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                       │
│  appointment.repository.impl.ts                              │
│  1. AppointmentMapper.toApi() → DTO Request                  │
│  2. HTTP POST /api/appointments                              │
│  3. Recibe respuesta (DTO Response)                          │
│  4. AppointmentMapper.toDomain() → Entity                    │
└────────────────────────┬────────────────────────────────────┘
                         │ Appointment Entity
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                        API EXTERNA                           │
│  Backend API (Express, NestJS, etc.)                         │
│  POST /api/appointments                                      │
│  Guarda en base de datos                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Nomenclatura y convenciones de archivos

### 📝 Patrones de nombres

#### Domain Layer
```
entities/
  <entidad>.entity.ts           # appointment.entity.ts
                                # client.entity.ts

interfaces/
  <entidad>-<concepto>.interface.ts   # appointment-page.interface.ts
                                      # client-filters.interface.ts

repositories/
  <entidad>.repository.ts       # appointment.repository.ts (interfaz)
                                # client.repository.ts (interfaz)
```

#### Application Layer
```
<verbo>-<entidad>.usecase.ts    # create-appointment.usecase.ts
                                # get-clients.usecase.ts
                                # update-client.usecase.ts
                                # delete-appointment.usecase.ts
```

#### Infrastructure Layer
```
dto/
  response/
    <entidad>-api.response.ts         # appointment-api.response.ts
    <entidades>-api.response.ts       # appointments-api.response.ts (plural)
  request/
    <accion>-<entidad>.request.ts     # create-appointment.request.ts

mappers/
  <entidad>.mapper.ts                 # appointment.mapper.ts

repositories/
  <entidad>.repository.impl.ts        # appointment.repository.impl.ts

hooks/
  use<Entidad><Accion>.tsx            # useAppointmentForm.tsx
                                      # useClients.tsx
```

#### Presentation Layer
```
components/
  <Entidad><Tipo>.tsx                 # AppointmentModal.tsx
                                      # ClientCard.tsx
                                      # WeeklyCalendar.tsx

pages/
  <Entidad>Page.tsx                   # AppointmentsPage.tsx
  <Entidad>DetailPage.tsx             # ClientDetailPage.tsx
```

#### IoC Layer
```
<entidad>.container.ts                # appointment.container.ts
                                      # client.container.ts
```

---

## Convenciones de código

### TypeScript Paths
- Configurado en `tsconfig.json`
- Uso: `@/*` apunta a `src/*`
- Ejemplos:
  ```typescript
  import { Appointment } from '@/appointments/domain/entities/appointment.entity';
  import { Button } from '@/shared/components/ui/button';
  import { HttpClient } from '@/shared/api/http/http-client';
  ```

### Estilos de escritura
- **Archivos y carpetas**: `kebab-case`
  - ✅ `create-appointment.usecase.ts`
  - ✅ `appointment-api.response.ts`
  - ❌ `CreateAppointment.usecase.ts`

- **Componentes React**: `PascalCase`
  - ✅ `AppointmentModal.tsx`
  - ✅ `ClientCard.tsx`
  - ❌ `appointmentModal.tsx`

- **Clases y Interfaces**: `PascalCase`
  ```typescript
  export class Appointment { }
  export interface IAppointmentRepository { }
  ```

- **Funciones y variables**: `camelCase`
  ```typescript
  const createAppointment = () => { };
  const appointmentData = { };
  ```

- **Constantes**: `UPPER_SNAKE_CASE`
  ```typescript
  const API_BASE_URL = 'https://api.example.com';
  const MAX_RETRIES = 3;
  ```

---

---

## Buenas prácticas y reglas

### ✅ DO (Hacer)

1. **Mantén las capas separadas**
   - ✅ Domain NO conoce Infrastructure
   - ✅ Application solo usa interfaces de Domain
   - ✅ Presentation solo usa hooks de Infrastructure

2. **Usa interfaces en Domain**
   ```typescript
   // ✅ BIEN - domain/repositories/appointment.repository.ts
   export interface IAppointmentRepository {
     getAll(): Promise<Appointment[]>;
   }
   ```

3. **Implementa en Infrastructure**
   ```typescript
   // ✅ BIEN - infrastructure/repositories/appointment.repository.impl.ts
   export class AppointmentRepositoryImpl implements IAppointmentRepository {
     async getAll(): Promise<Appointment[]> {
       // Llamada HTTP aquí
     }
   }
   ```

4. **Usa mappers para transformaciones**
   ```typescript
   // ✅ BIEN - infrastructure/mappers/appointment.mapper.ts
   const appointments = response.map(AppointmentMapper.toDomain);
   ```

5. **Documenta los contratos**
   ```typescript
   /**
    * Repositorio para gestionar citas
    * @interface IAppointmentRepository
    */
   export interface IAppointmentRepository {
     /**
      * Obtiene todas las citas del sistema
      * @returns Promise con array de citas
      */
     getAll(): Promise<Appointment[]>;
   }
   ```

### ❌ DON'T (No hacer)

1. **No hagas llamadas HTTP en Presentation**
   ```typescript
   // ❌ MAL - AppointmentsPage.tsx
   const response = await fetch('/api/appointments');
   
   // ✅ BIEN - AppointmentsPage.tsx
   const { appointments } = useAppointments(); // Hook de infrastructure
   ```

2. **No importes frameworks en Domain**
   ```typescript
   // ❌ MAL - domain/entities/appointment.entity.ts
   import axios from 'axios';
   
   // ✅ BIEN - domain/entities/appointment.entity.ts
   export class Appointment {
     // Solo lógica de negocio pura
   }
   ```

3. **No pongas lógica de negocio en componentes**
   ```typescript
   // ❌ MAL - AppointmentsPage.tsx
   const createAppointment = (data) => {
     if (data.date < new Date()) throw new Error('...');
     // validaciones complejas aquí
   }
   
   // ✅ BIEN - application/create-appointment.usecase.ts
   execute(data: CreateAppointmentDTO) {
     // Validaciones en el caso de uso
   }
   ```

4. **No mezcles DTO con Entities**
   ```typescript
   // ❌ MAL
   const appointment: AppointmentApiResponse = { /* ... */ };
   
   // ✅ BIEN
   const appointmentDto: AppointmentApiResponse = { /* ... */ };
   const appointment: Appointment = AppointmentMapper.toDomain(appointmentDto);
   ```

---

## Cómo agregar una nueva funcionalidad

### 📋 Checklist paso a paso

Ejemplo: Agregar "Cancelar cita con motivo"

#### 1. Domain - Define el contrato
```typescript
// domain/repositories/appointment.repository.ts
export interface IAppointmentRepository {
  // ... métodos existentes
  cancel(id: string, reason: string): Promise<void>;
}
```

#### 2. Application - Crea el caso de uso
```typescript
// application/cancel-appointment.usecase.ts
export class CancelAppointmentUseCase {
  constructor(private repository: IAppointmentRepository) {}
  
  async execute(id: string, reason: string): Promise<void> {
    // Validaciones de negocio
    if (!reason || reason.length < 10) {
      throw new Error('El motivo debe tener al menos 10 caracteres');
    }
    
    await this.repository.cancel(id, reason);
  }
}
```

#### 3. Infrastructure - Implementa el repositorio
```typescript
// infrastructure/repositories/appointment.repository.impl.ts
export class AppointmentRepositoryImpl implements IAppointmentRepository {
  // ... métodos existentes
  
  async cancel(id: string, reason: string): Promise<void> {
    await this.httpClient.post(`/appointments/${id}/cancel`, { 
      cancellation_reason: reason 
    });
  }
}
```

#### 4. Infrastructure - Crea el hook (si es necesario)
```typescript
// infrastructure/hooks/useCancelAppointment.tsx
export const useCancelAppointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const cancelAppointment = async (id: string, reason: string) => {
    setIsLoading(true);
    try {
      await cancelAppointmentUseCase.execute(id, reason);
      toast.success('Cita cancelada');
    } catch (error) {
      toast.error('Error al cancelar');
    } finally {
      setIsLoading(false);
    }
  };
  
  return { cancelAppointment, isLoading };
};
```

#### 5. Presentation - Usa en el componente
```typescript
// presentation/components/AppointmentCard.tsx
export const AppointmentCard = ({ appointment }) => {
  const { cancelAppointment, isLoading } = useCancelAppointment();
  
  const handleCancel = () => {
    const reason = prompt('Motivo de cancelación:');
    if (reason) {
      cancelAppointment(appointment.id, reason);
    }
  };
  
  return (
    <Card>
      {/* ... */}
      <Button onClick={handleCancel} disabled={isLoading}>
        Cancelar Cita
      </Button>
    </Card>
  );
};
```

#### 6. IoC - Registra el caso de uso
```typescript
// IoC/appointment.container.ts
export const cancelAppointmentUseCase = new CancelAppointmentUseCase(
  appointmentRepository
);
```

---

## Testing por capas

### Unit Tests recomendados

#### Domain - Testear entidades
```typescript
// domain/entities/__tests__/appointment.entity.test.ts
describe('Appointment Entity', () => {
  it('should create valid appointment', () => {
    const appointment = new Appointment({ /* ... */ });
    expect(appointment.isValid()).toBe(true);
  });
});
```

#### Application - Testear casos de uso
```typescript
// application/__tests__/create-appointment.usecase.test.ts
describe('CreateAppointmentUseCase', () => {
  it('should create appointment successfully', async () => {
    const mockRepo = { create: jest.fn() };
    const useCase = new CreateAppointmentUseCase(mockRepo);
    
    await useCase.execute(mockData);
    
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
```

#### Infrastructure - Testear mappers
```typescript
// infrastructure/mappers/__tests__/appointment.mapper.test.ts
describe('AppointmentMapper', () => {
  it('should map API response to domain entity', () => {
    const dto = { /* ... */ };
    const entity = AppointmentMapper.toDomain(dto);
    
    expect(entity).toBeInstanceOf(Appointment);
    expect(entity.clientId).toBe(dto.client_id);
  });
});
```

#### Presentation - Testear componentes
```typescript
// presentation/components/__tests__/AppointmentCard.test.tsx
describe('AppointmentCard', () => {
  it('should render appointment data', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByText('Cliente:')).toBeInTheDocument();
  });
});
```

---

## Estructura de carpetas compartidas (shared)

```
src/shared/
  api/
    adapters/        # Adaptadores HTTP (axios, fetch)
    http/           # Cliente HTTP base
    interfaces/     # Interfaces de API
  components/
    custom/         # Componentes personalizados
    ui/            # Componentes de UI (shadcn)
  contexts/         # Contextos React (Theme, Auth)
  hooks/           # Hooks globales
  layouts/         # Layouts de página
  lib/            # Utilidades (utils.ts)
```

---

## Diagrama de arquitectura completo

```
┌──────────────────────────────────────────────────────────────┐
│                         Frontend App                          │
│                        (React + Vite)                         │
└───────────────────────────┬──────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
    ┌───────▼────────┐            ┌────────▼────────┐
    │   /appointments │            │    /clients     │
    │     Module      │            │     Module      │
    └───────┬────────┘            └────────┬────────┘
            │                               │
    ┌───────▼──────────────────────────────▼───────┐
    │         PRESENTATION LAYER                    │
    │  - Components (AppointmentCard, etc.)         │
    │  - Pages (AppointmentsPage.tsx)               │
    │  - Hooks from infrastructure                  │
    └───────────────────┬───────────────────────────┘
                        │
    ┌───────────────────▼───────────────────────────┐
    │       INFRASTRUCTURE LAYER                    │
    │  - Hooks (useAppointmentForm)                 │
    │  - Repositories Implementation                │
    │  - Mappers (API ↔ Domain)                     │
    │  - DTOs (Request/Response)                    │
    └───────────────────┬───────────────────────────┘
                        │
    ┌───────────────────▼───────────────────────────┐
    │         APPLICATION LAYER                     │
    │  - Use Cases (Business Logic)                 │
    │  - create-appointment.usecase.ts              │
    │  - get-clients.usecase.ts                     │
    └───────────────────┬───────────────────────────┘
                        │
    ┌───────────────────▼───────────────────────────┐
    │           DOMAIN LAYER                        │
    │  - Entities (Appointment, Client)             │
    │  - Interfaces (IRepository)                   │
    │  - Business Rules (pure logic)                │
    └───────────────────┬───────────────────────────┘
                        │
    ┌───────────────────▼───────────────────────────┐
    │            EXTERNAL API                       │
    │  - REST API Backend                           │
    │  - GET/POST/PUT/DELETE endpoints              │
    └───────────────────────────────────────────────┘
```

---

## Dependencias entre capas

### ✅ Flujo permitido (de adentro hacia afuera)
```
Domain ← Application ← Infrastructure ← Presentation
```

- Presentation puede importar de Infrastructure
- Infrastructure puede importar de Application y Domain
- Application puede importar solo de Domain
- Domain NO importa de ninguna otra capa

### ❌ Flujo prohibido
```
Domain → Application  (❌)
Domain → Infrastructure  (❌)
Application → Infrastructure  (❌)
```

---

## Resumen rápido

| Capa | Responsabilidad | Ejemplos de archivos |
|------|----------------|----------------------|
| **Domain** | Lógica de negocio pura | `appointment.entity.ts`, `client.repository.ts` (interfaz) |
| **Application** | Casos de uso | `create-appointment.usecase.ts`, `get-clients.usecase.ts` |
| **Infrastructure** | Implementaciones e I/O | `appointment.repository.impl.ts`, `appointment.mapper.ts` |
| **Presentation** | UI y experiencia | `AppointmentsPage.tsx`, `ClientCard.tsx` |
| **IoC** | Inyección de dependencias | `appointment.container.ts` |

---

## Recursos adicionales

- [Clean Architecture - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

## Preguntas frecuentes

### ¿Por qué usar mappers?
Para aislar cambios en la API del resto de la aplicación. Si la API cambia `client_id` a `clientIdentifier`, solo actualizas el mapper.

### ¿Cuándo crear un nuevo módulo?
Cuando tengas una entidad de negocio distinta con su propio ciclo de vida (CRUD completo).

### ¿Puedo compartir entities entre módulos?
Sí, pero usa referencias por ID. Evita duplicar entities. Considera crear un módulo `shared` si son muy comunes.

### ¿Dónde va la lógica de validación?
- **Validación de formato**: En los hooks de formulario (infrastructure)
- **Reglas de negocio**: En los casos de uso (application)
- **Validación de entidad**: En la propia entity (domain)

---

**Última actualización:** Octubre 2025  
**Versión de arquitectura:** 2.0
