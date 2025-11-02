export class DashboardStats {
  constructor(
    public citasHoy: number,
    public citasHoyDiff: string,
    public clientesActivos: number,
    public clientesActivosDiff: string,
    public ingresosMes: number,
    public ingresosMesDiff: string,
    public tasaOcupacion: number,
    public tasaOcupacionDiff: string,
  ) {}
}
