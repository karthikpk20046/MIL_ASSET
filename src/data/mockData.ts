import { Asset, Base, Transfer, User, AssetMovement } from '../types';

// Current user for the demo
export const currentUser: User = {
  id: 'user1',
  name: 'John Doe',
  role: 'commander',
  base: 'base1'
};

// Bases
export const bases: Base[] = [
  { id: 'base1', name: 'Alpha Base', location: 'Northern Region' },
  { id: 'base2', name: 'Bravo Base', location: 'Eastern Region' },
  { id: 'base3', name: 'Charlie Base', location: 'Southern Region' },
  { id: 'base4', name: 'Delta Base', location: 'Western Region' },
];

// Assets
export const assets: Asset[] = [
  { id: 'asset1', name: 'M1 Abrams Tank', category: 'vehicle', quantity: 12, base: 'base1', status: 'available' },
  { id: 'asset2', name: 'Humvee', category: 'vehicle', quantity: 30, base: 'base1', status: 'available' },
  { id: 'asset3', name: 'M4 Carbine', category: 'weapon', quantity: 150, base: 'base1', status: 'available' },
  { id: 'asset4', name: '5.56mm Ammunition', category: 'ammunition', quantity: 10000, base: 'base1', status: 'available' },
  { id: 'asset5', name: 'Bradley Fighting Vehicle', category: 'vehicle', quantity: 8, base: 'base2', status: 'available' },
  { id: 'asset6', name: 'Javelin Missile System', category: 'weapon', quantity: 15, base: 'base2', status: 'available' },
  { id: 'asset7', name: 'Black Hawk Helicopter', category: 'vehicle', quantity: 5, base: 'base3', status: 'available' },
  { id: 'asset8', name: '7.62mm Ammunition', category: 'ammunition', quantity: 8000, base: 'base3', status: 'available' },
  { id: 'asset9', name: 'Stryker APC', category: 'vehicle', quantity: 10, base: 'base4', status: 'available' },
  { id: 'asset10', name: 'M777 Howitzer', category: 'weapon', quantity: 4, base: 'base4', status: 'available' },
];

// Transfers
export const transfers: Transfer[] = [
  { 
    id: 'transfer1', 
    assetId: 'asset2', 
    assetName: 'Humvee', 
    quantity: 5, 
    fromBase: 'base1', 
    toBase: 'base2', 
    date: '2023-10-15', 
    status: 'completed', 
    initiatedBy: 'user1' 
  },
  { 
    id: 'transfer2', 
    assetId: 'asset3', 
    assetName: 'M4 Carbine', 
    quantity: 20, 
    fromBase: 'base1', 
    toBase: 'base3', 
    date: '2023-11-02', 
    status: 'in-transit', 
    initiatedBy: 'user1' 
  },
  { 
    id: 'transfer3', 
    assetId: 'asset4', 
    assetName: '5.56mm Ammunition', 
    quantity: 2000, 
    fromBase: 'base1', 
    toBase: 'base4', 
    date: '2023-11-10', 
    status: 'pending', 
    initiatedBy: 'user1' 
  },
];

// Asset Movements
export const assetMovements: AssetMovement[] = [
  { 
    id: 'mov1', 
    assetId: 'asset1', 
    assetName: 'M1 Abrams Tank', 
    category: 'vehicle',
    type: 'purchase', 
    quantity: 2, 
    base: 'base1', 
    date: '2023-09-01' 
  },
  { 
    id: 'mov2', 
    assetId: 'asset2', 
    assetName: 'Humvee', 
    category: 'vehicle',
    type: 'transfer-out', 
    quantity: 5, 
    base: 'base1', 
    date: '2023-10-15',
    relatedTransferId: 'transfer1' 
  },
  { 
    id: 'mov3', 
    assetId: 'asset2', 
    assetName: 'Humvee', 
    category: 'vehicle',
    type: 'transfer-in', 
    quantity: 5, 
    base: 'base2', 
    date: '2023-10-15',
    relatedTransferId: 'transfer1' 
  },
  { 
    id: 'mov4', 
    assetId: 'asset3', 
    assetName: 'M4 Carbine', 
    category: 'vehicle',
    type: 'assignment', 
    quantity: 50, 
    base: 'base1', 
    date: '2023-10-20' 
  },
  { 
    id: 'mov5', 
    assetId: 'asset4', 
    assetName: '5.56mm Ammunition', 
    category: 'ammunition',
    type: 'expenditure', 
    quantity: 1000, 
    base: 'base1', 
    date: '2023-10-25' 
  },
];

// Helper functions to simulate API calls
export const getAssetsByBase = (baseId: string): Asset[] => {
  return assets.filter(asset => asset.base === baseId);
};

export const getAssetMovementsByBase = (baseId: string): AssetMovement[] => {
  return assetMovements.filter(movement => movement.base === baseId);
};

export const getTransfersByBase = (baseId: string): Transfer[] => {
  return transfers.filter(transfer => transfer.fromBase === baseId || transfer.toBase === baseId);
};

export const calculateBalanceData = (baseId: string, startDate: string, endDate: string): BalanceData => {
  const relevantMovements = assetMovements.filter(
    movement => movement.base === baseId && movement.date >= startDate && movement.date <= endDate
  );
  
  const purchases = relevantMovements
    .filter(m => m.type === 'purchase')
    .reduce((sum, m) => sum + m.quantity, 0);
    
  const transfersIn = relevantMovements
    .filter(m => m.type === 'transfer-in')
    .reduce((sum, m) => sum + m.quantity, 0);
    
  const transfersOut = relevantMovements
    .filter(m => m.type === 'transfer-out')
    .reduce((sum, m) => sum + m.quantity, 0);
    
  const assigned = relevantMovements
    .filter(m => m.type === 'assignment')
    .reduce((sum, m) => sum + m.quantity, 0);
    
  const expended = relevantMovements
    .filter(m => m.type === 'expenditure')
    .reduce((sum, m) => sum + m.quantity, 0);
  
  const netMovement = purchases + transfersIn - transfersOut;
  
  // Calculate opening and closing balances
  // For this demo, we'll just use arbitrary values
  const opening = 50000;
  const closing = opening + netMovement - expended;
  
  return {
    opening,
    closing,
    netMovement,
    purchases,
    transfersIn,
    transfersOut,
    assigned,
    expended
  };
};
