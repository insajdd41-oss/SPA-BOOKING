export type BookingStatus = 'new' | 'confirmed' | 'done' | 'cancelled';
export type ServiceCategory = 'Массаж' | 'SPA' | 'Уход';
export type MasterName = 'Ирина' | 'Ольга' | 'Дмитрий';

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceTitle: string;
  description: string;
  category: ServiceCategory;
  masterName: MasterName;
  status: BookingStatus;
  price: number;
  durationMin: number;
  date: string;
  time: string;
  isPaid: boolean;
  createdAt: string;
}