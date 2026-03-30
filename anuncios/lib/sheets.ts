import Papa from 'papaparse';

export interface Announcement {
  id: string;
  type: string;
  category: string;
  title: string;
  person?: string;
  companions?: string[];
  persons?: string[];
  personLabel?: string;
  verse?: string;
  reference?: string;
  image?: string;
}

// URL del Google Sheet publicado como CSV
const DEFAULT_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1t5b-yFjIQc2LewdB7_d6kXlNfSbJ8yMCEL-AAS7cwnMbsCjBT8rGQYGhpj9hI_8bAWBt3pUpNQfV/pub?output=csv';

export async function fetchAnnouncementsFromSheet(url: string = DEFAULT_URL): Promise<Announcement[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo obtener el archivo CSV');
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map((row: any) => {
            // Handle companions
            const companions = row.companions ? row.companions.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
            
            // Handle persons (plural) - if it exists in CSV
            let persons = row.persons ? row.persons.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
            
            // Handle person (singular) - if persons is empty but person has value
            if (persons.length === 0 && row.person) {
              persons = row.person.split(',').map((s: string) => s.trim()).filter(Boolean);
            }

            return {
              ...row,
              companions,
              persons,
              // Fallback for components that still use 'person' singular property
              person: Array.isArray(persons) && persons.length > 0 ? persons[0] : (row.person || ""),
            };
          });
          resolve(data as Announcement[]);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}

export function getConfigs(data: Announcement[]) {
  const configs = data.filter(item => item.type === 'config');
  return {
    thisWeek: configs.find(c => c.category === 'date-esta-semana')?.title || "Para este Sabado 7 de Marzo del 2026 Nos ayudaran:",
    nextWeek: configs.find(c => c.category === 'date-proxima-semana')?.title || "Anuncios Para el Sábado 7 de Marzo del 2026",
    wednesday: configs.find(c => c.category === 'date-miercoles')?.title || "Miércoles de Oración - 11 de Marzo del 2026",
  };
}
