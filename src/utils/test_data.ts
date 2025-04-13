export type Order = {
  id: string;
  doctor: Doctor;
  patient: Patient;
  clinic: Clinic;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  phase?: OrderPhase;
};

export type OrderPhase = {
  id: string;
  name: string;
  status: PhaseStatus;
  startedAt: string;
  finishedAt?: string;
};

export type PhaseStatus = 'open' | 'casting' | 'design' | 'printing' | 'milling' | 'finishing' | 'shipping';
export type OrderStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  attachments?: string[];
};

export type Doctor = User & {
  orders: Order[];
  clinics?: Clinic[];
};

export type Patient = User & {
  clinics?: Clinic[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: Date;
  createdAt: string;
};

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    phone: '+20123456789',
    address: 'Cairo, Egypt',
    dob: new Date('1985-07-12'),
    createdAt: '2024-01-01T10:00:00Z',
    clinics: [],
  },
  {
    id: '2',
    name: 'Sara Ahmed',
    email: 'sara@example.com',
    phone: '+20198765432',
    address: 'Alexandria, Egypt',
    dob: new Date('1992-03-25'),
    createdAt: '2024-01-02T11:00:00Z',
    clinics: [],
  },
  {
    id: '3',
    name: 'Omar Hassan',
    email: 'omar@example.com',
    phone: '+20145678923',
    address: 'Giza, Egypt',
    dob: new Date('1978-11-08'),
    createdAt: '2024-01-03T09:00:00Z',
    clinics: [],
  },
  {
    id: '4',
    name: 'Nour Ibrahim',
    email: 'nour@example.com',
    phone: '+20187654321',
    address: 'Luxor, Egypt',
    dob: new Date('1990-05-17'),
    createdAt: '2024-01-04T14:00:00Z',
    clinics: [],
  },
  {
    id: '5',
    name: 'Youssef Ali',
    email: 'youssef@example.com',
    phone: '+20132456789',
    address: 'Aswan, Egypt',
    dob: new Date('1983-09-30'),
    createdAt: '2024-01-05T16:00:00Z',
    clinics: [],
  },
];

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Mohamed Mahmoud',
    email: 'dr.mohamed@example.com',
    phone: '+20111222333',
    address: 'Cairo Medical Center',
    dob: new Date('1975-04-18'),
    createdAt: '2023-12-01T08:00:00Z',
    orders: [],
    clinics: [],
  },
  {
    id: 'd2',
    name: 'Fatima Hussein',
    email: 'dr.fatima@example.com',
    phone: '+20144555666',
    address: 'Alexandria Hospital',
    dob: new Date('1982-09-23'),
    createdAt: '2023-12-02T09:00:00Z',
    orders: [],
    clinics: [],
  },
  {
    id: 'd3',
    name: 'Ahmed Kamal',
    email: 'dr.ahmed@example.com',
    phone: '+20177888999',
    address: 'Giza Medical Complex',
    dob: new Date('1979-11-05'),
    createdAt: '2023-12-03T10:00:00Z',
    orders: [],
    clinics: [],
  },
  {
    id: 'd4',
    name: 'Layla Zaki',
    email: 'dr.layla@example.com',
    phone: '+20122333444',
    address: 'Luxor Clinic',
    dob: new Date('1985-02-14'),
    createdAt: '2023-12-04T11:00:00Z',
    orders: [],
    clinics: [],
  },
  {
    id: 'd5',
    name: 'Omar Farid',
    email: 'dr.omar@example.com',
    phone: '+20166777888',
    address: 'Aswan Medical Center',
    dob: new Date('1980-07-30'),
    createdAt: '2023-12-05T12:00:00Z',
    orders: [],
    clinics: [],
  },
];

export type Clinic = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  phone: string;
  email: string;
  orders: Order[];
  doctors?: Doctor[];
  patients?: Patient[];
};

export const clinics: Clinic[] = [
  {
    id: 'c1',
    name: 'Bright Smile Dental',
    address: '123 Main St, Anytown, CA 94501',
    phone: '+20111222333',
    email: 'brightsmile@example.com',
    createdAt: '2023-01-15T10:00:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
  {
    id: 'c2',
    name: 'Perfect Teeth Clinic',
    address: '456 Oak Ave, Springfield, IL 62701',
    phone: '+20144555666',
    email: 'perfectteeth@example.com',
    createdAt: '2023-02-20T09:30:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
  {
    id: 'c3',
    name: 'Gentle Dental Care',
    address: '789 Pine Rd, Lakeside, WA 98001',
    phone: '+20177888999',
    email: 'gentledental@example.com',
    createdAt: '2023-03-10T14:15:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
  {
    id: 'c4',
    name: 'Advanced Orthodontics',
    address: '101 Cedar Blvd, Mountainview, CO 80301',
    phone: '+20122333444',
    email: 'advancedortho@example.com',
    createdAt: '2023-04-05T11:45:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
  {
    id: 'c5',
    name: 'Family Dental Associates',
    address: '202 Maple Dr, Riverside, TX 77001',
    phone: '+20133444555',
    email: 'familydental@example.com',
    createdAt: '2023-05-12T08:20:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
  {
    id: 'c6',
    name: 'Sunrise Dental Group',
    address: '303 Elm St, Oceanside, FL 33101',
    phone: '+20133444555',
    email: 'sunrisedental@example.com',
    createdAt: '2023-06-18T13:10:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
  {
    id: 'c7',
    name: 'Premier Dental Solutions',
    address: '404 Birch Ln, Highland, NY 12528',
    phone: '+20155666777',
    email: 'premierdental@example.com',
    createdAt: '2023-07-22T15:30:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
  {
    id: 'c8',
    name: 'Coastal Smile Center',
    address: '505 Beach Rd, Bayview, OR 97420',
    phone: '+20188999000',
    email: 'coastalsmile@example.com',
    createdAt: '2023-08-30T10:45:00Z',
    orders: [],
    doctors: [],
    patients: [],
  },
];

// Set up many-to-many relationships
doctors.forEach((doctor, index) => {
  // Each doctor works in 2-3 clinics
  const clinicIndices = [index % clinics.length, (index + 1) % clinics.length, (index + 2) % clinics.length];
  doctor.clinics = clinicIndices.map((i) => clinics[i]);

  // Add doctor to those clinics
  clinicIndices.forEach((i) => {
    if (!clinics[i].doctors?.includes(doctor)) {
      clinics[i].doctors?.push(doctor);
    }
  });
});

patients.forEach((patient, index) => {
  // Each patient is registered in 1-2 clinics
  const clinicIndices = [index % clinics.length, (index + 3) % clinics.length];
  patient.clinics = clinicIndices.map((i) => clinics[i]);

  // Add patient to those clinics
  clinicIndices.forEach((i) => {
    if (!clinics[i].patients?.includes(patient)) {
      clinics[i].patients?.push(patient);
    }
  });
});

export const orders: Order[] = [
  {
    id: 'o1',
    doctor: doctors[0],
    patient: patients[0],
    clinic: clinics[0],
    status: 'completed',
    createdAt: '2024-01-10T09:00:00Z',
    items: [
      {
        id: 'i1',
        name: 'Dental Casting',
        price: 500,
        quantity: 1,
        attachments: ['image1.jpg'],
      },
    ],
    phase: {
      id: 'p1',
      name: 'Shipping',
      status: 'shipping',
      startedAt: '2024-01-10T09:30:00Z',
    },
  },
  {
    id: 'o2',
    doctor: doctors[1],
    patient: patients[1],
    clinic: clinics[1],
    status: 'in-progress',
    createdAt: '2024-01-11T10:00:00Z',
    items: [
      {
        id: 'i2',
        name: 'Crown Fitting',
        price: 800,
        quantity: 1,
        attachments: ['image2.jpg'],
      },
    ],
    phase: {
      id: 'p2',
      name: 'Design',
      status: 'design',
      startedAt: '2024-01-11T10:30:00Z',
    },
  },
  {
    id: 'o3',
    doctor: doctors[2],
    patient: patients[2],
    clinic: clinics[2],
    status: 'completed',
    createdAt: '2024-01-12T11:00:00Z',
    items: [
      {
        id: 'i3',
        name: 'Bridge Work',
        price: 1200,
        quantity: 1,
        attachments: ['image3.jpg'],
      },
    ],
    phase: {
      id: 'p3',
      name: 'Shipping',
      status: 'shipping',
      startedAt: '2024-01-12T11:30:00Z',
    },
  },
  {
    id: 'o4',
    doctor: doctors[3],
    patient: patients[3],
    clinic: clinics[3],
    status: 'in-progress',
    createdAt: '2024-01-13T12:00:00Z',
    items: [
      {
        id: 'i4',
        name: 'Dental Implant',
        price: 2000,
        quantity: 1,
        attachments: ['image4.jpg'],
      },
    ],
    phase: {
      id: 'p4',
      name: 'Design',
      status: 'design',
      startedAt: '2024-01-13T12:30:00Z',
    },
  },
  {
    id: 'o5',
    doctor: doctors[4],
    patient: patients[4],
    clinic: clinics[4],
    status: 'cancelled',
    createdAt: '2024-01-14T13:00:00Z',
    items: [
      {
        id: 'i5',
        name: 'Veneer Installation',
        price: 1500,
        quantity: 1,
        attachments: ['image5.jpg'],
      },
    ],
    phase: {
      id: 'p5',
      name: 'Casting',
      status: 'casting',
      startedAt: '2024-01-14T13:30:00Z',
    },
  },
  {
    id: 'o6',
    doctor: doctors[0],
    patient: patients[1],
    clinic: clinics[5],
    status: 'in-progress',
    createdAt: '2024-01-15T09:00:00Z',
    items: [
      {
        id: 'i6',
        name: 'Dental Crown',
        price: 900,
        quantity: 1,
        attachments: ['image6.jpg'],
      },
    ],
    phase: {
      id: 'p6',
      name: 'Printing',
      status: 'printing',
      startedAt: '2024-01-15T09:30:00Z',
    },
  },
  {
    id: 'o7',
    doctor: doctors[1],
    patient: patients[2],
    clinic: clinics[6],
    status: 'completed',
    createdAt: '2024-01-16T10:00:00Z',
    items: [
      {
        id: 'i7',
        name: 'Dental Bridge',
        price: 1300,
        quantity: 1,
        attachments: ['image7.jpg'],
      },
    ],
    phase: {
      id: 'p7',
      name: 'Shipping',
      status: 'shipping',
      startedAt: '2024-01-16T10:30:00Z',
    },
  },
  {
    id: 'o8',
    doctor: doctors[2],
    patient: patients[3],
    clinic: clinics[7],
    status: 'completed',
    createdAt: '2024-01-17T11:00:00Z',
    items: [
      {
        id: 'i8',
        name: 'Dental Implant',
        price: 2200,
        quantity: 1,
        attachments: ['image8.jpg'],
      },
    ],
    phase: {
      id: 'p8',
      name: 'Shipping',
      status: 'shipping',
      startedAt: '2024-01-17T11:30:00Z',
    },
  },
  {
    id: 'o9',
    doctor: doctors[3],
    patient: patients[4],
    clinic: clinics[0],
    status: 'pending',
    createdAt: '2024-01-18T12:00:00Z',
    items: [
      {
        id: 'i9',
        name: 'Veneers',
        price: 1600,
        quantity: 2,
        attachments: ['image9.jpg'],
      },
    ],
    phase: {
      id: 'p9',
      name: 'Finishing',
      status: 'finishing',
      startedAt: '2024-01-18T12:30:00Z',
    },
  },
  {
    id: 'o10',
    doctor: doctors[4],
    patient: patients[0],
    clinic: clinics[1],
    status: 'in-progress',
    createdAt: '2024-01-19T13:00:00Z',
    items: [
      {
        id: 'i10',
        name: 'Dental Crown',
        price: 950,
        quantity: 1,
        attachments: ['image10.jpg'],
      },
    ],
    phase: {
      id: 'p10',
      name: 'Casting',
      status: 'casting',
      startedAt: '2024-01-19T13:30:00Z',
    },
  },
  {
    id: 'o11',
    doctor: doctors[0],
    patient: patients[2],
    clinic: clinics[2],
    status: 'cancelled',
    createdAt: '2024-01-20T14:00:00Z',
    items: [
      {
        id: 'i11',
        name: 'Bridge Work',
        price: 1400,
        quantity: 1,
        attachments: ['image11.jpg'],
      },
    ],
    phase: {
      id: 'p11',
      name: 'Finishing',
      status: 'finishing',
      startedAt: '2024-01-20T14:30:00Z',
    },
  },
  {
    id: 'o12',
    doctor: doctors[1],
    patient: patients[3],
    clinic: clinics[3],
    status: 'in-progress',
    createdAt: '2024-01-21T15:00:00Z',
    items: [
      {
        id: 'i12',
        name: 'Dental Implant',
        price: 2300,
        quantity: 1,
        attachments: ['image12.jpg'],
      },
    ],
    phase: {
      id: 'p12',
      name: 'Milling',
      status: 'milling',
      startedAt: '2024-01-21T15:30:00Z',
    },
  },
  {
    id: 'o13',
    doctor: doctors[2],
    patient: patients[4],
    clinic: clinics[4],
    status: 'completed',
    createdAt: '2024-01-22T16:00:00Z',
    items: [
      {
        id: 'i13',
        name: 'Veneer Installation',
        price: 1700,
        quantity: 2,
        attachments: ['image13.jpg'],
      },
    ],
    phase: {
      id: 'p13',
      name: 'Design',
      status: 'design',
      startedAt: '2024-01-22T16:30:00Z',
    },
  },
  {
    id: 'o14',
    doctor: doctors[3],
    patient: patients[0],
    clinic: clinics[5],
    status: 'in-progress',
    createdAt: '2024-01-23T17:00:00Z',
    items: [
      {
        id: 'i14',
        name: 'Dental Crown',
        price: 1000,
        quantity: 1,
        attachments: ['image14.jpg'],
      },
    ],
    phase: {
      id: 'p14',
      name: 'Printing',
      status: 'printing',
      startedAt: '2024-01-23T17:30:00Z',
    },
  },
  {
    id: 'o15',
    doctor: doctors[4],
    patient: patients[1],
    clinic: clinics[6],
    status: 'pending',
    createdAt: '2024-01-24T18:00:00Z',
    items: [
      {
        id: 'i15',
        name: 'Bridge Work',
        price: 1500,
        quantity: 1,
        attachments: ['image15.jpg'],
      },
    ],
    phase: {
      id: 'p15',
      name: 'Printing',
      status: 'printing',
      startedAt: '2024-01-24T18:30:00Z',
    },
  },
];

// Add orders to their respective clinics
orders.forEach((order) => {
  order.clinic.orders.push(order);
});

export type Item = {
  id: string;
  name: string;
  price: number;
};

export type RestorationItem = Item & {
  quantity: number;
};

export const items: Item[] = [
  {
    id: 'i1',
    name: 'Dental Crown',
    price: 1000,
  },
  {
    id: 'i2',
    name: 'Porcelain Veneer',
    price: 850,
  },
  {
    id: 'i3',
    name: 'Dental Bridge (3 units)',
    price: 2500,
  },
  {
    id: 'i4',
    name: 'Dental Implant',
    price: 3000,
  },
  {
    id: 'i5',
    name: 'Root Canal Treatment',
    price: 750,
  },
  {
    id: 'i6',
    name: 'Composite Filling',
    price: 200,
  },
  {
    id: 'i7',
    name: 'Teeth Whitening',
    price: 350,
  },
  {
    id: 'i8',
    name: 'Dentures (Full Set)',
    price: 1800,
  },
  {
    id: 'i9',
    name: 'Invisalign Treatment',
    price: 4500,
  },
  {
    id: 'i10',
    name: 'Dental Night Guard',
    price: 300,
  },
  {
    id: 'i11',
    name: 'Zirconia Crown',
    price: 1200,
  },
  {
    id: 'i12',
    name: 'Partial Denture',
    price: 950,
  },
];
