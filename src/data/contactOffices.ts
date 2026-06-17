export interface ContactOffice {
  id: string;
  country: string;
  label: string;
  title: string;
  addressLines: string[];
  phones: string[];
  telephones?: string[];
  hotline?: string;
  whatsappNumbers: string[];
  email: string;
  hours: string;
  mapUrl: string;
  directionsUrl: string;
  mapButtonLabel: string;
  status: 'active' | 'inactive';
  sortOrder: number;
}

export const CONTACT_OFFICES: ContactOffice[] = [
  {
    id: "bangladesh",
    country: "Bangladesh",
    label: "EUROSIA Bangladesh",
    title: "Bangladesh Office",
    addressLines: [
      "Eurosia",
      "144/5G, Matikata, Dhaka-1206, Bangladesh",
      "Near ECB Circle"
    ],
    phones: [
      "+880 1711-408725",
      "+880 1709-371514"
    ],
    telephones: [
      "+880 2 8711849",
      "+880 2 8715960"
    ],
    hotline: "09649-222222",
    whatsappNumbers: [
      "8801711408725",
      "8801709371514"
    ],
    email: "support@eurosia.com.bd",
    hours: "9:00 AM – 6:00 PM (GMT +6)",
    mapUrl: "https://maps.app.goo.gl/uogXdZRqTzaQYpfV6",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=144%2F5G%2C+Matikata%2C+Dhaka-1206%2C+Bangladesh",
    mapButtonLabel: "View Bangladesh Office",
    status: "active",
    sortOrder: 1
  },
  {
    id: "malaysia",
    country: "Malaysia",
    label: "EUROSIA Malaysia",
    title: "Malaysia Office",
    addressLines: [
      "Shop No. 2, Block 3A",
      "City Garden Commercial Centre",
      "Taman Nirwana",
      "68000 Ampang",
      "Selangor Darul Ehsan, Malaysia"
    ],
    phones: [
      "+60 1021-81687"
    ],
    whatsappNumbers: [
      "8801711408725"
    ],
    email: "support@eurosia.com.bd", // Defaulting as specified or generic support
    hours: "9:00 AM – 6:00 PM (GMT +8)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Shop%20No.%202%20Block%203A%20City%20Garden%20Commercial%20Centre%20Taman%20Nirwana%2068000%20Ampang%20Selangor%20Malaysia",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Shop+No.+2+Block+3A+City+Garden+Commercial+Centre+Taman+Nirwana+68000+Ampang+Selangor+Malaysia",
    mapButtonLabel: "View Malaysia Office",
    status: "active",
    sortOrder: 2
  }
];
