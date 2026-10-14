export interface Place {
  city: string;
  neighborhood: string;
}

type Coordinates = Pick<GeolocationCoordinates, 'latitude' | 'longitude'>;

type AddressKey =
  | 'city'
  | 'town'
  | 'village'
  | 'municipality'
  | 'suburb'
  | 'neighbourhood'
  | 'quarter'
  | 'city_district'
  | 'hamlet';

type Address = Partial<Record<AddressKey, string>>;

export function getCurrentCoords(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocalização indisponível neste navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      reject,
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 },
    );
  });
}

function readAddress(data: unknown): Address {
  if (typeof data !== 'object' || data === null) return {};
  const address: unknown = (data as { address?: unknown }).address;
  if (typeof address !== 'object' || address === null) return {};

  return Object.fromEntries(
    Object.entries(address).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  );
}

/** ~110 m de precisão: suficiente para cidade e bairro sem enviar a posição exata a terceiros. */
const COORD_DECIMALS = 3;

export async function reverseGeocode({ latitude, longitude }: Coordinates): Promise<Place> {
  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: latitude.toFixed(COORD_DECIMALS),
    lon: longitude.toFixed(COORD_DECIMALS),
    zoom: '18',
    addressdetails: '1',
    'accept-language': 'pt-BR',
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`);
  if (!response.ok) throw new Error(`Falha ao consultar endereço (${response.status})`);

  const address = readAddress(await response.json());

  return {
    city: address.city ?? address.town ?? address.village ?? address.municipality ?? '',
    neighborhood:
      address.suburb ?? address.neighbourhood ?? address.quarter ?? address.city_district ?? address.hamlet ?? '',
  };
}
