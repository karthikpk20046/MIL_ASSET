export type UserRole = 'commander' | 'logistics';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  base: string;
}

export interface Asset {
  id: string;
  name: string;
  category: 'vehicle' | 'weapon' | 'ammunition';
  quantity: number;
  base: string;
  status: 'available' | 'assigned' | 'in-transit' | 'expended';
  assignedTo?: string;
}

export interface Base {
  id: string;
  name: string;
  location: string;
}

export interface Transfer {
  id: string;
  assetId: string;
  assetName: string;
  quantity: number;
  fromBase: string;
  toBase: string;
  date: string;
  status: 'pending' | 'in-transit' | 'completed';
  initiatedBy: string;
}

export interface AssetMovement {
  id: string;
  assetId: string;
  assetName: string;
  category: 'vehicle' | 'weapon' | 'ammunition';
  type: 'purchase' | 'transfer-in' | 'transfer-out' | 'assignment' | 'expenditure';
  quantity: number;
  base: string;
  date: string;
  relatedTransferId?: string;
}

export interface BalanceData {
  opening: number;
  closing: number;
  netMovement: number;
  purchases: number;
  transfersIn: number;
  transfersOut: number;
  assigned: number;
  expended: number;
}
